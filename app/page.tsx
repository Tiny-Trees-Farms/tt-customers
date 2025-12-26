"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useAuthStore } from "@/lib/store/auth";
import { Eye, EyeOff } from "lucide-react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const passwordSchema = z.object({
    password: z
      .string()
      .trim()
      .min(1, "Password is required"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allowedPasswords = [
      process.env.NEXT_PUBLIC_HOUSTON_PASSWORD,
      process.env.NEXT_PUBLIC_HOUSTON2_PASSWORD,
      process.env.NEXT_PUBLIC_HOUSTON3_PASSWORD,
      process.env.NEXT_PUBLIC_HOUSTON4_PASSWORD,
    ].filter(Boolean) as string[];

    const parsed = passwordSchema.safeParse({ password });
    if (!parsed.success) {
      const message = parsed.error.flatten().fieldErrors.password?.[0] ?? "Invalid password";
      setError(message);
      return;
    }

    const value = parsed.data.password;

    if (allowedPasswords.includes(value)) {
      setError(null);
      // 6 hours in milliseconds
      login(6 * 60 * 60 * 1000);
      router.push("/menu");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="flex h-screen bg-black text-white w-full flex-col items-center justify-center px-4 py-12 relative">
      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center px-4 pt-8 pb-4">
        <div className="mb-6">
          <Image src="/TT_logo.png" alt="logo" width={115} height={115} />
        </div>
        {/* <h1 className="text-4xl font-semibold mb-8">Welcome!</h1> */}
        <div className="mb-6">
          <Label htmlFor="password" className="block text-sm font-medium text-white">Password</Label>
          <div className="relative mt-2">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              className={`pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">Invalid password</p>
          )}
        </div>
        <div>
          <Button type="submit">Enter</Button>
        </div>
      </form>
    </div>
  );
}