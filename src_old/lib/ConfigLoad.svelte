<script>
  import * as stores from "./stores";
  import Button from "./components/Button.svelte";

  let files = undefined;
  let config = undefined;
  let isReady = false;
  let status = "Upload the file to start...";

  // upload the config file
  const onUpload = async () => {
    if (!(files instanceof FileList)) {
      status = "Unknown error while uploading the file...";
      return;
    }
    config = await new Response(files[0]).json();
    isReady = true;
    status = "Upload success! Ready to load...";
  };
  $: files && onUpload();

  // parse the config object
  const storeMap = {
    "ttb-classGroups": stores.classGroups,
    "ttb-staffNames": stores.staffNames,
    "ttb-timetables": stores.timetables,
  };
  const loadConfig = () => {
    console.log(config);
    for (const [key, store] of Object.entries(storeMap)) {
      if (key in config) {
        store.set(config[key]);
      }
    }
    isReady = false;
    files = undefined;
    config = undefined;
    status = "Load success!";
  };
</script>

<div class="group">
  <div class="group-title"><h3>Load config file</h3></div>
  <p>Upload the saved config file.</p>
  <div class="control">
    <input type="file" bind:files accept=".json" />
    {#if isReady}
      <Button color="primary" variant="filled" on:click={() => loadConfig()}
        >Load config</Button
      >
    {/if}
    <div class="status">{status}</div>
  </div>
</div>

<style>
  p {
    margin-top: 0;
  }
  .control {
    margin-top: 1.5rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .status {
    font-style: italic;
    color: var(--gray10);
  }
</style>
