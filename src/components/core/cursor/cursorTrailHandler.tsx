"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateCursorPosition } from "@/redux/reducers/cursorReducer";

const CursorTrailHandler = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      dispatch(updateCursorPosition({ x: event.clientX, y: event.clientY }));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {  
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dispatch]);

  return null;
};

export default CursorTrailHandler;
