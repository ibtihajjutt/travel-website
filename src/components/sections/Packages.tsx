"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

const packages = [
    {
        id: 1,
        title: "Kyoto Zen Retreat",
        description: "Immerse yourself in the tranquility of ancient temples, private tea ceremonies, and meditation sessions with zen masters. Experience the subtle changes of the seasons in exclusively accessible gardens.",
        price: "$9,800",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop",
        color: "#2C3E50"
    },
    {
        id: 2,
        title: "Amalfi Coast Yacht",
        description: "Sail the Tyrrhenian Sea aboard a private yacht. Discover hidden coves, dine in Michelin-starred cliffside restaurants, and explore the pastel-hued villages of Positano and Ravello without the crowds.",
        price: "$14,500",
        image: "https://images.unsplash.com/photo-1633321088355-d0f81f5ac0a4?q=80&w=2940&auto=format&fit=crop",
        color: "#1E3A8A"
    },
    {
        id: 3,
        title: "Swiss Alps Chalet",
        description: "A ski-in, ski-out private chalet experience in Zermatt via helicopter transfer. Personal chef, guided off-piste skiing, and evenings spent by the fire overlooking the Matterhorn.",
        price: "$18,200",
        image: "https://images.unsplash.com/photo-1518182170546-0766be134ae5?q=80&w=2486&auto=format&fit=crop",
        color: "#374151"
    },
    {
        id: 4,
        title: "Serengeti Migration",
        description: "Witness the Great Migration from the privacy of a luxury mobile camp that moves with the herds. Hot air balloon safaris at sunrise and sundowners in the bush await.",
        price: "$11,900",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2938&auto=format&fit=crop",
        color: "#78350F"
    },
    {
        id: 5,
        title: "Raja Ampat Diving",
        description: "Dive into the world's most biodiverse marine habitats aboard a luxury phinisi schooner. Swim with manta rays, explore untouched coral reefs, and kayak through limestone karsts.",
        price: "$13,500",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2940&auto=format&fit=crop",
        color: "#064E3B"
    },
    {
        id: 6,
        title: "Icelandic Aurora",
        description: "Hunt for the Northern Lights from a glass-roofed lodge. Explore ice caves, walk on black sand beaches, and relax in private geothermal lagoons surrounded by snow.",
        price: "$10,200",
        image: "https://images.unsplash.com/photo-1521320226546-87b106956014?q=80&w=2940&auto=format&fit=crop",
        color: "#312E81"
    },
    {
        id: 7,
        title: "Patagonian Trek",
        description: "Traverse the wild landscapes of Torres del Paine with expert guides. Stay in luxury eco-domes, spot pumas, and hike to the base of iconic granite towers.",
        price: "$9,500",
        image: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=2874&auto=format&fit=crop",
        color: "#1F2937"
    }
];

export default function Packages() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={containerRef} className="bg-brand-dark relative h-[500vh]"> {/* Tall container for scroll space */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                    {packages.map((pkg, i) => {
                        // Calculate range for each card
                        const targetScale = 1 - ((packages.length - i) * 0.05);
                        const rangeStart = i * 0.1;
                        const rangeEnd = 1;

                        return (
                            <Card
                                key={pkg.id}
                                i={i}
                                {...pkg}
                                range={[rangeStart, rangeEnd]}
                                progress={scrollYProgress}
                                targetScale={targetScale}
                                total={packages.length}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

interface CardProps {
    i: number;
    title: string;
    description: string;
    price: string;
    image: string;
    color: string;
    range: [number, number];
    progress: MotionValue<number>;
    targetScale: number;
    total: number;
}

function Card({ i, title, description, price, image, color, range, progress, targetScale, total }: CardProps) {
    // Transform scroll progress to card animation
    // Card enters from right (100vw) to center (0)
    // Then stays centered but scales down

    // The card should enter when progress reaches `range[0]`
    // It should be fully visible quickly (e.g. range[0] + 0.05)

    const entryStart = range[0] - 0.05; // Slightly before
    const entryEnd = range[0] + 0.05;  // Entry duration

    const x = useTransform(progress, [entryStart, entryEnd], ['100vw', '0vw']);

    // Scale down as subsequent cards enter
    const scale = useTransform(progress, [range[0], 1], [1, targetScale]);

    // Opacity fade slightly for depth
    const opacity = useTransform(progress, [range[0], 1], [1, i === total - 1 ? 1 : 0.6]);

    return (
        <motion.div
            style={{
                x,
                scale,
                opacity,
                zIndex: i,
                top: `calc(10vh + ${i * 15}px)` // Adjusted top offset
            }}
            className="absolute top-0 w-[95vw] md:w-[80vw] max-w-[1100px] h-[65vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl origin-top"
        >
            <div className="relative w-full h-full flex flex-col md:flex-row bg-[#1a1a1a] border border-white/10">
                {/* Image Section - Takes more space on mobile to look better */}
                <div className="w-full md:w-3/5 h-[40%] md:h-full relative overflow-hidden">
                    <Image src={image} alt={title} fill sizes="(max-width: 768px) 95vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Content Section - Scrollable if content is too long */}
                <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-between h-[60%] md:h-full overflow-y-auto scrollbar-hide" style={{ backgroundColor: color }}>
                    <div>
                        <span className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2 md:mb-4 block">Exclusive Package 0{i + 1}</span>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white mb-4 md:mb-6 uppercase leading-tight">{title}</h2>
                        <p className="text-white/80 text-xs md:text-sm lg:text-base leading-relaxed font-light mb-6 md:mb-8 line-clamp-4 md:line-clamp-none">{description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/20 pt-6 md:pt-8 mt-auto">
                        <div>
                            <span className="block text-white/50 text-[10px] md:text-xs uppercase tracking-widest mb-1">Starting from</span>
                            <span className="text-xl md:text-3xl font-serif text-white">{price}</span>
                        </div>
                        <button className="px-4 py-2 md:px-6 md:py-3 bg-white text-brand-dark text-[10px] md:text-xs uppercase tracking-widest hover:bg-brand-turquoise hover:text-white transition-colors duration-300 whitespace-nowrap">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
