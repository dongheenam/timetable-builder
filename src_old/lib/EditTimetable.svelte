<script>
  import { classGroups } from "./stores";
  import EditTimetableGroup from "./EditTimetableGroup.svelte";
</script>

<div class="root">
  {#each $classGroups as classGroup}
    <EditTimetableGroup {classGroup} />
  {/each}
</div>

<style>
  .root {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
