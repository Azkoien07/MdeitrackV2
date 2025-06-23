import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@lib': path.resolve(__dirname, 'src/Lib'),
      '@components': path.resolve(__dirname, 'src/Components'),
      '@hooks': path.resolve(__dirname, 'src/Hooks'),
      '@styles': path.resolve(__dirname, 'src/Styles'),
      '@assets': path.resolve(__dirname, 'src/Assets'),
      '@client': path.resolve(__dirname, 'src/Clients'),
      '@utils': path.resolve(__dirname, 'src/Utils'),
      '@context': path.resolve(__dirname, 'src/Context'),
      '@service': path.resolve(__dirname, 'src/Service'),
      '@pages': path.resolve(__dirname, 'src/Pages'),
    },
  },
})
