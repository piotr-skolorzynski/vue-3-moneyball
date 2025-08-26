<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item
          @right="onEntrySlideRight($event, entry)"
          left-color="positive"
          right-color="negative"
          v-for="entry in entries"
          :key="entry.id"
        >
          <!-- <template v-slot:left> // to handle
            <q-icon name="done" />
          </template> -->

          <template v-slot:right>
            <q-icon name="delete" />
          </template>

          <q-item>
            <q-item-section
              class="text-weight-bold"
              :class="useAmountColorClass(entry.amount)"
            >
              {{ entry.name }}
            </q-item-section>

            <q-item-section
              side
              class="text-weight-bold"
              :class="useAmountColorClass(entry.amount)"
            >
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>
  </q-page>

  <q-footer class="bg-transparent">
    <Balance />

    <AddEntry />
  </q-footer>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { useStoreEntries } from '../stores/storeEntries';
import { useCurrencify } from '../composables/useCurrencify';
import { useAmountColorClass } from '../composables/useAmountColorClass';
import Balance from '../components/Entries/Balance.vue';
import AddEntry from '../components/Entries/AddEntry.vue';

const $q = useQuasar();
const { deleteEntry } = useStoreEntries();

const onEntrySlideRight = ({ reset }, { id, name, amount }) => {
  $q.dialog({
    title: 'Delete Entry',
    message: `
      Delete this entry?
      <div class="q-mt-md text-weight-bold ${useAmountColorClass(amount)}">
        ${name} : ${useCurrencify(amount)}
      </div>
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true,
    },
    cancel: {
      color: 'primary',
      noCaps: true,
    },
  })
    .onOk(() => {
      deleteEntry(id);
    })
    .onCancel(() => {
      reset();
    });
};
</script>
