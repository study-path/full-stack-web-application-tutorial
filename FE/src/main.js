import 'bootstrap/dist/css/bootstrap.css';

import CounterComponent from '@/components/CounterComponent.vue';
import Department from '@/components/Department.vue';
import Employee from '@/components/Employee.vue';
import FetchData from '@/components/FetchData.vue';
import HomeComponent from '@/components/HomeComponent.vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/HomeComponent",
      component: HomeComponent,
    },
    {
      path: "/CounterComponent",
      component: CounterComponent,
    },
    {
      path: "/FetchData",
      component: FetchData,
    },
    {
      path: "/Employee",
      component: Employee,
    },
    {
      path: "/Department",
      component: Department,
    },
  ],
});

createApp(App).use(router).mount("#app");
