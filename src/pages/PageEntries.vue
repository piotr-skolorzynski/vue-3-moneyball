<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
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
      </q-list>
    </div>
  </q-page>

  <q-footer class="bg-transparent">
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
      <div class="col text-grey-7 text-h6">Balance:</div>
      <div class="col text-h6 text-right" :class="useAmountColorClass(balance)">
        {{ useCurrencify(balance) }}
      </div>
    </div>

    <q-form
      @submit="addEntry"
      class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
    >
      <div class="col">
        <q-input
          v-model="addEntryForm.name"
          outlined
          dense
          placeholder="Name"
          bg-color="white"
        />
      </div>
      <div class="col">
        <div class="col">
          <q-input
            v-model.number="addEntryForm.amount"
            input-class="text-right"
            outlined
            dense
            type="number"
            step="0.01"
            placeholder="Amount"
            bg-color="white"
          />
        </div>
      </div>
      <div class="col col-auto">
        <q-btn round color="primary" icon="add" type="submit" />
      </div>
    </q-form>
  </q-footer>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { uid } from 'quasar';
import { useCurrencify } from '../composables/useCurrencify';
import { useAmountColorClass } from '../composables/useAmountColorClass';

const entries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount: 4999.99,
  },
  {
    id: 'id2',
    name: 'Rent',
    amount: -999,
  },
  {
    id: 'id3',
    name: 'Phone',
    amount: -14.99,
  },
  {
    id: 'id4',
    name: 'Uknown',
    amount: 0,
  },
]);

const balance = computed(() =>
  entries.value.reduce((acc, { amount }) => acc + amount, 0)
);

const addEntryForm = reactive({
  name: '',
  amount: null,
});

const addEntry = () => {
  const newEntry = {
    id: uid(),
    name: addEntryForm.name,
    amount: addEntryForm.amount,
  };

  entries.push(newEntry);
};
</script>
