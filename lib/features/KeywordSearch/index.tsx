"use client";
import GridResponsiveList from "@/lib/core/components/GridResponsiveList";
import SearchBar from "@/lib/core/components/SearchBar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/lib/core/components/ui/dialog";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useDeferredValue, useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import KeywordCard from "./components/KeywordCard";
import SearchButton from "./components/SearchButton";
import getKeywords from "./data-layer/getKeywords";

// api endpoint https://api.themoviedb.org/3/search/keyword?page=1

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const defferedSeachTerm = useDeferredValue(searchTerm);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["movie-suggestions", defferedSeachTerm],
    queryFn: ({ pageParam = 1 }) => getKeywords(defferedSeachTerm, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      if (nextPage === 501) {
        return undefined;
      }
      return nextPage;
    },
    enabled: !!defferedSeachTerm,
  });

  const items = data ? data.pages.flatMap((d) => d.results) : [];

  const { isIntersecting, ref: intersectionRef } = useIntersectionObserver({
    threshold: 0.3,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isIntersecting]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SearchButton />
      </DialogTrigger>
      <DialogContent>
        <div className="h-[250px] flex flex-col">
          <div className="border-b-2">
            <SearchBar
              value={searchTerm}
              renderIcon={
                status === "pending" && searchTerm !== ""
                  ? () => (
                      <LoaderCircle
                        width={15}
                        height={15}
                        className="animate-spin"
                      />
                    )
                  : undefined
              }
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1 justify-center items-center flex ">
            {searchTerm === "" && <p>No Search</p>}
            {status === "success" && items.length === 0 && <p>No Results</p>}
            {status === "error" && <p>{error.message}</p>}
            {status === "success" && items.length !== 0 && (
              <GridResponsiveList
                prefferedColumnSize={300}
                listContainerStyle={{
                  height: "200px",
                  overflow: "auto",
                  width: "100%",
                }}
                items={items}
                renderItem={(item) => (
                  <KeywordCard
                    keyword={item}
                    onClick={(keyword) => {
                      console.log({ keyword });
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
