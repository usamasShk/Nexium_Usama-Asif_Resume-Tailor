import React from 'react';

export default function Logo() {
  return (
    <div className="logo select-none flex items-center gap-2">
      <span style={{ color: 'var(--text-light)' }}>RESUME</span>
      <span className="logo-accent" style={{ color: 'var(--accent)' }}>TAILOR</span>
    </div>
  );
}
