import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'

// Determine the preview URL based on environment
// When running locally: http://localhost:3000
// When deployed: https://3lectrify.com (or set SANITY_STUDIO_PREVIEW_URL)
const PREVIEW_BASE_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://3lectrify.com')

const config = defineConfig({
  name: 'default',
  title: '3lectrify Platform',

  projectId: 'iedths1l',
  dataset: 'production',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: PREVIEW_BASE_URL,
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
  
  basePath: '/',
})

export default config
