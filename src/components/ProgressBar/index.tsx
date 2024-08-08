"use client"
import { motion, useScroll, useSpring } from "framer-motion";

const ProgressBar = ({start}: {start: string}) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-2 bg-primary ${start} z-[51]`}
      style={{ scaleX }}
    />
  )
}

export default ProgressBar