<script>
  /** @type {"gray" | "primary" | "green" | "yellow" | "red"} */
  export let color = "gray";

  /** @type {"default" | "outline" | "subtle" | "filled" }*/
  export let variant = "default";

  /** @type {null | (() => void) } */
  export let onClick = null;

  /** @type {{[key: string]: string | null}} */
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
    if (color !== "gray") {
      vars.text = `var(--${color}11)`;
      vars.textHover = `var(--${color}12)`;
      vars.bgHover = `var(--${color}4)`;
      vars.bgActive = `var(--${color}5)`;
    }
    switch (variant) {
      case "outline":
        vars.bd = `currentColor`;
        break;
      case "subtle":
        vars.bg = `var(--${color}3)`;
        break;
      case "filled":
        vars = {
          ...vars,
          text: `var(--bg)`,
          textHover: `var(--bg)`,
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
  on:click={onClick}
  {...$$restProps}
>
  <slot />
</button>

<style>
  button {
    padding: 0.6em 1em;
    font-weight: 600;

    display: flex;
    gap: 0.6em;
    align-items: center;

    color: var(--btn-color, var(--gray11));
    background-color: var(--btn-bg, var(--bg));
    border: 1px solid var(--btn-bd, transparent);
    border-radius: var(--radius-item);
  }
  button :global(iconify-icons) {
    font-size: 1.5em;
  }
  button:hover {
    color: var(--btn--hover-color, var(--gray12));
    background-color: var(--btn--hover-bg, var(--gray4));
  }
  button:active {
    background-color: var(--btn--active-bg, var(--gray5));
  }
</style>
