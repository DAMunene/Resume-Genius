"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface ResumeEditorProps {
  resumeId: string;
}

// Define resume data structure
interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    title: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export function ResumeEditor({ resumeId }: ResumeEditorProps) {
  // In a real app, this would fetch data from an API
  const [resume, setResume] = useState<ResumeData>({
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
        id: uuidv4(),
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        location: "New York, NY",
        startDate: "2022-01",
        endDate: "",
        current: true,
        description: "• Led development of a new customer portal that improved user engagement by 40%\n• Mentored junior developers and conducted code reviews\n• Implemented CI/CD pipeline reducing deployment time by 60%",
      },
      {
        id: uuidv4(),
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
        id: uuidv4(),
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
  });

  // Handle personal information updates
  const updatePersonalInfo = (field: keyof typeof resume.personalInfo, value: string) => {
    setResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  };

  // Handle summary updates
  const updateSummary = (value: string) => {
    setResume({
      ...resume,
      summary: value,
    });
  };

  // Handle experience updates
  const updateExperienceField = (id: string, field: keyof ExperienceItem, value: any) => {
    setResume({
      ...resume,
      experience: resume.experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Add new experience
  const addExperience = () => {
    const newExperience: ExperienceItem = {
      id: uuidv4(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setResume({
      ...resume,
      experience: [...resume.experience, newExperience],
    });
  };

  // Delete experience
  const deleteExperience = (id: string) => {
    setResume({
      ...resume,
      experience: resume.experience.filter((item) => item.id !== id),
    });
  };

  // Move experience up
  const moveExperienceUp = (index: number) => {
    if (index <= 0) return;
    const newExperience = [...resume.experience];
    [newExperience[index], newExperience[index - 1]] = [newExperience[index - 1], newExperience[index]];
    setResume({
      ...resume,
      experience: newExperience,
    });
  };

  // Move experience down
  const moveExperienceDown = (index: number) => {
    if (index >= resume.experience.length - 1) return;
    const newExperience = [...resume.experience];
    [newExperience[index], newExperience[index + 1]] = [newExperience[index + 1], newExperience[index]];
    setResume({
      ...resume,
      experience: newExperience,
    });
  };

  // Handle education updates
  const updateEducationField = (id: string, field: keyof EducationItem, value: any) => {
    setResume({
      ...resume,
      education: resume.education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Add new education
  const addEducation = () => {
    const newEducation: EducationItem = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setResume({
      ...resume,
      education: [...resume.education, newEducation],
    });
  };

  // Delete education
  const deleteEducation = (id: string) => {
    setResume({
      ...resume,
      education: resume.education.filter((item) => item.id !== id),
    });
  };

  // Move education up
  const moveEducationUp = (index: number) => {
    if (index <= 0) return;
    const newEducation = [...resume.education];
    [newEducation[index], newEducation[index - 1]] = [newEducation[index - 1], newEducation[index]];
    setResume({
      ...resume,
      education: newEducation,
    });
  };

  // Move education down
  const moveEducationDown = (index: number) => {
    if (index >= resume.education.length - 1) return;
    const newEducation = [...resume.education];
    [newEducation[index], newEducation[index + 1]] = [newEducation[index + 1], newEducation[index]];
    setResume({
      ...resume,
      education: newEducation,
    });
  };

  // Handle skills updates
  const updateSkills = (value: string) => {
    setResume({
      ...resume,
      skills: value.split(",").map((skill) => skill.trim()),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
      <div className="space-y-6">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={resume.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={resume.personalInfo.title}
                  onChange={(e) => updatePersonalInfo("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resume.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                rows={5}
                value={resume.summary}
                onChange={(e) => updateSummary(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6 mt-4">
            <Accordion type="multiple" className="w-full">
              {resume.experience.map((exp, index) => (
                <AccordionItem key={exp.id} value={exp.id}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-1">
                      {exp.position} at {exp.company || "(Company)"}
                    </AccordionTrigger>
                    <div className="flex gap-1 pr-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveExperienceUp(index);
                        }}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveExperienceDown(index);
                        }}
                        disabled={index === resume.experience.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteExperience(exp.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <AccordionContent>
                    <div className="space-y-4 py-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${exp.id}`}>Company</Label>
                          <Input
                            id={`company-${exp.id}`}
                            value={exp.company}
                            onChange={(e) =>
                              updateExperienceField(exp.id, "company", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`position-${exp.id}`}>Position</Label>
                          <Input
                            id={`position-${exp.id}`}
                            value={exp.position}
                            onChange={(e) =>
                              updateExperienceField(exp.id, "position", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                          <Input
                            id={`start-date-${exp.id}`}
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperienceField(exp.id, "startDate", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`current-${exp.id}`}
                                checked={exp.current}
                                onChange={(e) =>
                                  updateExperienceField(exp.id, "current", e.target.checked)
                                }
                                className="mr-1"
                              />
                              <Label htmlFor={`current-${exp.id}`} className="text-sm">
                                Current
                              </Label>
                            </div>
                          </div>
                          <Input
                            id={`end-date-${exp.id}`}
                            type="month"
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperienceField(exp.id, "endDate", e.target.value)
                            }
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`location-${exp.id}`}>Location</Label>
                        <Input
                          id={`location-${exp.id}`}
                          value={exp.location}
                          onChange={(e) =>
                            updateExperienceField(exp.id, "location", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${exp.id}`}>Description</Label>
                        <Textarea
                          id={`description-${exp.id}`}
                          rows={5}
                          value={exp.description}
                          onChange={(e) =>
                            updateExperienceField(exp.id, "description", e.target.value)
                          }
                          placeholder="• Add your accomplishments and responsibilities here
• Use bullet points for better readability
• Quantify your achievements when possible"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button onClick={addExperience} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </TabsContent>

          <TabsContent value="education" className="space-y-6 mt-4">
            <Accordion type="multiple" className="w-full">
              {resume.education.map((edu, index) => (
                <AccordionItem key={edu.id} value={edu.id}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-1">
                      {edu.degree} in {edu.field || "(Field)"} at {edu.institution || "(Institution)"}
                    </AccordionTrigger>
                    <div className="flex gap-1 pr-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveEducationUp(index);
                        }}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveEducationDown(index);
                        }}
                        disabled={index === resume.education.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEducation(edu.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <AccordionContent>
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                        <Input
                          id={`institution-${edu.id}`}
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducationField(edu.id, "institution", e.target.value)
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                          <Input
                            id={`degree-${edu.id}`}
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducationField(edu.id, "degree", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                          <Input
                            id={`field-${edu.id}`}
                            value={edu.field}
                            onChange={(e) =>
                              updateEducationField(edu.id, "field", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                          <Input
                            id={`start-date-${edu.id}`}
                            type="month"
                            value={edu.startDate}
                            onChange={(e) =>
                              updateEducationField(edu.id, "startDate", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`current-${edu.id}`}
                                checked={edu.current}
                                onChange={(e) =>
                                  updateEducationField(edu.id, "current", e.target.checked)
                                }
                                className="mr-1"
                              />
                              <Label htmlFor={`current-${edu.id}`} className="text-sm">
                                Current
                              </Label>
                            </div>
                          </div>
                          <Input
                            id={`end-date-${edu.id}`}
                            type="month"
                            value={edu.endDate}
                            onChange={(e) =>
                              updateEducationField(edu.id, "endDate", e.target.value)
                            }
                            disabled={edu.current}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${edu.id}`}>Additional Information</Label>
                        <Textarea
                          id={`description-${edu.id}`}
                          rows={3}
                          value={edu.description}
                          onChange={(e) =>
                            updateEducationField(edu.id, "description", e.target.value)
                          }
                          placeholder="• GPA, honors, relevant coursework, projects
• Extracurricular activities, clubs, achievements"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button onClick={addEducation} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Textarea
                id="skills"
                rows={6}
                value={resume.skills.join(", ")}
                onChange={(e) => updateSkills(e.target.value)}
                placeholder="JavaScript, React, Node.js, etc."
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Resume Preview */}
      <div className="relative">
        <Card className="sticky top-20">
          <CardContent className="p-6">
            <div className="prose max-w-none">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-1">{resume.personalInfo.name}</h1>
                <p className="text-muted-foreground">{resume.personalInfo.title}</p>
                <div className="flex flex-wrap justify-center gap-x-3 mt-2 text-sm">
                  {resume.personalInfo.email && (
                    <span>{resume.personalInfo.email}</span>
                  )}
                  {resume.personalInfo.phone && (
                    <span>{resume.personalInfo.phone}</span>
                  )}
                  {resume.personalInfo.location && (
                    <span>{resume.personalInfo.location}</span>
                  )}
                </div>
              </div>

              {resume.summary && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h2>
                  <p className="text-sm">{resume.summary}</p>
                </div>
              )}

              {resume.experience.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h2>
                  <div className="space-y-3">
                    {resume.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{exp.position}</h3>
                            <p className="text-sm">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {exp.startDate && new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                            {" - "}
                            {exp.current
                              ? "Present"
                              : exp.endDate && new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                          </p>
                        </div>
                        <div className="text-sm mt-1 whitespace-pre-line">
                          {exp.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.education.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Education</h2>
                  <div className="space-y-3">
                    {resume.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                            <p className="text-sm">{edu.institution}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {edu.startDate && new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                            {" - "}
                            {edu.current
                              ? "Present"
                              : edu.endDate && new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                          </p>
                        </div>
                        <div className="text-sm mt-1 whitespace-pre-line">
                          {edu.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.skills.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, index) => (
                      <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}