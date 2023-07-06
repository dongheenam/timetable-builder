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
  export let addable: boolean = false;
  export let addItem: () => T = () => ({} as T);
  export let selectable: boolean = false;
  export let selected: T | undefined = undefined;
  export let removable: boolean = false;

  $: actionColumnExists = removable || selectable;
  $: headers = actionColumnExists
    ? [...columns.map((col) => col.header), '']
    : columns.map((col) => col.header);

  /* helper functions */
  let newRow = addItem();
  const addRow = (newItem: T) => {
    if (!addable) return;
    items = [...items, newItem];
    newRow = addItem();
  };
  const removeRow = (index: number) => {
    if (!removable) return;
    items = items.filter((_item, idx) => idx !== index);
  };
  const selectRow = (index: number) => {
    if (!selectable) return;
    selected = items[index];
  };
</script>

<table>
  <thead>
    <tr>
      {#each headers as header}
        <th>{header}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each items as item, index}
      <tr data-selected={selectable && selected === item}>
        {#each columns as col}
          <td>
            {#if col.editable}
              <input
                type="text"
                bind:value={item[col.key]}
                placeholder={col.placeholder}
              />
            {:else}
              {item[col.key]}
            {/if}
          </td>
        {/each}
        {#if actionColumnExists}
          <td>
            <div class="btn-block">
              {#if selectable}
                <ButtonIcon
                  label="select item"
                  on:click={() => selectRow(index)}
                  tabindex={-1}
                >
                  <IconEdit />
                </ButtonIcon>
              {/if}
              <ButtonIcon
                label="remove item"
                on:click={() => removeRow(index)}
                tabindex={-1}
              >
                <IconX />
              </ButtonIcon>
            </div>
          </td>
        {/if}
      </tr>
    {/each}
    {#if removable}
      <tr class="row-new">
        {#each columns as col}
          <td>
            {#if col.editable}
              <input
                type="text"
                bind:value={newRow[col.key]}
                placeholder={col.placeholder}
              />
            {:else}
              {newRow[col.key]}
            {/if}
          </td>
        {/each}
        <td>
          <div class="btn-block">
            <ButtonIcon
              label="add item"
              on:click={() => addRow(newRow)}
              tabindex={-1}
            >
              <IconPlus />
            </ButtonIcon>
          </div>
        </td>
      </tr>
    {/if}
  </tbody>
</table>

<style>
  table {
    table-layout: fixed;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid var(--gray8);
  }
  input {
    margin-inline: 2px;
    width: calc(100% - 4px);
    border: none;
    background: transparent;
  }
  .btn-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    gap: 2px;
    margin: 2px;
  }
</style>
