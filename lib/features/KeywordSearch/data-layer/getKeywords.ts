import { END_POINTS } from "@/lib/core/constants/api";
import apiClient from "@/lib/core/data-layer/apiClient";
import { Keyword } from "@/lib/core/entities/Keyword";
import { PagintedReponse } from "@/lib/core/types";
export default async function getKeywords(
  searchTerm: string,
  pageParam: number,
) {
  return await apiClient
    .get(END_POINTS.keywordSearch(searchTerm, pageParam))
    .json<PagintedReponse<Keyword>>();
}
