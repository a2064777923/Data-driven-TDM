// stores/popoverStore.ts
import { defineStore } from 'pinia';

export const usePopoverStore = defineStore('piniaStore', {
  state: () => ({
    isPopoverOpen: false,
  }),
  actions: {
    openPopover() {
      this.isPopoverOpen = !this.isPopoverOpen;
    },
    closePopover() {
      this.isPopoverOpen = false;
    },
  },
});
