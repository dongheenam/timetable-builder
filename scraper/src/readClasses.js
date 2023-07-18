import { 
  URL_CLASS,
  STAFF_CODE_INPUT_SELECTOR,
  LEARNING_AREA_INPUT_SELECTOR,
  SEARCH_BOX_SELECTOR, 
  SEARCH_BUTTON_SELECTOR,
  SEARCH_RESULTS_TABLE_SELECTOR,
  SEARCH_RESULTS_ROW_SELECTOR
} from "./constants.js";

const readClasses = async (page, query={}) => {
  // parse query
  const staff = "staff" in query ? query.staff : "";
  const learningArea = "learningArea" in query ? query.learningArea : "";

  // search the classes
  await page.goto(URL_CLASS);
  await page.waitForSelector(SEARCH_BOX_SELECTOR);

  // staff code input
  const staffInput = await page.waitForSelector(STAFF_CODE_INPUT_SELECTOR);
  await staffInput.value = staff;

  // learning area input
  await page.select(LEARNING_AREA_INPUT_SELECTOR, learningArea);
  await page.click(SEARCH_BUTTON_SELECTOR);

  // parse the result table
  await page.waitForSelector(SEARCH_RESULTS_TABLE_SELECTOR);
  const classes = await page.evaluate(
    (tableSelector, rowSelector) => {
      const rows = Array.from(document.querySelectorAll(
        `${tableSelector} ${rowSelector}`
      ));
      
      const classList = [];
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll("td a"));

        const code = cells[0].innerHTML.substring(4);
        const staff = cells[2].innerHTML.replace(/&nbsp;/g, "");
        const href = cells[0].href;
        
        if (staff.length > 0) {
          classList.push({ code, staff, href });
        }
      }

      return classList;
  }, SEARCH_RESULTS_TABLE_SELECTOR, SEARCH_RESULTS_ROW_SELECTOR);
  console.log(`found ${classes.length} classes matching the query ${JSON.stringify(query)}!`);
  return classes;
};
export default readClasses;