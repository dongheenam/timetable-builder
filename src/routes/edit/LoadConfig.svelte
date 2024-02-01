<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import {
    STORAGE_KEYS,
    courseGroups,
    staffs,
    lessonsLookup,
    settings,
    type StoredIn,
  } from '$lib/stores';
  import { APP_VERSION } from '$lib/types';

  let files: FileList | undefined;
  let isReady = false;
  let data: Record<string, unknown>;
  let status = 'Upload the file to start...';

  // parse the config file when uploaded
  const onUpload = async () => {
    if (!(files instanceof FileList)) {
      status = 'Unknown error while uploading the file...';
      return;
    }
    const loaded = await new Response(files[0]).json();
    data = {
      version: loaded.version,
      [STORAGE_KEYS.courseGroups]: loaded[STORAGE_KEYS.courseGroups],
      [STORAGE_KEYS.staffs]: loaded[STORAGE_KEYS.staffs],
      [STORAGE_KEYS.lessonsLookup]: loaded[STORAGE_KEYS.lessonsLookup],
      [STORAGE_KEYS.settings]: loaded[STORAGE_KEYS.settings],
    };
    isReady = true;
    if (data.version !== APP_VERSION) {
      status = `Warning! Data was saved from verison ${data.version}.`;
    } else {
      status = 'Upload success! Ready to load...';
    }
  };
  $: files && onUpload();

  // update the store
  const storeMap = {
    [STORAGE_KEYS.courseGroups]: courseGroups,
    [STORAGE_KEYS.staffs]: staffs,
    [STORAGE_KEYS.lessonsLookup]: lessonsLookup,
    [STORAGE_KEYS.settings]: settings,
  };
  const loadConfig = () => {
    try {
      for (const key of Object.values(STORAGE_KEYS)) {
        if (key in data) {
          const store = storeMap[key];
          const value = data[key] as StoredIn<typeof store>;
          //@ts-expect-error: we know the type is correct, unless we change the store structure in the future.
          store.set(value);
          console.log('Loaded', key);
        }
      }
    } catch (error) {
      status = 'Error while loading the config file...';
      console.error(error);
      return;
    }
    isReady = false;
    files = undefined;
    data = {};
    location.reload();
    status = 'Load success!';
  };
</script>

<div class="root">
  <h3>Load from config file</h3>
  <p>Upload the saved config file.</p>
  <div class="control">
    {#if isReady}
      <Button color="primary" variant="filled" on:click={() => loadConfig()}
        >Load config</Button
      >
    {:else}
      <input type="file" bind:files accept=".json" />
    {/if}
    <div class="status">{status}</div>
  </div>
</div>

<style>
  .root > * {
    margin-bottom: var(--gap-sm);
  }
  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-md);
  }
  .control :global(button) {
    flex-shrink: 0;
  }
  .status {
    font-style: italic;
    color: var(--gray10);
  }
</style>
