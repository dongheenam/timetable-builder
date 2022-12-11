<script>
  import ClassEdit from "../lib/ClassEdit.svelte";
  import RoomEdit from "../lib/RoomEdit.svelte";
  import StaffEdit from "../lib/StaffEdit.svelte";

  import "./Edit.css";
</script>

<div class="root">
  <h2>Class Allocations</h2>
  <div class="container-class">
    <ClassEdit />
  </div>
  <div class="container-staff">
    <StaffEdit />
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
