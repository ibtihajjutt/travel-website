"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Packages', href: '/packages' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [menuOpen]);

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden && !menuOpen ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300",
                    scrolled || menuOpen ? "bg-brand-dark/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
                )}
            >
                <div onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-4 cursor-pointer z-50 group">
                    {menuOpen ? (
                        <X className="w-6 h-6 text-white group-hover:text-brand-turquoise transition-colors" />
                    ) : (
                        <Menu className="w-6 h-6 text-white group-hover:text-brand-turquoise transition-colors" />
                    )}
                    <span className="text-white text-xs tracking-widest uppercase hidden md:block font-light">
                        {menuOpen ? 'Close' : 'Menu'}
                    </span>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                    <Link href="/">
                        <h1 className="font-serif text-2xl text-white tracking-widest cursor-pointer hover:text-brand-turquoise transition-colors">TRAVEL CO.</h1>
                    </Link>
                </div>

                <div className="flex items-center gap-6 z-50">
                    <Search className="w-5 h-5 text-white cursor-pointer hover:text-brand-turquoise transition-colors" />
                    <Link href="/contact" className="hidden md:block">
                        <button className="px-6 py-2 border border-white/20 text-white text-xs tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300">
                            BOOK ENTRY
                        </button>
                    </Link>
                    <div className="relative">
                        <ShoppingBag className="w-5 h-5 text-white cursor-pointer hover:text-brand-turquoise transition-colors" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-brand-turquoise text-[8px] text-brand-dark font-bold">0</span>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-brand-dark flex flex-col items-center justify-center pt-24"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                        className={cn(
                                            "text-4xl md:text-6xl font-serif tracking-widest hover:text-brand-turquoise transition-colors cursor-pointer block",
                                            pathname === link.href ? "text-brand-turquoise" : "text-white"
                                        )}
                                    >
                                        {link.name}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-16 flex gap-8 text-white/50 text-sm tracking-widest"
                        >
                            <span>INSTAGRAM</span>
                            <span>TWITTER</span>
                            <span>LINKEDIN</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
