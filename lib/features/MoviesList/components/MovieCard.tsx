import BaseCard from "@/lib/core/components/BaseCard";
import Clickable from "@/lib/core/components/Clickable";
import StarRating from "@/lib/core/components/StarRating";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/core/components/ui/card";
import { BaseMovie } from "@/lib/core/entities/BaseMovie";
import { formateDate } from "@/lib/core/utils";
import Image from "next/image";

type MovieCardProps = {
  movie: BaseMovie;
  onClick: (movie: BaseMovie) => void;
};
const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <Clickable onClick={() => onClick(movie)}>
      <BaseCard>
        <figure className="relative aspect-square">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : "https://via.placeholder.com/500x750"
            }
            alt={`${movie.title} banner`}
            layout="fill"
          />
        </figure>
        <div className="p-2 absolute inset-0 bg-black/50 flex flex-col justify-end">
          <CardHeader>
            <CardTitle className="text-lg text-white font-bold line-clamp-1">
              {movie.title}
            </CardTitle>
            <span className="text-xs text-white">
              {formateDate(movie.release_date)}
            </span>
            <StarRating rating={Math.round(movie.vote_average / 2)} />
          </CardHeader>
          <CardContent>
            <p className="text-[0.5rem] text-muted line-clamp-2 leading-relaxed">
              {movie.overview}
            </p>
          </CardContent>
        </div>
      </BaseCard>
    </Clickable>
  );
};

export default MovieCard;
