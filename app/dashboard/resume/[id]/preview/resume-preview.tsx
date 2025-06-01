"use client";

import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Printer } from "lucide-react";
import { useRef } from "react";

// Mock resume data that would normally come from a database
const resumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    title: "Software Engineer",
  },
  summary: "Experienced software engineer with a passion for building scalable web applications and solving complex problems. 5+ years of experience in full-stack development with expertise in React, Node.js, and cloud technologies.",
  experience: [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      location: "New York, NY",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: "• Led development of a new customer portal that improved user engagement by 40%\n• Mentored junior developers and conducted code reviews\n• Implemented CI/CD pipeline reducing deployment time by 60%",
    },
    {
      id: "2",
      company: "Digital Innovations Co.",
      position: "Software Developer",
      location: "Boston, MA",
      startDate: "2020-03",
      endDate: "2021-12",
      current: false,
      description: "• Developed and maintained RESTful APIs using Node.js and Express\n• Collaborated with UX designers to implement responsive web interfaces\n• Participated in agile development process with 2-week sprints",
    },
  ],
  education: [
    {
      id: "1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2016-09",
      endDate: "2020-05",
      current: false,
      description: "• GPA: 3.8/4.0\n• Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems\n• Senior project: Developed a machine learning model for predictive analysis",
    },
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "AWS", "Docker", "Git", "CI/CD", "Agile Methodologies"],
};

// Separate component for resume content
function ResumeContent() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">{resumeData.personalInfo.name}</h1>
        <p className="text-xl text-muted-foreground mb-2">{resumeData.personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-x-4 text-sm text-muted-foreground">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
        </div>
      </div>

      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 pb-2 mb-4 text-foreground">Summary</h2>
          <p className="text-base text-foreground">{resumeData.summary}</p>
        </div>
      )}

      {resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 pb-2 mb-4 text-foreground">Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-foreground">{exp.position}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                    {" - "}
                    {exp.current
                      ? "Present"
                      : exp.endDate && new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  </p>
                </div>
                <p className="text-base font-medium text-foreground">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                <div className="text-base mt-2 whitespace-pre-line text-foreground">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 pb-2 mb-4 text-foreground">Education</h2>
          <div className="space-y-6">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-foreground">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                    {" - "}
                    {edu.current
                      ? "Present"
                      : edu.endDate && new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  </p>
                </div>
                <p className="text-base font-medium text-foreground">{edu.institution}</p>
                <div className="text-base mt-2 whitespace-pre-line text-foreground">
                  {edu.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b-2 pb-2 mb-4 text-foreground">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="bg-muted px-3 py-1 rounded-md text-base text-foreground">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResumePreview({ resumeId }: { resumeId: string }) {
  const router = useRouter();
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = resumeRef.current?.innerHTML || '';
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${resumeData.personalInfo.name}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 2rem;
              background: white;
            }
            .prose {
              max-width: none;
            }
            .prose h1 {
              font-size: 24pt;
              margin-bottom: 1rem;
              color: black;
            }
            .prose h2 {
              font-size: 18pt;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              color: black;
            }
            .prose p {
              margin-bottom: 0.75rem;
              color: black;
            }
            .prose ul, .prose ol {
              margin-left: 1.5rem;
              margin-bottom: 1rem;
              color: black;
            }
            .prose > div {
              margin-bottom: 1.5rem;
            }
            .text-muted-foreground {
              color: #666;
            }
            .bg-muted {
              background-color: #f3f4f6;
              color: black;
            }
          </style>
        </head>
        <body>
          <div class="prose">
            ${content}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/dashboard/resume/${resumeId}`)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Resume Preview</h1>
                <p className="text-muted-foreground">
                  Preview how your resume will look when exported
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="flex justify-center">
            <Card className="w-full max-w-[800px] bg-card shadow-md">
              <CardContent className="p-8">
                <div ref={resumeRef}>
                  <ResumeContent />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}