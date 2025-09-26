"use client";

import { FormEvent, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useSellingInvoice } from "./selling-invoice-context";

import { Product } from "@/types/products.types";

export default function BarcodeForm({ products }: { products: Product[] }) {
  const {
    dispatch,
    state: { items },
  } = useSellingInvoice();
  const [barcode, setBarcode] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!barcode) {
      console.log("No Barcode Founded");
      return;
    }

    if (
      barcode.includes("+") &&
      !isNaN(Number(barcode.slice(1))) &&
      items.length > 0
    ) {
      const target = items.at(items.length - 1);
      if (target)
        dispatch({
          type: "CHANGE_QTY",
          payload: { id: target.id, qty: +barcode.slice(1) + target.quantity },
        });
    } else {
      const target = products.find((p) => p.barcode === barcode);
      if (target) dispatch({ type: "ADD_ITEM", payload: target });
      else console.log("No Product Founded With this Barcode");
    }

    setBarcode("");
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Label htmlFor="barcode" className="min-w-[100px]">
            Barcode
          </Label>
          <Input
            type="text"
            id="barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>
      </form>
    </section>
  );
}
