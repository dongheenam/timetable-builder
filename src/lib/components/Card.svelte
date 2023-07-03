<script lang="ts">
  import { IconChevronDown } from '@tabler/icons-svelte';

  import ButtonIcon from '$lib/components/ButtonIcon.svelte';

  export let title: string;
  export let titleTag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';
  export let open: boolean = true;
  export let toggleable: boolean = false;

  $: expanded = open;

  const handleToggle = () => {
    if (toggleable) {
      expanded = !expanded;
    }
  };
</script>

<div class="card" data-expanded={expanded} data-expandable={toggleable}>
  <div class="title-block">
    <svelte:element this={titleTag}>{title}</svelte:element>
    {#if toggleable}
      <ButtonIcon
        label="toggle the card"
        on:click={handleToggle}
        disabled={!toggleable}
      >
        <IconChevronDown />
      </ButtonIcon>
    {/if}
  </div>
  <div class="content-block">
    <slot />
  </div>
</div>

<style>
  .card {
    padding: var(--gap-sm) var(--gap-md);
    display: flex;
    flex-direction: column;
    gap: var(--gap-md);

    background-color: var(--gray1);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-xs);
  }

  .title-block {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    gap: var(--gap-sm);
  }
  .card[data-expanded='true'] .title-block :global(svg) {
    transform: rotate(180deg);
  }

  /* TODO: add transition effects */
  .content-block {
    display: none;
  }
  .card[data-expanded='true'] .content-block {
    display: block;
  }
</style>
