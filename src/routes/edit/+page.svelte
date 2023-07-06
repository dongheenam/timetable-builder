<script lang="ts">
  import Card from '$lib/components/Card.svelte';

  import EditCourseGroups from './EditCourseGroups.svelte';
  import EditStaffs from './EditStaffs.svelte';
</script>

<div class="root">
  <h1>Edit</h1>
  <div class="card-group">
    <Card title="Classes" titleTag="h2">
      <EditCourseGroups />
    </Card>
    <Card title="Staff" titleTag="h2">
      <EditStaffs />
    </Card>
  </div>
</div>

<style>
  .card-group > :global(*) {
    margin-bottom: var(--gap-lg);
  }
</style>
