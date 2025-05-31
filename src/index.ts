
import Hello from './components/Hello.vue'

export default {
  install(app: any) {
    app.component('Hello', Hello)
  }
}

