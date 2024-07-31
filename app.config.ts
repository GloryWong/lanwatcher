import packageJson from './package.json'

export default defineAppConfig({
  title: packageJson.productName,
  version: packageJson.version,
  theme: {
    dark: false,
  },
})
