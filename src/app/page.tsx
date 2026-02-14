import HeroScroll from '@/components/canvas/HeroScroll';
import Navbar from '@/components/sections/Navbar';
import DestinationGlobe from '@/components/sections/DestinationGlobe';
import ContactForm from '@/components/sections/ContactForm';
import Packages from '@/components/sections/Packages';
import Footer from '@/components/sections/Footer';

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
