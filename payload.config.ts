import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Core Collections
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Settings } from './collections/Settings';

// Content Collections
import { Pages } from './collections/Pages';
import { Treatments } from './collections/Treatments';
import { TreatmentCategories } from './collections/TreatmentCategories';
import { TeamMembers } from './collections/TeamMembers';
import { PracticePages } from './collections/PracticePages';
import { FAQ } from './collections/Faq';
import { Testimonials } from './collections/Testimonials';
import { ContactInfo } from './collections/ContactInfo';
import { PracticeInfo } from './collections/PracticeInfo';
import { Locations } from './collections/Locations';

// Special Pages
import { EnglishPage } from './collections/EnglishPage';
import { ChildrenPage } from './collections/ChildrenPage';
import { CareersPage } from './collections/CareersPage';
import { Privacy } from './collections/Privacy';
import { TermsAndConditions } from './collections/TermsAndConditions';

// Utility Collections
import { Alerts } from './collections/Alerts';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Add groupBy to collections for better admin organization
Users.admin = { ...Users.admin, group: 'Admin' };
Media.admin = { ...Media.admin, group: 'Admin' };
Settings.admin = { ...Settings.admin, group: 'Admin' };

Pages.admin = { ...Pages.admin, group: 'Content' };
Treatments.admin = { ...Treatments.admin, group: 'Content' };
TreatmentCategories.admin = { ...TreatmentCategories.admin, group: 'Content' };
TeamMembers.admin = { ...TeamMembers.admin, group: 'Content' };
PracticePages.admin = { ...PracticePages.admin, group: 'Content' };
FAQ.admin = { ...FAQ.admin, group: 'Content' };
Testimonials.admin = { ...Testimonials.admin, group: 'Content' };

ContactInfo.admin = { ...ContactInfo.admin, group: 'Site Info' };
PracticeInfo.admin = { ...PracticeInfo.admin, group: 'Site Info' };
Locations.admin = { ...Locations.admin, group: 'Site Info' };
Alerts.admin = { ...Alerts.admin, group: 'Site Info' };

EnglishPage.admin = { ...EnglishPage.admin, group: 'Special Pages' };
ChildrenPage.admin = { ...ChildrenPage.admin, group: 'Special Pages' };
CareersPage.admin = { ...CareersPage.admin, group: 'Special Pages' };
Privacy.admin = { ...Privacy.admin, group: 'Special Pages' };
TermsAndConditions.admin = { ...TermsAndConditions.admin, group: 'Special Pages' };

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Customizing the admin UI with better organization
    components: {
      beforeNavLinks: [
        // You could add a custom component here if needed
      ],
    }
  },
  collections: [
    // Core Collections
    Users,
    Media,
    Settings,
    
    // Content Collections
    Pages,
    Treatments,
    TreatmentCategories,
    TeamMembers,
    PracticePages,
    FAQ,
    Testimonials,
    ContactInfo,
    PracticeInfo,
    Locations,
    
    // Special Pages
    EnglishPage,
    ChildrenPage,
    CareersPage,
    Privacy,
    TermsAndConditions,
    
    // Utility Collections
    Alerts,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
  email: nodemailerAdapter({
    defaultFromAddress: 'info@berben-bouman.nl',
    defaultFromName: 'Tandartsenpraktijk Berben & Bouman',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
});