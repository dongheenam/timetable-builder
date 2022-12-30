<script>
  import { classGroups } from "./stores";

  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import ButtonIcon from "./components/ButtonIcon.svelte";
  import EditClassGroup from "./EditClassGroup.svelte";

  const emptyGroup = { name: "", classes: [] };

  // new group form
  const initialNewGroupForm = {
    name: "",
    baseCode: "SE07",
    numClasses: "1",
  };
  let newGroupForm = initialNewGroupForm;

  // group modifiers
  const removeGroup = (toRemove) => {
    $classGroups = $classGroups.filter((_group, idx) => idx !== toRemove);
  };
  const appendGroup = (toAdd) => {
    const newGroup = { ...emptyGroup, ...toAdd };
    $classGroups = [...$classGroups, newGroup];
  };
  const createClasses = () => {
    const newClasses = [];
    const base = newGroupForm.baseCode.trim();
    for (let i = 0; i < parseFloat(newGroupForm.numClasses); i++) {
      newClasses.push({
        code: base + (i + 1).toString().padStart(2, "0"),
        staff: "",
      });
    }
    return newClasses;
  };
</script>

<div class="root">
  <!-- existing class groups -->
  {#each $classGroups as classGroup, idxGroup}
    <EditClassGroup bind:classGroup removeGroup={() => removeGroup(idxGroup)} />
  {/each}
  <!-- add class group -->
  <div class="group content-new">
    <div class="group-title">
      <h3
        contenteditable="true"
        bind:innerHTML={newGroupForm.name}
        placeholder="Add new group..."
        class="focusable"
      />
      <ButtonIcon
        label="Add new class group"
        on:click={() => {
          const newClasses = createClasses();
          appendGroup({ name: newGroupForm.name, classes: newClasses });
          newGroupForm.name = "";
        }}
      >
        <Add size={20} />
      </ButtonIcon>
    </div>
    <div class="form-classinfo">
      with <input
        type="number"
        class="focusable"
        min={1}
        max={10}
        bind:value={newGroupForm.numClasses}
      />
      class(es) starting with
      <span
        class="focusable"
        contenteditable="true"
        bind:innerHTML={newGroupForm.baseCode}
      />
    </div>
  </div>
</div>

<style lang="postcss">
  .root {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, max(15rem, (100% - 2rem)/3)), 1fr)
    );
    gap: 1rem;
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
    margin-bottom: 1rem;

    & h3 {
      flex-grow: 1;
      margin-top: 0;
    }
  }

  .form-classinfo {
    line-height: 1.5;

    & input,
    & span {
      font-family: var(--monospace);
      padding: 0.125rem 0.25rem;
      margin: 0;
      border: 1px solid var(--gray8);
    }
    & input {
      color: inherit;
      display: inline;
      max-width: calc(2ch + 2rem);
    }
    & span {
      display: inline-block;
    }
    & span:empty:before {
      content: "/";
      pointer-events: none;
    }
  }

  .content-new {
    color: var(--gray10);
    &:focus-within {
      color: var(--text);
    }
  }
</style>
