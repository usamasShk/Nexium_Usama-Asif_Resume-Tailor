"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--primary-bg)] text-white">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">{error.message}</p>
      <button
        className="btn-primary"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
} 