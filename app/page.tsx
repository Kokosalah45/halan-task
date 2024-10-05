import { PopularMoviesList } from "@/lib/features/MoviesList/PopularMoviesList";

export default async function Home() {
  return (
    <section className="flex-1 flex flex-col">
      <PopularMoviesList />
    </section>
  );
}
