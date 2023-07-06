<script lang="ts">
  import TimetableSettings from './TimetableSettings.svelte';
  import ViewTimetable from './ViewTimetable.svelte';

  let tableElement: HTMLTableElement;
</script>

<div class="root">
  <h1>View Timetable</h1>
  <TimetableSettings {tableElement} />
  <ViewTimetable bind:tableElement />
</div>

<style>
  .root > :global(*) {
    margin-bottom: var(--gap-lg);
  }
</style>
