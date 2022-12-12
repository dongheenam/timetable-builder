<script>
  import { classGroups, timetables } from "./stores";
  import EditTimetableGroup from "./EditTimetableGroup.svelte";
</script>

<div class="root">
  {#each $classGroups as classGroup}
    <EditTimetableGroup {classGroup} />
  {/each}
  <pre>{JSON.stringify($timetables, null, 2)}</pre>
</div>
