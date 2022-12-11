<script>
  import EditableTable from "./components/EditableTable.svelte";

  // props
  export let staffs = [
    { code: "AIS", name: "Andrew Shelley" },
    { code: "TWP", name: "Thomas Pask" },
    { code: "JZF", name: "James Frith" },
  ];

  // table props
  const columns = [
    { header: "Code", key: "code", placeholder: ".." },
    { header: "Staff Name", key: "name", placeholder: "..." },
  ];
  const staffFactory = () => ({ code: "", name: "" });
</script>

<div class="group">
  <div class="group-title">
    <h3>Staff codes</h3>
  </div>
  <span>Staff codes entered in the tables on the right will appear here.</span>
  <div class="table-wrapper">
    <EditableTable
      bind:items={staffs}
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
    width: 100%;
  }
</style>
