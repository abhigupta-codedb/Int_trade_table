import React from "react";
import { useState } from "react";

const SingleCircle = ({
  value,
  size = 21,
  filledColor = "#3498db",
  emptyColor = "white",
}) => {
  const [hovered, setHovered] = useState(false);

  const renderCircles = () => {
    // Render the partially filled circle.
    const grad_id = `gradientFill-${value}`;
    const gradFill = `url(#${grad_id})`;

    return (
      <svg
        height={25}
        width={25}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <defs>
          <linearGradient id={grad_id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color={filledColor} />
            <stop
              offset={value + "%"}
              stop-color={filledColor}
              stop-opacity="1"
            />
            <stop
              offset={value + "%"}
              stop-color={emptyColor}
              stop-opacity="1"
            />
            <stop offset="100%" stop-color={emptyColor} stop-opacity="1" />
          </linearGradient>
        </defs>
        <circle
          key={grad_id}
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill={gradFill}
          stroke="lightgray"
        />
      </svg>
    );
  };

  return (
    <div>
      {renderCircles()}
      {hovered && <div className="custom-tooltip">Value: {value}</div>}
    </div>
  );
};

export default SingleCircle;
