"use client";
import FallingStarsBackground from "@/components/FallingStarsBackground";

interface CosmicParticlesWrapperProps {
  maskSelector?: string;
}

export default function CosmicParticlesWrapper({ maskSelector }: CosmicParticlesWrapperProps) {
  // Default maskSelector to .main-card, .feature-card if not provided
  return <FallingStarsBackground maskSelector={maskSelector || '.main-card, .feature-card'} />;
}
