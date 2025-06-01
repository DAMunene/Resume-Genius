// This file would normally contain the OpenAI API integration.
// In a production app, you would need to add your API key securely using environment variables.

import { OpenAI } from "openai";

// This is a placeholder. In a real application, you'd use environment variables.
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Initialize the OpenAI client if an API key is available
const openai = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null;

// Function to generate resume content
export async function generateResumeContent(
  prompt: string,
  userContext: string
): Promise<string> {
  if (!openai) {
    console.error("OpenAI API key not configured");
    throw new Error("OpenAI API not configured");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using the latest available model
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer with knowledge of ATS optimization."
        },
        { 
          role: "user", 
          content: `${prompt}\n\nContext about my experience: ${userContext}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content || "Unable to generate content";
  } catch (error) {
    console.error("Error generating content with OpenAI:", error);
    throw error;
  }
}

// Function to analyze job description
export async function analyzeJobDescription(
  resumeText: string,
  jobDescription: string
): Promise<any> {
  if (!openai) {
    console.error("OpenAI API key not configured");
    throw new Error("OpenAI API not configured");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyzer that helps match resumes to job descriptions."
        },
        {
          role: "user",
          content: `Analyze how well this resume matches the job description. Provide a match score percentage, identify missing keywords, list strengths and weaknesses, and suggest improvements.

Resume:
${resumeText}

Job Description:
${jobDescription}

Format your response as JSON with the following structure:
{
  "matchScore": number,
  "missingKeywords": string[],
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[]
}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5
    });

    const content = response.choices[0].message.content;
    return content ? JSON.parse(content) : null;
  } catch (error) {
    console.error("Error analyzing job description with OpenAI:", error);
    throw error;
  }
}

// Function to generate bullet points from a job description
export async function generateBulletPoints(
  jobTitle: string,
  companyInfo: string,
  responsibilities: string
): Promise<string[]> {
  if (!openai) {
    console.error("OpenAI API key not configured");
    throw new Error("OpenAI API not configured");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer who creates impactful bullet points for job experiences."
        },
        {
          role: "user",
          content: `Create 3-5 impactful bullet points for my resume based on this job:
          
Job Title: ${jobTitle}
Company: ${companyInfo}
Responsibilities: ${responsibilities}

Make the bullet points specific, achievement-oriented, and quantifiable where possible. Format your response as a JSON array of strings.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    return content ? JSON.parse(content).bulletPoints : [];
  } catch (error) {
    console.error("Error generating bullet points with OpenAI:", error);
    throw error;
  }
}