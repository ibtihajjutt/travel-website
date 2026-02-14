"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Script from 'next/script';

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    destination: z.string().min(2, "Destination is required"),
});

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            // 1. Init payment
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 5000 }), // Mock amount
            });
            const order = await res.json();

            // 2. Load Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1234567890",
                amount: order.amount,
                currency: order.currency,
                name: "Travel Co.",
                description: "Luxury Experience Deposit",
                order_id: order.id.startsWith("order_mock") ? undefined : order.id, // Handle mock
                handler: function (response: any) {
                    alert(`Payment Successful: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                },
                theme: {
                    color: "#1FB4B4",
                },
            };

            if ((window as any).Razorpay) {
                const rzp1 = new (window as any).Razorpay(options);
                rzp1.open();
            } else {
                alert("Razorpay SDK not loaded. Please refresh.");
            }

        } catch (error) {
            console.error(error);
            alert("Payment failed or API not configured.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-brand-dark relative border-t border-white/5">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto"
                >
                    <h2 className="font-serif text-4xl text-white text-center mb-12">Plan Your Escape</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <input
                                {...register("name")}
                                placeholder="Full Name"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-turquoise transition-colors"
                            />
                            {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                        </div>
                        <div>
                            <input
                                {...register("email")}
                                placeholder="Email Address"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-turquoise transition-colors"
                            />
                            {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
                        </div>
                        <div>
                            <select
                                {...register("destination")}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-turquoise transition-colors appearance-none"
                            >
                                <option value="" className="bg-brand-dark text-white/50">Select Destination</option>
                                <option value="maldives" className="bg-brand-dark">Maldives</option>
                                <option value="swiss-alps" className="bg-brand-dark">Swiss Alps</option>
                                <option value="kyoto" className="bg-brand-dark">Kyoto</option>
                            </select>
                            {errors.destination && <span className="text-red-400 text-sm">{errors.destination.message}</span>}
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-brand-turquoise text-white py-4 tracking-widest hover:bg-white hover:text-brand-dark transition-colors disabled:opacity-50 mt-8"
                        >
                            {loading ? "PROCESSING..." : "REQUEST CONSULTATION"}
                        </button>
                    </form>
                    <p className="text-center text-white/30 text-xs mt-8">
                        Note: This is a demo. Razorpay implementation requires valid keys.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
