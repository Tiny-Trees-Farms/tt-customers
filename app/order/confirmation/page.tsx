"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationContent />
    </Suspense>
  );
}

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId") ?? "TT-123456";
  const deliveryType = searchParams.get("deliveryType");
  const deliveryTime = searchParams.get("deliveryTime");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-lg sm:max-w-xl space-y-6">
        <Card className="rounded-lg border border-gray-800 bg-gray-900 shadow-none text-white">
          <CardHeader className="pb-2">
            <div className="flex justify-center">
              <Image src="/TT_logo.png" alt="Tiny Trees Logo" width={100} height={100} />
            </div>
            <CardTitle className="text-2xl mt-4 font-semibold tracking-tight text-white text-center">
              Thank you for your order!
            </CardTitle>
            <CardDescription className="text-gray-400">A member of our team will reach out directly to confirm order total and delivery details as soon as we can.</CardDescription>
          </CardHeader>
          
          <CardFooter className="justify-between gap-3 flex-wrap">
            <Button
              type="button"
              onClick={() => router.push("/menu")}
              className="h-11 rounded-lg bg-white hover:bg-gray-200 text-black px-6 font-semibold shadow-none transition"
            >
              Back to Menu
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/order")}
              className="h-11 rounded-lg bg-transparent border border-gray-700 text-white hover:bg-gray-800 px-6 shadow-none transition"
            >
              Place Another Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
