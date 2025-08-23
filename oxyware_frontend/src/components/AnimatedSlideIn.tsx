"use client";

import { motion, useAnimation, Transition } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { easeOut } from "framer-motion";

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
}

export default function SlideIn({ children, delay = 0 }: SlideInProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const transition: Transition = {
    duration: 0.8, 
    delay,
    ease: easeOut,
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: -60, 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
