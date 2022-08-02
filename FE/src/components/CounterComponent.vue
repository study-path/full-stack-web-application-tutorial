<template>
  <div>
    <div class="counter">Counter</div>
    <button @click="count">Click button</button>
    <p>{{ currentCount }}</p>
  </div>
</template>

<script>
export default {
  name: "CounterComponent",
  data() {
    return {
      currentCount: 0,
    };
  },
  methods: {
    count() {
      this.currentCount++;
    },
  },
};
</script>
