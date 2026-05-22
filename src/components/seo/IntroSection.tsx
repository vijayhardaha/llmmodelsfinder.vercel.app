'use client';

import type { JSX } from 'react';

/**
 * SEO intro section component with provider and comparison highlights.
 *
 * @returns {JSX.Element} Intro section component.
 */
export function IntroSection(): JSX.Element {
  return (
    <section className="bg-surface-alt border-4 border-black p-6 md:p-12">
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
          <ul className="text-text-muted mt-2 grid grid-cols-2 gap-1 text-sm">
            <li>• OpenAI</li>
            <li>• Anthropic</li>
            <li>• Google</li>
            <li>• Meta</li>
            <li>• Mistral AI</li>
            <li>• xAI</li>
            <li>• DeepSeek</li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-black uppercase">Compare models based on:</h3>
          <ul className="text-text-muted mt-2 grid grid-cols-2 gap-1 text-sm">
            <li>• context length</li>
            <li>• input/output pricing</li>
            <li>• tool calling support</li>
            <li>• reasoning capabilities</li>
            <li>• multimodal support</li>
            <li>• open-source availability</li>
            <li>• API compatibility</li>
            <li>• release year</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
