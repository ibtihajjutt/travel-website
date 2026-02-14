import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/ui/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700'],
    variable: '--font-cormorant'
});

export const metadata: Metadata = {
    title: 'Travel Co. | Luxury Experiences',
    description: 'A cinematic luxury travel platform.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${cormorant.variable} font-sans bg-brand-dark text-brand-white antialiased`}>
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
