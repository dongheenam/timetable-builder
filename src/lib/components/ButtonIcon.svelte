<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ButtonBase from './ButtonBase.svelte';

  type $$Props = ComponentProps<ButtonBase> & {
    label: string;
  };
  export let label: string;
</script>

<ButtonBase {label} {...$$restProps}>
  <span><slot /></span>
</ButtonBase>

<style>
  span :global(svg) {
    display: inline;
  }
</style>
