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
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
      <div class="col text-grey-7 text-h6">Balance:</div>
      <div class="col text-h6 text-right" :class="useAmountColorClass(balance)">
        {{ useCurrencify(balance) }}
      </div>
    </div>

    <q-form
      @submit="addEntryFormSubmit"
      class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
    >
      <div class="col">
        <q-input
          v-model="addEntryForm.name"
          ref="nameRef"
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
import { useQuasar } from 'quasar';
import { useStoreEntries } from '../stores/storeEntries';
import { useCurrencify } from '../composables/useCurrencify';
import { useAmountColorClass } from '../composables/useAmountColorClass';

const $q = useQuasar();
const nameRef = ref(null);
const { entries, balance, addEntry, deleteEntry } = useStoreEntries();

const addEntryFormDefault = {
  name: '',
  amount: null,
};

const addEntryForm = reactive({ ...addEntryFormDefault });

const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault);
  nameRef.value.focus();
};

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

const addEntryFormSubmit = () => {
  addEntry(addEntryForm);
  addEntryFormReset();
};
</script>
