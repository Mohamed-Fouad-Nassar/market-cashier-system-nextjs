"use client";

import { ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useSellingInvoice } from "./selling-invoice-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const payment_methods = ["cash", "visa"];

export default function InvoiceSummary() {
  const {
    state: {
      total,
      items,
      visa_fee,
      sub_total,
      payment_method,
      discount: stateDis,
    },
    dispatch,
  } = useSellingInvoice();
  const [discount, setDiscount] = useState(stateDis);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "visa">("cash");

  function handleDiscount(e: ChangeEvent<HTMLInputElement>) {
    if (!Number(e.target.value)) return;
    dispatch({ type: "DISCOUNT", payload: Number(e.target.value) });
  }

  function handlePaymentMethod(e: "cash" | "visa") {
    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: e,
    });
    setPaymentMethod(e);
  }

  function handleClearInvoice() {
    setDiscount(0);
    setPaymentMethod("cash");
    dispatch({ type: "CLEAR" });
  }

  function handleSubmitInvoice() {
    if (!total || total <= 0 || !items.length) return;
    console.log({
      total,
      items,
      sub_total,
      payment_method,
      discount: stateDis,
      visa_fee: payment_method === "visa" ? visa_fee : 0,
    });
    setDiscount(0);
    setPaymentMethod("cash");
    dispatch({ type: "CLEAR" });
  }

  return (
    <>
      <div className="mt-4 flex gap-3">
        <Label htmlFor="discount" className="min-w-[120px]">
          Discount
        </Label>
        <Input
          type="text"
          id="discount"
          value={discount}
          onBlur={handleDiscount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDiscount(Number(e.target.value))
          }
        />
      </div>

      <div className="mt-4 flex gap-3">
        <Label htmlFor="payment_method" className="min-w-[120px]">
          Payment Method
        </Label>
        <Select value={paymentMethod} onValueChange={handlePaymentMethod}>
          <SelectTrigger id="payment_method" className="w-full">
            <SelectValue placeholder={paymentMethod} />
          </SelectTrigger>
          <SelectContent>
            {payment_methods.map((method) => (
              <SelectItem value={method} key={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 p-4 bg-muted rounded-md">
        <div className="flex justify-between items-center">
          <span>Sub Total</span>
          <span>{sub_total} L.E</span>
        </div>
        {payment_method === "visa" && (
          <div className="flex justify-between items-center">
            <span>Visa Fee</span>
            <span>+ {visa_fee} L.E</span>
          </div>
        )}
        <div className="my-1 flex justify-between items-center">
          <span>Discount</span>
          <span>{discount} L.E</span>
        </div>
        <hr className="my-2" />
        <div className="text-lg flex justify-between items-center font-semibold">
          <span>Total</span>
          <span className="text-3xl">{total} L.E</span>
        </div>
      </div>

      <div className="mt-4 flex flex-row-reverse gap-4 flex-end">
        <Button
          size="lg"
          type="submit"
          className="cursor-pointer"
          onClick={handleSubmitInvoice}
        >
          Save Invoice
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="cursor-pointer"
          onClick={handleClearInvoice}
        >
          Clear Invoice
        </Button>
      </div>
    </>
  );
}
