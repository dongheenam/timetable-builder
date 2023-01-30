import puppeteer from "puppeteer";
import fs from "fs/promises";

import { URL, URL_WELCOME, GROUP_PATTERNS } from "./src/constants.js";
import readClasses from "./src/readClasses.js";
import readRooms from "./src/readRooms.js";


const scrape = async () => {

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

  // group the classes
  const classesByGroup = [];
  for (const [groupName, codeRegex] of Object.entries(GROUP_PATTERNS)) {
    const classesInGroup = classes.filter((cls) => codeRegex.test(cls.code));
    classesByGroup.push({ 
      name: groupName, 
      classes: classesInGroup.map((cls) => ({ code: cls.code, staff: cls.staff })),
    });
  }

  // query the rooms
  const rooms = await readRooms(page, classes);

  // create a JSON file
  const data = {
    "ttb-classGroups": classesByGroup, 
    "ttb-timetables": rooms,
  };
  await fs.writeFile("out/config.json", JSON.stringify(data, null, 2));

  // close the browser
  await browser.close();
  console.log("all done!");
}
scrape();