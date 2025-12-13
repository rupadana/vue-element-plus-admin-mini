import 'vue/jsx'

// Import unocss
import '@/plugins/unocss'

// Import global svg icons
import '@/plugins/svgIcon'

// Initialize multi-language
import { setupI18n } from '@/plugins/vueI18n'

// Import state management
import { setupStore } from '@/store'

// Global components
import { setupGlobCom } from '@/components'

// Import element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// Import global styles
import '@/styles/index.less'

// Import animations
import '@/plugins/animate.css'

// Router
import { setupRouter } from './router'

import { createApp } from 'vue'

import App from './App.vue'

import './permission'

// Create instance
const setupAll = async () => {
  const app = createApp(App)

  await setupI18n(app)

  setupStore(app)

  setupGlobCom(app)

  setupElementPlus(app)

  setupRouter(app)

  app.mount('#app')
}

setupAll()
