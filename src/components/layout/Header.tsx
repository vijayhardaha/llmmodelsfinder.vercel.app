import type { JSX } from 'react';

import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/Button';

import { Container } from './Container';

/**
 * Header component.
 *
 * @returns {JSX.Element} Header component.
 */
export function Header(): JSX.Element {
  return (
    <header id="site-header" className="border-b-4 border-black bg-white py-2">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-black text-black uppercase md:text-4xl">LLM Finder</h1>
            <p className="text-text-muted text-xs md:text-sm">Compare and discover AI models across providers</p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Button id="btn-original-models-dev" asChild variant="primary" size="sm">
              <a href="https://models.dev/" target="_blank" rel="noopener noreferrer">
                Original: models.dev
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
