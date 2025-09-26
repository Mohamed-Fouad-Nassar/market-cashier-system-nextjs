"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button";

type TOption = {
  value: string;
  label: string;
};

type TFilterProps = {
  filter: string;
  options: TOption[];
};

export default function Filter({ filter, options }: TFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(filter, value);
    router.push(`?${params.toString()}`);
  };

  const active = searchParams.get(filter) || "all";

  return (
    <div className="flex items-center gap-2 rounded-lg border p-1">
      {options.map(({ label, value }) => (
        <Button
          key={value}
          size="sm"
          variant={active === value ? "outline" : "ghost"}
          className="flex items-center gap-2 rounded-md px-4"
          onClick={() => handleClick(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
