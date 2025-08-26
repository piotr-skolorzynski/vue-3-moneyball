<template>
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
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStoreEntries } from '../../stores/storeEntries';

const nameRef = ref(null);
const { addEntry } = useStoreEntries();

const addEntryFormDefault = {
  name: '',
  amount: null,
};

const addEntryForm = reactive({ ...addEntryFormDefault });

const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault);
  nameRef.value.focus();
};

const addEntryFormSubmit = () => {
  addEntry(addEntryForm);
  addEntryFormReset();
};
</script>
