"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { placeOrder } from "./actions"
  
export default function OrderPage() {
    const [deliveryType, setDeliveryType] = useState<string | undefined>(undefined)
    const [deliveryTime, setDeliveryTime] = useState<string | undefined>(undefined)
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
              <span>🍃</span> Order Information
            </CardTitle>
            <CardDescription className="text-emerald-400/80">Chill and cozy details</CardDescription>
          </CardHeader>
          <form action={placeOrder}>
          <CardContent className="space-y-8">
            <FieldSet>
              <FieldLegend className="text-emerald-200/90 flex items-center gap-1 before:content-['🍃'] before:mr-1">Customer Information</FieldLegend>
              <FieldGroup className="gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel className="text-emerald-300" htmlFor="firstName">First Name</FieldLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      type="text"
                      placeholder="John"
                      className="h-11 rounded-xl border-emerald-800 bg-emerald-950/40 placeholder:text-emerald-700 text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700 transition"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="text-emerald-300" htmlFor="lastName">Last Name</FieldLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      type="text"
                      placeholder="Doe"
                      className="h-11 rounded-xl border-emerald-800 bg-emerald-950/40 placeholder:text-emerald-700 text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700 transition"
                      required
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel className="text-emerald-300" htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    type="tel"
                    placeholder="(201) 555-0123"
                    className="h-11 rounded-xl border-emerald-800 bg-emerald-950/40 placeholder:text-emerald-700 text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700 transition"
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend className="text-emerald-200/90 flex items-center gap-1 before:content-['🌿'] before:mr-1">Address Information</FieldLegend>
              <FieldGroup className="gap-6">
                <Field>
                  <FieldLabel className="text-emerald-300" htmlFor="street">Street Address</FieldLabel>
                  <Input
                    id="street"
                    name="streetAddress"
                    autoComplete="street-address"
                    type="text"
                    placeholder="123 Main St"
                    className="h-11 rounded-xl border-emerald-800 bg-emerald-950/40 placeholder:text-emerald-700 text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700 transition"
                    required
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel className="text-emerald-300" htmlFor="city">City</FieldLabel>
                    <Input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      type="text"
                      placeholder="New York"
                      className="h-11 rounded-xl border-emerald-800 bg-emerald-950/40 placeholder:text-emerald-700 text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700 transition"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="text-emerald-300" htmlFor="state">State</FieldLabel>
                    <Input
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      type="text"
                      placeholder="NY"
                      className="h-11 rounded-xl border-emerald-800 bg-emerald-950/40 placeholder:text-emerald-700 text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700 transition"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="text-emerald-300" htmlFor="zip">Zip</FieldLabel>
                    <Input
                      id="zip"
                      name="postalCode"
                      autoComplete="postal-code"
                      type="text"
                      placeholder="90502"
                      className="h-11 rounded-xl border-emerald-800 bg-emerald-950/40 placeholder:text-emerald-700 text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700 transition"
                      required
                    />
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend className="text-emerald-200/90 flex items-center gap-1 before:content-['🛒'] before:mr-1">Order Items</FieldLegend>
              <FieldGroup className="gap-6">
                <Field>
                  <FieldLabel className="text-emerald-300" htmlFor="orderItems">Order Items</FieldLabel>
                  <Textarea
                    id="orderItems"
                    name="orderItems"
                    placeholder="List each item and quantity, e.g., '14g Super Lemon, 1 Blue Dream Stiizy'"
                    className="min-h-[130px] rounded-2xl border-emerald-800 bg-emerald-950/40 placeholder:text-emerald-700 text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700"
                  />
                  <FieldDescription className="text-emerald-400/80">Include options or special requests per item if needed.</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend className="text-emerald-200/90 flex items-center gap-1 before:content-['🍀'] before:mr-1">Delivery Details</FieldLegend>
              <FieldGroup className="gap-6">
                <Field>
                  <FieldLabel className="text-emerald-300" htmlFor="deliveryType">Delivery Type</FieldLabel>
                  <Select onValueChange={setDeliveryType}>
                    <SelectTrigger
                      id="deliveryType"
                      aria-label="Delivery Type"
                      className="h-11 rounded-xl border-emerald-800 bg-emerald-950/40 text-emerald-100 focus:ring-2 focus:ring-emerald-700"
                    >
                      <SelectValue placeholder="Select delivery type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-emerald-800 bg-emerald-950/90 shadow-none">
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="deliveryType" value={deliveryType ?? ""} />
                </Field>
                <Field>
                  <FieldLabel className="text-emerald-300" htmlFor="deliveryTime">Delivery Time</FieldLabel>
                  <Select onValueChange={setDeliveryTime}>
                    <SelectTrigger
                      id="deliveryTime"
                      aria-label="Delivery Time"
                      className="h-11 rounded-xl border-emerald-800 bg-emerald-950/40 text-emerald-100 focus:ring-2 focus:ring-emerald-700"
                    >
                      <SelectValue placeholder="Select delivery time" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-emerald-800 bg-emerald-950/90 shadow-none">
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="30">In 30 minutes</SelectItem>
                      <SelectItem value="60">In 1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="deliveryTime" value={deliveryTime ?? ""} />
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend className="text-emerald-200/90 flex items-center gap-1 before:content-['✨'] before:mr-1">Additional Notes</FieldLegend>
              <FieldGroup className="gap-6">
                <Field>
                  <FieldLabel className="text-emerald-300" htmlFor="notes">Notes</FieldLabel>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any delivery instructions or preferences"
                    className="min-h-[110px] rounded-2xl border-emerald-800 bg-emerald-950/40 placeholder:text-emerald-700 text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" className="h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 shadow-none transition-transform hover:-translate-y-0.5">Place Order 🌿</Button>
          </CardFooter>
          </form>
        </Card>
        </div>
      </div>
    );
};
