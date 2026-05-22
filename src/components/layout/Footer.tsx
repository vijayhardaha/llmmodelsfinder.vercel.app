import type { JSX } from 'react';

import { Container } from './Container';

/**
 * Footer component with SEO-optimized content.
 *
 * @returns {JSX.Element} Footer component.
 */
export function Footer(): JSX.Element {
  return (
    <footer className="bg-surface-alt border-t-4 border-black py-4 md:py-12">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-heading text-xl font-black tracking-wider text-black uppercase md:text-2xl">
              LLM Finder
            </h3>
            <p className="text-text-muted mt-2 max-w-2xl text-sm md:mt-3">
              LLM Finder is a searchable AI model directory built for developers and AI enthusiasts. Compare language
              models across pricing, context windows, reasoning, tool support, and providers to quickly find the right
              model for your application.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-black tracking-wider text-black uppercase md:text-2xl">Credits</h3>
            <p className="text-text-muted mt-2 text-sm md:mt-3">
              Model metadata and listings are inspired by and partially sourced from:
            </p>
            <ul className="text-text-muted mt-2 space-y-1 text-sm">
              <li>
                •{' '}
                <a
                  href="https://models.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  models.dev
                </a>
              </li>
              <li>
                •{' '}
                <a
                  href="https://opencode.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  OpenCode Team
                </a>
              </li>
            </ul>
            <p className="text-text-muted mt-3 text-xs">
              Huge thanks to their teams for maintaining and organizing AI model information for the developer
              community.
            </p>
          </div>
        </div>

        <p className="text-text-muted mt-6 border-t-2 border-black pt-4 text-center text-xs md:mt-8 md:text-sm">
          © {new Date().getFullYear()} LLM Finder. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
