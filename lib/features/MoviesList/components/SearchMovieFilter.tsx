"use client";

import { Checkbox } from "@/lib/core/components/ui/checkbox";
import { Input } from "@/lib/core/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";

export default function SearchMovieFilter() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useRef(new URLSearchParams(searchParams.toString()));

  const [searchTerm, setSearchTerm] = useState(
    params.current.get("query") || "",
  );
  const defferedSeachTerm = useDeferredValue(searchTerm);

  const createQueryString = useCallback(() => {
    return params.current.toString();
  }, []);

  const deleteParam = useCallback((name: string) => {
    params.current.delete(name);
  }, []);

  const addParam = useCallback((name: string, value: string) => {
    params.current.set(name, value);
  }, []);

  useEffect(() => {
    if (!defferedSeachTerm) {
      deleteParam("query");
      router.push(`${pathName}?${createQueryString()}`);
      return;
    }
    addParam("query", defferedSeachTerm);
    router.push(`${pathName}?${createQueryString()}`);
  }, [
    addParam,
    createQueryString,
    defferedSeachTerm,
    deleteParam,
    pathName,
    router,
  ]);

  return (
    <div className="flex  flex-col layout space-y-2 ">
      <h2 className="text-center capitalize text-lg font-bold">filters</h2>
      <div className="flex justify-center">
        <Input
          className="p-1 h-auto"
          id="query"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-around flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="include-adult"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Include Adult
          </label>
          <Checkbox
            checked={params.current.has("include_adult")}
            onCheckedChange={(checked) => {
              if (!checked) {
                deleteParam("include_adult");
                router.push(`${pathName}?${createQueryString()}`);
                return;
              }
              addParam("include_adult", "true");
              router.push(`${pathName}?${createQueryString()}`);
            }}
            id="include-adult"
          />
        </div>

        <div className="flex  items-center space-x-2">
          <label
            htmlFor="primary-release-year"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            primary release year
          </label>
          <Input
            type="number"
            className="w-auto p-1 h-auto"
            id="primary-release-year"
            value={params.current.get("primary_release_year") || ""}
            onChange={(e) => {
              if (!e.target.value) {
                deleteParam("primary_release_year");
                router.push(`${pathName}?${createQueryString()}`);
                return;
              }
              addParam("primary_release_year", e.target.value);
              router.push(`${pathName}?${createQueryString()}`);
            }}
          />
        </div>
        <div className="flex  items-center space-x-2">
          <label
            htmlFor="region"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            region
          </label>
          <Input
            className="w-auto p-1 h-auto"
            id="region"
            value={params.current.get("region") || ""}
            onChange={(e) => {
              if (!e.target.value) {
                deleteParam("region");
                router.push(`${pathName}?${createQueryString()}`);
                return;
              }
              addParam("region", e.target.value);
              router.push(`${pathName}?${createQueryString()}`);
            }}
          />
        </div>
        <div className="flex  items-center space-x-2">
          <label
            htmlFor="year"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            year
          </label>
          <Input
            type="number"
            className="w-auto p-1 h-auto"
            id="year"
            value={params.current.get("year") || ""}
            onChange={(e) => {
              if (!e.target.value) {
                deleteParam("year");
                router.push(`${pathName}?${createQueryString()}`);
                return;
              }
              addParam("year", e.target.value);
              router.push(`${pathName}?${createQueryString()}`);
            }}
          />
        </div>
        <div className="flex  items-center space-x-2">
          <label
            htmlFor="language"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            language
          </label>
          <Input
            className="w-auto p-1 h-auto"
            id="language"
            value={params.current.get("language") || ""}
            onChange={(e) => {
              if (!e.target.value) {
                deleteParam("language");
                router.push(`${pathName}?${createQueryString()}`);
                return;
              }
              addParam("language", e.target.value);
              router.push(`${pathName}?${createQueryString()}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
