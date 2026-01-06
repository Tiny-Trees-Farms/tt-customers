"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface DailyMenuInfoText {
  businessHours: string;
  orderCutoff: string;
  orderMinimum: string;
  paymentMethod: string;
}

export default function Menu() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const expiresAt = useAuthStore((s) => s.expiresAt);
  const logout = useAuthStore((s) => s.logout);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuUrl, setMenuUrl] = useState<string>("");
  const [backgroundColors, setBackgroundColors] = useState<{topColor: string, bottomColor: string}>({
    topColor: '#000000',
    bottomColor: '#1a1a1a'
  });
  const [infoText, setInfoText] = useState<DailyMenuInfoText>({
    businessHours: "Mon.-Sat. 12pm - 7pm",
    orderCutoff: "*[7:00pm order cutoff for same-day delivery]*",
    orderMinimum: "$95 order minimum",
    paymentMethod: "- CASH ONLY -"
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch menu data, background colors, and info text in parallel
        const [menuResponse, backgroundResponse, infoTextResponse] = await Promise.all([
          fetch(`/api/getMenuUrl?t=${Date.now()}`, {
            cache: 'no-store',
            headers: {
              'Pragma': 'no-cache',
              'Cache-Control': 'no-cache'
            }
          }),
          fetch('/api/appSettings?key=dailymenu_background_colors', {
            cache: 'no-store'
          }),
          fetch('/api/appSettings?key=dailymenu_info_text', {
            cache: 'no-store'
          })
        ]);

        // Handle menu data
        const menuData = await menuResponse.json();
        setMenuUrl(menuData.currentMenu?.url || '');

        // Handle background colors
        if (backgroundResponse.ok) {
          const backgroundData = await backgroundResponse.json();
          setBackgroundColors(backgroundData.value);
        }

        // Handle info text
        if (infoTextResponse.ok) {
          const infoTextData = await infoTextResponse.json();
          setInfoText(infoTextData.value);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMenuUrl('');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated || isExpired) {
    return null;
  }

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-white relative p-4 md:p-8"
      style={{
        background: `linear-gradient(155deg, ${backgroundColors.topColor} 50%, ${backgroundColors.bottomColor} 50%)`
      }}
    >
      {/* Diagonal white separator line from bottom third left to top third right */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(155deg, transparent 49.8%, #ffffff 49.8%, #ffffff 50.2%, transparent 50.2%)`
        }}
      />

      {/* Header info section */}
      <div className="w-full max-w-md text-center space-y-3 mt-4 mb-8 relative z-10">
        <div className="bg-gray-900 rounded-lg p-4 space-y-2 text-sm text-white">
          <p className="font-semibold">Business Hours:</p>
          <p>{infoText.businessHours}</p>
          <p className="font-semibold">{infoText.orderCutoff}</p>
          <p>{infoText.orderMinimum}</p>
          <p className="font-semibold">{infoText.paymentMethod}</p>
        </div>
        <div className="rounded-lg p-4 space-y-2 text-sm">
          <Button size="lg" onClick={() => window.open('https://tinytrees.typeform.com/to/ahWjmRu8', '_blank')} className="w-full bg-white text-black">
            Place Order
          </Button>
        </div>
      </div>

      {/* Menu image section */}
      <div className="w-full max-w-4xl flex justify-center relative z-10">
        <div className="relative w-full max-w-3xl">
          {(() => {
            // Use menuUrl from API if available, otherwise fallback to Supabase URL
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const menuSrc = menuUrl || (supabaseUrl
              ? `${supabaseUrl}/storage/v1/object/public/menus/current_menu.png`
              : "/current_menu.png");
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