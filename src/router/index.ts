import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '@/views/HomeView.vue'
//import ChartTest from '@/components/ChartTest.vue'
import UPlotChart from '@/components/UPlotChart.vue'
//import AboutView from '@/views/AboutView.vue'
//import UserList from '@/components/UserList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'UPlotChart',
      component: UPlotChart,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutView,
    // },
    // {
    //   path: '/Chart',
    //   name: 'Chart',
    //   component: ChartTest,
    // },
    // {
    //   path: '/UserList',
    //   name: 'UserList',
    //   component: UserList,
    // },
  ],
})

export default router
