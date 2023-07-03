<script>
  export let lessonGroups = [];
  export let isMonospace = false;
</script>

<td>
  {#each lessonGroups as group}
    <div class="lesson-group">
      <span class="lesson-title">{group.name}</span>
      {#each group.lessons as lesson}
        <span class="lesson" class:monospace={isMonospace}
          >{lesson.code} {lesson.room} {lesson.staff}</span
        >
      {/each}
    </div>
  {/each}
</td>

<style>
  td {
    vertical-align: top;
  }
  .lesson-group {
    margin-bottom: 1em;
  }
  .lesson-group span {
    display: block;
  }
  .lesson-title {
    font-weight: 700;
    margin-bottom: 0.25em;
  }
  .monospace {
    font-family: var(--monospace);
    font-weight: 300;
  }
</style>
