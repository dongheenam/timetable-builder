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
  <div class="input-container">
    <input type="range" {name} bind:value {...$$restProps} />
    <span class="value-display">{value}</span>
  </div>
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
  .input-container {
    display: grid;
    grid-template-columns: 1fr max-content;
    column-gap: 1rem;
  }
  .value-display {
    width: 4ex;
    text-align: right;
  }
</style>
