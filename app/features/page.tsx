"use client";

import { Features } from "@/components/features";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Features />
      </main>
      <Footer />
    </div>
  );
}