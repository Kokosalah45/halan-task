import StarRating from "@/lib/core/components/StarRating";
import { END_POINTS } from "@/lib/core/constants/api";
import apiClient from "@/lib/core/data-layer/apiClient";
import { DetailedMovie } from "@/lib/core/entities/DetailedMovie";
import { formatCurrency, formateDate } from "@/lib/core/utils";
import { Calendar, Clock, DollarSign, Globe } from "lucide-react";
import Image from "next/image";
type PageProps = {
  params: { id: string };
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default async function MovieDetailsPage({ params }: PageProps) {
  const movie = await apiClient
    .get(END_POINTS.movieDetails(params.id))
    .json<DetailedMovie>();

  return (
    <section className="layout">
      <div className=" bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          />
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start sm:space-x-6">
            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
              <div className="relative w-full h-[336px] sm:w-56 sm:h-[336px]">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="sm:flex-1">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                {movie.title}
              </h1>
              <p className="mt-2 text-xl text-gray-500">{movie.tagline}</p>
              <div className="mt-4 flex items-center">
                <StarRating rating={Math.round(movie.vote_average / 2)} />
                <span className="ml-2 text-gray-600">
                  {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-gray-500">{movie.overview}</p>
              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-2" />
                  {movie.runtime} minutes
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-2" />
                  {formateDate(movie.release_date)}
                </div>
                <div className="flex items-center text-gray-700">
                  <Globe className="h-5 w-5 mr-2" />
                  {movie.production_countries
                    .map((country) => country.name)
                    .join(", ")}
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Budget: {formatCurrency(movie.budget)}
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">Genres</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.name}
                      className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Production Companies
                </h2>
                <ul className="mt-2 text-gray-500">
                  {movie.production_companies.map((company) => (
                    <li key={company.name}>{company.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
