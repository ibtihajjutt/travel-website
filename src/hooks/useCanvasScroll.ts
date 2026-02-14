import { useScroll, useTransform, useSpring } from 'framer-motion';
import { RefObject } from 'react';

export const useCanvasScroll = (targetRef: RefObject<HTMLElement>, frameCount: number) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });
  
  // Smooth out the scroll input
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map 0-1 progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);
  
  return frameIndex;
};
