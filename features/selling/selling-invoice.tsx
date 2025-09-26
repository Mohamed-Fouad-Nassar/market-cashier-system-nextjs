import BarcodeForm from "./barcode-form";
import ProductsTable from "./products-table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InvoiceSummary from "./invoice-summary";
import ProductNameForm from "./product-name-form";

import { InvoiceProvider } from "./selling-invoice-context";

import { products } from "@/types/products.types";

export default function SellingInvoice() {
  // return (
  //   <InvoiceProvider>
  //     <main className="py-8 px-4 min-h-[calc(100vh-68px)] flex gap-6 flex-col xl:container xl:mx-auto">
  //       <div className="md:flex-1 h-auto space-y-4">
  //         <ProductNameForm products={products} />
  //         <BarcodeForm products={products} />
  //       </div>
  //       <InvoiceDetails />
  //     </main>
  //   </InvoiceProvider>
  // );

  return (
    <InvoiceProvider>
      <main className="py-8 px-4 min-h-[calc(100vh-68px)] flex gap-6 flex-col md:flex-row xl:container xl:mx-auto">
        <div className="md:flex-1 h-auto space-y-4">
          <InvoiceMetaData />
          <BarcodeForm products={products} />
          <ProductNameForm products={products} />
        </div>
        <InvoiceDetails />
      </main>
    </InvoiceProvider>
  );
}

function InvoiceMetaData() {
  const data = {
    id: 2,
    date_time:
      "Fri Sep 26 2025 21:29:58 GMT+0300 (Eastern European Summer Time)",
    user: {
      id: "1231890234",
      name: "Mohamed",
    },
  };

  return (
    <div className="mb-4 pb-4 border-b flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex items-center gap-2">
        <Label className="w-[60px]" htmlFor="id">
          ID
        </Label>
        <Input id="id" value={data.id} disabled />
      </div>
      <div className="flex items-center gap-2">
        <Label className="w-[60px]" htmlFor="user">
          User
        </Label>
        <Input id="user" value={data.user.name} disabled />
      </div>
    </div>
  );
}

function InvoiceDetails() {
  return (
    <div className="flex-1">
      <ProductsTable />
      <InvoiceSummary />
    </div>
  );
}
