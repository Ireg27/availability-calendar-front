<template>
  <VCalendar @changedAvailability="changedAvailability"
             :unavailableDates="unavailableDates"
             @changeAllAvailability="changeAllAvailability"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VCalendar from "@/components/VCalendar";
import api from "@/plugins/api";
import store from "@/store/store";

const unavailableDates = ref([]);

const changeAllAvailability = async (availabilityStatus, currentMonthYear) => {
  try {
    await api().post(`/api/users/${store.getters.userId}/unavailabilities`, {
      availabilityStatus: availabilityStatus,
      currentMonthYear: currentMonthYear
    })
  } catch (error) {
    console.log(error)
  } finally {
    await fetchUnavailableDates();
  }
}

const changedAvailability = async (date) => {
  try {
    await api().put(`/api/users/${store.getters.userId}/unavailability`, {
      date: date,
    })
  } catch (error) {
    console.log(error)
  } finally {
    await fetchUnavailableDates();
  }
}

const fetchUnavailableDates = async () => {
  try {
    const res = await api().get(`/api/users/${store.getters.userId}/unavailabilities`);
    unavailableDates.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchUnavailableDates();
});
</script>

