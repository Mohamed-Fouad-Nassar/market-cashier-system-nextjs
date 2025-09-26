"use client";

import { Eye, Pen, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import Filter from "@/components/filter";
import { Button } from "@/components/ui/button";

import { sellingInvoices } from "@/types/selling-invoice.types";

const options = [
  { label: "All", value: "all" },
  { label: "Cash", value: "cash" },
  { label: "Visa", value: "visa" },
];

export default function Invoices() {
  return (
    <main className="py-8 px-4 xl:container xl:mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <h1 className="text-2xl font-bold">Selling Invoices</h1>
        <Filter filter="payment_method" options={options} />
      </div>

      <InvoicesTable />
    </main>
  );
}

function InvoicesTable() {
  const searchParams = useSearchParams();
  const filterValue = searchParams.get("payment_method");

  let filteredInvoices;
  switch (filterValue) {
    case "visa":
      filteredInvoices = sellingInvoices.filter(
        (invoice) => invoice.payment_method === "visa"
      );
      break;

    case "cash":
      filteredInvoices = sellingInvoices.filter(
        (invoice) => invoice.payment_method === "cash"
      );
      break;

    default:
      filteredInvoices = sellingInvoices;
      break;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>items count</TableHead>
          <TableHead>sub total</TableHead>
          <TableHead>discount</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>user</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredInvoices.map(
          ({ id, payment_method, items, discount, total, sub_total }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{payment_method}</TableCell>
              <TableCell>{items.length}</TableCell>
              <TableCell>{sub_total}</TableCell>
              <TableCell>{discount}</TableCell>
              <TableCell>{total}</TableCell>
              <TableCell>Mohamed</TableCell>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Button variant="outline" size="icon">
                    <Eye />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Pen />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
