<script lang="ts">
  import type { CourseGroup } from '$lib/types';

  export let courseGroup: CourseGroup | undefined;
</script>

<div>
  {#if courseGroup}
    <h3>Classes in {courseGroup.name}</h3>
    <input bind:value={courseGroup.name} />
  {:else}
    <h3>Create new group</h3>
  {/if}
</div>
