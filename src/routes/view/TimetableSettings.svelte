<script lang="ts">
  import { settings } from '$lib/stores';
  import printElement from '$lib/printElement';
  import Button from '$lib/components/Button.svelte';
  import Range from '$lib/components/Range.svelte';
  import Card from '$lib/components/Card.svelte';

  export let tableElement: HTMLElement | undefined;

  // get date in YYYY-MM-DD format
  const dateString = new Date().toISOString().split('T')[0];
  const filename = 'timetable_' + dateString;
</script>

<Card title="Settings">
  <div class="setting">
    <div class="control">
      <div class="size-field">
        <Range
          label="Font size"
          bind:value={$settings.fontSize_pt}
          min="8"
          max="13"
          step="0.1"
        />
      </div>
      <div class="font-field">
        <label>
          <input type="checkbox" bind:checked={$settings.isMonospace} />
          <span>Use monospace font</span>
        </label>
      </div>
      <div>
        <Button
          color="primary"
          variant="filled"
          on:click={() => printElement(tableElement, filename)}
          >Print timetable</Button
        >
      </div>
    </div>
    <div class="preview" style:--print-font-size={`${$settings.fontSize_pt}pt`}>
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
</Card>

<style>
  .setting {
    display: flex;
    flex-wrap: wrap;
  }
  /* control panel */
  .control {
    flex: 1;
  }
  .control > * {
    margin-bottom: var(--gap-md);
  }
  .size-field {
    max-width: 30rem;
  }

  /* preview pane */
  .preview-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .lesson-group {
    background-color: var(--white);

    font-size: var(--print-font-size, 14px);
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
