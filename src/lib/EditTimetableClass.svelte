<script>
  import EditableTable from "./components/EditableTable.svelte";
  import { getTimetable } from "./stores";

  export let classItem;

  // table props
  const classTimetable = getTimetable(classItem.code);
  const columns = [
    { header: "Day", key: "day" },
    { header: "Period", key: "period" },
    { header: "Room", key: "room" },
  ];
  const lessonFactory = () => {
    const numLessons = $classTimetable.length;
    const lastRoom = numLessons > 0 ? $classTimetable[numLessons - 1].room : "";
    return { day: "", period: "", room: lastRoom };
  };
</script>

<div class="root">
  <div class="title-container">
    <span class="title">- {classItem.code} ({classItem.staff}) </span>
  </div>
  <EditableTable
    bind:items={$classTimetable}
    {columns}
    itemFactory={lessonFactory}
  />
</div>

<style>
  .title-container {
    margin-top: 2rem;
  }
  .title {
    font-weight: 500;
    font-family: var(--monospace);
    margin-right: 1rem;
  }

  .root :global(.table) {
    margin: 1rem 0 0 1.5rem;
    width: 15rem;
  }
  .root :global(.td:first-child) {
    text-align: right;
  }
</style>
