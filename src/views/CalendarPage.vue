<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const count = computed(() => store.state.count);
const doubleCount = computed(() => store.getters.doubleCount);

const increment = () => {
  console.log(store)
  store.dispatch('increment');
};

const decrement = () => {
  store.dispatch('decrement');
};


</script>