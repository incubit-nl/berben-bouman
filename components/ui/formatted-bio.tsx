'use client';

import { RichText } from './rich-text';

interface FormattedBioProps {
  jsonContent: string;
}

/**
 * Component to render a bio that's in a JSON string format
 * Use this when you have a JSON string that needs to be parsed and rendered
 */
export function FormattedBio({ jsonContent }: FormattedBioProps) {
  // Try to parse the JSON string
  try {
    // Parse the JSON string to object
    const contentObj = JSON.parse(jsonContent);
    
    // Use the existing RichText component to render it
    return <RichText content={contentObj} />;
  } catch (error) {
    // If parsing fails, show the raw text or an error message
    return <div className="prose max-w-none">{jsonContent}</div>;
  }
} 