'use server';

import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const key = serviceKey || anonKey;
  if (!url || !key) {
    throw new Error("Supabase env vars are missing");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function placeOrder(formData: FormData) {
  const firstName = (formData.get("firstName") ?? "").toString().trim();
  const lastName = (formData.get("lastName") ?? "").toString().trim();
  const phone = (formData.get("phone") ?? "").toString().trim();
  const streetAddress = (formData.get("streetAddress") ?? "").toString().trim();
  const city = (formData.get("city") ?? "").toString().trim();
  const state = (formData.get("state") ?? "").toString().trim();
  const postalCode = (formData.get("postalCode") ?? "").toString().trim();
  const orderItems = (formData.get("orderItems") ?? "").toString().trim();
  const deliveryType = (formData.get("deliveryType") ?? "").toString().trim() || null;
  const deliveryTime = (formData.get("deliveryTime") ?? "").toString().trim() || null;
  const notes = (formData.get("notes") ?? "").toString().trim() || null;
  const status = ((formData.get("status") ?? "pending").toString().trim()) || "pending";
  const totalRaw = (formData.get("total") ?? "").toString().trim();
  const total = totalRaw ? Number(totalRaw) : null;
  const paymentMethod = (formData.get("paymentMethod") ?? "").toString().trim() || null;
  const residenceType = (formData.get("residenceType") ?? "").toString().trim() || null;

  const supabase = getSupabase();

  const payloadSnake = {
    first_name: firstName,
    last_name: lastName,
    phone,
    street_address: streetAddress,
    city,
    state,
    postal_code: postalCode,
    order_items: orderItems,
    delivery_type: deliveryType,
    delivery_time: deliveryTime,
    notes,
    status,
    total,
    payment_method: paymentMethod,
    residence_type: residenceType,
  } as const;

  const { data, error } = await supabase
    .from("orders")
    .insert(payloadSnake)
    .select("id")
    .single();

  if (error) {
    console.error("Supabase insert error (orders)", {
      message: error.message,
      details: (error as any).details,
      hint: (error as any).hint,
      code: (error as any).code,
    });
    throw new Error(`Order submission failed: ${error.message}`);
  }

  const orderId = data?.id ?? "";
  const query = new URLSearchParams();
  if (orderId) query.set("orderId", String(orderId));
  if (deliveryType) query.set("deliveryType", deliveryType);
  if (deliveryTime) query.set("deliveryTime", deliveryTime);

  redirect(`/order/confirmation${query.toString() ? `?${query.toString()}` : ""}`);
}


