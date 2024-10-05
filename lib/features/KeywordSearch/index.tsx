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
import { usePathname, useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import KeywordCard from "./components/KeywordCard";
import SearchButton from "./components/SearchButton";
import getKeywords from "./data-layer/getKeywords";

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const defferedSeachTerm = useDeferredValue(searchTerm);
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const onChooseKeyword = (keyword: string) => {
    const isSearchPath = pathname.includes("/movie/search");
    const pathName = isSearchPath ? pathname : "/movie/search";
    router.push(`${pathName}?query=${keyword}`);
    setOpen(false);
    setSearchTerm("");
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isSuccess,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["movie-suggestions", defferedSeachTerm],
    queryFn: ({ pageParam }) => getKeywords(defferedSeachTerm, pageParam),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const hasNextPage = lastPage.results.length > 0;
      if (hasNextPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!defferedSeachTerm,
  });

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SearchButton />
      </DialogTrigger>
      <DialogContent>
        <div className="h-[250px] flex flex-col">
          <div className="border-b-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onChooseKeyword(searchTerm);
              }}
            >
              <SearchBar
                value={searchTerm}
                renderIcon={
                  isPending && searchTerm !== ""
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
            </form>
          </div>
          <div className="flex-1 justify-center items-center flex ">
            {searchTerm === "" && <p>No Search</p>}
            {isSuccess && items.length === 0 && <p>No Results</p>}
            {isError && <p>{error.message}</p>}
            {isSuccess && items.length !== 0 && (
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
                      onChooseKeyword(keyword.name);
                    }}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                FooterComponent={
                  <div ref={intersectionRef} className="flex justify-center">
                    {isFetchingNextPage ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      hasNextPage && "Load More"
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
