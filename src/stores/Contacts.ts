import { createStore } from 'pinia';

export type ContactsState = {
     contacts: {[address: string]: string},
};

export const useContactsStore = createStore({
    id: 'contact',
    state: (): ContactsState => ({ contacts: {} } as ContactsState),
    getters: {
        contacts: (state): Readonly<{ [address: string]: string }> => state.contacts,
        contactsArray: (state): Readonly<Array<{address: string, label: string}>> =>
            Object.keys(state.contacts).map((address) => ({ address, label: state.contacts[address] })),
        label: (state): ((address: string) => string | undefined) => (address: string): Readonly<string> =>
            state.contacts[address],
    },
    actions: {
        setContact(address, label) {
            // Not exactly great, see useTransactionStore in Transactions.ts
            this.state.contacts = {
                ...this.state.contacts,
                [address]: label,
            };
        },
    },
});
