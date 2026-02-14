"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DestinationGlobe() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <section ref={targetRef} className="relative h-screen overflow-hidden flex items-center justify-center bg-brand-dark">
            {/* Background - In real app, replace with <video> */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="w-full h-[120%] -mt-[10%] bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.p
                    style={{ opacity }}
                    className="text-brand-turquoise tracking-luxury text-sm md:text-xl uppercase mb-8"
                >
                    Global Access
                </motion.p>
                <motion.h2
                    style={{ opacity }}
                    className="font-serif text-5xl md:text-8xl text-white tracking-tight leading-loose mb-8"
                >
                    Limitless Destinations
                </motion.h2>
                <motion.div
                    style={{ opacity }}
                    className="p-8 max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl"
                >
                    <p className="text-white/80 font-light leading-relaxed text-lg">
                        From the azure waters of the Maldives to the frozen peaks of the Swiss Alps, our concierge service provides exclusive access to the world's most coveted sanctuaries.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
