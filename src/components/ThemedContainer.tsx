import React from 'react';

interface ThemedContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ThemedContainer({ children, className = "" }: ThemedContainerProps) {
  return (
    <div className={`app-container card mx-auto max-w-2xl mt-16 shadow-lg ${className}`}>
      {children}
    </div>
  );
}
