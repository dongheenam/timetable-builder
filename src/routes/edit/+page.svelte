<script lang="ts">
  import Card from '$lib/components/Card.svelte';

  import EditCourseGroups from './EditCourseGroups.svelte';
</script>

<div class="root">
  <h1>Edit</h1>
  <Card title="Classes" titleTag="h2">
    <EditCourseGroups />
  </Card>
</div>
