import { Trocchi, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

/**
 * Poppins font configuration for body text.
 */
export const serifFont = Trocchi({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
  display: 'swap',
});

/**
 * Space Grotesk font configuration for headings.
 */
export const sansFont = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  preload: true,
  display: 'swap',
});

/**
 * JetBrains Mono font configuration for mono text.
 */
export const monoFont = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  preload: true,
  display: 'swap',
});

/**
 * Combined html font class names.
 */
export const htmlFontClassName = `${serifFont.variable} ${sansFont.variable} ${monoFont.variable}`;
