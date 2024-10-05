import { END_POINTS } from "@/lib/core/constants/api";
import apiClient from "@/lib/core/data-layer/apiClient";
import { PopularMovie } from "@/lib/core/entities/PopularMovie";
import { PagintedReponse } from "@/lib/core/types";

export default async function getPopularMovies(pageParam = 1) {
  return await apiClient
    .get(END_POINTS.popularMovies(pageParam))
    .json<PagintedReponse<PopularMovie>>();
}
