<template>
  <q-page>
    <div class="q-pa-md">
      <NothingHere v-if="!entries.length" />

      <q-list v-else class="entries">
        <Sortable
          @end="sortEnd"
          :list="entries"
          item-key="id"
          tag="div"
          :options="{handle: '.handle'}"

        >
          <template #item="{element, index}">
              <Entry :key="element.id" :entry="element" />
          </template>
        </Sortable>
      </q-list>
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

const { entries, sortEnd } = useStoreEntries();
</script>
