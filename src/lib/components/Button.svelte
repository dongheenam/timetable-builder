<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import ButtonBase from './ButtonBase.svelte';

  type $$Props = HTMLButtonAttributes & ComponentProps<ButtonBase>;
</script>

<ButtonBase on:click {...$$restProps}>
  <span><slot /></span>
</ButtonBase>

<style>
  span {
    display: flex;
    gap: 0.6em;
    align-items: center;

    padding: var(--gap-sm) var(--gap-md);
    font-weight: 600;
  }
</style>
