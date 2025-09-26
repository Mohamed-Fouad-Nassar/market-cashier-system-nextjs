"use client";

import { ChangeEvent } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type QuantityInputProps = {
  id: number;
  value: number;
  className?: string;
  increaseQty: () => void;
  decreaseQty: () => void;
  changeQty: (id: number, qty: number) => void;
};

export function QuantityInput({
  id,
  value,
  className,
  increaseQty,
  decreaseQty,
  changeQty,
}: QuantityInputProps) {
  return (
    <div className={cn("flex items-center border rounded-md", className)}>
      <Button
        type="button"
        variant="outline"
        className="size-8 border-0 shadow-none cursor-pointer rounded-e-none"
        onClick={decreaseQty}
      >
        {value > 1 ? (
          <Minus className="h-4 w-4" />
        ) : (
          <Trash2 className="h-4 w-4 text-red-500" />
        )}
      </Button>

      <Input
        type="number"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          changeQty(id, Number(e.target.value))
        }
        className="w-16 h-8 text-center no-arrows border-0 border-x !border-input shadow-none rounded-none !ring-0"
      />

      <Button
        type="button"
        variant="outline"
        className="size-8 border-0 shadow-none cursor-pointer rounded-s-none"
        onClick={increaseQty}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
