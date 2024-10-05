import { MovieSearchFilters } from "@/lib/core/constants/api";
import SearchMovieFilter from "@/lib/features/MoviesList/components/SearchMovieFilter";
import { SearchedMoviesList } from "@/lib/features/MoviesList/SearchedMoviesList";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: { query: string } & MovieSearchFilters;
};

// make it hydrated use tanstack/react-query
// now we will use a component
export default async function SearchMoviePage({
  searchParams: { query, ...filters },
}: PageProps) {
  if (!query) {
    redirect("/");
  }
  return (
    <section className="flex flex-col flex-1">
      <SearchMovieFilter />
      <SearchedMoviesList searchTerm={query} filters={filters} />
    </section>
  );
}
