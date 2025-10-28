"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId") ?? "TT-123456";
  const deliveryType = searchParams.get("deliveryType");
  const deliveryTime = searchParams.get("deliveryTime");

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-b from-emerald-950 via-emerald-900 to-emerald-950 flex justify-center items-start py-12">
      {/* soft accent blobs */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-rose-300/25 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
      {/* subtle dotted texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1.5px)] bg-size-[16px_16px] opacity-20" />

      <div className="relative z-10 w-full max-w-lg sm:max-w-xl space-y-6 px-4">
        <Card className="rounded-3xl border-2 border-emerald-800 bg-emerald-950/40 backdrop-blur-xl shadow-none text-emerald-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-extrabold tracking-tight text-emerald-300 flex items-center gap-2">
              <span>✅</span> Order Confirmed
            </CardTitle>
            <CardDescription className="text-emerald-400/80">Thanks! We’ve received your order.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-4">
              <div className="text-emerald-400/80 text-sm">Order Number</div>
              <div className="text-emerald-200 font-mono text-lg tracking-wide">{orderId}</div>
            </div>

            {(deliveryType || deliveryTime) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deliveryType && (
                  <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 p-4">
                    <div className="text-emerald-400/80 text-sm">Delivery Type</div>
                    <div className="text-emerald-200 font-medium capitalize">{deliveryType}</div>
                  </div>
                )}
                {deliveryTime && (
                  <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 p-4">
                    <div className="text-emerald-400/80 text-sm">Delivery Time</div>
                    <div className="text-emerald-200 font-medium">
                      {deliveryTime === "asap" ? "ASAP" : deliveryTime === "30" ? "In 30 minutes" : deliveryTime === "60" ? "In 1 hour" : deliveryTime}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="text-emerald-300/90">
              We’ll text you a confirmation and let you know when it’s on the way. If you need to update anything, reply to the text or place a new order.
            </div>
          </CardContent>

          <CardFooter className="justify-between gap-3 flex-wrap">
            <Button
              type="button"
              onClick={() => router.push("/menu")}
              className="h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 shadow-none transition-transform hover:-translate-y-0.5"
            >
              Back to Menu 🌿
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/order")}
              className="h-11 rounded-full bg-transparent border border-emerald-800 text-emerald-200 hover:bg-emerald-900/40 px-6 shadow-none"
            >
              Place Another Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}


