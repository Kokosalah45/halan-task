import * as React from "react";

interface NetfluxLogoProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  textColor?: string;
}

export default function NetfluxLogo({
  width = 300,
  height = 80,
  textColor = "#E50914",
  ...props
}: NetfluxLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 80"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="10"
        y="65"
        fontFamily="Arial, sans-serif"
        fontSize="60"
        fontWeight="bold"
        fill={textColor}
      >
        NETFLUX
      </text>
      <path d="M10 65 Q 15 75, 25 65" fill={textColor} />
    </svg>
  );
}
