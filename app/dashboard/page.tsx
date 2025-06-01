"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  FileText, 
  Plus, 
  Clock, 
  Edit2, 
  Eye, 
  Trash2, 
  Sparkles,
  ArrowUpRight,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "framer-motion";

type Resume = {
  id: string;
  name: string;
  lastUpdated: Date;
  template: string;
  completion: number;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [newResumeName, setNewResumeName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Redirect if not authenticated
  if (!user) {
    router.push("/login");
    return null;
  }

  // Mock data for demonstration
  useEffect(() => {
    // This would normally come from a database
    setResumes([
      {
        id: "1",
        name: "Software Developer Resume",
        lastUpdated: new Date(2025, 2, 15),
        template: "Professional",
        completion: 85
      }
    ]);
  }, []);

  const createNewResume = () => {
    if (newResumeName.trim() === "") return;
    
    const newResume: Resume = {
      id: `resume-${Date.now()}`,
      name: newResumeName,
      lastUpdated: new Date(),
      template: "Modern",
      completion: 0
    };
    
    setResumes([...resumes, newResume]);
    setNewResumeName("");
    setIsDialogOpen(false);
  };

  const deleteResume = (id: string) => {
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                Your Resumes
                <Sparkles className="h-6 w-6 text-primary" />
              </h1>
              <p className="text-muted-foreground mt-1">Manage and edit your professional resumes</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300">
                  <Plus className="mr-2 h-4 w-4" /> New Resume
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Resume</DialogTitle>
                  <DialogDescription>
                    Give your resume a name to get started.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Resume Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g., Marketing Resume" 
                      value={newResumeName}
                      onChange={(e) => setNewResumeName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={createNewResume}>Create Resume</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Resumes</p>
                    <h3 className="text-2xl font-bold mt-1">{resumes.length}</h3>
                  </div>
                  <FileText className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {resumes.length > 0 
                        ? new Date(Math.max(...resumes.map(r => r.lastUpdated.getTime()))).toLocaleDateString()
                        : "Never"}
                    </h3>
                  </div>
                  <Clock className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {resumes.length > 0 
                        ? `${Math.round(resumes.reduce((acc, r) => acc + r.completion, 0) / resumes.length)}%`
                        : "0%"}
                    </h3>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {resume.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          {resume.lastUpdated.toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteResume(resume.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="relative h-32 bg-gradient-to-br from-primary/5 to-primary/10 rounded-md flex items-center justify-center overflow-hidden group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300">
                      <FileText className="h-10 w-10 text-primary/50 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Template: {resume.template}</p>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{resume.completion}%</span>
                        </div>
                      </div>
                      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${resume.completion}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/btn"
                      asChild
                    >
                      <Link href={`/dashboard/resume/${resume.id}`} className="flex items-center gap-2">
                        <Edit2 className="h-4 w-4" />
                        Edit
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="group/btn"
                      asChild
                    >
                      <Link href={`/dashboard/resume/${resume.id}/preview`} className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: resumes.length * 0.1 }}
            >
              <Card className="border-dashed flex flex-col items-center justify-center hover:bg-muted/50 transition-all duration-300 cursor-pointer h-[268px] group">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="h-full w-full flex flex-col gap-4 group-hover:scale-105 transition-transform duration-300">
                      <div className="relative">
                        <Plus className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="absolute -inset-4 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <span className="font-medium group-hover:text-primary transition-colors">Create New Resume</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Resume</DialogTitle>
                      <DialogDescription>
                        Give your resume a name to get started.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Resume Name</Label>
                        <Input 
                          id="name" 
                          placeholder="e.g., Marketing Resume" 
                          value={newResumeName}
                          onChange={(e) => setNewResumeName(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={createNewResume}>Create Resume</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}