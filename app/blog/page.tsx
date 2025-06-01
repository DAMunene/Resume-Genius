import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "How to Write a Resume That Stands Out in 2024",
      excerpt: "Learn the latest resume writing techniques and best practices to make your application stand out in today's competitive job market.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Resume Writing",
      image: "/blog/resume-tips.jpg"
    },
    {
      id: 2,
      title: "AI in Job Search: How to Leverage Technology for Better Results",
      excerpt: "Discover how artificial intelligence is transforming the job search process and how you can use it to your advantage.",
      author: "Michael Chen",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Career Tech",
      image: "/blog/ai-job-search.jpg"
    },
    {
      id: 3,
      title: "The Ultimate Guide to ATS-Friendly Resumes",
      excerpt: "Everything you need to know about creating resumes that pass through Applicant Tracking Systems and reach human recruiters.",
      author: "Emily Rodriguez",
      date: "March 10, 2024",
      readTime: "10 min read",
      category: "Resume Writing",
      image: "/blog/ats-guide.jpg"
    },
    {
      id: 4,
      title: "Career Change Success Stories: Real People, Real Journeys",
      excerpt: "Inspiring stories of professionals who successfully transitioned to new careers and how they did it.",
      author: "David Kim",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Career Change",
      image: "/blog/career-change.jpg"
    },
    {
      id: 5,
      title: "Top Skills Employers Are Looking For in 2024",
      excerpt: "Stay ahead of the curve by learning which skills are most in demand and how to develop them.",
      author: "Lisa Thompson",
      date: "March 5, 2024",
      readTime: "5 min read",
      category: "Career Development",
      image: "/blog/skills-2024.jpg"
    },
    {
      id: 6,
      title: "How to Write a Compelling Cover Letter",
      excerpt: "Master the art of writing cover letters that complement your resume and increase your chances of getting interviews.",
      author: "James Wilson",
      date: "March 3, 2024",
      readTime: "9 min read",
      category: "Cover Letters",
      image: "/blog/cover-letter.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
              Career Insights & Resources
            </h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-3xl">
              Expert advice, tips, and guides to help you advance your career and land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-video overflow-hidden">
                    <div className="h-full w-full bg-muted" />
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 