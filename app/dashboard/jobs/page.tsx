"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Briefcase, FileText, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

type JobDescription = {
  id: string;
  title: string;
  company: string;
  description: string;
  dateAdded: Date;
};

export default function JobDescriptionsPage() {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([
    {
      id: "job1",
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      description: "We are seeking a skilled Senior Frontend Developer to join our team. The ideal candidate has experience with React, TypeScript, and modern frontend architecture. Responsibilities include developing user-facing features, optimizing application performance, and collaborating with designers and backend engineers.\n\nRequirements:\n- 5+ years of experience with React\n- Strong TypeScript skills\n- Experience with state management (Redux, Context API)\n- Knowledge of modern frontend build tools\n- Familiarity with CI/CD pipelines",
      dateAdded: new Date(2025, 1, 20)
    },
    {
      id: "job2",
      title: "Full Stack Developer",
      company: "Growth Solutions",
      description: "Growth Solutions is looking for a Full Stack Developer to work on our SaaS platform. You'll be responsible for developing and maintaining features across the entire stack.\n\nRequirements:\n- 3+ years of experience in full stack development\n- Proficiency in React, Node.js, and Express\n- Experience with SQL and NoSQL databases\n- Understanding of cloud infrastructure (AWS or Azure)\n- Knowledge of Docker and containerization",
      dateAdded: new Date(2025, 2, 5)
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    description: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddJob = () => {
    if (!newJob.title || !newJob.company || !newJob.description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const job: JobDescription = {
      id: `job-${Date.now()}`,
      title: newJob.title,
      company: newJob.company,
      description: newJob.description,
      dateAdded: new Date()
    };
    
    setJobDescriptions([...jobDescriptions, job]);
    setNewJob({ title: "", company: "", description: "" });
    setIsAddDialogOpen(false);
    toast.success("Job description added successfully");
  };

  const deleteJob = (id: string) => {
    setJobDescriptions(jobDescriptions.filter(job => job.id !== id));
    toast.success("Job description deleted");
  };

  const filteredJobs = jobDescriptions.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Descriptions</h1>
            <p className="text-muted-foreground">Manage job descriptions to tailor your resumes</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Job Description
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Job Description</DialogTitle>
                <DialogDescription>
                  Add details about a job you're interested in to optimize your resume.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    rows={10}
                    className="col-span-3"
                    placeholder="Paste the full job description here..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddJob}>Save Job Description</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search job descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No job descriptions found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try a different search term" : "Add your first job description to get started"}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setIsAddDialogOpen(true)} 
                  className="mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Job Description
                </Button>
              )}
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {job.company} • Added on {job.dateAdded.toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteJob(job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-sm text-muted-foreground max-h-40 overflow-y-auto">
                    {job.description}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/jobs/${job.id}`}>View Details</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/dashboard/resume/new?job=${job.id}`}>
                        <FileText className="mr-2 h-4 w-4" />
                        Create Tailored Resume
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// Link component to avoid TypeScript errors
function Link({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return <a href={href} className={className}>{children}</a>;
}