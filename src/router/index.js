import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import('@/views/Login');
const Signup = () => import('@/views/Signup');
const Header = () => import('@/components/Header');
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/header',
    name: 'Header',
    component: Header
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
