import { getPayload } from 'payload';
import config from '@payload-config';
import { Header } from './header';

async function getHeaderData() {
  try {
    const payload = await getPayload({ config });
    
    // Fetch practice pages
    const practicePages = await payload.find({
      collection: 'pages',
      where: {
        pageType: {
          equals: 'practice',
        },
      },
      sort: 'title',
    }).then(res => res.docs.map(page => ({
      title: page.title,
      slug: page.slug,
    })));

    // Get treatment categories directly from the treatments collection
    const treatments = await payload.find({
      collection: 'treatments',
      where: {
        status: {
          equals: 'published',
        },
      },
    }).then(res => res.docs);
    
    // Get treatment categories directly from global
    const treatmentCategories = await payload.find({
      collection: 'treatment-categories',
    }).then(result => {
      if (result && result.docs && result.docs.length > 0) {
        // Map and sort categories
        return result.docs
          .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0))
          .map((cat: any) => cat.value);
      }
      
      // Fallback: extract categories from treatments
      return Array.from(
        new Set(treatments.map(treatment => treatment.category))
      );
    }).catch(error => {
      console.error('Error fetching global treatment categories:', error);
      // Fallback: extract categories from treatments
      return Array.from(
        new Set(treatments.map(treatment => treatment.category))
      );
    });
    
    // Get contact info
    const contactInfo = await payload.find({
      collection: 'contact-info',
      limit: 1,
    }).then(res => res.docs[0]);
    
    return {
      practicePages,
      treatmentCategories,
      contactInfo,
    };
  } catch (error) {
    console.error('Error fetching header data:', error);
    return {
      practicePages: [],
      treatmentCategories: [],
      contactInfo: null,
    };
  }
}

export async function HeaderWrapper() {
  const { practicePages, treatmentCategories, contactInfo } = await getHeaderData();
  
  return (
    <Header 
      practicePages={practicePages}
      treatmentCategories={treatmentCategories}
      contactInfo={contactInfo}
    />
  );
} 