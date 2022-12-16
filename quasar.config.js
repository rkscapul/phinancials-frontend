/* eslint-env node */
/* eslint func-names: 0 */
/* eslint global-require: 0 */
const { configure } = require('quasar/wrappers');

module.exports = configure(() => ({
  eslint: {
    warnings: true,
    errors: true,
  },
  boot: ['axios'],
  css: ['app.scss'],
  extras: [
    'roboto-font',
    'material-icons',
    'fontawesome-v6',
  ],
  build: {
    target: {
      browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
      node: 'node16',
    },
    vueRouterMode: 'hash',
  },
  devServer: {
    open: true,
  },
  framework: {
    cssAddon: true,
    config: {},
    plugins: [],
  },
  animations: [],
  ssr: {
    pwa: false,
    prodPort: 3000,
    middlewares: [
      'render',
    ],
  },
  pwa: {
    workboxMode: 'generateSW',
    injectPwaMetaTags: true,
    swFilename: 'sw.js',
    manifestFilename: 'manifest.json',
    useCredentialsForManifestTag: false,
  },
  capacitor: {
    hideSplashscreen: true,
  },
  bex: {
    contentScripts: [
      'my-content-script',
    ],
  },
}));
