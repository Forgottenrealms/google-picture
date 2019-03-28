import Vue from 'vue'
import Router from 'vue-router'
import PictureSearch from '@/components/PictureSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PictureSearch',
      component: PictureSearch
    }
  ]
})
