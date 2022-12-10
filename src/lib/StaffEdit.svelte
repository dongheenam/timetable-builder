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
    { header: "Code", key: "code", placeholder: "XXX1" },
    { header: "Staff Name", key: "name", placeholder: "name..." },
  ];
  const staffFactory = () => ({ code: "", name: "" });
</script>

<div class="group">
  <EditableTable
    bind:items={staffs}
    {columns}
    key="code"
    itemFactory={staffFactory}
  />
</div>

<style lang="postcss">
  div :global(.td:first-child) {
    font-family: var(--monospace);
  }
</style>
