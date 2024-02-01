import puppeteer from "puppeteer";
import fs from "fs/promises";

import { URL, URL_WELCOME, GROUP_PATTERNS, IB_HL_PATTERN, IB_SL_PATTERN, STORAGE_KEYS, APP_VERSION} from "./src/constants.js";
import readClasses from "./src/readClasses.js";
import readRooms from "./src/readRooms.js";


const scrapeScience = async () => {

  // launch the browser
  const browser = await puppeteer.launch({ headless: false });
  console.log("browser open!");

  // open synweb
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  
  // login manually and wait until synweb appears (for now...)
  // TODO: write handleLogin(page)
  await page.waitForFrame(URL_WELCOME);

  // query the classes
  const classes = [
    ...(await readClasses(page, { learningArea : "SCI" })),
    ...(await readClasses(page, { learningArea : "SCIAG" })),
  ];

  // combine the IB classes
  const classesUpdated = [];
  for (const cls of classes) {
    if (IB_HL_PATTERN.test(cls.code)) {
      cls.code = cls.code.replace("H", "");
    }
    if (IB_SL_PATTERN.test(cls.code)) {
      continue
    }
    classesUpdated.push(cls);
  }

  // group the classes
  const classesByGroup = [];
  for (const [groupName, codeRegex] of Object.entries(GROUP_PATTERNS)) {
    const classesInGroup = classesUpdated.filter((cls) => codeRegex.test(cls.code));
    classesByGroup.push({ 
      name: groupName, 
      courses: classesInGroup.map((cls) => ({ code: cls.code, staffCode: cls.staffCode })),
    });
  }

  // query the rooms
  const rooms = await readRooms(page, classesUpdated);

  // create a JSON file
  const data = {
    version: APP_VERSION,
    [STORAGE_KEYS.courseGroups]: classesByGroup, 
    [STORAGE_KEYS.lessonsLookup]: rooms,
  };
  await fs.writeFile("out/config.json", JSON.stringify(data, null, 2));

  // close the browser
  await browser.close();
  console.log("all done!");
}
scrapeScience();