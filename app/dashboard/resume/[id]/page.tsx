"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ResumeEditor } from "@/components/resume/resume-editor";
import { JobDescriptionAnalyzer } from "@/components/resume/job-description-analyzer";
import { AiSuggestions } from "@/components/resume/ai-suggestions";
import { Download, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

export default function ResumePage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const resumeId = params.id as string;
  const [activeTab, setActiveTab] = useState("editor");

  // Redirect if not authenticated
  if (!user) {
    router.push("/login");
    return null;
  }

  const handleSave = () => {
    toast.success("Resume saved successfully!");
  };

  const handleExportPDF = () => {
    toast.success("Resume exported as PDF. Downloading...");
    // In a real implementation, this would trigger the PDF download
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
                onClick={() => router.push("/dashboard")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Resume</h1>
                <p className="text-muted-foreground">
                  Customize your resume and optimize it with AI
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button onClick={handleExportPDF}>
                <Download className="mr-2 h-4 w-4" /> Export PDF
              </Button>
            </div>
          </div>

          <Tabs 
            defaultValue="editor" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="editor">Resume Editor</TabsTrigger>
              <TabsTrigger value="job-match">Job Description Match</TabsTrigger>
              <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
            </TabsList>
            <TabsContent value="editor">
              <ResumeEditor resumeId={resumeId} />
            </TabsContent>
            <TabsContent value="job-match">
              <JobDescriptionAnalyzer resumeId={resumeId} />
            </TabsContent>
            <TabsContent value="ai-suggestions">
              <AiSuggestions resumeId={resumeId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}