import Logo from '../../components/Logo';
import ThemedContainer from '../../components/ThemedContainer';

export default function UploadPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--primary-bg)]">
      <Logo />
      <ThemedContainer>
        <h1 className="text-3xl font-bold mb-4 text-[var(--text-dark)]">Upload Your Resume</h1>
        <p className="text-[var(--accent2)] mb-8">Start by uploading your resume to tailor it for your dream job.</p>
        <button className="btn-primary">Upload Resume</button>
      </ThemedContainer>
    </main>
  );
}
