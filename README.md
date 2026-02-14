# 🌍 Cinematic Luxury Travel Platform

A high-performance, immersive travel booking experience built with **Next.js 14**, designed to captivate users with cinematic animations, smooth interactions, and a premium aesthetic.

![Project Thumbnail](https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop)

## 🚀 Technical Architecture

This project utilizes a modern, component-driven architecture optimized for performance and user experience.

### **Tech Stack**
- **Framework**: `Next.js 14` (App Router) - Server-side rendering and routing.
- **Language**: `TypeScript` - Strict type safety for robustness.
- **Styling**: `Tailwind CSS` - Utility-first styling with a custom luxury theme (`brand-dark`, `brand-turquoise`).
- **Animation**:
  - `Framer Motion`: Complex UI transitions and gesture controls.
  - `HTML5 Canvas`: High-performance frame-based scrollytelling (60fps).
- **Physics**: `@studio-freight/react-lenis` - Smooth, momentum-based scrolling.
- **Forms**: `React Hook Form` + `Zod` - Schema-based validation.
- **Payments**: `Razorpay` - Integrated payment gateway.
- **Icons**: `Lucide React`.

### **Core Systems**
1.  **Canvas Scrollytelling Engine**: A custom hook (`useCanvasScroll`) maps window scroll position to specific image frames, rendering them on a sticky canvas for a seamless video-like experience controlled by the user's scroll.
2.  **Horizontal Stacking System**: The Packages section uses improved sticky positioning and Z-index manipulation to create a "deck of cards" effect where items slide in and stack with 3D depth scaling.
3.  **Global Smooth Scroll**: Wraps the entire application to provide a fluid, "luxury" feel to standard web scrolling.

---

## ✨ Key Features

### **1. Cinematic Hero Section**
- **Technology**: HTML5 Canvas + Image Sequence.
- **Behavior**: As the user scrolls down, a high-resolution image sequence plays in sync, creating an immersive storytelling opening.
- **Optimization**: Images are preloaded using a custom `useImagePreloader` hook to ensure lag-free rendering.

### **2. Stacking Cards (Packages)**
- **Technology**: Framer Motion `sticky` + `useScroll`.
- **Behavior**: A horizontal scroll experience converted into a vertical stack. Cards enter from the right and stack on top of each other, with previous cards scaling down (0.95x) and dimming to create depth.
- **UI**: Responsive cards with scrollable content areas for data-rich packages.

### **3. Glassmorphism Navigation**
- **Technology**: Tailwind Backdrop Blur.
- **Behavior**: A fixed navbar that blurs the content behind it.
- **Mobile**: Features a full-screen, animated overlay menu with staggered text reveals.

### **4. Payment Integration**
- **Technology**: Razorpay SDK + Next.js API Routes.
- **Behavior**: A secure API route (`/api/checkout`) generates orders. The frontend handles the payment modal and success/failure states.

---

## 📂 Sections & Pages

### **Pages (`src/app/`)**
- **`/` (Home)**: The landing page combining all core sections (Hero, Globe, Packages, Contact).
- **`/destinations`**: A visual grid of featured locations with hover interactions.
- **`/packages`**: Dedicated view for the curated travel collections with the stacking card effect.
- **`/about`**: Brand storytelling page with split-layout design.
- **`/contact`**: Full-page layout for the booking inquiry form.

### **Components (`src/components/`)**
- `HeroScroll`: The canvas animation engine.
- `Navbar`: Responsive navigation with mobile menu state.
- `Packages`: The stacking cards UI.
- `ContactForm`: Zod-validated entry form with payment trigger.
- `DestinationGlobe`: Parallax video background section.
- `Footer`: Global site footer with links and newsletter.

---

## 🛠️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/travel-website.git
    cd travel-website
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```
    *Note: If you encounter conflicts, use `npm install --legacy-peer-deps`.*

3.  **Environment Variables**:
    Create a `.env.local` file and add your Razorpay keys:
    ```env
    RAZORPAY_KEY_ID=your_key_id
    RAZORPAY_KEY_SECRET=your_key_secret
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

---

## 🎨 Design Philosophy
- **"Condé Nast meets Apple"**: The design prioritizes whitespace, elegant serif typography (`Cormorant Garamond`), and immersive imagery.
- **Motion as Meaning**: Animations are not just decoration; they guide the user through the narrative of the trip.

---

© 2024 Ibtiahj Jutt. All Rights Reserved.
