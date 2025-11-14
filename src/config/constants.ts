/**
 * LMS Frontend Configuration Constants
 *
 * Centralized configuration to avoid hardcoding values throughout the application.
 * Update URLs, API endpoints, and other constants here for easy maintenance.
 */

export const API_CONFIG = {
  // Base API URL for production
  PRODUCTION_BASE_URL: 'https://awareness.phishsheriff.com/api/v1',

  // Local development URL
  // DEVELOPMENT_BASE_URL: 'https://938e65e5-de47-44ae-a94e-48ce4a100693.mock.pstmn.io/api/v1',
  DEVELOPMENT_BASE_URL: 'http://dev-console.phishsheriff.com/v1',

  // Alternative development URL (if needed)
  DEVELOPMENT_ALT_URL: 'https://awareness.phishsheriff.com/api/v1',
  // DEVELOPMENT_ALT_URL: 'https://awareness.phishsheriff.com/api/v1',
} as const;

/**
 * Get the appropriate API base URL based on environment and hostname
 */
export const getBaseApiUrl = (): string => {
  // Check for environment variable override first
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const port = window.location.port || '443';

    // Check for localhost or local development
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.includes('192.168')
    ) {
      // If running on port 3000, use standard development API
      if (port === '3000') {
        return API_CONFIG.DEVELOPMENT_BASE_URL;
      }
      // If running on other ports, use alternative API access
      return API_CONFIG.DEVELOPMENT_ALT_URL;
    }

    // For other domains, construct URL with current hostname and port
    return `https://${hostname}/api/v1`;
  }

  // Default to production URL
  return API_CONFIG.PRODUCTION_BASE_URL;
};

/**
 * Other application constants can be added here
 */
export const APP_CONFIG = {
  DEFAULT_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
