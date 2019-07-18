import Vue from 'vue'
import Router from 'vue-router'
import report from '@/components/report.vue'




Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [

    {
      path: '/',
      name: 'report',
      component: report

    }


  ]
})
