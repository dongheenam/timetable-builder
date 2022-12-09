<script>
  import Close from "carbon-icons-svelte/lib/Close.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import RowInsert from "carbon-icons-svelte/lib/RowInsert.svelte";

  import ButtonIcon from "./components/ButtonIcon.svelte";

  export let classGroup = { name: "", classes: [] };
  let { name, classes } = classGroup;

  export let removeGroup;

  // class table information
  const tableHeads = ["Code", "Staff", ""];

  // class modifiers
  const emptyClassItem = { code: "", staff: "" };

  /** @type {(toAdd: Partial<typeof emptyClassItem>) => void} */
  const appendClass = (toAdd) => {
    const newClass = { ...emptyClassItem, ...toAdd };
    classes = [...classes, newClass];
  };
  /** @type {(toRemove: number) => void} */
  const removeClass = (toRemove) => {
    classes = classes.filter((_group, idx) => idx !== toRemove);
  };

  // new class forms (one for each group)
  /** @type {(code: string) => string} */
  const nextCode = (code) => {
    const base = code.substring(0, code.length - 2);
    const id = code.substring(code.length - 2);
    const nextId = (parseFloat(id) + 1).toString().padStart(2, "0");
    return base + nextId;
  };
  let newClassForm = {
    code: classes.length > 0 ? nextCode(classes[classes.length - 1].code) : "",
    staff: "",
  };
</script>

<div class="group">
  <div class="group-title">
    <h3
      contenteditable="true"
      bind:innerHTML={name}
      placeholder="Group name..."
      class="focusable"
    />
    <ButtonIcon label="Remove class group" onClick={removeGroup}>
      <Close size={20} />
    </ButtonIcon>
  </div>
  <table class="table-classes">
    <thead>
      <tr>
        <th class="cell-code">{tableHeads[0]}</th>
        <th class="cell-staff">{tableHeads[1]}</th>
        <th class="cell-edit">{tableHeads[2]}</th>
      </tr>
    </thead>
    <tbody>
      <!-- existing classes -->
      {#each classes as { code, staff }, idxClass (code)}
        <tr>
          <td
            contenteditable="true"
            bind:innerHTML={code}
            class="cell-code focusable"
          />
          <td
            contenteditable="true"
            bind:innerHTML={staff}
            class="cell-staff focusable"
          />
          <td class="cell-edit">
            <ButtonIcon
              label="remove class"
              onClick={() => removeClass(idxClass)}
            >
              <RowDelete size={16} />
            </ButtonIcon>
          </td>
        </tr>
      {/each}
      <!-- add class -->
      <tr class="row-new">
        <td
          contenteditable="true"
          bind:innerHTML={newClassForm.code}
          class="cell-code focusable content-new"
        />
        <td
          contenteditable="true"
          bind:innerHTML={newClassForm.staff}
          class="cell-staff focusable content-new"
        />
        <td class="cell-edit">
          <ButtonIcon
            label="add new class"
            onClick={() => {
              if (classes.some((item) => item.code === newClassForm.code)) {
                alert("Class code already exists!");
                return;
              }
              appendClass(newClassForm);
              newClassForm = {
                code: nextCode(newClassForm.code),
                staff: "",
              };
            }}
          >
            <RowInsert size={16} />
          </ButtonIcon>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<style lang="postcss">
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
    margin-bottom: 1rem;

    & h3 {
      flex-grow: 1;
      margin-top: 0;
    }
  }

  .table-classes {
    margin-top: 0;
    table-layout: fixed;

    & tr:nth-child(even) {
      background-color: var(--primary2);
    }
    & td {
      font-family: var(--monospace);
    }
  }
  .cell-code {
    text-align: left;
  }
  .cell-staff {
    text-align: right;
  }
  .cell-edit {
    width: 2rem;
    text-align: right;
  }
  .group :global(button),
  .row-new {
    visibility: hidden;
  }
  .group:hover,
  .group:focus-within {
    & :global(button),
    & .row-new {
      visibility: visible;
    }
  }

  .content-new {
    color: var(--gray10);
    &:focus-within {
      color: var(--text);
    }
  }
</style>
