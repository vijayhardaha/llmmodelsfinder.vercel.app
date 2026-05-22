import type { JSX } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ModelFinder } from '@/components/ModelFinder';
import { SeoContent } from '@/components/seo/SeoContent';
import type { Model, ApiResponse } from '@/types/models';

export const dynamic = 'force-dynamic';

/**
 * Fetch models from models.dev API
 *
 * @returns {Promise<Model[]>} Array of models
 */
async function fetchModels(): Promise<Model[]> {
  try {
    const response = await fetch('https://models.dev/api.json', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    const models: Model[] = [];

    for (const [_, providerData] of Object.entries(data)) {
      if (providerData.models) {
        for (const [, model] of Object.entries(providerData.models)) {
          models.push({
            id: model.id,
            name: model.name,
            provider: providerData.name,
            providerId: providerData.id,
            providerDoc: providerData.doc,
            family: model.family || 'unknown',
            free: model.cost?.input == 0 || false,
            inputCost: model.cost?.input || 0,
            outputCost: model.cost?.output || 0,
            context: model.limit?.context || 0,
            inputLimit: model.limit?.input || 0,
            outputLimit: model.limit?.output || 0,
            toolCall: model.tool_call || false,
            reasoning: model.reasoning || false,
            inputModality: model.modalities?.input || ['text'],
            outputModality: model.modalities?.output || ['text'],
            reasoningCost: model.cost?.reasoning || 0,
            cacheReadCost: model.cost?.cache_read || 0,
            cacheWriteCost: model.cost?.cache_write || 0,
            audioInputCost: model.cost?.audio_input || 0,
            audioOutputCost: model.cost?.audio_output || 0,
            structuredOutput: model.structured_output || false,
            temperature: !!model.temperature,
            weights: model.weights || false,
            knowledge: model.knowledge || '',
            releaseDate: model.release_date || '',
            lastUpdated: model.last_updated || '',
          });
        }
      }
    }

    return models;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
}

/**
 * Home page - Server component
 *
 * @returns {Promise<JSX.Element>} Home page element
 */
export default async function Home(): Promise<JSX.Element> {
  let models: Model[] = [];
  let error: string | null = null;

  try {
    models = await fetchModels();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch models';
    console.error('Page error:', error);
  }

  if (error && models.length === 0) {
    return (
      <main className="flex-1">
        <div className="border-4 border-black bg-white p-6 text-center md:p-12">
          <h2 className="font-heading text-xl font-black text-black uppercase md:text-2xl">Failed to Load Models</h2>
          <p className="text-text-muted mt-2 text-sm md:text-base">{error}</p>
          <p className="text-text-muted mt-4 text-xs">Please try refreshing the page</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-6">
      <ErrorBoundary>
        <ModelFinder initialModels={models} />
      </ErrorBoundary>
      <div className="mt-8">
        <SeoContent />
      </div>
    </main>
  );
}
