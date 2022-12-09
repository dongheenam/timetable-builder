<script>
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import { empty } from "svelte/internal";

  import ButtonIcon from "./components/ButtonIcon.svelte";

  /**
   * Class data sets
   * @typedef { {code: string; staff: string} } ClassItem
   * @typedef { {name: string; classes: ClassItem[]} } ClassGroup
   */

  const emptyGroup = { name: "", classes: [] };
  const emptyClassItem = { code: "", staff: "" };

  /** @type {ClassGroup[]} */
  export let classGroups = [
    {
      name: "Year 7 Science",
      classes: [
        { code: "SE0701", staff: "AIG" },
        { code: "SE0702", staff: "DXN" },
        { code: "SE0703", staff: "TWP" },
        { code: "SE0704", staff: "TWP" },
        { code: "SE0705", staff: "JZF" },
      ],
    },
    {
      name: "Year 8 Science",
      classes: [
        { code: "SE0801", staff: "DXN" },
        { code: "SE0802", staff: "JXH" },
        { code: "SE0803", staff: "TFS" },
        { code: "SE0804", staff: "JSS" },
        { code: "SE0805", staff: "RP" },
      ],
    },
  ];

  // new group form
  const initialNewGroupForm = {
    name: "New group",
  };
  let newGroupForm = initialNewGroupForm;

  // class table information
  const tableHeads = ["Code", "Staff"];

  // group modifiers
  /** @type {(toAdd: Partial<ClassGroup>) => void} */
  const appendGroup = (toAdd) => {
    const newGroup = { ...emptyGroup, ...toAdd };
    classGroups = [...classGroups, newGroup];
  };
  /** @type {(toRemove: number) => void} */
  const removeGroup = (toRemove) => {
    classGroups = classGroups.filter((_group, idx) => idx !== toRemove);
  };

  // class modifiers
  /** @type {(indexGroup: number, toAdd: Partial<ClassItem>) => void} */
  const appendClass = (indexGroup, toAdd) => {
    const oldClasses = classGroups[indexGroup].classes;
    const newClass = { ...emptyClassItem, ...toAdd };
    classGroups[indexGroup].classes = [...oldClasses, newClass];
  };
  /** @type {(indexGroup: number, toRemove: number) => void} */
  const removeClass = (indexGroup, toRemove) => {
    const oldClasses = classGroups[indexGroup].classes;
    classGroups[indexGroup].classes = oldClasses.filter(
      (_group, idx) => idx !== toRemove
    );
  };
</script>

<div class="root">
  <!-- existing class groups -->
  {#each classGroups as { name, classes }}
    <div class="group">
      <div class="group-title">
        <h3 contenteditable bind:innerHTML={name} class="focusable" />
      </div>
      <table class="table-classes">
        <thead>
          <tr>
            {#each tableHeads as tableHead}
              <th>{tableHead}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each classes as { code, staff } (code)}
            <tr>
              <td contenteditable bind:innerHTML={code} />
              <td contenteditable bind:innerHTML={staff} />
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/each}
  <!-- add class group -->
  <div class="group">
    <div class="group-title group-title-new">
      <h3
        contenteditable
        bind:innerHTML={newGroupForm.name}
        class="focusable"
      />
      <ButtonIcon label="Add new class group" onClick={() => appendGroup({})}>
        <Add size={20} />
      </ButtonIcon>
    </div>
  </div>
</div>

<style lang="postcss">
  .root {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 1rem;
  }

  .group {
    padding: 1rem;
    border-radius: var(--radius-card);
    background-color: var(--bg);
    box-shadow: var(--shadow-xs);

    display: flex;
    flex-direction: column;
  }

  .group-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h3 {
      flex-grow: 1;
      margin-top: 0;
    }
  }
  .group-title-new {
    color: var(--gray10);
  }

  .table-classes {
    margin-top: 1rem;

    & th {
      text-align: left;
    }
  }
  .table-classes th {
    text-align: left;
  }
  .table-classes td {
    font-family: var(--monospace);
  }
</style>
