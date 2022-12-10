<script>
  import ClassEdit from "../lib/ClassEdit.svelte";
  import RoomEdit from "../lib/RoomEdit.svelte";
  import StaffEdit from "../lib/StaffEdit.svelte";

  import "./Edit.css";
</script>

<div class="root">
  <div class="container-staff">
    <h2>Staff Codes</h2>
    <StaffEdit />
  </div>
  <div class="container-class">
    <h2>Class Allocations</h2>
    <ClassEdit />
  </div>
  <div class="container-room">
    <h2>Rooms and Timetables</h2>
    <RoomEdit />
  </div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 2.5rem;
  }
  .container-class {
    flex-grow: 1;
  }
  .container-room {
    min-width: 100%;
  }

  h2 {
    margin-bottom: var(--h3-mt);
  }
</style>
