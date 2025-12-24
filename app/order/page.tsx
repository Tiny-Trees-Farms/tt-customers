"use client";

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
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
    const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined)

    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-lg sm:max-w-xl space-y-6">
        <Card className="rounded-lg border border-gray-800 bg-gray-900 shadow-none text-white">
          <CardHeader className="pb-2">
          <div className="flex justify-center">
            <Image src="/TT_logo.png" alt="Tiny Trees Logo" width={100} height={100} />
          </div>
            <CardTitle className="text-2xl font-semibold tracking-tight text-white">
              New Order
            </CardTitle>
            <CardDescription className="text-gray-400">Enter your details below</CardDescription>
          </CardHeader>
          <form action={placeOrder}>
          <CardContent className="space-y-8">
            <FieldSet>
              <FieldGroup className="gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel className="text-white" htmlFor="firstName">First Name</FieldLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      type="text"
                      placeholder="John"
                      className="h-11 rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500 transition"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="text-white" htmlFor="lastName">Last Name</FieldLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      type="text"
                      placeholder="Doe"
                      className="h-11 rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500 transition"
                      required
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel className="text-white" htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    type="tel"
                    placeholder="(201) 555-0123"
                    className="h-11 rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500 transition"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel className="text-white" htmlFor="orderItems">Order Details</FieldLabel>
                  <Textarea
                    id="orderItems"
                    name="orderItems"
                    placeholder="List each item and quantity, use punctuation to separate items. e.g., '14g Super Lemon, 1 Blue Dream Stiizy'"
                    className="min-h-[130px] rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500"
                  />
                  <FieldDescription className="text-gray-400">Include options or special requests per item if needed.</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="gap-6">
                <Field>
                  <FieldLabel className="text-white" htmlFor="street">Street Address</FieldLabel>
                  <Input
                    id="street"
                    name="streetAddress"
                    autoComplete="street-address"
                    type="text"
                    placeholder="123 Main St"
                    className="h-11 rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500 transition"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel className="text-white" htmlFor="unit">Unit/Apt #</FieldLabel>
                  <Input
                    id="unit"
                    name="unit"
                    autoComplete="unit"
                    type="text"
                    placeholder="Apt 4B"
                    className="h-11 rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500 transition"
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel className="text-white" htmlFor="city">City</FieldLabel>
                    <Input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      type="text"
                      placeholder="New York"
                      className="h-11 rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500 transition"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="text-white" htmlFor="state">State</FieldLabel>
                    <Input
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      type="text"
                      placeholder="NY"
                      className="h-11 rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500 transition"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="text-white" htmlFor="zip">Zip</FieldLabel>
                    <Input
                      id="zip"
                      name="postalCode"
                      autoComplete="postal-code"
                      type="text"
                      placeholder="90502"
                      className="h-11 rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500 transition"
                      required
                    />
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="gap-6">
                <Field>
                  <FieldLabel className="text-white" htmlFor="deliveryType">Delivery Type</FieldLabel>
                  <Select onValueChange={setDeliveryType}>
                    <SelectTrigger
                      id="deliveryType"
                      aria-label="Delivery Type"
                      className="h-11 rounded-lg border-gray-700 bg-black text-white focus:ring-2 focus:ring-gray-500"
                    >
                      <SelectValue placeholder="Select delivery type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-gray-700 bg-gray-900 shadow-none">
                      <SelectItem className="text-white" value="contactless">Contactless</SelectItem>
                      <SelectItem className="text-white" value="handoff">Handoff</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="deliveryType" value={deliveryType ?? ""} />
                </Field>
                <Field>
                  <FieldLabel className="text-white" htmlFor="deliveryTime">Delivery Time</FieldLabel>
                  <Select onValueChange={setDeliveryTime}>
                    <SelectTrigger
                      id="deliveryTime"
                      aria-label="Delivery Time"
                      className="h-11 rounded-lg border-gray-700 bg-black text-white focus:ring-2 focus:ring-gray-500"
                    >
                      <SelectValue placeholder="Select delivery time" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-gray-700 bg-gray-900 shadow-none">
                      <SelectItem className="text-white" value="asap">Tonight 7pm - 10pm</SelectItem>
                      <SelectItem className="text-white" value="30">Tomorrow</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="deliveryTime" value={deliveryTime ?? ""} />
                </Field>
                <Field>
                  <FieldLabel className="text-white" htmlFor="residenceType">Payment Method</FieldLabel>
                  <Select onValueChange={setPaymentMethod}>
                    <SelectTrigger
                      id="paymentMethod"
                      aria-label="Payment Method"
                      className="h-11 rounded-lg border-gray-700 bg-black text-white focus:ring-2 focus:ring-gray-500"
                    >
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-gray-700 bg-gray-900 shadow-none">
                      <SelectItem className="text-white" value="cash">Cash</SelectItem>
                      <SelectItem className="text-white" value="card">Venmo</SelectItem>
                    </SelectContent>
                    <input type="hidden" name="paymentMethod" value={paymentMethod ?? ""} />
                  </Select>
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="gap-6">
                <Field>
                  <FieldLabel className="text-white" htmlFor="notes">Delivery Notes</FieldLabel>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special delivery instructions or preferences for conctactless and handoff deliveries, or any other special requests."
                    className="min-h-[110px] rounded-lg border-gray-700 bg-black placeholder:text-gray-500 text-white focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" className="h-11 mt-4 rounded-lg bg-white hover:bg-gray-200 text-black px-6 font-semibold shadow-none transition">Place Order</Button>
          </CardFooter>
          </form>
        </Card>
        </div>
      </div>
    );
};
