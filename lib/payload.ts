import { getPayload } from 'payload';
import { cache } from 'react';
import type { Payload } from 'payload';
import config from '@payload-config';

// Create a singleton instance of the Payload client
let cachedPayload: Payload | null = null;

export const getPayloadClient = cache(async (): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET environment variable is missing');
  }

  if (cachedPayload) {
    return cachedPayload;
  }

  try {
    // Use the config imported from payload-config
    const instance = await getPayload({ config });
    cachedPayload = instance;
    return instance;
  } catch (error) {
    console.error('Error initializing Payload:', error);
    throw new Error('Failed to initialize Payload client');
  }
});

// For client components (via API)
export const clientAPI = {
  find: async ({ collection, where, limit }: { collection: string; where?: any; limit?: number }) => {
    try {
      const whereParam = where ? `where=${encodeURIComponent(JSON.stringify(where))}` : '';
      const limitParam = limit !== undefined ? `limit=${limit}` : 'limit=10';
      const queryString = [whereParam, limitParam].filter(Boolean).join('&');
      
      const url = `/api/${collection}?${queryString}`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`API response for ${collection}:`, data);
      return data;
    } catch (error) {
      console.error('Error in clientAPI.find:', error);
      // Return a default structure to prevent further errors
      return { docs: [], totalDocs: 0, limit: 10, totalPages: 0, page: 1, pagingCounter: 1, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null };
    }
  },
  findByID: async ({ collection, id }: { collection: string; id: string }) => {
    try {
      const url = `/api/${collection}/${id}`;
      console.log('Fetching by ID from URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`API response for ${collection}/${id}:`, data);
      return data;
    } catch (error) {
      console.error('Error in clientAPI.findByID:', error);
      return null;
    }
  },
}; 