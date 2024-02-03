<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import {
    STORAGE_KEYS,
    courseGroups,
    staffs,
    lessonsLookup,
    settings,
  } from '$lib/stores';
  import { APP_VERSION } from '$lib/types';

  let status = 'Press the Create file button to start...';
  let isReady = false;
  let fileURL = '#';

  const createConfig = () => {
    try {
      // create JSON config file containing all stores
      const data = {
        [STORAGE_KEYS.version]: APP_VERSION,
        [STORAGE_KEYS.time]: new Date().toISOString(),
        [STORAGE_KEYS.courseGroups]: $courseGroups,
        [STORAGE_KEYS.staffs]: $staffs,
        [STORAGE_KEYS.lessonsLookup]: $lessonsLookup,
        [STORAGE_KEYS.settings]: $settings,
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      fileURL = URL.createObjectURL(blob);
      isReady = true;
    } catch (err) {
      status = 'Error creating the config file...';
      console.error(err);
    }
  };
  const onDownload = () => {
    isReady = false;
    status = 'Download success!';
  };
</script>

<div class="root">
  <h3>Save as config file</h3>
  <p>Download the current status as a config file for backup purposes.</p>
  <div class="control">
    <Button color="primary" variant="filled" on:click={createConfig}
      >Create file</Button
    >
    {#if isReady}
      <div class="status">
        <span>Success! </span>
        <a href={fileURL} download="config.json" on:click={onDownload}
          >Click here to download.</a
        >
      </div>
    {:else}
      <div class="status">{status}</div>
    {/if}
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

  a {
    color: var(--text);
  }
  a:hover {
    text-decoration: underline;
    color: var(--primary11);
  }
</style>
