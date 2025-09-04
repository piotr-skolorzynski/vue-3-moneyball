<template>
  <q-slide-item @right="onEntrySlideRight" @right="onEntrySlideLeft" left-color="positive" right-color="negative">
    <template v-slot:left> 
      <q-icon name="done" />
      </template>

    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item>
      <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
        {{ entry.name }}
        <q-popup-edit :model-value="entry.name" auto-save v-slot="scope" anchor="top left" :offset="[16,12]" :cover="false" buttons label-set="Ok" @save="onNameUpdate">
          <q-input
            v-model="scope.value"
            dense
            autofocus
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none"
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        side
        class="text-weight-bold"
        :class="useAmountColorClass(entry.amount)"
      >
        {{ useCurrencify(entry.amount) }}
        <q-popup-edit :model-value="entry.amount" auto-save v-slot="scope" anchor="top left" :offset="[16,12]" :cover="false" buttons label-set="Ok" @save="onAmountUpdate">
          <q-input
            v-model.number="scope.value"
            dense
            autofocus
            type="number"
            step="0.01"
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none text-right"
          />
        </q-popup-edit>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { defineProps } from "vue";
import { useQuasar } from "quasar";
import { useStoreEntries } from "../../stores/storeEntries";
import { useCurrencify } from "../../composables/useCurrencify";
import { useAmountColorClass } from "../../composables/useAmountColorClass";

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
});
const $q = useQuasar();
const { deleteEntry, updateEntry } = useStoreEntries();

const onEntrySlideRight = ({ reset }) => {
  $q.dialog({
    title: "Delete Entry",
    message: `
      Delete this entry?
      <div class="q-mt-md text-weight-bold ${useAmountColorClass(props.entry.amount)}">
        ${props.entry.name} : ${useCurrencify(props.entry.amount)}
      </div>
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: "Delete",
      color: "negative",
      noCaps: true,
    },
    cancel: {
      color: "primary",
      noCaps: true,
    },
  })
    .onOk(() => {
      deleteEntry(props.entry.id);
    })
    .onCancel(() => {
      reset();
    });
};

const onEntrySlideLeft = ({ reset }) => {
  updateEntry(props.entry.id, {paid: !props.entry.paid});
  reset();
};

const onNameUpdate = (value) => {
  updateEntry(props.entry.id, {name: value});
};

const onAmountUpdate = (value) => {
  updateEntry(props.entry.id, {amount: value})
};
</script>
