import { Input, InputProps } from "@/lib/core/components/ui/input";
import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SearchBarProps extends InputProps {
  renderIcon?: () => JSX.Element;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ renderIcon, ...inputProps }, ref) => {
    console.log({ renderIcon });
    return (
      <div className="flex items-center dark:bg-primary dark:text-white transition-all">
        {renderIcon ? (
          renderIcon()
        ) : (
          <Search width={15} height={15} className="w-4 h-4 me-2" />
        )}
        <Input
          ref={ref} // Pass the ref to the Input component
          placeholder="search"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 border-transparent rounded-none  bg-inherit"
          {...inputProps}
        />
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar"; // Optional: helps with debugging

export default SearchBar;
