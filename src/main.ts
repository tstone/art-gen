import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { ThemeDefinition, createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const theme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#141414'
  },
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'custom',
    themes: {
      custom: theme,
    },
  }
})

createApp(App)
  .use(vuetify)
  .mount('#app')
