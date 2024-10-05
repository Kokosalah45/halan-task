import { END_POINTS, MovieSearchFilters } from "@/lib/core/constants/api";
import apiClient from "@/lib/core/data-layer/apiClient";
import { BaseMovie } from "@/lib/core/entities/BaseMovie";
import { PagintedReponse } from "@/lib/core/types";

export default async function getSearchedMovies(
  searchTerm: string,
  pageParam = 1,
  filters: MovieSearchFilters = {},
) {
  return await apiClient
    .get(END_POINTS.searchMovies(searchTerm, pageParam, filters))
    .json<PagintedReponse<BaseMovie>>();
}
