import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import SellingInvoice from "@/features/selling/selling-invoice";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "sell",
};

export default function Page() {
  return (
    <>
      <Header />
      <SellingInvoice />
    </>
  );
}

function Header() {
  return (
    <header className="p-4 bg-accent flex gap-4 justify-between items-center">
      <Button asChild variant="outline">
        <Link href="/home">Exit</Link>
      </Button>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/sell/invoices">Invoices</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/home">Returns</Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
