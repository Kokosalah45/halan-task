import { buildUrlSearchParams } from "../utils";

export type MovieSearchFilters = {
  include_adult?: boolean;
  region?: string;
  year?: number;
  primary_release_year?: number;
};

export const END_POINTS = {
  keywordSearch: (searchTerm: string, page: number) =>
    `search/keyword?page=${page}&query=${searchTerm}`,
  popularMovies: (page: number) => `movie/popular?page=${page}`,
  movieDetails: (id: string) => `movie/${id}`,
  searchMovies: (
    searchTerm: string,
    page: number,
    filters: MovieSearchFilters = {},
  ) => {
    const mergedFilters = {
      query: searchTerm,
      page,
      ...filters,
    };
    const queryParams = buildUrlSearchParams(mergedFilters);

    return `search/movie?${queryParams}`;
  },
} as const;
