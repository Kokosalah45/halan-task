import { Button } from "@/lib/core/components/ui/button";
import { Link } from "lucide-react";

export default function ErrorComponent() {
  return (
    <div className="flex justify-center flex-col gap-2">
      <p className="text-red-600 font-semibold">An Error Has Occured</p>
      <Button asChild variant="destructive">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
