import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { uid, Notify, } from 'quasar';


export const useStoreEntries = defineStore('entries', () => {

    /* state */
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

    /* getters */

    const balance = computed(() =>
        entries.value.reduce((acc, { amount }) => acc + amount, 0)
    );

    /* actions */

    const addEntry = (entryForm) => {
        const newEntry = Object.assign({}, entryForm, { id: uid() });
        entries.value.push(newEntry);
    }

    const deleteEntry = (id) => {
        const index = entries.value.findIndex(entry => entry.id === id);
        entries.value.splice(index, 1);
        Notify.create({ message: 'Entry deleted', position: 'top' });
    };

    /* return */
    return { entries, balance, addEntry, deleteEntry };
})