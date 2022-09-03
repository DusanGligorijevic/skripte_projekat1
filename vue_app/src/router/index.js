import Vue from 'vue';
import VueRouter from 'vue-router';
import Books from '@/views/Books.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Authors from "@/views/Authors";
import Publishers from "@/views/Publishers";
import Users from "@/views/Users";
import Home from "@/views/Home";
Vue.use(VueRouter);

const routes = [
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/publishers',
    name: 'Publishers',
    component: Publishers
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
