import { Vue2, isVue2, isVue3, createApp } from 'vue-demi'
import App from './app.vue'
import Hello from '../src/index'

if (isVue2) {
  Vue2.use(Hello)
  new Vue2({
    el: '#root',
    render: (h) => h(App),
  })
} else {
  const app = createApp(App)

  app.use(Hello)
  app.mount('#root')
}