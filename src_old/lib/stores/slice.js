import { derived } from "svelte/store";

/**
 * slice an object stored as Svelte store into a smaller store
 * with identical functionality
 */
export const slice = (parentStore, name) => {
  return {
    ...derived(parentStore, (value) => value[name]),
    set: (value) => {
      parentStore.update((prev) => ({ ...prev, [name]: value }));
    },
    update: (updater) =>
      parentStore.update((prev) => ({ ...prev, [name]: updater(prev[name]) })),
  };
};
export default slice;
