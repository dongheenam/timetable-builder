<script>
  import Close from "carbon-icons-svelte/lib/Close.svelte";
  import ButtonIcon from "./components/ButtonIcon.svelte";
  import EditableTable from "./components/EditableTable.svelte";

  // props
  export let classGroup = { name: "", classes: [] };

  export let removeGroup;

  // table props
  const columns = [
    { header: "Code", key: "code" },
    { header: "Staff", key: "staff" },
  ];
  const nextCode = (code) => {
    const base = code.substring(0, code.length - 2);
    const id = code.substring(code.length - 2);
    const nextId = (parseFloat(id) + 1).toString().padStart(2, "0");
    return base + nextId;
  };
  const classFactory = () => {
    const numClasses = classGroup.classes.length;
    return {
      code:
        numClasses > 0 ? nextCode(classGroup.classes[numClasses - 1].code) : "",
      staff: "",
    };
  };
</script>

<div class="group">
  <div class="group-title">
    <h3
      contenteditable="true"
      bind:innerHTML={classGroup.name}
      placeholder="Group name..."
      class="focusable"
    />
    <ButtonIcon label="Remove class group" on:click={removeGroup}>
      <Close size={20} />
    </ButtonIcon>
  </div>
  <EditableTable
    bind:items={classGroup.classes}
    {columns}
    key="code"
    itemFactory={classFactory}
  />
</div>

<style lang="postcss">
  .group :global(.td) {
    font-family: var(--monospace);
  }
</style>
