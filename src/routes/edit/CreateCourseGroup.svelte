<script lang="ts">
  import type { Course, CourseGroup } from '$lib/types';

  import EditableTable from '$lib/components/EditableTable.svelte';
  import Button from '$lib/components/Button.svelte';

  export let newCourseGroup: CourseGroup = {
    name: '',
    courses: [],
  };

  export let createCourseGroup: () => void;

  // TODO: fix TypeScript error
  const COLUMNS: {
    header: string;
    key: 'code' | 'staffCode';
    editable: boolean;
  }[] = [
    { header: 'Class', key: 'code', editable: true },
    { header: 'Staff', key: 'staffCode', editable: true },
  ];
</script>

<div class="root">
  <h3>Create new group</h3>

  <div class="table-wrapper">
    <EditableTable
      bind:items={newCourseGroup.courses}
      columns={COLUMNS}
      addable
      addItem={() => ({ code: '', staffCode: '' })}
      removable
    />
  </div>
  <label>
    <span>Name:</span>
    <input bind:value={newCourseGroup.name} class="input-name" />
  </label>
  <Button on:click={createCourseGroup} color="primary" variant="subtle"
    >Create group</Button
  >
</div>

<style>
  .root > :global(*) {
    display: block;
    margin-bottom: var(--gap-md);
  }
  .input-name {
    width: 10ch;
  }
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
  .table-wrapper :global(tr.row-new) {
    color: var(--gray8);
  }
  /* Class column */
  .table-wrapper :global(td:nth-child(1)) {
    max-width: 10ch;
  }
  /* Staff column */
  .table-wrapper :global(td:nth-child(2)) {
    max-width: 8ch;
  }
  .table-wrapper :global(tr[data-selected='true']) {
    font-weight: bold;
    background-color: var(--primary4);
  }
</style>
