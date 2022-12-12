<script>
  import EditTimetableClass from "./EditTimetableClass.svelte";

  export let classGroup;

  let isOpen = true;
</script>

<div class="group">
  <div class="group-title">
    <h3>{classGroup.name}</h3>
  </div>
  {#if isOpen}
    <div class="timetable-container">
      {#each classGroup.classes as classItem}
        <EditTimetableClass {classItem} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .group-title {
    margin-bottom: 0;
  }
  .timetable-container {
    margin-left: 1rem;
  }
</style>
