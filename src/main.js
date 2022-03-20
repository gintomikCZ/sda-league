import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SdaButton from './components/SdaButton.vue'

const app = createApp(App)

app.use(store)

app.use(router)

app.component('SdaButton', SdaButton)

app.mount('#app')
