<script lang="ts">
  import { courseGroups } from '$lib/stores';

  import SelectGroup from './SelectGroup.svelte';
  import EditCourseGroup from './EditCourseGroup.svelte';

  let selected = '0';
</script>

<div class="root">
  <SelectGroup bind:selected />
  <EditCourseGroup bind:courseGroup={$courseGroups[parseInt(selected)]} />
  {JSON.stringify($courseGroups)}
</div>

<style>
  .root {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-md);
  }
</style>
