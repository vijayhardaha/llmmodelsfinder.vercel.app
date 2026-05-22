'use client';

import type { JSX } from 'react';

import { Container } from '@/components/layout/Container';

import { HeroSection } from './HeroSection';
import { IntroSection } from './IntroSection';

/**
 * Main SEO content component combining all SEO sections.
 *
 * @returns {JSX.Element} SEO content component.
 */
export function SeoContent(): JSX.Element {
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <HeroSection />
        <IntroSection />
      </div>
    </Container>
  );
}
