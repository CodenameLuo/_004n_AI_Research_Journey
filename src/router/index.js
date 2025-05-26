import { createRouter, createWebHistory } from 'vue-router'
import StoryDiffusion from '../views/StoryDiffusion.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'StoryDiffusion',
      component: StoryDiffusion,
    }
  ],
})

export default router
