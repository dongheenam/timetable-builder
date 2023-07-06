<script lang="ts">
  /* props */
  type Label = string | undefined;
  type Name = string | undefined;
  type Value = number;
  type RenderValue = (value: number) => string;
  export let label: Label;
  export let name: Name = label?.toLowerCase();
  export let value: Value;
  export let renderValue: RenderValue = (value) => value.toString();
</script>

<label>
  {#if label}
    <span class="label">{label}</span>
  {/if}
  <div class="input-container">
    <input type="range" {name} bind:value {...$$restProps} />
    <span class="value-display">{renderValue(value)}</span>
  </div>
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
  }

  .label {
    font-weight: 600;
    margin-bottom: var(--gap-sm);
  }
  .input-container {
    display: grid;
    grid-template-columns: 1fr max-content;
    column-gap: var(--gap-md);
  }
  .value-display {
    width: 4ex;
    text-align: right;
  }
</style>
