export const environment = {
  production: false,
  publicApi: {
    baseUrl: '',
    baseUrlSsr: '',
  },
  builtinApi: {
    post: [],
    get: [],
  },
  fb: {
    appId: '',
  },
  recaptcha: {
    siteKey: '',
  },
  availableLangs: ['uk'],
}

import 'zone.js/plugins/zone-error' // Included with Angular CLI.
