import { useEffect, useState } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export const useScrollAnimations = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return {
    scrollY,
    scrollYProgress,
    scrollProgress,
  };
};

export const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

export const useScrollOpacity = (value: MotionValue<number>) => {
  return useTransform(value, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
};

export const useScrollScale = (value: MotionValue<number>) => {
  return useTransform(value, [0, 0.5, 1], [0.8, 1, 1.2]);
};
