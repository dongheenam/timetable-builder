<script lang="ts">
  import type { CourseGroup } from '$lib/types';

  import EditableTable from '$lib/components/EditableTable.svelte';

  export let courseGroup: CourseGroup | undefined;

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
    <input bind:value={courseGroup.name} />
    <EditableTable
      bind:items={courseGroup.courses}
      columns={COLUMNS}
      selectable
      addItem={() => ({ code: '', staffCode: '' })}
    />
  {:else}
    <h3>Create new group</h3>
    <p>(coming soon...)</p>
  {/if}
</div>
