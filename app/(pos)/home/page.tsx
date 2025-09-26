import Link from "next/link";
import { Banknote, Receipt, ShoppingCart } from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
};

const links = [
  {
    title: "Sell",
    icon: ShoppingCart,
    href: "/sell",
    desc: "Records of all sales conducted by the market, detailing items sold, quantities, and revenue generated.",
  },
  {
    title: "Receipts",
    icon: Receipt,
    href: "/receipts",
    desc: "Receipts that document the sale of products to customers",
  },
  {
    title: "Purchases",
    icon: Banknote,
    href: "/purchases",
    desc: "Records of all purchases made by the market, detailing items acquired, quantities, and costs.",
  },
];
export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-72px)] py-28">
        <div className="px-10 container mx-auto grid gap-6 lg:mt-20 lg:grid-cols-3">
          {links.map(({ title, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-4 h-full rounded-lg bg-accent p-5"
            >
              <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-background">
                <Icon className="size-8" />
              </span>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-medium">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
