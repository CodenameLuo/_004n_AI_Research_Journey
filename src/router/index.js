import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import StoryDiffusion from '../views/StoryDiffusion.vue'
import AiStory from '../views/AiStory.vue'
import StickColor from '../views/StickColor.vue'
import StyleTransfer from '../views/StyleTransfer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/story-diffusion',
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
    },
    {
      path: '/style-transfer',
      name: 'StyleTransfer',
      component: StyleTransfer,
    }
  ],
})

export default router
