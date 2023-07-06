<script lang="ts">
  import { derived } from 'svelte/store';
  import EditableTable from '$lib/components/EditableTable.svelte';
  import type { Course } from '$lib/types';
  import { getLessons, lessonsLookup } from '$lib/stores';

  export let selectedCourse: Course;

  /** Edit timetable for the selected course */
  $: lessons = getLessons(selectedCourse?.code);

  // TODO: fix TypeScript error
  const COLUMNS: {
    header: string;
    key: 'day' | 'period' | 'staffCode' | 'room';
    editable: boolean;
  }[] = [
    { header: 'Day', key: 'day', editable: true },
    { header: 'Period', key: 'period', editable: true },
    { header: 'Staff', key: 'staffCode', editable: true },
    { header: 'Room', key: 'room', editable: true },
  ];

  const addLesson = () => ({
    day: 0,
    period: 0,
    staffCode: selectedCourse.staffCode,
    room: '',
  });

  /** Option to copy timetable from another course */
  const courseCodes = derived(lessonsLookup, ($lessonsLookup) => {
    return Object.keys($lessonsLookup).sort();
  });
  let copyFrom = '';
  const copyTimetable = () => {
    if (!copyFrom) return;
    const toCopy = $lessonsLookup[copyFrom];
    $lessons = toCopy.map((lesson) => ({
      ...lesson,
      staffCode: selectedCourse.staffCode,
    }));
    copyFrom = '';
  };
</script>

<div class="root">
  {#if $lessons}
    <h3>Lessons in {selectedCourse.code}</h3>
    <div class="table-wrapper">
      {#key selectedCourse.code}
        <EditableTable
          bind:items={$lessons}
          columns={COLUMNS}
          addable
          addItem={addLesson}
          removable
        />
      {/key}
    </div>
    <div class="copy-form">
      <label>
        <span>Copy timetable from:</span>
        <select bind:value={copyFrom} on:change={copyTimetable}>
          {#each ['', ...$courseCodes] as code}
            <option value={code}>
              {code}
            </option>
          {/each}
        </select>
      </label>
    </div>
  {:else}
    <h3>Error!</h3>
    <p>For some reason, we failed to fetch the lessons for the class...</p>
  {/if}
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
  .table-wrapper :global(tr.row-new) {
    color: var(--gray8);
  }
  /* Day and period columns */
  .table-wrapper :global(td:nth-child(1)),
  .table-wrapper :global(td:nth-child(2)) {
    max-width: 6ch;
  }
  /* Staff column */
  .table-wrapper :global(td:nth-child(3)) {
    max-width: 8ch;
  }
  /* Room column */
  .table-wrapper :global(td:nth-child(4)) {
    max-width: 8ch;
  }
</style>
