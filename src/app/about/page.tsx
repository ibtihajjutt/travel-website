import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export default function About() {
    return (
        <main className="bg-brand-dark min-h-screen text-white">
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <span className="text-brand-turquoise text-xs tracking-widest uppercase block mb-6 text-center">Since 2023</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-center mb-16">Redefining Luxury Travel</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                        <div className="font-light text-lg leading-relaxed text-white/80 space-y-6">
                            <p>
                                Travel Co. was born from a simple yet profound belief: that the journey matters just as much as the destination. We are not just travel agents; we are architects of memory.
                            </p>
                            <p>
                                In a world of commoditized tourism, we offer the antidote—hand-crafted, deeply personal experiences that connect you with the soul of a place. From private access to the Vatican to sleeping under the stars in the Namib Desert, we open doors that are otherwise closed.
                            </p>
                        </div>
                        <div className="aspect-[4/5] relative rounded-lg overflow-hidden border border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop"
                                alt="Luxury Hotel Interior"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="text-center mb-24">
                        <blockquote className="text-3xl md:text-4xl font-serif italic text-white/90 leading-normal mb-8">
                            "We don't sell travel. <br /> We sell the luxury of time and the privilege of perspective."
                        </blockquote>
                        <cite className="text-xs tracking-widest uppercase text-brand-turquoise not-italic">— The Founders</cite>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
