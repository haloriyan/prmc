import React, { useEffect, useState } from "react";

const BeatingCircle = ({size = 40, color = "bg-green-400", pos = {x: 4, y: 10}, scaleTo = 1.5, duration = 2000}) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
      const pulseInterval = setInterval(() => {
          setScale(scale === 1 ? scaleTo : 1);
      }, duration);

      return () => clearInterval(pulseInterval);
  }, [scale]);

  return (
      <div className={`absolute rounded-full ${color}`} style={{
          transform: `scale(${scale})`,
          transitionDuration: `${duration}ms`,
          left: pos.x,
          top: pos.y,
          width: size,
          height: size,
      }}></div>
  )
}

export default BeatingCircle