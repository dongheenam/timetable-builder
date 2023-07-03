<script>
  import { staffNames } from "./stores";
  import EditableTable from "./components/EditableTable.svelte";

  // table props
  const columns = [
    { header: "Code", key: "code" },
    { header: "Staff Name", key: "name", placeholder: "type..." },
  ];
  const staffFactory = () => ({ code: "", name: "" });
</script>

<div class="group">
  <div class="group-title">
    <h3>Staff names</h3>
  </div>
  <span>Staff codes entered in the tables on the right will appear here.</span>
  <div class="table-wrapper">
    <EditableTable
      bind:items={$staffNames}
      {columns}
      key="code"
      itemFactory={staffFactory}
    />
  </div>
</div>

<style lang="postcss">
  .group {
    max-width: 18rem;
  }
  .group :global(.td:first-child) {
    font-family: var(--monospace);
  }
  .table-wrapper {
    margin-top: 1rem;
    overflow-x: auto;
    white-space: nowrap;
  }
  .table-wrapper :global(.table) {
    table-layout: auto;
    margin: auto;
    width: calc(100% - 6px);
  }
</style>
