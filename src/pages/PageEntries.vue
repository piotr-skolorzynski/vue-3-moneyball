<template>
  <q-page>
    <div class="q-pa-md">
      <NothingHere v-if="!entries.length" />

      <Sortable
        :list="entries"
        item-key="id"
        tag="div"
        v-else
      >
        <template #item="{element, index}">
          <q-list  bordered separator>
            <Entry :key="element.id" :entry="element" />
          </q-list>
        </template>
      </Sortable>
    </div>
  </q-page>

  <q-footer class="bg-transparent">
    <Balance />

    <AddEntry />
  </q-footer>
</template>

<script setup>
import { Sortable } from 'sortablejs-vue3';
import { useStoreEntries } from '../stores/storeEntries';
import Balance from '../components/Entries/Balance.vue';
import AddEntry from '../components/Entries/AddEntry.vue';
import Entry from '../components/Entries/Entry.vue';
import NothingHere from '../components/Entries/NothingHere.vue';

const { entries } = useStoreEntries();
</script>
