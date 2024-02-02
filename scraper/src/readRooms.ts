import { Page } from "puppeteer";
import { 
  TIMETABLE_OPEN_BUTTON_SELECTOR, 
  TIMETABLE_TABLE_SELECTOR, 
  SEARCH_RESULTS_ROW_SELECTOR 
} from "./constants";
import type { CourseData } from "./readCourses";

type LessonData = {
  day: string,
  period: string,
  room: string,
  staffCode: string,
};
type LessonLookup = {
  [key: string]: LessonData[];
}

const readLessons = async (page: Page, courses: CourseData[]) => {
  const lessonLookup: LessonLookup = Object.fromEntries(
    courses.map((cls) => [cls.code, []])
  );

  for (const cls of courses) {
    await page.goto(cls.href, { waitUntil: "domcontentloaded" });
    
    // click the timetable button if it is not open already
    try {
        await page.click(TIMETABLE_OPEN_BUTTON_SELECTOR);
    } catch (e) {
        // do nothing
    }
    
    // read the timetable
    await page.waitForSelector(TIMETABLE_TABLE_SELECTOR);
    const lessons = await page.evaluate((tableSelector, rowSelector) => {
      const rows = Array.from(document.querySelectorAll(
        `${tableSelector} ${rowSelector}`
      ));
      
      const lessonDatas: LessonData[] = [];
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll("td"));

        // period 5 is recorded as period 6 in syn
        const day = cells[1].innerHTML;
        const period = cells[2].innerHTML === "6" ? "5" : cells[2].innerHTML;
        const room = cells[4].innerHTML.replace(/&nbsp;/g, "");
        const staffCode = cells[5].innerHTML.replace(/&nbsp;/g, "");
        
        lessonDatas.push({day, period, staffCode, room});
      }

      return lessonDatas;
    }, TIMETABLE_TABLE_SELECTOR, SEARCH_RESULTS_ROW_SELECTOR);

    // append the timetable to the results
    console.log(`found ${lessons.length} lessons for ${cls.code}!`);
    lessonLookup[cls.code] = lessons;
  }
  
  return lessonLookup;
}
export default readLessons;