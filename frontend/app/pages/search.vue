<template>
  <div class="max-w-4xl mx-auto px4 py8">
    <h1 class="text-2xl font-bold mb4">{{ t('search.resultsFor') }} "{{ searchQuery }}"</h1>

    <div v-if="searchQuery">
      <div v-if="filteredResults.length > 0">
        <ul class="space-y-2">
          <li
            v-for="(item, index) in filteredResults"
            :key="index"
            class="p3 border b-gray-200 dark:b-dark-700 rounded hover:bg-gray-100 dark:hover:bg-dark-700 cursor-pointer"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text-gray-500">{{ t('search.noResults') }}</p>
      </div>
    </div>

    <div v-else>
      <p class="text-gray-500">{{ t('search.noQuery') }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const { t } = useI18n();
const route = useRoute();

// Recupero della query dalla URL
const searchQuery = computed(() => (route.query.query || '').toString());

// Dati finti di esempio (array di elementi da cercare)
const items = [
  'Apple',
  'Banana',
  'Orange',
  'Pear',
  'Watermelon',
  'Grape',
  'Mango',
  'Strawberry',
  'Pineapple',
  'Blueberry'
];

// Computed che filtra i risultati in base alla query
const filteredResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return [];

  return items.filter(item =>
    item.toLowerCase().includes(q)
  );
});
</script>
