import { get, type Writable } from 'svelte/store';

/** attaches a validator to the store */
const validate = <T>(
  store: Writable<T>,
  validator: (value: unknown) => T
): Writable<T> => {
  const setter = (value: T) => {
    try {
      const parsed = validator(value);
      store.set(parsed);
    } catch (err) {
      console.error(`validation failed for ${store}:`, err);
    }
  };

  return {
    ...store,
    set: setter,
    update: (updater) => setter(updater(get(store))),
  };
};
export default validate;
