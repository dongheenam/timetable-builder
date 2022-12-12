const isBrowser = typeof Storage !== "undefined";
const fromStorage = (key) => {
  try {
    if (!isBrowser) return;
    const loaded = window.localStorage.getItem(key);
    if (!loaded) return;
    console.log("loaded", key);
    return JSON.parse(loaded);
  } catch (err) {
    console.error(`could not load ${key}:`, err);
    return;
  }
};
const toStorage = (key, value) => {
  try {
    if (!isBrowser || !value) return;
    console.log("saving", key);
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`could not save ${key}:`, err);
    return;
  }
};

/**
 * wraps a writable object to make it persistable using localStorage
 * @type {<T>(key: string, store: import("svelte/store").Writable<T>) => import("svelte/store").Writable<T>}
 */
export const persist = (key, store) => {
  const loaded = fromStorage(key);
  if (!!loaded) {
    store.set(loaded);
  }
  store.subscribe(($store) => {
    toStorage(key, $store);
  });

  return store;
};
