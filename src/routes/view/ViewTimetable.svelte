<script lang="ts">
  import { timetableByPeriod, settings } from '$lib/stores';
  import TimetableCell from './TimetableCell.svelte';

  export let tableElement: HTMLTableElement;

  // table strings
  const dash = '\u2013'; // en dash
  const formatter = new Intl.DateTimeFormat('en-AU');
  const date = new Date();
  const today = formatter.format(date);
  const preamble = `Timetable current as of ${today}.`;
  const titles = ['WEEK A', 'WEEK B'];
  const headerRows = [
    `PERIOD 1\n(08:50${dash}09:45)`,
    `PERIOD 2\n(09:50${dash}10:45)`,
    `PERIOD 3\n(11:10${dash}12:05)`,
    `PERIOD 4\n(12:10${dash}13:05)`,
    `PERIOD 5\n(14:30${dash}15:25)`,
  ];
  const headerColumns = [
    '1 MONDAY',
    '2 TUESDAY',
    '3 WEDNESDAY',
    '4 THURSDAY',
    '5 FRIDAY',
    '6 MONDAY',
    '7 TUESDAY',
    '8 WEDNESDAY',
    '9 THURSDAY',
    '10 FRIDAY',
  ];
</script>

<div class="root">
  <table
    class="timetable"
    bind:this={tableElement}
    style:--print-font-size={`${$settings.fontSize_pt}pt`}
  >
    <caption class="preamble">{preamble}</caption>
    <!-- column styling -->
    <col class="header-col" />
    <colgroup>
      <col span="5" />
    </colgroup>
    <!-- table start -->
    <tbody>
      {#each $timetableByPeriod as dayEntries, iDay}
        {#if iDay % 5 === 0}
          <!-- header -->
          <tr class="header-row title-row">
            <th rowspan="2" />
            <th colspan="5">{titles[iDay / 5]}</th>
          </tr>
          <tr class="header-row">
            {#each headerRows as header}
              <th>{header}</th>
            {/each}
          </tr>
        {/if}
        <!-- body -->
        <tr>
          <th class="header-col">
            <div class="vertical">{headerColumns[iDay]}</div>
          </th>
          {#each dayEntries as periodEntry}
            <TimetableCell
              entry={periodEntry}
              isMonospace={$settings.isMonospace}
            />
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .root {
    background-color: var(--white);
  }
  .preamble {
    margin-bottom: 0.25rem;
    text-align: right;
  }

  .timetable {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    padding: 0.25rem;
    margin: 0;
    background: var(--bg);
  }

  .header-col,
  .header-row {
    font-size: 1.25em;
    font-family: Times New Roman;
    font-weight: 700;
    white-space: pre-line;
  }
  .header-col {
    width: 1.5em;
  }
  .vertical {
    margin: auto;
    padding: 2ex 0;
    writing-mode: vertical-lr;
    text-orientation: sideways;
  }
  .timetable :global(th),
  .timetable :global(td) {
    line-height: 1;
    padding: 0.25rem;
    border: 1px solid var(--gray11);
  }
</style>
