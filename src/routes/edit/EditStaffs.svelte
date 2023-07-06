<script lang="ts">
  import { staffs } from '$lib/stores';
  import type { Staff } from '$lib/types';

  import EditableTable from '$lib/components/EditableTable.svelte';

  // TODO: fix Typescript error
  const COLUMNS: {
    header: string;
    key: 'code' | 'name';
    editable: boolean;
  }[] = [
    { header: 'Code', key: 'code', editable: false },
    { header: 'Name', key: 'name', editable: true },
  ];
</script>

<div class="root">
  <p>Staff codes entered in the tables on the right will appear here.</p>
  <div class="table-wrapper">
    <EditableTable items={$staffs} columns={COLUMNS} />
  </div>
</div>

<style>
  .table-wrapper {
    margin: var(--gap-md) 0;
  }
  .table-wrapper :global(th) {
    background-color: var(--primary6);
  }
  .table-wrapper :global(tr) {
    background-color: var(--white);
  }
  .table-wrapper :global(tr:nth-child(even)) {
    background-color: var(--primary2);
  }
  /* Code column */
  .table-wrapper :global(td:nth-child(1)) {
    min-width: 8ch;
  }
  /* Name column */
  /* .table-wrapper :global(td:nth-child(2)) {
  } */
</style>
