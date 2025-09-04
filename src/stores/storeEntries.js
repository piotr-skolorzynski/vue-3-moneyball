import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { uid, Notify } from "quasar";

export const useStoreEntries = defineStore("entries", () => {
  /* state */
  const entries = ref([
    {
      id: "id1",
      name: "Salary",
      amount: 4999.99,
      paid: false,
    },
    {
      id: "id2",
      name: "Rent",
      amount: -999,
      paid: false,
    },
    {
      id: "id3",
      name: "Phone",
      amount: -14.99,
      paid: false,
    },
    {
      id: "id4",
      name: "Uknown",
      amount: 0,
      paid: false,
    },
  ]);

  /* getters */

  const balance = computed(() =>
    entries.value.reduce((acc, { amount }) => acc + amount, 0)
  );

  /* actions */

  const addEntry = (entryForm) => {
    const newEntry = Object.assign({}, entryForm, { id: uid(), paid: false });
    entries.value.push(newEntry);
  };

  const deleteEntry = (id) => {
    const index = getEntryIndexById(id);
    entries.value.splice(index, 1);
    Notify.create({ message: "Entry deleted", position: "top" });
  };

  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexById(entryId);
    if (index) {
      Object.assign(entries.value[index], updates);
    }
  };

  /* helpers */

  const getEntryIndexById = (id) =>
    entries.value.findIndex((entry) => entry.id === id);

  /* return */
  return { entries, balance, addEntry, deleteEntry, updateEntry };
});
