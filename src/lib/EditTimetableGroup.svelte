<script>
  import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte";
  import ChevronUp from "carbon-icons-svelte/lib/ChevronUp.svelte";
  import ButtonIcon from "./components/ButtonIcon.svelte";
  import EditTimetableClass from "./EditTimetableClass.svelte";

  export let classGroup;

  let isOpen = false;
  const toggleOpen = () => (isOpen = !isOpen);
</script>

<div class="group">
  <div class="group-title">
    <h3>{classGroup.name}</h3>
    <ButtonIcon label="toggle group" onClick={toggleOpen}>
      {#if isOpen}
        <ChevronDown size={20} />
      {:else}
        <ChevronUp size={20} />
      {/if}
    </ButtonIcon>
  </div>
  {#if isOpen}
    <div class="timetable-container">
      {#each classGroup.classes as classItem}
        <EditTimetableClass {classItem} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .group {
    flex: 1 1 25rem;

    padding-bottom: 3rem;
  }
  .group-title {
    margin-bottom: 0;

    display: flex;
    justify-content: space-between;
  }
  .timetable-container {
    margin-left: 1rem;
  }
</style>
