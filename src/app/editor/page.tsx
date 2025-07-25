"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../../components/Logo';
import SimplePDFTemplate from '../../components/templates/SimplePDFTemplate';
import { parseResumeResponse } from '@/lib/parseResumeResponse';

interface ResumeData {
  summary: string;
  skills: string[];
  experience: string;
  education: string;
}

export default function EditorPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load the tailored content from localStorage
    const tailoredContent = localStorage.getItem('tailoredContent');
    console.log('Raw tailored content:', tailoredContent);
    
    if (!tailoredContent) {
      console.log('No tailored content found');
      router.push('/resume');
      return;
    }

    // Parse the content
    const parsed = parseResumeResponse(tailoredContent);
    console.log('Parsed resume data:', parsed);
    
    if (parsed) {
      setResumeData(parsed);
    } else {
      console.error('Failed to parse resume data');
    }
  }, [router]);

  if (!resumeData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--primary-bg)]">
        <div className="text-white">Loading resume data...</div>
      </main>
    );
  }

  console.log('Rendering template with data:', resumeData);

  return (
    <main className="min-h-screen flex flex-col items-center bg-[var(--primary-bg)] p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-6">
          <Logo />
        </div>
        <h1 className="text-2xl text-white mb-6">Your Resume Preview</h1>
        
        {/* PDF Template */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <SimplePDFTemplate data={resumeData} />
        </div>
      </div>
    </main>
  );
}