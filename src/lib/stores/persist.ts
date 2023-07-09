import { get, type Writable } from 'svelte/store';
import { APP_VERSION, APP_NAME } from '$lib/types.js';

const isBrowser = typeof Storage !== 'undefined';

const generateKey = (key: string) => `${APP_NAME}-${APP_VERSION}-${key}`;

const fromStorage = <T>(key: string): T | void => {
  try {
    const loaded = window.localStorage.getItem(generateKey(key));
    if (!loaded) return;
    console.log('loaded', generateKey(key));
    return JSON.parse(loaded);
  } catch (err) {
    console.error(`could not load ${generateKey(key)}:`, err);
  }
};
const toStorage = <T>(key: string, value: T) => {
  try {
    if (!value) return;
    console.log('saving', generateKey(key));
    window.localStorage.setItem(generateKey(key), JSON.stringify(value));
  } catch (err) {
    console.error(`could not save ${generateKey(key)}:`, err);
    return;
  }
};

/**
 * wraps a writable object to make it persistable using localStorage
 */
const persist = <T>(store: Writable<T>, key: string): Writable<T> => {
  if (!isBrowser) return store;

  const loaded = fromStorage<T>(key);
  if (loaded) {
    store.set(loaded);
  }

  const setter = (value: T) => {
    store.set(value);
    toStorage<T>(key, value);
  };

  return {
    ...store,
    set: setter,
    update: (updater) => setter(updater(get(store))),
  };
};
export default persist;
