import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cpaysearch/', // <-- GitHub Pages 路徑

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('react-icons')) return 'icons';
            if (id.includes('lodash')) return 'lodash';
            if (id.includes('axios')) return 'axios';
            return 'vendor'; // 其他第三方包
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // optional: 提高警告門檻（不影響功能）
  }
});
