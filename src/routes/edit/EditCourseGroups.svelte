<script lang="ts">
  import { courseGroups } from '$lib/stores';
  import type { Course } from '$lib/types';

  import SelectGroup from './SelectGroup.svelte';
  import EditCourseGroup from './EditCourseGroup.svelte';
  import EditLessons from './EditLessons.svelte';

  let selectedGroupIndex = '0';
  let selectedCourse: Course | undefined;
  $: selectedGroupIndex, (selectedCourse = undefined);
</script>

<div class="root">
  <SelectGroup bind:selected={selectedGroupIndex} />
  <EditCourseGroup
    bind:courseGroup={$courseGroups[parseInt(selectedGroupIndex)]}
    bind:selectedCourse
  />
  {#if selectedCourse}
    <EditLessons {selectedCourse} />
  {:else}
    <div>
      <h3>Class not selected!</h3>
      <p>Use the edit button in the class table to view and edit classes.</p>
    </div>
  {/if}
  {JSON.stringify($courseGroups)}
</div>

<style>
  .root {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-lg);
  }
</style>
