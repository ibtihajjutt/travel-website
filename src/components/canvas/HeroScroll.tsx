"use client";
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCanvasScroll } from '@/hooks/useCanvasScroll';

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const totalFrames = 278; // Total frames in sequence-1

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const imgs: HTMLImageElement[] = [];
            const loadedImages = new Array(totalFrames);
            let loadedCount = 0;

            for (let i = 0; i < totalFrames; i++) {
                const img = new Image();
                const frameNumber = (i + 1).toString().padStart(3, '0');
                img.src = `/sequence-1/ezgif-frame-${frameNumber}.jpg`;
                img.onload = () => {
                    loadedCount++;
                    loadedImages[i] = img;
                    if (loadedCount === totalFrames) {
                        setImages(loadedImages);
                        setLoaded(true);
                    }
                };
            }
        };
        loadImages();
    }, []);

    // Pass container ref to hook
    const frameIndex = useCanvasScroll(containerRef, totalFrames);

    // Render loop
    useEffect(() => {
        if (!loaded || images.length === 0) return;

        let animationId: number;
        const render = () => {
            const context = canvasRef.current?.getContext("2d");
            const canvas = canvasRef.current;

            if (!context || !canvas) return;

            const currentFrame = Math.round(frameIndex.get());
            const index = Math.min(Math.max(currentFrame, 0), totalFrames - 1);
            const img = images[index];

            if (img) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;
                context.drawImage(img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }
            animationId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationId);
    }, [loaded, images, frameIndex]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        // Increased height to 800vh for longer scroll duration
        <div ref={containerRef} className="h-[800vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-dark">
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white z-50 bg-brand-dark">
                        <div className="text-2xl font-serif tracking-widest animate-pulse text-brand-gold">LOADING EXPERIENCE...</div>
                    </div>
                )}
                <canvas ref={canvasRef} className="w-full h-full object-cover block" />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <div className="text-center p-4">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="font-serif text-5xl md:text-8xl text-white tracking-luxury mb-6 drop-shadow-2xl"
                        >
                            PARADISE AWAITS
                        </motion.h1>
                        <motion.button
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mt-8 px-12 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-500 pointer-events-auto"
                        >
                            DISCOVER
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
