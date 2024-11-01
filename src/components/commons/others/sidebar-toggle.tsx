import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils/utils.ts";
import { Button } from "../ui/button";

interface SidebarToggleProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible absolute right-[-11px] top-[25px] z-20 md:visible">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="size-6 rounded-md hover:bg-accent"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            !isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
