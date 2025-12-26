"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Menu() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const expiresAt = useAuthStore((s) => s.expiresAt);
  const logout = useAuthStore((s) => s.logout);
  const [error, setError] = useState<string | null>(null);
  const isExpired = useMemo(() => {
    if (!expiresAt) return true;
    return Date.now() > expiresAt;
  }, [expiresAt]);

  useEffect(() => {
    if (!isAuthenticated || isExpired) {
      logout();
      setError("Session expired. Please log in again.");
      router.replace("/");
    }
  }, [isAuthenticated, isExpired, logout, router]);

  if (!isAuthenticated || isExpired) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-8">
      {/* Header info section */}
      <div className="w-full max-w-md text-center space-y-3 mt-4 mb-8">
        <div className="bg-gray-900 rounded-lg p-4 space-y-2 text-sm">
          <p className="font-semibold">Mon. - Sat. 12pm - 7pm</p>
          <p>Deliveries by appointment</p>
          <p className="font-semibold">*7pm cutoff for same day delivery*</p>
          <p>$95 minimum order</p>
          <p className="font-semibold">- CASH ONLY -</p>
        </div>
        <div className="rounded-lg p-4 space-y-2 text-sm">
          <Button size="lg" onClick={() => window.open("https://tinytrees.typeform.com/to/ahWjmRu8?typeform-source=www.tinytreesfarm.com", "_blank")} className="w-full font-semibold text-lg bg-green-700 hover:bg-green-800">
            Place Order
          </Button>
        </div>
      </div>

      {/* <div className="w-full max-w-md text-center space-y-3 mb-8 bg-gray-900 rounded-lg p-4 text-yellow-400">
        <h2 className="text-2xl font-bold">Out of town October 13-24!</h2>
      </div> */}
      
      {/* Menu image section */}
      <div className="w-full max-w-4xl flex justify-center">
        <div className="relative w-full max-w-3xl">
          {(() => {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const menuSrc = supabaseUrl
              ? `${supabaseUrl}/storage/v1/object/public/menus/current_menu.png`
              : "/current_menu.png";
            return (
              <Image
                src={menuSrc}
                alt="Current Menu"
                width={800}
                height={800}
                className="w-full h-auto rounded-lg shadow-lg border border-gray-800"
                priority
                unoptimized
              />
            );
          })()}
        </div>
      </div>
    </div>
  );
}