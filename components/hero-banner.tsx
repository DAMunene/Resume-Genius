"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
              <Sparkles className="mr-1 h-3 w-3" />
              <span className="text-sm">AI-Powered Resume Builder</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Land Your Dream Job with <span className="text-primary">Resume Genius</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Create, improve, and tailor your resume to specific job descriptions using the power of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/examples">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  See Examples
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-video md:aspect-square overflow-hidden rounded-xl"
          >
            <div className="bg-gradient-to-br from-muted to-card h-full w-full overflow-hidden rounded-xl border shadow-xl">
              <div className="relative h-full w-full p-4">
                <div className="absolute top-4 left-4 right-4 h-8 bg-background/80 rounded-md flex items-center px-3">
                  <div className="flex space-x-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-destructive/70"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-400/70"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/70"></div>
                  </div>
                  <div className="mx-auto text-xs text-muted-foreground">Resume Preview</div>
                </div>
                <div className="mt-10 h-[calc(100%-2.5rem)] rounded-md bg-card p-4 shadow-sm border">
                  <div className="flex flex-col gap-4">
                    <div className="h-8 w-2/3 bg-muted/50 rounded-md"></div>
                    <div className="h-4 w-1/2 bg-muted/30 rounded-md"></div>
                    <div className="space-y-2 mt-4">
                      <div className="h-4 w-full bg-muted/30 rounded-md"></div>
                      <div className="h-4 w-full bg-muted/30 rounded-md"></div>
                      <div className="h-4 w-2/3 bg-muted/30 rounded-md"></div>
                    </div>
                    <div className="h-6 w-1/3 bg-muted/50 rounded-md mt-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted/30 rounded-md"></div>
                      <div className="h-4 w-full bg-muted/30 rounded-md"></div>
                    </div>
                    <div className="h-6 w-1/3 bg-muted/50 rounded-md mt-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted/30 rounded-md"></div>
                      <div className="h-4 w-3/4 bg-muted/30 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}