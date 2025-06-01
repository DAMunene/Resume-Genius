"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "Resume Genius helped me tailor my resume to each job application. I received more interview calls in one week than I did in a month!",
      author: "Alex Thompson",
      role: "Software Engineer",
      avatar: "AT"
    },
    {
      quote: "The AI suggestions were spot-on! It helped me highlight achievements I wouldn't have thought to include. Landed my dream marketing position.",
      author: "Maya Patel",
      role: "Marketing Director",
      avatar: "MP"
    },
    {
      quote: "As a career changer, I struggled to translate my skills. Resume Genius made it simple to showcase my transferable experience. Now employed in my new field!",
      author: "James Wilson",
      role: "Data Analyst",
      avatar: "JW"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground mx-auto max-w-3xl">
            Hear from users who landed their dream jobs with Resume Genius.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}