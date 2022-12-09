<script>
  import ClassEdit from "../lib/ClassEdit.svelte";
  import RoomEdit from "../lib/RoomEdit.svelte";
</script>

<h2>Class Allocations</h2>
<ClassEdit />

<h2>Rooms and Timetables</h2>
<RoomEdit />

<style>
  h2 {
    margin-bottom: var(--h3-mt);
  }
</style>
