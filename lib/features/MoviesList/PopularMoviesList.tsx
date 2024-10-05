"use client";
import GridResponsiveList from "@/lib/core/components/GridResponsiveList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import EmptyResultsComponent from "./components/EmptyResultsComponent";
import ErrorComponent from "./components/ErrorComponent";
import MovieCard from "./components/MovieCard";
import getPopularMovies from "./data-layer.ts/getPopularMovies";

export function PopularMoviesList() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["popular-movies"],
    queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
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
    <div className="flex-1">
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
