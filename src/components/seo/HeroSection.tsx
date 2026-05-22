'use client';

import type { JSX } from 'react';

import { Button } from '@/components/ui/Button';

/**
 * Hero section component with SEO-optimized headline and CTA buttons.
 *
 * @returns {JSX.Element} Hero section component.
 */
export function HeroSection(): JSX.Element {
  return (
    <section className="border-4 border-black bg-white p-6 text-center md:p-12">
      <h1 className="font-heading text-3xl font-black text-black uppercase md:text-5xl">
        Compare and Discover AI Models Instantly
      </h1>

      <p className="text-text-muted mt-4 text-base md:text-lg">
        Explore the latest LLMs from OpenAI, Anthropic, Google, DeepSeek, Mistral, Meta, xAI, and more. Filter by
        pricing, context window, reasoning ability, tool support, speed, release year, and free availability.
      </p>

      <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:justify-center">
        <Button variant="primary" size="md" asChild>
          <span>Explore Models</span>
        </Button>
        <Button variant="secondary" size="md" asChild>
          <span>Compare Providers</span>
        </Button>
        <Button variant="primary-outlined" size="md" asChild>
          <span>Find Free Models</span>
        </Button>
      </div>
    </section>
  );
}
