"use client";

import { Trash2 } from "lucide-react";

import {
  GridTable,
  GridTableRow,
  GridTableBody,
  GridTableCell,
  GridTableHead,
  GridTableHeader,
} from "@/components/sticky-table";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/quantity-input";

import { useSellingInvoice } from "./selling-invoice-context";

export default function ProductsTable() {
  const {
    state: { items },
    dispatch,
  } = useSellingInvoice();

  function handleIncreaseQty(id: number) {
    dispatch({ type: "INCREASE", payload: id });
  }
  function handleDecreaseQty(id: number) {
    dispatch({ type: "DECREASE", payload: id });
  }
  function handleChangeQty(id: number, qty: number) {
    dispatch({ type: "CHANGE_QTY", payload: { id, qty: qty } });
  }
  function handleRemoveItem(id: number) {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }

  return (
    <GridTable
      className="min-h-96"
      colsClass="grid-cols-[2fr_150px_1fr_1fr_70px] md:grid-cols-[50px_2fr_150px_1fr_1fr_70px]"
    >
      <GridTableHeader>
        <GridTableHead className="hidden md:block">#</GridTableHead>
        <GridTableHead>Name</GridTableHead>
        <GridTableHead>Quantity</GridTableHead>
        <GridTableHead>Price</GridTableHead>
        <GridTableHead>Total</GridTableHead>
        <GridTableHead> </GridTableHead>
      </GridTableHeader>

      <GridTableBody height="390px">
        {items.map(({ id, name, quantity, retail_price }, i) => (
          <GridTableRow key={id}>
            <GridTableCell className="hidden md:flex">{i + 1}</GridTableCell>
            <GridTableCell>{name}</GridTableCell>
            <GridTableCell>
              <QuantityInput
                id={id}
                value={quantity}
                changeQty={handleChangeQty}
                increaseQty={() => handleIncreaseQty(id)}
                decreaseQty={() => handleDecreaseQty(id)}
              />
            </GridTableCell>
            <GridTableCell>{retail_price}</GridTableCell>
            <GridTableCell>{retail_price * quantity}</GridTableCell>
            <GridTableCell>
              <Button
                className="size-8 cursor-pointer"
                variant="destructive"
                onClick={() => handleRemoveItem(id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </GridTableCell>
          </GridTableRow>
        ))}
      </GridTableBody>

      {/* {total > 0 && (
        <GridTableFooter>
          <GridTableCell colSpan={4}>Total</GridTableCell>
          <GridTableCell>{total}</GridTableCell>
        </GridTableFooter>
      )} */}
    </GridTable>
  );
}
