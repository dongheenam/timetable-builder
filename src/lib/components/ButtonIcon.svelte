<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import ButtonBase from './ButtonBase.svelte';
  type $$Props = HTMLButtonAttributes &
    ComponentProps<ButtonBase> & {
      label: string;
    };
  export let label: string;
</script>

<ButtonBase on:click {label} {...$$restProps}>
  <span><slot /></span>
</ButtonBase>

<style>
  span {
    display: flex;
  }
  span :global(svg) {
    display: inline;
  }
</style>
