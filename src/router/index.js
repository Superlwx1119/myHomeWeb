import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Index from '@/view/index'
import home from '@/view/home'
import Mylogin from '@/view/Mylogin'
import index from '@/view/index/index'
import comment from '@/view/comment/comment'
import myRecord from '@/view/myRecord/myRecord'
import addRecord from '@/view/myRecord/addRecord'
import reCordDetail from '@/view/myRecord/reCordDetail'
import map from '@/view/myWork/map'
import market from '@/view/myWork/market'
import chatRoom from '@/view/myWork/ChatRoom'
Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect:'/index'
    },
    { path:'/index',name:'Index',component: index},
    { path:'/comment',name:'comment',component: comment},
    { path:'/myRecord',name:'myRecord',component: myRecord},
    { path:'/reCordDetail',name:'reCordDetail',component: reCordDetail},
    { path:'/addRecord',name:'addRecord',component: addRecord,meta:{requiresAuth:true}},
    { path:'/mylogin',name:'Mylogin',component: Mylogin},
    { path:'/map',name:'Map',component: map},
    { path:'/market',name:'Market',component: market},
    { path:'/chatRoom',name:'ChatRoom',component: chatRoom},
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

route.beforeEach((to, from, next) => {    
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
if(to.path === '/mylogin')  {
 var timer=null
 if(sessionStorage.getItem('userid')){
//   		alert('已登录,无需再登录');
   timer=setInterval(()=>{
     next({ path: '/' })
   },10)
 }
 next()
 }  // 如果即将进入登录路由，则直接放行
else {     //进入的不是登录路由
      if(to.meta.requiresAuth && !sessionStorage.getItem('mySelf')) {
       
      next({ path: '/mylogin' })
    } 
    //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
    else { next() }}  //如果不需要登录验证，或者已经登录成功，则直接放行
});


export default route
