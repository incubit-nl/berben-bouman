'use client';

import React from 'react';
import { useField } from '@payloadcms/ui';

// This component will be used in the Payload CMS admin to preview special offers
export const SpecialOfferPreview: React.FC<{ path: string }> = ({ path }) => {
  const { value } = useField<{
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    backgroundColor?: string;
  }>({ path });

  // Get variant based on the selected color
  const getVariant = (colorName: string = ''): 'primary' | 'secondary' | 'accent' => {
    const lowerColor = colorName.toLowerCase();
    
    if (['peach', 'cream'].includes(lowerColor)) {
      return 'primary';
    } else if (['coral', 'sage'].includes(lowerColor)) {
      return 'secondary';
    } else {
      return 'accent';
    }
  };

  const variant = getVariant(value?.backgroundColor);
  
  // Define styles based on variant
  const styles = {
    primary: {
      background: 'linear-gradient(to bottom, #F9EFE7, #F0E4D8)',
      title: '#8d4e2f', // brown
      subtitle: '#da8660', // coral
      description: '#686230', // olive
      button: '#da8660', // coral
      border: '#dfae8e', // peach
    },
    secondary: {
      background: 'linear-gradient(to bottom right, rgba(218, 134, 96, 0.1), rgba(218, 134, 96, 0.2))',
      title: '#8d4e2f', // brown
      subtitle: '#da8660', // coral
      description: '#686230', // olive
      button: '#da8660', // coral
      border: 'rgba(218, 134, 96, 0.3)', // coral with opacity
    },
    accent: {
      background: 'linear-gradient(to bottom right, rgba(163, 162, 132, 0.2), rgba(163, 162, 132, 0.3))',
      title: '#8d4e2f', // brown
      subtitle: '#686230', // olive
      description: '#686230', // olive
      button: '#686230', // olive
      border: 'rgba(163, 162, 132, 0.4)', // sage with opacity
    },
  };

  const currentStyle = styles[variant];

  return (
    <div className="special-offer-preview">
      <h3 className="text-base font-semibold mb-2">Special Offer Preview</h3>
      <div 
        style={{ 
          backgroundColor: '#F9EFE7', // Light background
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <div 
          style={{ 
            border: `1px solid ${currentStyle.border}`,
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div style={{ 
            background: currentStyle.background,
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                marginBottom: '0.75rem',
                color: currentStyle.title,
              }}>
                {value?.title || 'Offer Title'}
              </h2>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '500',
                marginBottom: '0.75rem',
                color: currentStyle.subtitle,
              }}>
                {value?.subtitle || 'Offer Subtitle'}
              </h3>
              <p style={{ 
                fontSize: '1rem',
                marginBottom: '1.5rem',
                color: currentStyle.description,
                maxWidth: '32rem',
                margin: '0 auto 1.5rem',
                lineHeight: '1.5',
              }}>
                {value?.description || 'Offer description goes here. This text explains the benefits of this special offer.'}
              </p>
              <button style={{
                backgroundColor: currentStyle.button,
                color: 'white',
                padding: '0.625rem 1.5rem',
                borderRadius: '0.375rem',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
              }}>
                {value?.buttonText || 'Claim Offer'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        This is a preview of how the special offer will appear on the website. The actual appearance may vary slightly.
      </p>
      <p className="text-sm text-gray-500 mt-1">
        <strong>Note:</strong> The color selection determines the style variant, but exact colors are predefined in the theme.
      </p>
    </div>
  );
};

// Add default export for easier importing
export default SpecialOfferPreview; 