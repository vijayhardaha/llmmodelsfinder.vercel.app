import type { JSX } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ModelFinder } from '@/components/ModelFinder';
import { SeoContent } from '@/components/seo/SeoContent';
import type { ApiResponse, Model } from '@/types/models';

export const dynamic = 'force-dynamic';

/**
 * Fetches raw API data from models.dev endpoint.
 *
 * @returns {Promise<ApiResponse>} The raw API response.
 */
async function fetchRawData(): Promise<ApiResponse> {
  const response = await fetch('https://models.dev/api.json', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<ApiResponse>;
}

/**
 * Transforms a single raw model entry into a Model object.
 *
 * @param {object} model - Raw model data from the API.
 * @param {string} providerName - Provider display name.
 * @param {string} providerId - Provider identifier.
 * @param {string} [providerDoc] - Provider documentation URL.
 *
 * @returns {Model} A normalized Model object.
 */
function transformModel(
  model: ApiResponse[string]['models'][string],
  providerName: string,
  providerId: string,
  providerDoc?: string
): Model {
  return {
    id: model.id,
    name: model.name,
    provider: providerName,
    providerId,
    providerDoc,
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
  };
}

/**
 * Parses all provider entries from the API response into a flat array of models.
 *
 * @param {ApiResponse} data - The API response object.
 *
 * @returns {Model[]} A flat array of all models.
 */
function parseProviderModels(data: ApiResponse): Model[] {
  const models: Model[] = [];

  for (const providerEntry of Object.values(data)) {
    if (!providerEntry.models) continue;

    for (const model of Object.values(providerEntry.models)) {
      models.push(transformModel(model, providerEntry.name, providerEntry.id, providerEntry.doc));
    }
  }

  return models;
}

/**
 * Fetch models from models.dev API.
 *
 * @returns {Promise<Model[]>} Array of models.
 */
async function fetchModels(): Promise<Model[]> {
  const data = await fetchRawData();
  return parseProviderModels(data);
}

/**
 * Renders the error state when models fail to load.
 *
 * @param {string} errorMessage - The error message to display.
 *
 * @returns {JSX.Element} Error state page element.
 */
function renderErrorState(errorMessage: string): JSX.Element {
  return (
    <main id="error-state" className="flex-1">
      <div className="border-4 border-black bg-white p-6 text-center md:p-12">
        <h2 className="font-heading text-xl font-black text-black uppercase md:text-2xl">Failed to Load Models</h2>
        <p className="text-text-muted mt-2 text-sm md:text-base">{errorMessage}</p>
        <p className="text-text-muted mt-4 text-xs">Please try refreshing the page</p>
      </div>
    </main>
  );
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
    return renderErrorState(error);
  }

  return (
    <main id="main-content" className="flex-1 py-6">
      <ErrorBoundary>
        <ModelFinder initialModels={models} />
      </ErrorBoundary>
      <div className="mt-8">
        <SeoContent />
      </div>
    </main>
  );
}
