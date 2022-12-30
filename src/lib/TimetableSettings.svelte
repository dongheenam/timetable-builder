<script>
  import { settings } from "./stores";
  import Button from "./components/Button.svelte";
  import Range from "./components/Range.svelte";

  export let tableElement;

  const date = new Date();
  const dateString = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ].join("");
  const filename = "timetable_" + dateString;

  const printElement = (element, filename) => {
    const documentTitle = document.title;

    if (!element) {
      console.error("Attempted to print non-existing element!");
      return;
    }
    try {
      // copy the element to body
      const printArea = document.createElement("div");
      printArea.appendChild(element.cloneNode(true));
      printArea.id = "print-area";
      printArea.style.setProperty("--base-font", `${$settings.baseFont_pt}pt`);
      document.body.appendChild(printArea);

      // initiate print
      document.title = filename;
      window.print();
    } finally {
      // revert the document title
      document.title = documentTitle;

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
  <div class="size-field">
    <Range
      label="Font size"
      bind:value={$settings.baseFont_pt}
      min="8"
      max="13"
      step="0.1"
    />
    <div class="size-preview" style:--base-font={`${$settings.baseFont_pt}pt`}>
      <div class="preview-title">Print Preview</div>
      <div class="lesson-group" class:monospace={$settings.isMonospace}>
        <div class="lesson-title">7 Science</div>
        <div class="lesson">SE0701 SN203 JZF</div>
        <br />
        <div class="lesson-title">11 Chem HSC</div>
        <div class="lesson">SIC1201 SS202 MMW1</div>
      </div>
    </div>
  </div>
  <label>
    <input type="checkbox" bind:checked={$settings.isMonospace} />
    <span>Use monospace font</span>
  </label>
  <div>
    <Button
      color="primary"
      variant="filled"
      on:click={() => printElement(tableElement, filename)}
      >Print timetable</Button
    >
  </div>
</div>

<style>
  .group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
  }
  .size-field {
    max-width: 30rem;
  }

  .size-preview {
    position: absolute;
    right: 2rem;
    top: 2rem;
    padding: 0.5rem;
    background-color: var(--bg);
  }
  .preview-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .lesson-group {
    font-size: var(--base-font, 14px);
    /* width: 108pt; */
    width: calc((21cm - 1.2cm - 1.75em) / 5);
    line-height: 1;
    padding: 0.25rem;
    border: 1px solid var(--gray11);
  }
  .lesson-title {
    font-weight: 700;
    margin-bottom: 0.25em;
  }
  .lesson {
    letter-spacing: -0.05ex;
  }
  .monospace {
    font-family: Menlo, monospace;
  }
</style>
