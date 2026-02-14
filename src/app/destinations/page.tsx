import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';

const destinations = [
    {
        id: 1,
        name: 'Santorini, Greece',
        region: 'Europe',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2938&auto=format&fit=crop',
        description: 'Whitewashed buildings clinging to cliffs above an underwater caldera.'
    },
    {
        id: 2,
        name: 'Kyoto, Japan',
        region: 'Asia',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop',
        description: 'Atmospheric temples, sublime gardens, and traditional teahouses.'
    },
    {
        id: 3,
        name: 'Raja Ampat, Indonesia',
        region: 'Asia',
        image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2940&auto=format&fit=crop',
        description: 'The last paradise on earth, teeming with marine biodiversity.'
    },
    {
        id: 4,
        name: 'Patagonia, Chile',
        region: 'South America',
        image: 'https://images.unsplash.com/photo-1518182170546-0766be134ae5?q=80&w=2486&auto=format&fit=crop',
        description: 'Dramatic mountain peaks, glaciers, and untouched wilderness.'
    },
    {
        id: 5,
        name: 'Amalfi Coast, Italy',
        region: 'Europe',
        image: 'https://images.unsplash.com/photo-1633321088355-d0f81f5ac0a4?q=80&w=2940&auto=format&fit=crop',
        description: 'Vertical towns, lemon groves, and the sparkling Tyrrhenian Sea.'
    },
    {
        id: 6,
        name: 'Serengeti, Tanzania',
        region: 'Africa',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2938&auto=format&fit=crop',
        description: 'Witness the Great Migration on the endless plains of Africa.'
    },
];

export default function Destinations() {
    return (
        <main className="bg-brand-dark min-h-screen text-white">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">Destinations</h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        From the remote corners of the Arctic to the tropical havens of the Pacific, discover our curated selection of the world's most extraordinary places.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="pb-32 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((dest) => (
                            <div
                                key={dest.id}
                                className="group relative h-[500px] overflow-hidden rounded-lg cursor-pointer"
                            >
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-brand-turquoise text-xs tracking-widest uppercase mb-2 block">{dest.region}</span>
                                    <h3 className="text-3xl font-serif mb-3">{dest.name}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {dest.description}
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        <span>Discover</span>
                                        <span className="text-brand-turquoise">&rarr;</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
