import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { FAQ } from './collections/Faq';
import { Pricing } from './collections/Pricing';
import { Locations } from './collections/Locations';
import { Testimonials } from './collections/Testimonials';
import { Settings } from './collections/Settings';
import { TermsAndConditions } from './collections/TermsAndConditions';
import { Privacy } from './collections/Privacy';
import { Treatments } from './collections/Treatments';
import { TeamMembers } from './collections/TeamMembers';
import { PracticeInfo } from './collections/PracticeInfo';
import { ContactInfo } from './collections/ContactInfo';

// Import the new treatment categories global
import { TreatmentCategories } from './globals/TreatmentCategories';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    FAQ,
    Pricing,
    Locations,
    Testimonials,
    Settings,
    TermsAndConditions,
    Privacy,
    Treatments,
    TeamMembers,
    PracticeInfo,
    ContactInfo,
  ],
  globals: [
    TreatmentCategories,
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
  plugins: [
    payloadCloudPlugin(),
  ],
  // Add SMTP email configuration
  email: nodemailerAdapter({
    defaultFromAddress: 'info@berben-bouman.nl', // Updated to match the dental practice
    defaultFromName: 'Tandartsenpraktijk Berben & Bouman', // Updated to match the dental practice
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