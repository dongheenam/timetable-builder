<script>
  // @ts-nocheck
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import ButtonIcon from "./ButtonIcon.svelte";

  // props
  /** @type { {header: string; key: number | string; placeholder?: string}[] } */
  export let columns = [
    { header: "Col 1", key: 1, placeholder: "...1" },
    { header: "Col 2", key: 0, placeholder: "...2" },
  ];
  /** @type {number | string | undefined}*/
  export let key = undefined;
  /** @type {any[][] | { [key: string]: any }[]} */
  export let items = [
    ["Item 0-0", "Item 0-1"],
    ["Item 1-0", "Item 1-1"],
  ];
  /** @type {() => typeof items[number] } */
  export let itemFactory = () => [
    `Item ${items.length}-0`,
    `Item ${items.length}-1`,
  ];
  export let classes = {
    table: undefined,
    thead: undefined,
    th: undefined,
    tbody: undefined,
    tr: undefined,
    trNew: undefined,
    td: undefined,
    tdBtn: undefined,
  };

  // helper for keys
  const getKey = (item, idx) => {
    if (key === undefined) return idx;
    return item[key];
  };

  // define logics for creating and removing rows
  let newRow = itemFactory();
  const addRow = (toAdd) => {
    if (key && items.some((item) => item[key] === toAdd[key])) {
      alert("Cannot add an item with existing key!");
      return;
    }
    if (key && columns.every(({ key }) => !toAdd[key])) {
      alert("Item is empty!");
      return;
    }
    items = [...items, toAdd];
    newRow = itemFactory();
  };
  const removeRow = (toRemove) => {
    items = items.filter((_item, idx) => idx !== toRemove);
  };

  // merge class names
  const {
    table = "table",
    thead = "thead",
    th = "th",
    tbody = "tbody",
    tr = "tr",
    trNew = "tr-new",
    td = "td",
    tdBtn = "td-btn",
  } = classes;
</script>

<table class={table}>
  <thead class={thead}>
    <tr>
      {#each [...columns.map((col) => col.header), ""] as header}
        <th class={th}>{header}</th>
      {/each}
    </tr>
  </thead>
  <tbody class={tbody}>
    {#each items as item, idx (getKey(item, idx))}
      <tr
        class={tr}
        on:keydown={(e) => {
          switch (e.key) {
            case "Delete":
              e.preventDefault();
              // move focus to the next column
              e.currentTarget.previousSibling.childNodes[0].focus();
              removeRow(idx);
              break;
          }
        }}
      >
        {#each columns as col}
          <td
            class={`focusable ${td}`}
            contenteditable="true"
            bind:innerHTML={item[col.key]}
            placeholder={col.placeholder}
          />
        {/each}
        <td class={tdBtn}>
          <ButtonIcon
            label="remove row"
            on:click={() => removeRow(idx)}
            tabindex={-1}
          >
            <RowDelete size={16} />
          </ButtonIcon>
        </td>
      </tr>
    {/each}
    <tr
      class={trNew}
      on:keydown={(e) => {
        switch (e.key) {
          case "Enter":
            e.preventDefault();
            // move focus to the first column
            e.currentTarget.childNodes[0].focus();
            addRow(newRow);
            break;
        }
      }}
    >
      {#each columns as col}
        <td
          class={`focusable ${td}`}
          contenteditable="true"
          bind:innerHTML={newRow[col.key]}
          placeholder={col.placeholder}
        />
      {/each}
      <td class={tdBtn}>
        <ButtonIcon
          label="add row"
          on:click={() => addRow(newRow)}
          tabindex={-1}
        >
          <Add size={16} />
        </ButtonIcon>
      </td>
    </tr>
  </tbody>
</table>

<style lang="postcss">
  .table {
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 0;
    padding: 0.25rem;
    border: 1px solid var(--gray8);
  }
  .tr:nth-child(even) {
    background-color: var(--primary2);
  }
  .td,
  .th {
    text-align: right;
    padding: 0 0.5em;
  }
  .td:first-child,
  .th:first-child {
    text-align: left;
  }

  .td-btn {
    width: 1.5rem;
    visibility: hidden;
    vertical-align: middle;
    & :global(button) {
      margin-left: auto;
      display: block;
    }
  }
  .tr-new {
    visibility: hidden;
    height: 1.5em;
    color: var(--gray10);
  }
  .table:hover,
  .table:focus-within {
    & .td-btn,
    & .tr-new {
      visibility: visible;
    }
  }
</style>
