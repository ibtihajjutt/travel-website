"use client";
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useCanvasScroll } from '@/hooks/useCanvasScroll';

const TOTAL_FRAMES = 278;
const BATCH_SIZE = 20;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

function getFramePath(index: number): string {
    const frameNumber = (index + 1).toString().padStart(3, '0');
    return `${BASE_PATH}/sequence-1/ezgif-frame-${frameNumber}.jpg`;
}

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
    const [firstFrameReady, setFirstFrameReady] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [allLoaded, setAllLoaded] = useState(false);
    const isVisibleRef = useRef(true);
    const rafRef = useRef<number>(0);

    // Load images progressively in batches
    useEffect(() => {
        let cancelled = false;

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve) => {
                if (imagesRef.current[index]) {
                    resolve();
                    return;
                }
                const img = new Image();
                img.src = getFramePath(index);
                img.onload = () => {
                    if (!cancelled) {
                        imagesRef.current[index] = img;
                    }
                    resolve();
                };
                img.onerror = () => resolve(); // Skip failed frames
            });
        };

        const loadProgressively = async () => {
            // 1. Load first frame immediately for instant render
            await loadImage(0);
            if (cancelled) return;
            setFirstFrameReady(true);
            setLoadProgress(1);

            // 2. Load remaining frames in batches
            let loaded = 1;
            for (let batchStart = 1; batchStart < TOTAL_FRAMES; batchStart += BATCH_SIZE) {
                if (cancelled) return;
                const batchEnd = Math.min(batchStart + BATCH_SIZE, TOTAL_FRAMES);
                const batch: Promise<void>[] = [];
                for (let i = batchStart; i < batchEnd; i++) {
                    batch.push(loadImage(i));
                }
                await Promise.all(batch);
                loaded += batch.length;
                if (!cancelled) {
                    setLoadProgress(loaded);
                }
            }

            if (!cancelled) {
                setAllLoaded(true);
            }
        };

        loadProgressively();

        return () => {
            cancelled = true;
        };
    }, []);

    // IntersectionObserver to pause rAF when off-screen
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Pass container ref to hook
    const frameIndex = useCanvasScroll(containerRef, TOTAL_FRAMES);

    // Render loop — only runs when visible
    const renderFrame = useCallback(() => {
        if (!isVisibleRef.current) {
            rafRef.current = requestAnimationFrame(renderFrame);
            return;
        }

        const context = canvasRef.current?.getContext("2d");
        const canvas = canvasRef.current;
        if (!context || !canvas) {
            rafRef.current = requestAnimationFrame(renderFrame);
            return;
        }

        const currentFrame = Math.round(frameIndex.get());
        const index = Math.min(Math.max(currentFrame, 0), TOTAL_FRAMES - 1);
        const img = imagesRef.current[index];

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
        rafRef.current = requestAnimationFrame(renderFrame);
    }, [frameIndex]);

    useEffect(() => {
        if (!firstFrameReady) return;
        rafRef.current = requestAnimationFrame(renderFrame);
        return () => cancelAnimationFrame(rafRef.current);
    }, [firstFrameReady, renderFrame]);

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

    const progressPercent = Math.round((loadProgress / TOTAL_FRAMES) * 100);

    return (
        <div ref={containerRef} className="h-[800vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-dark">
                {!firstFrameReady && (
                    <div className="absolute inset-0 flex items-center justify-center text-white z-50 bg-brand-dark">
                        <div className="text-2xl font-serif tracking-widest animate-pulse text-brand-gold">LOADING EXPERIENCE...</div>
                    </div>
                )}

                {firstFrameReady && !allLoaded && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-brand-turquoise/60 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <span className="text-white/30 text-xs tracking-widest">{progressPercent}%</span>
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
