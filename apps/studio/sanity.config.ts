import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const config = defineConfig({
  name: 'default',
  title: '3lectrify Platform',

  projectId: 'iedths1l',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  
  basePath: '/',
})

export default config
