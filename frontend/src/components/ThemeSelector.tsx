// src/components/ThemeSelector.tsx
import React from 'react';
import { themeOptions } from '../constants/themeOptions';
import { ThemeName } from '../constants/themeOptions';

interface Props {
  value: ThemeName;
  onChange: (name: ThemeName) => void;
}

export const ThemeSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {themeOptions.map((theme) => (
        <div
          key={theme.name}
          className={`rounded-lg p-4 cursor-pointer text-center transition-all text-white ${theme.gradient} ${
            value === theme.name ? 'ring-4 ring-white' : 'hover:opacity-80'
          }`}
          onClick={() => onChange(theme.name as ThemeName)}
        >
          <div className="text-3xl mb-1">{theme.icon}</div>
          <p className="text-sm font-semibold">{theme.label}</p>
        </div>
      ))}
    </div>
  );
};
