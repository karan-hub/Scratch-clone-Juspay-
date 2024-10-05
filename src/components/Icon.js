import React from "react";

export default function Icon({ name, size = 24, className = "", color = "currentColor" }) {
  return (
    <svg
      className={`text-${color} ${className}`}
      width={size.toString() + "px"}
      height={size.toString() + "px"}
      viewBox="0 0 24 24"
    >
      <use xlinkHref={`/icons/solid.svg#${name}`} />
    </svg>
  );
}
