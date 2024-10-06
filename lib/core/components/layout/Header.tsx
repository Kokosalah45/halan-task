import React from "react";

type HeaderLayoutProps = {
  startContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

// consider using grid to remove Default components -- probably want be needed as making a sublist reponsive will use the inner element not the outer layout one
export default function HeaderLayout({
  startContent,
  centerContent,
  endContent,
}: HeaderLayoutProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/60">
      <div className="grid grid-cols-3 justify-between items-center layout ">
        <div
          className="
            col-start-1
            col-span-1
            justify-self-start
          "
        >
          {startContent}
        </div>
        <div
          className="
            col-start-2
            col-span-1
            justify-self-center
          "
        >
          {centerContent}
        </div>
        <div
          className="
            col-start-3
            col-span-1
            justify-self-end
          "
        >
          {endContent}
        </div>
      </div>
    </header>
  );
}
