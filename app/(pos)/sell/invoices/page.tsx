import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

import Invoices from "./invoices";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Selling Invoices",
};

export default function Page() {
  return (
    <>
      <Header />
      <Invoices />
    </>
  );
}

function Header() {
  return (
    <header className="p-4 bg-accent flex gap-4 justify-between items-center">
      <Button asChild variant="outline">
        <Link href="/sell">Exit</Link>
      </Button>
      <ModeToggle />
    </header>
  );
}
