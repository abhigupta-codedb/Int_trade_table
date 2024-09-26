import React, { useState } from "react";

const CircleRating = ({
  value,
  totalCircles = 10,
  size = 21,
  filledColor = "#3498db",
  emptyColor = "transparent",
}) => {
  // Calculate full circles and percentage fill for the last circle
  const fullCircles = Math.floor(value);
  const lastCircleFill = value - fullCircles; // Fractional part for the partially filled circle
  const [hovered, setHovered] = useState(false);

  const renderCircles = () => {
    let circles = [];
    let i = 0;

    // Render fully filled circles
    for (i = 0; i < fullCircles; i++) {
      circles.push(
        <circle
          key={i}
          cx={i >= 5 ? (size + 5) * (i - 4) : (size + 5) * (i + 1)}
          cy={i >= 5 ? size / 2 + size + 5 : size / 2}
          r={size / 2}
          fill={filledColor}
        />
      );
    }

    // Render the partially filled circle if needed
    if (lastCircleFill > 0 && fullCircles < totalCircles) {
      const grad_id = `gradientFill-${lastCircleFill}`;
      const gradFill = `url(#${grad_id})`;
      circles.push(
        <svg>
          <defs>
            <linearGradient id={grad_id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color={filledColor} />
              <stop
                offset={lastCircleFill}
                stop-color={filledColor}
                stop-opacity="1"
              />
              <stop
                offset={lastCircleFill}
                stop-color={emptyColor}
                stop-opacity="1"
              />
              <stop offset="100%" stop-color={emptyColor} stop-opacity="1" />
            </linearGradient>
          </defs>
          <circle
            key={fullCircles}
            cx={i >= 5 ? (size + 5) * (i - 4) : (size + 5) * (i + 1)}
            cy={i + 1 > 5 ? size / 2 + size + 5 : size / 2}
            r={size / 2}
            fill={gradFill}
            stroke="lightgray"
          />
        </svg>
      );
    }

    // Render the remaining empty circles
    for (
      let i = lastCircleFill === 0 ? fullCircles : fullCircles + 1;
      i < totalCircles;
      i++
    ) {
      circles.push(
        <circle
          key={i}
          cx={i >= 5 ? (size + 5) * (i - 4) : (size + 5) * (i + 1)}
          cy={i >= 5 ? size / 2 + size + 5 : size / 2}
          r={size / 2}
          fill={emptyColor}
          stroke="lightgray"
        />
      );
    }

    return circles;
  };

  return (
    <div>
      <svg
        height="50"
        width={size * 10}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {renderCircles()}
      </svg>
      {hovered && (
        <div className="custom-tooltip">Value: {Math.round(value * 10)}</div>
      )}
      <Tooltip place="top" type="dark" effect="float" />
    </div>
  );
};

export default CircleRating;
