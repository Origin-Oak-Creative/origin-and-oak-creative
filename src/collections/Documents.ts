import type { CollectionConfig } from 'payload';

import path from 'path';
import { fileURLToPath } from 'url';

import { anyone } from '../access/anyone';
import { authenticated } from '../access/authenticated';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const PDFDocuments: CollectionConfig = {
  slug: 'pdf-documents',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [],
  upload: {
    staticDir: path.resolve(dirname, '../../public/documents'),
    mimeTypes: ['application/pdf'],
  },
};
