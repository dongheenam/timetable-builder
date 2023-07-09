<script lang="ts">
  import LoadConfig from './LoadConfig.svelte';
  import SaveConfig from './SaveConfig.svelte';
</script>

<div class="root">
  <LoadConfig />
  <SaveConfig />
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--gap-md);
  }
</style>
