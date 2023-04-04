// import { createApp } from 'vue'
// import App from './App.vue'

// import './assets/main.css'

// createApp(App).mount('#app')

// import('https://unpkg.com/vue@3/dist/vue.global.js').then((vue) => {
//   const app = vue.createApp(/* ... */);
//   // ...
// });


//vuetify導入バージョン
import { createApp } from 'vue'
import { defineComponent } from 'vue';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import * as d3 from 'd3'

const vuetify = createVuetify({
  components,//デザインのために必要
  directives,
})

const app = createApp(App)
app.use(vuetify).mount('#app')