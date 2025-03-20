import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { HomePage } from './collections/HomePage';
import { PracticePages } from './collections/PracticePages';
import { FAQ } from './collections/Faq';
import { Pricing } from './collections/Pricing';
import { Locations } from './collections/Locations';
import { Testimonials } from './collections/Testimonials';
import { Settings } from './collections/Settings';
import { TermsAndConditions } from './collections/TermsAndConditions';
import { Privacy } from './collections/Privacy';
import { Treatments } from './collections/Treatments';
import TeamMembers from './collections/TeamMembers';
import { PracticeInfo } from './collections/PracticeInfo';
import { ContactInfo } from './collections/ContactInfo';
import { Alerts } from './collections/Alerts';
import { TreatmentCategories } from './globals/TreatmentCategories';
import { Roles } from './collections/Roles';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    HomePage,
    PracticePages,
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
    Alerts,
    Roles,
  ],
  globals: [
    TreatmentCategories,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
});