<template>
  <div>
    <div class="flex items-center px-5">
      <h2 class="flex-auto text-sm font-semibold text-gray-900">{{ currentMonth }}</h2>
      <button type="button" class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" @click="previousMonth">
        <span class="sr-only">Previous month</span>
        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" @click="nextMonth">
        <span class="sr-only">Next month</span>
        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <div class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
      <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
    </div>

    <div class="mt-2 grid grid-cols-7 text-sm"
         v-for="(week, index) in calendar"
         :key="index" :class="[index > 6 && 'border-t border-gray-200', 'py-2']">
      <div class="flex" v-for="day in week" :key="day.date">
        <button type="button"
                :class="[day.isSelected && 'text-white', !day.isSelected && day.isToday &&
                'text-indigo-600', !day.isSelected && day.isSelected && day.isToday &&
                'bg-indigo-600', day.isSelected && !day.isToday && 'bg-gray-900',
                !day.isSelected && 'hover:bg-indigo-300', day.date && 'bg-green-200',
                (day.isSelected || day.isToday) && 'font-semibold', day.isUnavailable && 'bg-red-400', 'mx-auto flex h-8 w-8 ' +
                 'items-center justify-center rounded-full text-gray-700']"
                @click="emitDate(day.date)" >
          {{day.date}}
        </button>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
          type="button"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
          @click="emitToggleAllDays(true)"
      >
        Mark All Available
      </button>
      <button
          type="button"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          @click="emitToggleAllDays(false)"
      >
        Mark All Unavailable
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';

const emits = defineEmits(['changedAvailability', 'changeAllAvailability'])
const props = defineProps({
  unavailableDates: Object
});
const currentDate = ref(new Date());
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

const currentMonth = computed(() =>
    currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' })
);

const calendar = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  let date = 1;
  const calendar = [];

  for (let week = 0; week < 6; week++) {
    const days = [];

    for (let dayOfWeek = 1; dayOfWeek < 8; dayOfWeek++) {
      if (week === 0 && dayOfWeek < firstDayOfWeek) {
        days.push({ date: null, isSelected: false, isToday: false });
      } else if (date > daysInMonth) {
        break;
      } else {
        const currentDate = new Date(year, month, date);
        const isToday = isSameDay(currentDate, new Date());

        const unavailableDate = Array.isArray(props.unavailableDates.data)
            ? props.unavailableDates.data.find((unavailable) => {
              return isSameDay(currentDate, new Date(unavailable));
            })
            : undefined;

        days.push({ date: date, isSelected: false, isToday, isUnavailable: !!unavailableDate, });
        date++;
      }
    }

    calendar.push(days);
  }

  return calendar;
});

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const emitDate = (date) => {
  emits('changedAvailability', date + ' ' + currentMonth.value);
};

const emitToggleAllDays = (availabilityStatus) => {
  emits('changeAllAvailability', availabilityStatus, currentMonth.value);
}

const isSameDay = (date1, date2) => {
  return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
  );
};
</script>

