<script>
  import Close from "carbon-icons-svelte/lib/Close.svelte";

  /** @type {string | undefined} */
  export let label;

  /** @type {string | undefined} */
  export let name = label?.toLowerCase();

  /** @type {string} */
  export let value = "";
</script>

<label>
  <span class="label">{label}</span>
  <div class="input-container">
    <input type="text" {name} bind:value />
    {#if value.length}
      <button
        tabindex="-1"
        type="button"
        on:click={() => {
          value = "";
        }}
      >
        <Close size={16} />
      </button>
    {/if}
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
    width: 100%;
    padding-right: 0.25rem;
    border: 1px solid var(--gray7);
    border-radius: var(--radius-item);

    display: flex;
    align-items: center;
  }
  .input-container:focus-within {
    outline: 3px solid var(--primary8);
  }
  .input-container *:focus {
    outline: none;
  }

  input {
    display: block;
    flex: 1;
    height: calc(2em - 2px);
    padding-left: 0.5rem;
    border: none;
  }
  button {
    color: var(--gray10);
    border-radius: 2px;
  }
  button:hover {
    color: var(--gray12);
    background-color: var(--gray3);
  }
</style>
