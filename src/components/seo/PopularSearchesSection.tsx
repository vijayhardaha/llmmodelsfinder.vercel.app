'use client';

import type { JSX } from 'react';

import { Button } from '@/components/ui/Button';

const popularSearches = [
  'Best coding AI models',
  'Cheapest LLM APIs',
  'Free AI models',
  'Best reasoning models',
  'Models with large context windows',
  'Open source LLMs',
  'GPT-4 alternatives',
  'Claude alternatives',
  'Fastest AI models',
  'AI agent compatible models',
];

/**
 * Popular searches section component for SEO.
 *
 * @returns {JSX.Element} Popular searches section component.
 */
export function PopularSearchesSection(): JSX.Element {
  return (
    <section className="border-4 border-black bg-white p-6 md:p-12">
      <h2 className="font-heading text-2xl font-black text-black uppercase md:text-4xl">Popular Searches</h2>
      <p className="text-text-muted mt-3 text-base md:text-lg">
        These pages help with massive indexing and long-tail SEO traffic.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {popularSearches.map((search) => (
          <Button key={search} variant="primary-outlined" size="sm">
            {search}
          </Button>
        ))}
      </div>
    </section>
  );
}
