<script lang="ts">
  import { courseGroups } from '$lib/stores';
  import type { Course, CourseGroup } from '$lib/types';
  import { IconEdit } from '@tabler/icons-svelte';

  import SelectGroup from './SelectGroup.svelte';
  import EditCourseGroup from './EditCourseGroup.svelte';
  import EditLessons from './EditLessons.svelte';
  import CreateCourseGroup from './CreateCourseGroup.svelte';

  let selectedGroupIndex = '0';
  let selectedCourse: Course | undefined;
  $: selectedGroup = $courseGroups[parseInt(selectedGroupIndex)];
  $: selectedGroupIndex, (selectedCourse = undefined);

  let newCourseGroup: CourseGroup = {
    name: '',
    courses: [],
  };
  const createCourseGroup = () => {
    if (!newCourseGroup.name) return;
    if (!newCourseGroup.courses.length) return;

    courseGroups.update((groups) => [...groups, newCourseGroup]);
    newCourseGroup = { name: '', courses: [] };
  };
  const removeCourseGroup = (index: number) => () => {
    courseGroups.update((groups) => {
      groups.splice(index, 1);
      return groups;
    });
  };
</script>

<div class="root">
  <SelectGroup bind:selected={selectedGroupIndex} />
  {#if selectedGroup}
    <EditCourseGroup
      bind:courseGroup={selectedGroup}
      bind:selectedCourse
      removeCourseGroup={removeCourseGroup(parseInt(selectedGroupIndex))}
    />
  {:else}
    <CreateCourseGroup bind:newCourseGroup {createCourseGroup} />
  {/if}
  {#if selectedCourse}
    <EditLessons {selectedCourse} />
  {:else}
    <div>
      <h3>Class not selected!</h3>
      <p>
        Use the edit button <IconEdit size={18} stroke={1} /> in the class table
        to view and edit classes.
      </p>
    </div>
  {/if}
</div>

<style>
  .root {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-lg);
  }
  p :global(svg) {
    display: inline;
    vertical-align: middle;
  }
</style>
