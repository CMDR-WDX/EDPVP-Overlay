import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import "./main.css"

createApp(App)
  .use(createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", name: "Config", component: ()=>import("./routes/ConfigRoute.vue")  },
      { path: "/main", name: "Main", component: ()=>import("./routes/Main.vue")}
    ]
  }))
  .mount('#app')
