<script>
  import ConfigLoad from "./ConfigLoad.svelte";
  import ConfigSave from "./ConfigSave.svelte";
</script>

<div class="root">
  <ConfigLoad />
  <ConfigSave />
  <div class="group">
    <div class="group-title"><h3>Load Excel file</h3></div>
    <p>To be implemented...</p>
  </div>
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
