"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Sparkles, 
  Target, 
  Save, 
  Download, 
  Shield 
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Resume Builder",
      description: "Create professional resumes with customizable templates and sections for experience, education, skills, and more."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "AI Content Generation",
      description: "Generate compelling bullet points, professional summaries, and skill descriptions tailored to your experience."
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Job Description Matching",
      description: "Analyze job descriptions and optimize your resume to highlight relevant skills and experience for specific roles."
    },
    {
      icon: <Save className="h-10 w-10 text-primary" />,
      title: "Cloud Storage",
      description: "Save multiple versions of your resume and access them from anywhere, anytime."
    },
    {
      icon: <Download className="h-10 w-10 text-primary" />,
      title: "Export to PDF",
      description: "Download your professional resume as a polished PDF ready to send to employers."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your personal information with third parties."
    }
  ];

  return (
    <section className="py-20 bg-background" id="features">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Powerful Features to Build Your Perfect Resume
          </h2>
          <p className="text-xl text-muted-foreground mx-auto max-w-3xl">
            Resume Genius combines AI technology with professional templates to help you create standout resumes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-xl border shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}