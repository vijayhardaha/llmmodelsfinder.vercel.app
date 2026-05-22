/**
 * Filter state for model search and filtering.
 *
 * @type {FilterState}
 * @property {string} search - Search query string
 * @property {string} provider - Provider filter
 * @property {string} family - Model family filter
 * @property {boolean | null} toolCall - Tool call support filter
 * @property {boolean | null} reasoning - Reasoning support filter
 * @property {string} inputModality - Input modality filter
 * @property {string} outputModality - Output modality filter
 * @property {boolean | null} free - Free tier filter
 * @property {string} minInputCost - Minimum input cost
 * @property {string} maxInputCost - Maximum input cost
 * @property {string} minOutputCost - Minimum output cost
 * @property {string} maxOutputCost - Maximum output cost
 * @property {string} minContext - Minimum context window
 * @property {string} maxContext - Maximum context window
 * @property {string} minKnowledge - Minimum knowledge cutoff
 * @property {string} maxKnowledge - Maximum knowledge cutoff
 * @property {string} minReleaseYear - Minimum release year
 * @property {string} maxReleaseYear - Maximum release year
 */
export interface FilterState {
  search: string;
  provider: string;
  family: string;
  toolCall: boolean | null;
  reasoning: boolean | null;
  inputModality: string;
  outputModality: string;
  free: boolean | null;
  minInputCost: string;
  maxInputCost: string;
  minOutputCost: string;
  maxOutputCost: string;
  minContext: string;
  maxContext: string;
  minKnowledge: string;
  maxKnowledge: string;
  minReleaseYear: string;
  maxReleaseYear: string;
}

/**
 * Model information structure.
 *
 * @type {Model}
 * @property {string} id - Model identifier
 * @property {string} name - Model display name
 * @property {string} provider - Provider name
 * @property {string} providerId - Provider-specific model identifier
 * @property {string} [providerDoc] - Provider documentation URL
 * @property {string} family - Model family
 * @property {boolean} toolCall - Tool call support
 * @property {boolean} reasoning - Reasoning support
 * @property {string[]} inputModality - Input modalities
 * @property {string[]} outputModality - Output modalities
 * @property {boolean} free - Free tier availability
 * @property {number} inputCost - Input cost per M tokens
 * @property {number} outputCost - Output cost per M tokens
 * @property {number} reasoningCost - Reasoning cost per M tokens
 * @property {number} cacheReadCost - Cache read cost per M tokens
 * @property {number} cacheWriteCost - Cache write cost per M tokens
 * @property {number} audioInputCost - Audio input cost per M tokens
 * @property {number} audioOutputCost - Audio output cost per M tokens
 * @property {number} context - Context window size
 * @property {number} inputLimit - Input token limit
 * @property {number} outputLimit - Output token limit
 * @property {boolean} [structuredOutput] - Structured output support
 * @property {boolean} [temperature] - Temperature parameter support
 * @property {boolean} [weights] - Open weights availability
 * @property {string} knowledge - Knowledge cutoff date
 * @property {string} releaseDate - Release date
 * @property {string} lastUpdated - Last update date
 */
export interface Model {
  id: string;
  name: string;
  provider: string;
  providerId: string;
  providerDoc?: string;
  family: string;
  toolCall: boolean;
  reasoning: boolean;
  inputModality: string[];
  outputModality: string[];
  free: boolean;
  inputCost: number;
  outputCost: number;
  reasoningCost: number;
  cacheReadCost: number;
  cacheWriteCost: number;
  audioInputCost: number;
  audioOutputCost: number;
  context: number;
  inputLimit: number;
  outputLimit: number;
  structuredOutput?: boolean;
  temperature?: boolean;
  weights?: boolean;
  knowledge: string;
  releaseDate: string;
  lastUpdated: string;
}

/**
 * API response structure from models.dev endpoint.
 *
 * @type {ApiResponse}
 * @property {object} [provider] - Provider data keyed by provider name
 * @property {string} [provider.name] - Provider display name
 * @property {string} [provider.doc] - Provider documentation URL
 * @property {object} [provider.models] - Models object keyed by model ID
 * @property {string} [provider.models.id] - Model identifier
 * @property {string} [provider.models.name] - Model display name
 * @property {string} [provider.models.family] - Model family
 * @property {boolean} [provider.models.tool_call] - Tool call support
 * @property {boolean} [provider.models.reasoning] - Reasoning support
 * @property {object} [provider.models.modalities] - Input/output modalities
 * @property {string[]} [provider.models.modalities.input] - Input types
 * @property {string[]} [provider.models.modalities.output] - Output types
 * @property {boolean} [provider.models.open_weights] - Open weights flag
 * @property {object} [provider.models.cost] - Pricing information
 * @property {number} [provider.models.cost.input] - Input cost per M tokens
 * @property {number} [provider.models.cost.output] - Output cost per M tokens
 * @property {number} [provider.models.cost.reasoning] - Reasoning cost per M tokens
 * @property {number} [provider.models.cost.cache_read] - Cache read cost per M tokens
 * @property {number} [provider.models.cost.cache_write] - Cache write cost per M tokens
 * @property {number} [provider.models.cost.audio_input] - Audio input cost per M tokens
 * @property {number} [provider.models.cost.audio_output] - Audio output cost per M tokens
 * @property {object} [provider.models.limit] - Model limits
 * @property {number} [provider.models.limit.context] - Context window
 * @property {number} [provider.models.limit.input] - Input token limit
 * @property {number} [provider.models.limit.output] - Output token limit
 * @property {string} [provider.models.knowledge] - Knowledge cutoff
 * @property {string} [provider.models.release_date] - Release date
 * @property {string} [provider.models.last_updated] - Last update date
 * @property {boolean} [provider.models.structured_output] - Structured output support
 * @property {number} [provider.models.temperature] - Temperature parameter
 * @property {boolean} [provider.models.weights] - Weights availability
 */
export interface ApiResponse {
  [provider: string]: {
    id: string;
    name: string;
    doc?: string;
    models: {
      [modelId: string]: {
        id: string;
        name: string;
        family?: string;
        tool_call?: boolean;
        reasoning?: boolean;
        modalities?: { input?: string[]; output?: string[] };
        open_weights?: boolean;
        cost?: {
          input?: number;
          output?: number;
          reasoning?: number;
          cache_read?: number;
          cache_write?: number;
          audio_input?: number;
          audio_output?: number;
        };
        limit?: { context?: number; input?: number; output?: number };
        knowledge?: string;
        release_date?: string;
        last_updated?: string;
        structured_output?: boolean;
        temperature?: number;
        weights?: boolean;
      };
    };
  };
}
