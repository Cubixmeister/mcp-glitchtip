import fetch from 'node-fetch';
import { GlitchTipIssue, GlitchTipEvent, GlitchTipConfig, GlitchTipConnectionError, GlitchTipApiError, GlitchTipValidationError } from './types.js';

export class GlitchTipClient {
  private config: GlitchTipConfig;

  constructor(config: GlitchTipConfig) {
    this.config = config;
    this.validateConfig();
  }

  private validateConfig(): void {
    if (!this.config.baseUrl) {
      throw new GlitchTipValidationError('Base URL is required');
    }
    if (!this.config.sessionId) {
      throw new GlitchTipValidationError('Session ID is required');
    }
    if (!this.config.organization) {
      throw new GlitchTipValidationError('Organization is required');
    }
    // Ensure baseUrl ends with /api/0
    if (!this.config.baseUrl.endsWith('/api/0')) {
      if (this.config.baseUrl.endsWith('/')) {
        this.config.baseUrl += 'api/0';
      } else {
        this.config.baseUrl += '/api/0';
      }
    }
  }

  private getHeaders(): Record<string, string> {
    return {
      'Cookie': `sessionid=${this.config.sessionId}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new GlitchTipApiError('Authentication failed. Check your session ID.', response.status);
        }
        if (response.status === 403) {
          throw new GlitchTipApiError('Access forbidden. Check your permissions.', response.status);
        }
        if (response.status === 404) {
          throw new GlitchTipApiError('Resource not found.', response.status);
        }
        throw new GlitchTipApiError(`HTTP ${response.status}: ${response.statusText}`, response.status);
      }

      const data = await response.json() as T;
      return data;
    } catch (error) {
      if (error instanceof GlitchTipApiError) {
        throw error;
      }
      throw new GlitchTipConnectionError(`Failed to connect to GlitchTip: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get issues (errors) from GlitchTip
   * @param query Optional query string (e.g., 'is:unresolved', 'is:resolved')
   */
  async getIssues(query?: string): Promise<GlitchTipIssue[]> {
    if (!this.config.organization) {
      throw new GlitchTipValidationError('Organization is required in config.');
    }

    let endpoint = `/organizations/${this.config.organization}/issues/`;
    if (query) {
      endpoint += `?query=${encodeURIComponent(query)}`;
    }

    return this.makeRequest<GlitchTipIssue[]>(endpoint);
  }


  /**
   * Get events for a specific issue
   * @param issueId The issue ID
   * @param latest If true, gets only the latest event
   */
  async getIssueEvents(issueId: string, latest: boolean = false): Promise<GlitchTipEvent | GlitchTipEvent[]> {
    const endpoint = latest 
      ? `/issues/${issueId}/events/latest/`
      : `/issues/${issueId}/events/`;
    
    return this.makeRequest<GlitchTipEvent | GlitchTipEvent[]>(endpoint);
  }



}