<script>
  import Button from "./components/Button.svelte";

  export let settings = {};
  export let tableElement;

  const printElement = (element) => {
    if (!element) {
      console.error("Attempted to print non-existing element!");
      return;
    }
    try {
      // copy the element to body
      const printArea = document.createElement("div");
      printArea.appendChild(element.cloneNode(true));
      printArea.id = "print-area";
      document.body.appendChild(printArea);

      // initiate print
      window.print();
    } finally {
      // remove the copied element from body
      const printArea = document.getElementById("print-area");
      if (printArea) {
        document.body.removeChild(printArea);
      }
      console.log("cleaned printable DOM!");
    }
  };
</script>

<div class="group">
  <div class="group-title">
    <h3>Settings</h3>
  </div>
  <label>
    <input type="checkbox" bind:checked={settings.isMonospace} />
    <span>Use monospace font</span>
  </label>
  <div>
    <Button
      color="primary"
      variant="filled"
      onClick={() => printElement(tableElement)}>Print timetable</Button
    >
  </div>
</div>

<style>
  .group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
