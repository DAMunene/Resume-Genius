import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-3xl">
              Choose the plan that's right for your job search needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="border rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Basic</h2>
              <p className="text-3xl font-bold mb-4">$9.99<span className="text-lg text-muted-foreground">/month</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Basic Resume Templates
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  3 Resumes per month
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Basic AI Suggestions
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>

            {/* Pro Plan */}
            <div className="border rounded-lg p-6 shadow-lg bg-primary/5">
              <div className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Most Popular
              </div>
              <h2 className="text-2xl font-semibold mb-4">Pro</h2>
              <p className="text-3xl font-bold mb-4">$19.99<span className="text-lg text-muted-foreground">/month</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  All Basic Features
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Unlimited Resumes
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Advanced AI Suggestions
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Priority Support
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>

            {/* Enterprise Plan */}
            <div className="border rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Enterprise</h2>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  All Pro Features
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Custom Templates
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Team Collaboration
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Dedicated Support
                </li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 