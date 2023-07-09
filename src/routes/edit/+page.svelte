<script lang="ts">
  import Card from '$lib/components/Card.svelte';

  import EditCourseGroups from './EditCourseGroups.svelte';
  import EditStaffs from './EditStaffs.svelte';
  import SaveLoad from './SaveLoad.svelte';
</script>

<div class="root">
  <h1>Edit</h1>
  <div class="card-group">
    <Card title="Save/Load">
      <SaveLoad />
    </Card>
    <Card title="Classes">
      <EditCourseGroups />
    </Card>
    <Card title="Staff">
      <EditStaffs />
    </Card>
  </div>
</div>

<style>
  .card-group > :global(*) {
    margin: var(--gap-lg) 0;
  }
</style>
