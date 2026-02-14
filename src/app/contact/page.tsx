import Navbar from '@/components/sections/Navbar';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';

export default function Contact() {
    return (
        <main className="bg-brand-dark min-h-screen text-white">
            <Navbar />
            <div className="container mx-auto px-6 pt-40 pb-20">
                <h1 className="text-4xl md:text-6xl font-serif text-center mb-6">Begin Your Journey</h1>
                <p className="text-white/60 text-center max-w-xl mx-auto mb-16">
                    Tell us about your dream trip, and let our specialists craft the perfect itinerary for you.
                </p>
                <div className="max-w-2xl mx-auto bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <ContactForm />
                </div>
            </div>
            <Footer />
        </main>
    );
}
