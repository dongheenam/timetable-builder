<script>
  import Button from "./components/Button.svelte";

  // status display
  let status = "Press the button to start...";
  let isReady = false;
  let fileURL = "#";

  // create JSON config file containing all stores
  const createConfig = () => {
    const config = {};

    // populate config data
    try {
      const storageKeys = Object.keys(window.localStorage);
      for (const key of storageKeys) {
        if (key.substring(0, 4) === "ttb-") {
          config[key] = JSON.parse(window.localStorage.getItem(key));
        }
      }
    } catch (err) {
      status = "Error occurred while gathering information...";
      console.error(err);
      return;
    }

    // create JSON file
    try {
      const blob = new Blob([JSON.stringify(config, null, 2)], {
        type: "application/json",
      });
      fileURL = URL.createObjectURL(blob);
      isReady = true;
    } catch (err) {
      status = "Error creating the config file...";
      console.error(err);
      return;
    }
  };
  const onDownload = () => {
    isReady = false;
    status = "Download success!";
  };
</script>

<div class="group">
  <div class="group-title"><h3>Save as config file</h3></div>
  <p>Download the current status as a config file for backup purposes.</p>
  <div class="control">
    <Button color="primary" variant="filled" onClick={() => createConfig()}
      >Create file</Button
    >
    {#if isReady}
      <div class="status">
        <span>Success! </span>
        <a href={fileURL} download="config.json" on:click={() => onDownload()}
          >Click here to download.</a
        >
      </div>
    {:else}
      <div class="status">{status}</div>
    {/if}
  </div>
</div>

<style>
  p {
    margin-top: 0;
  }
  .control {
    margin-top: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
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
