import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
};
export default function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
