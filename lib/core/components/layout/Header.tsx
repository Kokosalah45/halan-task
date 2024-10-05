import React from "react";

type HeaderLayoutProps = {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  centerContent?: React.ReactNode;
};

const DefaulStartContent = () => <div />;
const DefaultEndContent = () => <div />;
const DefaultCenterContent = () => <div />;

// consider using grid to remove Default components -- probably want be needed as making a sublist reponsive will use the inner element not the outer layout one
export default function HeaderLayout({
  startContent = <DefaulStartContent />,
  centerContent = <DefaultCenterContent />,
  endContent = <DefaultEndContent />,
}: HeaderLayoutProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/60">
      <div className="flex justify-between items-center layout ">
        {startContent}
        {centerContent}
        {endContent}
      </div>
    </header>
  );
}
