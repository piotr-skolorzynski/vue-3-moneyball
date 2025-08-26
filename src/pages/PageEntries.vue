<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <Entry v-for="entry in entries" :key="entry.id" :entry="entry" />
      </q-list>
    </div>
  </q-page>

  <q-footer class="bg-transparent">
    <Balance />

    <AddEntry />
  </q-footer>
</template>

<script setup>
import { useStoreEntries } from '../stores/storeEntries';
import Balance from '../components/Entries/Balance.vue';
import AddEntry from '../components/Entries/AddEntry.vue';
import Entry from '../components/Entries/Entry.vue';

const { entries } = useStoreEntries();
</script>
