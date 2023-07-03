<script lang="ts">
  import { groupNames } from '$lib/stores';

  export let selected: string;

  $: options = [...$groupNames, ''];
</script>

<div>
  <h3>Groups</h3>
  <select size={10} bind:value={selected}>
    {#each options as option, index}
      <option value={index}>{option || 'Create new...'}</option>
    {/each}
  </select>
</div>
