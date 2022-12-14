<script>
  import { derived } from "svelte/store";
  import { classGroups, timetables } from "./stores";
  import TimetableCell from "./TimetableCell.svelte";
  import TimetableSettings from "./TimetableSettings.svelte";

  import "./ViewTimetable.css";

  // define constants
  const DAYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const PERIODS = ["1", "2", "3", "4", "5"];
  const dash = "\u2013"; // en dash

  // calculate the timetable

  const expandToLessons = (classes, $timetables) => {
    const lessons = [];
    for (const cls of classes) {
      if (!(cls.code in $timetables)) continue;
      const lessonsSlice = $timetables[cls.code].map((lesson) => ({
        ...lesson,
        ...cls,
      }));
      lessons.push(...lessonsSlice);
    }
    return lessons;
  };

  const groupByPeriod = (lessonGroups) => {
    const grid = new Array(DAYS.length);
    for (let iDay = 0; iDay < DAYS.length; iDay++) {
      const day = DAYS[iDay];
      grid[iDay] = new Array(PERIODS.length);

      for (let iPeriod = 0; iPeriod < PERIODS.length; iPeriod++) {
        const period = PERIODS[iPeriod];

        const lessonGroupsNow = lessonGroups.flatMap((group) => {
          const lessonsNow = group.lessons.filter(
            (lesson) => lesson.day === day && lesson.period === period
          );

          // remove the group if no lessons are in this period
          if (lessonsNow.length === 0) return [];

          return [{ ...group, lessons: lessonsNow }];
        });

        grid[iDay][iPeriod] = lessonGroupsNow;
      }
    }

    return grid;
  };

  const timetableByPeriod = derived(
    [classGroups, timetables],
    ([$classGroups, $timetables]) => {
      const lessonGroups = $classGroups.map((group) => ({
        name: group.name,
        lessons: expandToLessons(group.classes, $timetables),
      }));

      console.log("timetable calculated!");
      return groupByPeriod(lessonGroups);
    }
  );

  // table strings
  const today = new Intl.DateTimeFormat("en-AU").format(new Date());
  const preamble = `Timetable current as of ${today}.`;
  const titles = ["WEEK A", "WEEK B"];
  const headerRows = [
    `PERIOD 1\n(08:50${dash}09:45)`,
    `PERIOD 2\n(09:50${dash}10:45)`,
    `PERIOD 3\n(11:10${dash}12:05)`,
    `PERIOD 4\n(12:10${dash}13:05)`,
    `PERIOD 5\n(14:30${dash}15:25)`,
  ];
  const headerColumns = [
    "1 MONDAY",
    "2 TUESDAY",
    "3 WEDNESDAY",
    "4 THURSDAY",
    "5 FRIDAY",
    "6 MONDAY",
    "7 TUESDAY",
    "8 WEDNESDAY",
    "9 THURSDAY",
    "10 FRIDAY",
  ];

  // table settings
  let settings = {
    isMonospace: true,
  };
  let tableElement;
</script>

<div class="root">
  <TimetableSettings bind:settings {tableElement} />
  <table class="timetable" bind:this={tableElement}>
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
              lessonGroups={periodEntry}
              isMonospace={settings.isMonospace}
            />
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<div style:display="none">
  {#each $timetableByPeriod as dayEntries, iDay}
    {#each dayEntries as periodEntry, iPeriod}
      <div>
        D{DAYS[iDay]} P{PERIODS[iPeriod]}:
        <pre>
          {JSON.stringify(periodEntry, null, 2)}
        </pre>
      </div>
    {/each}
  {/each}
</div>

<style>
  .root {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2.5rem;
  }
  .preamble {
    margin-bottom: 0.25rem;
    text-align: right;
  }

  .timetable {
    table-layout: fixed;
    width: 100%;
    padding: 0.25rem;
    margin: 0;
    background: var(--bg);
  }

  .header-col,
  .header-row {
    font-size: large;
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
