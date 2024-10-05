import { PropsWithChildren } from "react";

interface ClickableProps {
  onClick: () => void;
}
export default function Clickable({
  children,
  onClick,
}: PropsWithChildren<ClickableProps>) {
  return (
    <div role="button" onClick={() => onClick()}>
      {children}
    </div>
  );
}
