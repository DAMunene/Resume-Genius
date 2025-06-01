"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface JobDescriptionAnalyzerProps {
  resumeId: string;
}

export function JobDescriptionAnalyzer({ resumeId }: JobDescriptionAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description to analyze");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulating API call to analyze job description
    setTimeout(() => {
      // Mock analysis results
      setAnalysisResult({
        matchScore: 78,
        missingKeywords: ["Docker", "Kubernetes", "CI/CD", "Jest"],
        strengths: [
          "Strong background in React and modern JavaScript",
          "Good experience with Node.js backend development",
          "Demonstrated team leadership and mentorship"
        ],
        weaknesses: [
          "No experience with containerization mentioned",
          "Limited DevOps experience",
          "No testing frameworks mentioned"
        ],
        suggestions: [
          "Add more details about any experience with Docker or containerization",
          "Highlight any CI/CD pipeline experience",
          "Mention any experience with testing frameworks like Jest"
        ]
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const applyAiSuggestions = () => {
    toast.success("AI suggestions applied to your resume!");
    // In a real application, this would update the resume with the AI suggestions
  };

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Job Description Analysis</CardTitle>
          <CardDescription>
            Paste a job description to see how well your resume matches and get AI-powered suggestions for improvement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste job description here..."
            className="min-h-[200px]"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={analyzeJobDescription} 
            disabled={isAnalyzing || !jobDescription.trim()}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Job Description"}
          </Button>
        </CardFooter>
      </Card>

      {isAnalyzing && (
        <Card>
          <CardContent className="py-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Analyzing your resume against job description...</span>
                <span>70%</span>
              </div>
              <Progress value={70} />
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Match Score</span>
                <Badge variant={analysisResult.matchScore >= 70 ? "default" : "destructive"}>
                  {analysisResult.matchScore}%
                </Badge>
              </CardTitle>
              <CardDescription>
                This score indicates how well your resume matches the job description.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={analysisResult.matchScore} className="h-4" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Areas to Improve</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>AI-Powered Suggestions</span>
              </CardTitle>
              <CardDescription>
                Apply these suggestions to optimize your resume for this job.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Missing Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingKeywords.map((keyword: string, index: number) => (
                      <Badge key={index} variant="outline">{keyword}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Suggested Improvements</h3>
                  <ul className="space-y-2">
                    {analysisResult.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={applyAiSuggestions} className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Apply AI Suggestions
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}