// src/constants/themeOptions.ts
export type ThemeName = 'diwali' | 'warm' | 'cool' | 'classic';

export const themeOptions: {
  name: ThemeName;
  label: string;
  gradientVars: string; // use CSS vars
  icon: string;
  ring: string;
}[] = [
  {
    name: 'diwali',
    label: 'Diwali Vibes',
    gradientVars: 'var(--diwali-start), var(--diwali-end)',
    icon: '🎉',
    ring: 'ring-sis-yellow',
  },
  {
    name: 'warm',
    label: 'Warm & Cozy',
    gradientVars: 'var(--warm-start), var(--warm-end)',
    icon: '🔥',
    ring: 'ring-sis-coral',
  },
  {
    name: 'cool',
    label: 'Cool & Fresh',
    gradientVars: 'var(--cool-start), var(--cool-end)',
    icon: '❄️',
    ring: 'ring-sis-teal',
  },
  {
    name: 'classic',
    label: 'Classic',
    gradientVars: 'var(--classic-start), var(--classic-end)',
    icon: '🎨',
    ring: 'ring-sis-purple',
  },
];
