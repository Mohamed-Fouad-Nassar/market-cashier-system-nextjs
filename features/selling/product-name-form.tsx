"use client";

import { SearchDialog } from "@/components/search-dialog";

import { useSellingInvoice } from "./selling-invoice-context";

import { Product } from "@/types/products.types";

export default function ProductNameForm({ products }: { products: Product[] }) {
  const { dispatch } = useSellingInvoice();

  function handleSelectProduct(product: Product) {
    if (!product) {
      console.log("No Product Founded");
      return;
    }

    dispatch({ type: "ADD_ITEM", payload: product });
  }

  return (
    <SearchDialog<Product>
      items={products}
      getOptionLabel={(p) => p.name}
      onSelect={handleSelectProduct}
      placeholder="Search in products..."
      triggerLabel="Search by product name"
    />
  );
}
