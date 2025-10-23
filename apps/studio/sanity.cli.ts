import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'iedths1l',
    dataset: 'production'
  },
  studioHost: 'electrify-studio',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    appId: 'e3huhl6mcydt7kyc10zsctm2',
  }
})
