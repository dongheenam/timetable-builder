import { derived, type Writable } from 'svelte/store';

/**
 * slice an object stored as Svelte store into a smaller store
 * with identical functionality
 */
export const slice = <T, K extends keyof T>(
  parentStore: Writable<T>,
  key: K
): Writable<T[K]> => {
  return {
    ...derived(parentStore, (value) => value[key]),
    set: (value) => {
      parentStore.update((prev) => ({ ...prev, [key]: value }));
    },
    update: (updater) =>
      parentStore.update((prev) => ({ ...prev, [key]: updater(prev[key]) })),
  };
};
export default slice;
