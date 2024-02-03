<script lang="ts">
  import TimetableSettings from './TimetableSettings.svelte';
  import ViewLegend from './ViewLegend.svelte';
  import ViewTimetable from './ViewTimetable.svelte';

  let timetableElement: HTMLTableElement;
  let legendElement: HTMLTableElement;
</script>

<div class="root">
  <h1>View Timetable</h1>
  <TimetableSettings {timetableElement} {legendElement} />
  <ViewTimetable bind:timetableElement />
  <ViewLegend bind:legendElement />
</div>

<style>
  .root > :global(*) {
    margin-bottom: var(--gap-lg);
  }
</style>
