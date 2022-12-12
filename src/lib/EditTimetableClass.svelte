<script>
  import { getTimetable } from "./stores";

  export let classItem;

  const classTimetable = getTimetable(classItem.code);
</script>

<div class="title">- {classItem.code} ({classItem.staff})</div>
<ol class="table">
  {#each $classTimetable as lesson}
    <li>
      <span contenteditable="true" bind:innerHTML={lesson.day} />
      <span contenteditable="true" bind:innerHTML={lesson.period} />
      <span contenteditable="true" bind:innerHTML={lesson.room} />
    </li>
  {/each}
</ol>

<style>
  .title {
    font-weight: 500;
    font-family: var(--monospace);
    margin-top: 2rem;
  }

  .table {
    margin-left: 1.5rem;
  }
</style>
