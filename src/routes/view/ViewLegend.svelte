<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import { staffs } from '$lib/stores';

  export let legendElement: HTMLTableElement;
</script>

<div class="root">
  <Card title="Legend" titleTag="h3" open={false} toggleable={true}>
    <table bind:this={legendElement} class="legend">
      <thead>
        <tr>
          <th>Code</th>
          <th>Staff name</th>
        </tr>
      </thead>
      <tbody>
        {#each $staffs as staff}
          <tr>
            <td>{staff.code}</td>
            <td>{staff.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Card>
</div>

<style>
  .root {
    position: fixed;
    bottom: 0rem;
    right: 2rem;
  }
  .legend {
    table-layout: fixed;
    border-collapse: collapse;
  }
  .legend th {
    text-align: left;
    font-weight: 700;
    white-space: pre-line;
  }
  .legend th,
  .legend td {
    line-height: 1;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--gray11);
  }
</style>
