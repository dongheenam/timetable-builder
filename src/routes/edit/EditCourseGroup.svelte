<script lang="ts">
  import type { Course, CourseGroup } from '$lib/types';

  import EditableTable from '$lib/components/EditableTable.svelte';
  import Button from '$lib/components/Button.svelte';

  export let courseGroup: CourseGroup;
  export let selectedCourse: Course | undefined;

  $: console.log(courseGroup);

  export let removeCourseGroup: () => void;

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
  <h3>Classes in {courseGroup.name}</h3>

  <div class="table-wrapper">
    {#key courseGroup.name}
      <EditableTable
        bind:items={courseGroup.courses}
        columns={COLUMNS}
        selectable
        bind:selected={selectedCourse}
        addable
        addItem={() => ({ code: '', staffCode: '' })}
        removable
      />
    {/key}
  </div>

  <label>
    <span>Rename group:</span>
    <input bind:value={courseGroup.name} class="input-name" />
  </label>

  <Button on:click={removeCourseGroup} color="red" variant="subtle"
    >Remove group</Button
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
    background-color: var(--primary4);
  }
  .table-wrapper :global(tr) {
    background-color: var(--white);
  }
  .table-wrapper :global(tr:nth-child(even)) {
    background-color: var(--primary3);
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
