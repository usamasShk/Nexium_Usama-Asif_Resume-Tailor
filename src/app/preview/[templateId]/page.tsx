"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ModernTemplate from '../../../components/templates/ModernTemplate';
import MinimalistTemplate from '../../../components/templates/MinimalistTemplate';
import CreativeTemplate from '../../../components/templates/CreativeTemplate';
import Logo from '../../../components/Logo';
import CosmicParticlesWrapper from '../../../components/CosmicParticlesWrapper';
import { saveAs } from 'file-saver';
import { Document as DocxDocument, Packer, Paragraph, TextRun } from 'docx';

// Add custom styles to hide scrollbars
const customStyles = `
  .react-pdf__Page__canvas {
    max-width: 100%;
    height: auto !important;
  }
  /* Hide scrollbars but keep functionality */
  .react-pdf__Document {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .react-pdf__Document::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;

interface ResumeData {
  formattedText: string;
}

export default function PreviewPage({ params }: { params: { templateId: string } }) {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if we have all necessary data
      const tailoredContent = localStorage.getItem('tailoredContent');
      if (!tailoredContent) {
        router.push('/resume');
        return;
      }

      try {
        // Parse the tailored content
        const parsedData = JSON.parse(tailoredContent) as ResumeData;
        
        // Validate the data structure
        if (!parsedData || !parsedData.formattedText) {
          throw new Error('Invalid resume data format');
        }

        setResumeData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error parsing resume data:', error);
        alert('Error preparing resume. Please try again.');
        router.push('/resume');
      }
    }
  }, [router]);

  const getTemplate = () => {
    if (!resumeData) {
      return <ModernTemplate formattedText="" />;
    }

    switch (params.templateId) {
      case 'modern':
        return <ModernTemplate formattedText={resumeData.formattedText} />;
      case 'minimalist':
        return <MinimalistTemplate formattedText={resumeData.formattedText} />;
      case 'creative':
        return <CreativeTemplate formattedText={resumeData.formattedText} />;
      default:
        return <ModernTemplate formattedText={resumeData.formattedText} />;
    }
  };

  // Helper to download as Word
  const handleDownloadWord = () => {
    if (!resumeData?.formattedText) return;
    const sections = resumeData.formattedText.split('\n\n').filter(Boolean).map(section => {
      const lines = section.split('\n').filter(line => line.trim());
      const title = lines[0];
      const content = lines.slice(1);
      return { title, content };
    });
    const doc = new DocxDocument({
      sections: [
        {
          properties: {},
          children: sections.flatMap(section => [
            new Paragraph({
              children: [new TextRun({ text: section.title, bold: true, size: 28 })],
              spacing: { after: 120 },
            }),
            ...section.content.map(line =>
              new Paragraph({
                children: [new TextRun({ text: line, size: 24 })],
                spacing: { after: 60 },
              })
            ),
            new Paragraph('')
          ])
        }
      ]
    });
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'resume.docx');
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--primary-bg)]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--accent)]">Preparing your resume...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black" style={{ position: 'relative' }}>
      <CosmicParticlesWrapper />
      <style jsx global>{customStyles}</style>
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push('/select-template')}
              className="px-4 py-2 text-[var(--accent)] border border-[var(--accent)] rounded-lg hover:bg-[var(--accent)]/10 transition"
            >
              Change Template
            </motion.button>
            <PDFDownloadLink
              document={getTemplate()}
              fileName="resume.pdf"
            >
              {({ loading }) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition"
                >
                  {loading ? 'Preparing PDF...' : 'Download PDF'}
                </motion.button>
              )}
            </PDFDownloadLink>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition"
              onClick={handleDownloadWord}
            >
              Download as Word
            </motion.button>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center relative z-10" style={{ background: 'none' }}>
        <div className="w-full max-w-5xl h-full bg-white rounded-lg overflow-hidden flex items-center justify-center" style={{ boxShadow: '0 0 0 0 transparent', background: 'white', position: 'relative', zIndex: 10 }}>
          <PDFViewer
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              color: 'black'
            }}
            showToolbar={false}
          >
            {getTemplate()}
          </PDFViewer>
        </div>
      </div>
    </main>
  );
} 
