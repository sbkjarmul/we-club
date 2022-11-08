import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Home/Dashboard.vue'
import Xmassboard from '@/pages/Home/Xmassboard.vue'
import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/', name: 'Home', component: Home, children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      {
        path: 'xmass',
        name: 'Xmassboard',
        component: Xmassboard,
      },
      { path: '/', redirect: 'dashboard' }
    ],
  },
  { path: '/login', name: 'Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const { isAuthenticated } = userStore

  if (!isAuthenticated && to.name !== 'Login') {
    return { name: 'Login' }
  } if (isAuthenticated) {
    if (
      to.name !== 'Home' &&
      to.name !== 'Xmassboard' &&
      to.name !== 'Dashboard'
    ) {
      return { name: 'Home' }
    } else {
      return true
    }
  }
})

export default router