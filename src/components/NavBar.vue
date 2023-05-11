<template>
  <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
    <div class="relative flex h-16 justify-between">
      <div class="relative z-10 flex px-2 lg:px-0">
        <div class="flex flex-shrink-0 items-center">
          <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        </div>
      </div>

      <nav class="flex space-x-8 py-2" aria-label="Global">
        <router-link
            v-for="item in filteredNavigation"
            :key="item.name"
            :to="item.href"
            :class="[
            item.current ? 'bg-indigo-500 text-white' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium',
            item.show ? '' : 'hidden'
          ]"
            :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </router-link>
        <button
            v-if="loggedIn"
            type="button"
            class="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            @click="logout"
        >
          Sign Out
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import api from "@/plugins/api";

const route = useRoute();
const router = useRouter();
const store = useStore();

const navigation = ref([
  { name: 'Login', href: '/login', show: false },
  { name: 'Register', href: '/register', show: false },
  { name: 'Calendar', href: '/calendar', show: true },
]);

const filteredNavigation = ref([]);

watchEffect(() => {
  const currentPath = route.path;
  navigation.value.forEach((item) => {
    item.current = item.href === currentPath;
  });
  filteredNavigation.value = navigation.value.filter((item) => item.show);
});

const loggedIn = ref(store.getters.loggedIn);

const logout = async () => {
  try {
    const res = await api().post('api/logout');

    if (res) {
      await store.dispatch('logout');
      await router.push('/login');
    }
  } catch (error) {
    console.log(error);
  }
};

watchEffect(() => {
  loggedIn.value = store.getters.loggedIn;
  navigation.value.forEach((item) => {
    if (item.name === 'Login' || item.name === 'Register') {
      item.show = !loggedIn.value;
    }
  });
});
</script>
