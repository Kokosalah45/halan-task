export const END_POINTS = {
  keywordSearch: (searchTerm: string, page: number) =>
    `search/keyword?page=${page}&query=${searchTerm}`,
  popularMovies: (page: number) => `movie/popular?page=${page}`,
  movieDetails: (id: string) => `movie/${id}`,
};
