<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ButtonBase from './ButtonBase.svelte';

  type $$Props = ComponentProps<ButtonBase>;
</script>

<ButtonBase {...$$restProps}>
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
