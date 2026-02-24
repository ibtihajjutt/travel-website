import dynamic from 'next/dynamic';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

const HeroScroll = dynamic(() => import('@/components/canvas/HeroScroll'), { ssr: false });
const DestinationGlobe = dynamic(() => import('@/components/sections/DestinationGlobe'));
const Packages = dynamic(() => import('@/components/sections/Packages'));
const ContactForm = dynamic(() => import('@/components/sections/ContactForm'));

export default function Home() {
    return (
        <main className="bg-brand-dark min-h-screen text-white">
            <Navbar />
            <HeroScroll />
            <div className="relative z-10">
                <DestinationGlobe />
            </div>
            <Packages />
            <ContactForm />
            <Footer />
        </main>
    );
}
