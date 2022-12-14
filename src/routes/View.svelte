<script>
  import ViewTimetable from "../lib/ViewTimetable.svelte";
</script>

<svelte:head>
  <title>Timetable Builder - View</title>
</svelte:head>

<div class="root">
  <h2>View Timetable</h2>
  <ViewTimetable />
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 2.5rem;
  }
  h2 {
    min-width: 100%;
    margin-bottom: var(--h3-mt);
  }
</style>
