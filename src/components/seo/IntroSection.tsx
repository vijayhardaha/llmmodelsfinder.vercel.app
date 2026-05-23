'use client';

import type { JSX } from 'react';

import { BulletList } from '@/components/ui/BulletList';
import { Button } from '@/components/ui/Button';

/**
 * Popular search terms displayed as clickable buttons in the intro section.
 * These represent common queries users search for when comparing AI/LLM models.
 *
 * @type {string[]}
 */
const popularSearches: string[] = [
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
 * SEO intro section component with provider and comparison highlights.
 *
 * @returns {JSX.Element} Intro section component.
 */
export function IntroSection(): JSX.Element {
  return (
    <section id="intro-section" className="bg-surface-alt border-4 border-black p-6 md:p-12">
      <h2 className="font-heading text-2xl font-black text-black uppercase md:text-4xl">
        Discover the Best AI Models for Your Use Case
      </h2>

      <p className="text-text-muted mt-3 text-base md:text-lg">
        LLM Finder helps developers, researchers, and AI teams compare large language models across multiple providers
        in one place. Whether you&apos;re searching for the cheapest coding model, the best reasoning model, a free
        API-compatible LLM, or models with massive context windows, you can filter and compare them instantly.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-heading text-lg font-bold text-black uppercase">Browse models from providers like:</h3>
          <BulletList items={['OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral AI', 'xAI', 'DeepSeek']} />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-black uppercase">Compare models based on:</h3>
          <BulletList
            items={[
              'context length',
              'input/output pricing',
              'tool calling support',
              'reasoning capabilities',
              'multimodal support',
              'open-source availability',
              'API compatibility',
              'release year',
            ]}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" id="popular-searches">
        {popularSearches.map((search) => (
          <Button
            key={search}
            id={`btn-popular-search-${search.toLowerCase().replace(/\s+/g, '-')}`}
            variant="primary-outlined"
            size="sm"
            asChild
          >
            <span>{search}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}
