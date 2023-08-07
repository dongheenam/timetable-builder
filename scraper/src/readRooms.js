import { 
  TIMETABLE_OPEN_BUTTON_SELECTOR, 
  TIMETABLE_TABLE_SELECTOR, 
  SEARCH_RESULTS_ROW_SELECTOR 
} from "./constants.js";

const readRooms = async (page, classes) => {
  const rooms = Object.fromEntries(
    classes.map((cls) => [cls.code, undefined])
  );

  for (const cls of classes) {
    await page.goto(cls.href, { waitUntil: "domcontentloaded" });

    // click the timetable button if it is not open already
    try {
      await page.click(TIMETABLE_OPEN_BUTTON_SELECTOR);
    } catch (e) {
      // do nothing
    }

    // read the timetable
    const timetable = await page.evaluate((tableSelector, rowSelector) => {
      const rows = Array.from(document.querySelectorAll(
        `${tableSelector} ${rowSelector}`
      ));
      
      const timetableList = [];
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll("td"));

        // period 5 is recorded as period 6 in syn
        const day = cells[1].innerHTML;
        const period = cells[2].innerHTML === "6" ? "5" : cells[2].innerHTML;
        const room = cells[4].innerHTML;
        
        timetableList.push({day, period, room});
      }

      return timetableList;
    }, TIMETABLE_TABLE_SELECTOR, SEARCH_RESULTS_ROW_SELECTOR);

    // append the timetable to the results
    console.log(`found timetable for ${cls.code}!`);
    rooms[cls.code] = timetable;
  }
  
  return rooms;
}
export default readRooms;