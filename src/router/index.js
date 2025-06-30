import { createRouter, createWebHistory } from 'vue-router'
import StoryDiffusion from '../views/StoryDiffusion.vue'
import AiStory from '../views/AiStory.vue'
import StickColor from '../views/StickColor.vue'

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
    },
    {
      path: '/stick-color',
      name: 'StickColor',
      component: StickColor,
    }
  ],
})

export default router
