<script>
  /** @type {string | undefined} */
  export let label;

  /** @type {string | undefined} */
  export let name = label?.toLowerCase();

  /** @type {number} */
  export let value;
</script>

<label>
  {#if label}
    <span class="label">{label}</span>
  {/if}
  <input type="range" {name} bind:value {...$$restProps} />
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
  }

  .label {
    font-size: var(--size-sm);
    font-weight: 600;
    margin-bottom: 0.4em;
  }
</style>
