'use client';

import { Component } from 'react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/Button';

/**
 * Props for ErrorBoundary component.
 *
 * @interface ErrorBoundaryProps
 * @property {ReactNode} children - Child components to render.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * State for ErrorBoundary component.
 *
 * @interface ErrorBoundaryState
 * @property {boolean} hasError - Whether an error has been caught.
 * @property {Error | null} error - The caught error object.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component for catching React errors
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Error boundary constructor
   *
   * @param {ErrorBoundaryProps} props - Component props
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Derive state from error
   *
   * @param {Error} error - Caught error
   *
   * @returns {ErrorBoundaryState} Updated state
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Catch and log errors
   *
   * @param {Error} error - Caught error
   */
  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error);
  }

  /**
   * Render error boundary
   *
   * @returns {ReactNode} Rendered content
   */
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="border-4 border-black bg-white p-6 text-center md:p-12">
          <h2 className="font-heading text-xl font-black text-black uppercase md:text-2xl">Something went wrong</h2>
          <p className="text-text-muted mt-2 text-sm md:text-base">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button id="btn-reload" variant="primary" size="md" onClick={() => window.location.reload()} className="mt-4">
            Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
