<script lang="ts">
  import type { Course, CourseGroup } from '$lib/types';

  import EditableTable from '$lib/components/EditableTable.svelte';

  export let courseGroup: CourseGroup | undefined;
  export let selectedCourse: Course | undefined;

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

<div>
  {#if courseGroup}
    <h3>Classes in {courseGroup.name}</h3>

    <div class="table-wrapper">
      {#key courseGroup.name}
        <EditableTable
          bind:items={courseGroup.courses}
          columns={COLUMNS}
          selectable
          bind:selected={selectedCourse}
          addItem={() => ({ code: '', staffCode: '' })}
        />
      {/key}
    </div>

    <label>
      <span>Rename group:</span>
      <input bind:value={courseGroup.name} class="input-name" />
    </label>
  {:else}
    <h3>Create new group</h3>
    <p>(coming soon...)</p>
  {/if}
</div>

<style>
  .input-name {
    display: block;
    width: 15ch;
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
</style>
