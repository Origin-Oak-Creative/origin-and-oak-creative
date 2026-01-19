import { sqliteAdapter } from '@payloadcms/db-sqlite';
import sharp from 'sharp';
import path from 'path';
import { buildConfig, PayloadRequest } from 'payload';
import { fileURLToPath } from 'url';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { resendAdapter } from '@payloadcms/email-resend';

import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Users } from './collections/Users';
import { TeamMembers } from './collections/TeamMembers';
import { Footer } from './globals/Footer/config';
import { Header } from './globals/Header/config';
import { plugins } from './plugins';
import { getServerSideURL } from './utilities/getURL';
import { Logo } from './globals/Logo/config';
import { BusinessSchema } from './globals/BusinessSchema/config';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  email: resendAdapter({
    defaultFromAddress: 'noreply@notifs.originandoakcreative.com',
    defaultFromName: 'Origin & Oak new Age Creative',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    components: {
      header: ['@/components/PasswordResetEnforcer'],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor(),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  collections: [Pages, Media, Users, TeamMembers],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Logo, BusinessSchema],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization');
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
});
