"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Search } from "lucide-react";

type SearchDialogProps<T> = {
  items: T[];
  getOptionLabel: (item: T) => string;
  onSelect: (item: T) => void;
  placeholder?: string;
  triggerLabel?: string;
};

export function SearchDialog<T>({
  items,
  getOptionLabel,
  onSelect,
  placeholder = "Search...",
  triggerLabel = "Open Search",
}: SearchDialogProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">{triggerLabel}</DialogTitle>
      <DialogDescription className="sr-only">{triggerLabel}</DialogDescription>
      <DialogTrigger asChild>
        <button className="w-full flex justify-center items-center gap-2 font-medium text-sm border px-3 py-2 rounded-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogContent className="p-2 max-w-lg">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="max-h-80 overflow-y-auto">
            {items.map((item, idx) => (
              <CommandItem
                key={idx}
                onSelect={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                {getOptionLabel(item)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
