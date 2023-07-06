<script lang="ts">
  export let color: 'gray' | 'primary' | 'green' | 'yellow' | 'red' = 'gray';
  export let variant: 'default' | 'outline' | 'subtle' | 'filled' = 'default';
  export let label: string | undefined = undefined;

  let vars: { [key: string]: string | null };
  $: vars = {
    text: null,
    textHover: null,
    bd: null,
    bg: null,
    bgHover: null,
    bgActive: null,
  };
  // variants
  $: {
    if (color !== 'gray') {
      vars.text = `var(--${color}11)`;
      vars.textHover = `var(--${color}12)`;
      vars.bgHover = `var(--${color}4)`;
      vars.bgActive = `var(--${color}5)`;
    }
    switch (variant) {
      case 'outline':
        vars.bd = `currentColor`;
        break;
      case 'subtle':
        vars.bg = `var(--${color}3)`;
        break;
      case 'filled':
        vars = {
          ...vars,
          text: `var(--white)`,
          textHover: `var(--white)`,
          bg: `var(--${color}9)`,
          bgHover: `var(--${color}10)`,
          bgActive: `var(--${color}11)`,
        };
        break;
    }
  }
</script>

<button
  style:--btn-color={vars.text}
  style:--btn--hover-color={vars.textHover}
  style:--btn-bd={vars.bd}
  style:--btn-bg={vars.bg}
  style:--btn--hover-bg={vars.bgHover}
  style:--btn--active-bg={vars.bgActive}
  on:click
  title={label}
  {...$$restProps}
>
  <slot />
</button>

<style>
  button {
    color: var(--btn-color, var(--gray11));
    background-color: var(--btn-bg, var(--white));
    border: 1px solid var(--btn-bd, transparent);
    border-radius: var(--border-radius-sm);
  }
  button:enabled {
    cursor: pointer;
  }
  button:enabled:hover {
    color: var(--btn--hover-color, var(--gray12));
    background-color: var(--btn--hover-bg, var(--gray4));
  }
  button:enabled:active {
    background-color: var(--btn--active-bg, var(--gray5));
  }
</style>
