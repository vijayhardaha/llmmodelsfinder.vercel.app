import type { JSX, ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { htmlFontClassName } from '@/config/fonts';
import { metadata } from '@/config/metadata';

import './globals.css';

export { metadata };

/**
 * Root layout component.
 *
 * @param {object} props - Component props.
 * @param {ReactNode} props.children - Child elements.
 *
 * @returns {JSX.Element} Root layout element.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <html lang="en" className={`${htmlFontClassName} h-full antialiased`}>
      <body className="bg-background font-body text-text flex min-h-full flex-col">
        <TooltipProvider>
          <Header />
          {children}
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
