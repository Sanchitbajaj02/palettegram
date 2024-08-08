"use client";
import { useEffect, useState } from "react"

const ProgressBar = () => {
    const [progressWidth, setProgressWidth] = useState(0)

    useEffect(() => {
        const handleScroll = ()=>{
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            const scrollY = window.scrollY;

            const scrollPercentage = Math.floor((scrollY / (docHeight - windowHeight)) * 100);
            setProgressWidth(scrollPercentage);
        }

      window.addEventListener("scroll", handleScroll);

      return ()=>{
        window.removeEventListener("scroll", handleScroll);
      }
    }, [progressWidth])
    

  return (
    <div className="progress-container h-2 w-full bg-transparent fixed top-0 z-10 backdrop-blur-sm">
        <div className={`progress-fill bg-[rgb(240,46,101)] h-full`} style={{width : `${progressWidth}%`}}></div>
    </div>
  )
}

export default ProgressBar