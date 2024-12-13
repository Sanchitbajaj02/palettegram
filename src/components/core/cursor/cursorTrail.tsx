"use client";

import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { RootState } from "@/redux/store";

const CursorTrail = () => {
  const trailPositions = useSelector((state: RootState) => state.cursor.trailPositions);
  const restPosition = useSelector((state: RootState) => state.cursor.position); // Last cursor position
  const trailRef = useRef<HTMLDivElement[]>([]); // Refs for trail elements
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animateTrail = () => {
      if (trailRef.current) {
        trailRef.current.forEach((el, index) => {
          if (el) {
            // Current element position
            const currentX = parseFloat(el.style.left || "0");
            const currentY = parseFloat(el.style.top || "0");

            // Target position: Interpolate toward trail position or rest position
            const targetX = index < trailPositions.length ? trailPositions[index].x : restPosition.x;
            const targetY = index < trailPositions.length ? trailPositions[index].y : restPosition.y;

            // Smoothly move toward the target position
            const newX = lerp(currentX, targetX, 0.2); // Adjust 0.2 for faster catch-up
            const newY = lerp(currentY, targetY, 0.2);

            // Update element position
            el.style.left = `${newX}px`;
            el.style.top = `${newY}px`;
          }
        });
      }

      animationFrameRef.current = requestAnimationFrame(animateTrail);
    };

    animationFrameRef.current = requestAnimationFrame(animateTrail);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [trailPositions, restPosition]);

  return (
    <>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) trailRef.current[index] = el;
            }}
            style={{
              position: "fixed",
              left: `0px`, // Initial position
              top: `0px`,
              width: `${15 - index}px`, // Increase size here
              height: `${15 - index}px`, // Increase size here
              backgroundColor: `rgba(255, 0, 0, ${0.5 - index * 0.05})`, // Fade with index
              borderRadius: "50%",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
    </>
  );
};

export default CursorTrail;
