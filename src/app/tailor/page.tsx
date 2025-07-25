import Logo from '../../components/Logo';
import ThemedContainer from '../../components/ThemedContainer';
import CosmicParticlesWrapper from "../../components/CosmicParticlesWrapper";

export default function TailorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--primary-bg)]">
      <CosmicParticlesWrapper />
      <Logo />
      <ThemedContainer className="main-card">
        <h1 className="text-3xl font-bold mb-4 text-[var(--text-dark)]">Tailor Your Resume</h1>
        <p className="text-[var(--accent)] mb-8">Personalize your resume for each job application.</p>
        <button className="btn-purple">Tailor Now</button>
      </ThemedContainer>
    </main>
  );
}
