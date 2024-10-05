"use client";
import GridResponsiveList from "@/lib/core/components/GridResponsiveList";
import { MovieSearchFilters } from "@/lib/core/constants/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import EmptyResultsComponent from "./components/EmptyResultsComponent";
import ErrorComponent from "./components/ErrorComponent";
import MovieCard from "./components/MovieCard";
import getSearchedMovies from "./data-layer.ts/getSearchedMovies";

type SearchedMoviesProps = {
  searchTerm: string;
  filters: MovieSearchFilters;
};
export function SearchedMoviesList({
  searchTerm,
  filters,
}: SearchedMoviesProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "searched-movies",
      {
        searchTerm,
        filters,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getSearchedMovies(searchTerm, pageParam, filters),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const hasNextPage = lastPage.results.length > 0;
      if (hasNextPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const router = useRouter();

  const items = data ? data.pages.flatMap((d) => d.results) : [];

  const { isIntersecting, ref: intersectionRef } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isIntersecting]);

  return (
    <div className="flex-1 flex justify-center items-center">
      {status === "success" && items.length === 0 && <EmptyResultsComponent />}
      {status === "error" && <ErrorComponent />}
      {status === "success" && items.length !== 0 && (
        <GridResponsiveList
          listContainerStyle={{
            width: "100%",
          }}
          items={items}
          renderItem={(item) => (
            <MovieCard
              movie={item}
              onClick={(movie) => {
                router.push(`/movie/details/${movie.id}`);
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          FooterComponent={
            <div ref={intersectionRef} className="flex justify-center">
              {isFetchingNextPage ? (
                <LoaderCircle className="animate-spin" />
              ) : hasNextPage ? (
                "Load More"
              ) : (
                ""
              )}
            </div>
          }
        />
      )}
    </div>
  );
}
