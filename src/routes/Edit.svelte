<script>
  import EditClass from "../lib/EditClass.svelte";
  import EditTimetable from "../lib/EditTimetable.svelte";
  import EditStaff from "../lib/EditStaff.svelte";

  import "./Edit.css";
</script>

<div class="root">
  <h2>Class Allocations</h2>
  <div class="container-class">
    <EditClass />
  </div>
  <div class="container-staff">
    <EditStaff />
  </div>
  <div class="container-room">
    <h2>Rooms and Timetables</h2>
    <EditTimetable />
  </div>
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

  .container-class {
    flex-grow: 1;
  }
  .container-room {
    min-width: 100%;
  }
</style>
