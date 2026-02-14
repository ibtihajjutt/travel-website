import Navbar from '@/components/sections/Navbar';
import PackagesList from '@/components/sections/Packages';
import Footer from '@/components/sections/Footer';

export default function PackagesPage() {
    return (
        <main className="bg-brand-dark min-h-screen text-white">
            <Navbar />
            <section className="pt-40 pb-10 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">Curated Collections</h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Hand-picked itineries designed for the modern connoisseur.
                    </p>
                </div>
            </section>

            {/* Reusing the existing Packages component which has its own container/padding */}
            <PackagesList />

            <div className="pb-20"></div>
            <Footer />
        </main>
    );
}
