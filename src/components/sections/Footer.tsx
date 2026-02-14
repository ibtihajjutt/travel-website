import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-brand-dark border-t border-white/5 pt-20 pb-10 text-white relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1">
                        <Link href="/">
                            <h2 className="font-serif text-2xl tracking-widest text-white mb-6">TRAVEL CO.</h2>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            Curating the world's most exclusive journeys for the discerning traveler. Experience the extraordinary.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-white/50 hover:text-brand-turquoise transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-white/50 hover:text-brand-turquoise transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-white/50 hover:text-brand-turquoise transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-white/50 hover:text-brand-turquoise transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-6">Explore</h3>
                        <ul className="space-y-4 text-sm text-white/70">
                            <li><Link href="/destinations" className="hover:text-brand-turquoise transition-colors">Destinations</Link></li>
                            <li><Link href="/packages" className="hover:text-brand-turquoise transition-colors">Collections</Link></li>
                            <li><Link href="/about" className="hover:text-brand-turquoise transition-colors">Our Story</Link></li>
                            <li><Link href="#" className="hover:text-brand-turquoise transition-colors">Journal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-6">Legal</h3>
                        <ul className="space-y-4 text-sm text-white/70">
                            <li><Link href="#" className="hover:text-brand-turquoise transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-brand-turquoise transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-brand-turquoise transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-6">Newsletter</h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-4">
                            Subscribe to receive updates on new destinations and exclusive offers.
                        </p>
                        <form className="flex border-b border-white/20 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/30"
                            />
                            <button type="submit" className="text-xs tracking-widest uppercase hover:text-brand-turquoise transition-colors">Join</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
                    <p>&copy; {new Date().getFullYear()} Travel Co. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span>Designed for Luxury</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
