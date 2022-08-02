<template>
  <div>Vue JS Front End</div>
  <p>
    <router-link to="/HomeComponent">Go to Home</router-link>
    <router-link to="/Employee">Go to Employee</router-link>
    <router-link to="/Department">Go to Department</router-link>
    <router-link to="/FetchData">Go to Forecast</router-link>
    <router-link to="/CounterComponent">Go to Counter</router-link>
  </p>
  <router-view></router-view>
</template>

<script>
import Home from "./components/HomeComponent.vue";
import FetchData from "./components/FetchData.vue";
import CounterComponent from "@/components/CounterComponent.vue";
import Employee from "./components/Employee.vue";
import Department from "./components/Department.vue";
/* eslint-disable */

export default {
  name: "App",
  components: {
    Home,
    FetchData,
    CounterComponent,
    Employee,
    Department,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
a {
  padding: 10px;
}
</style>
