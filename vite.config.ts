import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [tsConfigPaths(), tailwindcss(),
  tanstackStart(), VitePWA(
    {
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'apple-touch-icon.png',
        'favicon-96x96.png'
      ],
      manifest: false

    }



  )],
})