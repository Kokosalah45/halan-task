import { Button } from "@/lib/core/components/ui/button";
import { forwardRef } from "react";

const SearchButton = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <Button
      ref={ref}
      className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
      {...props}
    >
      <span className="inline-flex">Search...</span>
    </Button>
  );
});

SearchButton.displayName = "SearchButton";

export default SearchButton;
