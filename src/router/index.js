import { createRouter, createWebHistory } from 'vue-router'
import StoryDiffusion from '../views/StoryDiffusion.vue'
import AiStory from '../views/AiStory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'StoryDiffusion',
      component: StoryDiffusion,
    },
    {
      path: '/ai-story',
      name: 'AiStory',
      component: AiStory,
    }
  ],
})

export default router
