import { PropsWithChildren } from "react";
import { Card } from "./ui/card";

export default function BaseCard({ children }: PropsWithChildren) {
  return (
    <Card className="w-full border-none max-w-sm mx-auto overflow-hidden rounded-md  transition-transform duration-300 ease-in-out hover:scale-105 relative shadow-sm">
      {children}
    </Card>
  );
}
