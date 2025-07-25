"use client";
import ThemedCard from "./ThemedCard";
import CosmicParticlesWrapper from "./CosmicParticlesWrapper";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  maskSelector?: string;
}

export default function PageContainer({ 
  children, 
  className = "", 
  cardClassName = "",
  maskSelector 
}: PageContainerProps) {
  return (
    <main className={`min-h-screen flex flex-col items-center justify-center bg-[var(--primary-bg)] px-4 py-12 pt-20 relative overflow-hidden ${className}`}>
      <CosmicParticlesWrapper maskSelector={maskSelector} />
      <ThemedCard className={cardClassName}>
        {children}
      </ThemedCard>
    </main>
  );
} 