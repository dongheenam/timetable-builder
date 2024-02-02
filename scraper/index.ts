import puppeteer from "puppeteer";
import fs from "fs/promises";

import { URL, URL_WELCOME, GROUP_PATTERNS, IB_HL_PATTERN, IB_SL_PATTERN, STORAGE_KEYS, APP_VERSION } from "./src/constants";
import readCourses, { CourseData } from "./src/readCourses";
import readLessons from "./src/readRooms";

/* type definitions from the Svelte app
 * TODO: import these instead (monorepo?)
*/
type Course = {
  code: string;
  staffCode: string;
  sharesTimetableWith: string | null;
};
type CourseGroup = {
  name: string;
  courses: Course[];
};

const scrapeScience = async () => {
  // check the environment variables
  if (!URL) {
    console.error("SYNERGETIC_URL environmental variable is not set!");
    return;
  }

  // launch the browser
  const browser = await puppeteer.launch({ headless: false });
  console.log("browser open!");

  // open synweb
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  
  // login manually and wait until synweb appears (for now...)
  // TODO: write handleLogin(page)
  await page.waitForFrame(URL_WELCOME);

  // query the courses
  const courses = [
    ...(await readCourses(page, { learningArea : "SCI" })),
    ...(await readCourses(page, { learningArea : "SCIAG" })),
  ];

  // combine the IB courses
  const coursesUpdated: CourseData[] = [];
  for (const cls of courses) {
    if (IB_HL_PATTERN.test(cls.code)) {
      cls.code = cls.code.replace("H", "");
    }
    if (IB_SL_PATTERN.test(cls.code)) {
      continue
    }
    coursesUpdated.push(cls);
  }

  // group the classes
  const courseGroups: CourseGroup[] = [];
  for (const [groupName, codeRegex] of Object.entries(GROUP_PATTERNS)) {
    const coursesInGroup = coursesUpdated.filter((cls) => codeRegex.test(cls.code));
    courseGroups.push({ 
      name: groupName, 
      courses: coursesInGroup.map((cls) => ({ code: cls.code, staffCode: cls.staffCode, sharesTimetableWith: null })),
    });
  }

  // query the rooms
  const lessonsLookup = await readLessons(page, coursesUpdated);

  // create a JSON file
  const data = {
    [STORAGE_KEYS.version]: APP_VERSION,
    [STORAGE_KEYS.time]: new Date().toISOString(),
    [STORAGE_KEYS.courseGroups]: courseGroups, 
    [STORAGE_KEYS.lessonsLookup]: lessonsLookup,
  };
  await fs.writeFile("out/config.json", JSON.stringify(data, null, 2));

  // close the browser
  await browser.close();
  console.log("all done!");
}
scrapeScience();