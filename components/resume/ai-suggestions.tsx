"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Clipboard, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AiSuggestionsProps {
  resumeId: string;
}

export function AiSuggestions({ resumeId }: AiSuggestionsProps) {
  const [selectedSection, setSelectedSection] = useState("summary");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");

  // Mock function to generate AI suggestions
  const generateAiSuggestions = () => {
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      let newSuggestions: string[] = [];
      
      switch (selectedSection) {
        case "summary":
          newSuggestions = [
            "Innovative software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable applications and implementing best practices. Adept at leading teams, mentoring junior developers, and working with stakeholders to transform business requirements into technical solutions.",
            "Results-driven software engineer with expertise in React, Node.js, and cloud technologies. Demonstrated success in optimizing application performance and implementing CI/CD pipelines. Passionate about creating clean, maintainable code and leveraging cutting-edge technologies to solve complex problems.",
            "Dedicated software engineer with comprehensive experience in web development and a strong foundation in computer science principles. Skilled in creating responsive user interfaces and RESTful APIs. Committed to continuous learning and staying current with emerging technologies and industry trends."
          ];
          break;
        case "experience":
          newSuggestions = [
            "• Architected and implemented a microservices-based customer portal that improved user engagement by 40% and reduced load times by 60%\n• Led a team of 5 developers, implementing agile methodologies that increased sprint velocity by 25%\n• Designed and deployed CI/CD pipelines using GitHub Actions, reducing deployment time from hours to minutes",
            "• Spearheaded the development of a high-traffic customer portal serving 50,000+ daily users\n• Reduced application load time by 60% through implementing lazy loading and optimized database queries\n• Mentored 3 junior developers who were subsequently promoted within 12 months",
            "• Rebuilt legacy monolithic application into modern microservices architecture\n• Implemented comprehensive test coverage, increasing code quality metrics from 65% to 95%\n• Optimized database queries resulting in 40% performance improvement for critical user workflows"
          ];
          break;
        case "skills":
          newSuggestions = [
            "JavaScript, TypeScript, React, Redux, Node.js, Express, RESTful APIs, GraphQL, MongoDB, PostgreSQL, AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD, Git, Agile/Scrum, Test-Driven Development",
            "Frontend: React, Redux, TypeScript, HTML5, CSS3, SASS, Tailwind CSS\nBackend: Node.js, Express, Python, Django\nDatabases: MongoDB, PostgreSQL, Redis\nDevOps: Docker, AWS, CI/CD, GitHub Actions\nMethodologies: Agile, Scrum, Kanban, TDD",
            "Programming Languages: JavaScript, TypeScript, Python\nFrontend: React, Next.js, Redux, Material UI\nBackend: Node.js, Express, RESTful APIs\nDatabases & Cloud: MongoDB, AWS, Firebase\nTools & Methods: Git, Docker, Agile, Unit Testing"
          ];
          break;
        default:
          newSuggestions = ["No suggestions available for this section"];
      }
      
      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 1500);
  };

  const applySuggestion = (suggestion: string) => {
    toast.success("Suggestion applied to your resume!");
    // In a real application, this would update the resume data
  };

  const handleCustomGeneration = () => {
    if (!userInput.trim()) {
      toast.error("Please provide some context for the AI");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newSuggestions = [
        "Custom AI-generated suggestion based on your input would appear here. This would be tailored to your specific request and would leverage the context you've provided.",
        "Alternative version of your custom request would be shown here, giving you multiple options to choose from.",
        "A third variation that takes your input in a slightly different direction, helping you explore different ways to express your content."
      ];
      
      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Content Suggestions</CardTitle>
          <CardDescription>
            Get AI-powered suggestions to enhance different sections of your resume.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">Quick Suggestions</TabsTrigger>
              <TabsTrigger value="custom">Custom Generation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex items-end gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium">Select Resume Section</label>
                    <Select 
                      value={selectedSection} 
                      onValueChange={setSelectedSection}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Professional Summary</SelectItem>
                        <SelectItem value="experience">Work Experience</SelectItem>
                        <SelectItem value="skills">Skills</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={generateAiSuggestions} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Suggestions
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4 mt-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe what you want the AI to help you with. For example: 'Help me write a bullet point about leading a team of developers to rebuild our payment processing system.'"
                  className="min-h-[100px]"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <Button onClick={handleCustomGeneration} disabled={isGenerating} className="w-full">
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Custom Content
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isGenerating && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-4">
              <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-center font-medium">AI is generating suggestions...</p>
              <p className="text-center text-sm text-muted-foreground mt-1">This may take a few moments.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!isGenerating && suggestions.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">AI Generated Suggestions</h3>
          
          {suggestions.map((suggestion, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="whitespace-pre-line mb-4">{suggestion}</div>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(suggestion);
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => applySuggestion(suggestion)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Use This
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}