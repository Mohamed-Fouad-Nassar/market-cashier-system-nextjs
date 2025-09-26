"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboboxContextType<T> = {
  value: T | null;
  setValue: (v: T | null) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  getOptionLabel: (item: T) => string;
};

const ComboboxContext = React.createContext<ComboboxContextType<any> | null>(
  null
);

export function Combobox<T>({
  children,
  value,
  setValue,
  getOptionLabel,
}: {
  children: React.ReactNode;
  value: T | null;
  setValue: (v: T | null) => void;
  getOptionLabel: (item: T) => string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <ComboboxContext.Provider
      value={{ value, setValue, open, setOpen, getOptionLabel }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  );
}

export function ComboboxTrigger({
  placeholder = "Select...",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const ctx = React.useContext(ComboboxContext)!;

  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={ctx.open}
        className={cn("w-[250px] justify-between", className)}
      >
        {ctx.value ? ctx.getOptionLabel(ctx.value) : placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
  );
}

export function ComboboxContent<T>({
  items,
  placeholder = "Search...",
}: {
  items: T[];
  placeholder?: string;
}) {
  const ctx = React.useContext(ComboboxContext)!;

  return (
    <PopoverContent className="w-[250px] p-0">
      <Command>
        <CommandInput placeholder={placeholder} />
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {items.map((item, idx) => {
            const label = ctx.getOptionLabel(item);
            return (
              <CommandItem
                key={idx}
                onSelect={() => {
                  ctx.setValue(item);
                  ctx.setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    ctx.value && ctx.getOptionLabel(ctx.value) === label
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {label}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </Command>
    </PopoverContent>
  );
}
