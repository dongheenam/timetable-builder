<script>
  /** @type {null | (() => void) } */
  export let onClick = null;

  /** @type {string} */
  export let label;
</script>

<button on:click={onClick} aria-label={label} {...$$restProps}>
  <slot />
</button>

<style>
  button {
    box-sizing: content-box;
    line-height: 1;
    padding: 2px;
    border-radius: var(--radius-item, 4px);

    background-color: transparent;
    color: var(--gray11);
  }
  button:hover {
    color: var(--gray12);
    background-color: var(--gray4);
  }
  button:active {
    background-color: var(--gray5);
  }

  button:disabled {
    color: var(--gray10);
  }
</style>
