<script lang="ts">
  import { IconEdit, IconPlus, IconX } from '@tabler/icons-svelte';
  import ButtonIcon from './ButtonIcon.svelte';

  /** props */
  type T = $$Generic;
  type K = $$Generic<keyof T>;
  export let items: T[];
  export let columns: {
    header: string;
    key: K;
    editable?: boolean;
    placeholder?: string;
  }[];
  export let selectable: boolean = false;
  export let selected: T | undefined = undefined;
  export let addItem: () => T;

  /* helper functions */
  let newRow = addItem();
  const addRow = (newItem: T) => {
    items = [...items, newItem];
    newRow = addItem();
  };
  const removeRow = (index: number) => {
    items = items.filter((_item, idx) => idx !== index);
  };
  const selectRow = (index: number) => {
    if (selectable) selected = items[index];
  };
</script>

<table>
  <thead>
    <tr>
      {#each [...columns.map((col) => col.header), ''] as header}
        <th>{header}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each items as item, index}
      <tr>
        {#each columns as col}
          <td>
            {#if col.editable}
              <input
                type="text"
                bind:value={item[col.key]}
                placeholder={col.placeholder}
                size={String(item[col.key]).length ||
                  col.placeholder?.length ||
                  1}
              />
            {:else}
              {item[col.key]}
            {/if}
          </td>
        {/each}
        <td>
          {#if selectable}
            <ButtonIcon label="select item" on:click={() => selectRow(index)}>
              <IconEdit />
            </ButtonIcon>
          {/if}
          <ButtonIcon label="remove item" on:click={() => removeRow(index)}>
            <IconX />
          </ButtonIcon>
        </td>
      </tr>
    {/each}
    <tr>
      {#each columns as col}
        <td>
          {#if col.editable}
            <input
              type="text"
              bind:value={newRow[col.key]}
              placeholder={col.placeholder}
              size={String(newRow[col.key]).length ||
                col.placeholder?.length ||
                1}
            />
          {:else}
            {newRow[col.key]}
          {/if}
        </td>
      {/each}
      <td>
        <ButtonIcon label="add item" on:click={() => addRow(newRow)}>
          <IconPlus />
        </ButtonIcon>
      </td>
    </tr>
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
  }
  input {
    margin-inline: 3px;
    border: none;
    background: transparent;
  }
</style>
