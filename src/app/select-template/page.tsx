"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CosmicParticlesWrapper from '../../components/CosmicParticlesWrapper';

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  color: string;
  features: string[];
}

const templates: TemplateOption[] = [
  {
    id: 'minimalist',
    name: 'Minimalist Professional',
    description: 'Clean and modern design perfect for any industry',
    color: '#2563eb',
    features: ['Clean Layout', 'Modern Typography', 'ATS Friendly', 'Professional Design']
  },
  {
    id: 'modern',
    name: 'Modern Blue',
    description: 'Contemporary design with a professional touch',
    color: '#3b82f6',
    features: ['Two-Column Layout', 'Skill Highlights', 'Professional Look', 'Easy to Read']
  },
  {
    id: 'creative',
    name: 'Creative Purple',
    description: 'Stand out with a unique and creative design',
    color: '#8b5cf6',
    features: ['Unique Layout', 'Color Accents', 'Modern Style', 'Eye-catching Design']
  }
];

export default function SelectTemplatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if we have the necessary data
      const resume = localStorage.getItem('resume');
      const jobDescription = localStorage.getItem('jobDescription');
      
      if (!resume || !jobDescription) {
        router.push('/resume');
        return;
      }
    }
  }, [router]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (typeof window !== "undefined") {
      // Store selected template
      localStorage.setItem('selectedTemplate', templateId);
      // Navigate to preview page after a short delay
      setTimeout(() => {
        router.push(`/preview/${templateId}`);
      }, 100);
    }
  };

  return (
    <main className="min-h-screen bg-transparent relative z-10 flex flex-col items-center justify-center py-12 px-4">
      <CosmicParticlesWrapper />
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-light)] mb-4 drop-shadow-glow">
            Choose Your Resume Template
          </h1>
          <p className="text-[var(--accent)] max-w-2xl mx-auto">
            Select from our professionally designed templates. Each template is optimized for ATS systems
            and crafted to help you stand out from the crowd.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div 
                className={`main-card max-w-lg rounded-xl shadow-lg overflow-hidden transition-all duration-300 text-black ${hoveredTemplate === template.id ? 'transform scale-[1.02] shadow-2xl' : ''}`}
                style={{ backgroundColor: '#fff', background: '#fff' }}
              >
                {/* Template Preview */}
                <div className="relative h-[300px] w-full text-black" style={{ backgroundColor: '#fff', background: '#fff' }}>
                  {/* Removed gradient/overlay, solid white background only */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-black" style={{ backgroundColor: '#fff', background: '#fff' }}>
                    <div className="w-full h-full border-2 border-gray-200 rounded-lg text-black shadow-lg" style={{ backgroundColor: '#fff', background: '#fff' }}>
                      {/* Template Preview Content */}
                      <div className="h-full p-4 flex flex-col">
                        <div className="border-b-2" style={{ borderColor: template.color }}>
                          <div className="text-lg font-bold mb-2">Professional Resume</div>
                          <div className="text-sm text-gray-600 mb-4">Software Developer</div>
                        </div>
                        <div className="flex-1 flex gap-4 mt-4">
                          <div className="flex-[2]">
                            <div className="text-xs font-bold mb-2" style={{ color: template.color }}>EXPERIENCE</div>
                            <div className="text-xs text-gray-600">• Senior Developer</div>
                            <div className="text-xs text-gray-600">• Full Stack Engineer</div>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-bold mb-2" style={{ color: template.color }}>SKILLS</div>
                            <div className="flex flex-wrap gap-1">
                              {['React', 'Node.js', 'Python'].map((skill) => (
                                <span
                                  key={skill}
                                  className="text-[10px] px-2 py-1 rounded"
                                  style={{ 
                                    backgroundColor: `${template.color}22`,
                                    color: template.color
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Removed hover overlay for a clean white background */}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--text-light)] mb-2">
                    {template.name}
                  </h3>
                  <p className="text-[var(--accent)] mb-4">{template.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: `${template.color}22`,
                          color: template.color,
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleTemplateSelect(template.id)}
                    className="bg-[var(--accent)] text-white px-6 py-3 rounded-full font-semibold mt-4 w-full hover:bg-opacity-90 transition"
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--accent)] text-sm">
            All templates are ATS-friendly and optimized for maximum readability
          </p>
        </motion.div>
      </div>
    </main>
  );
} 
