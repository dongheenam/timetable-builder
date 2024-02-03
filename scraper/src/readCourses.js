import { URL_CLASS, STAFF_CODE_INPUT_SELECTOR, LEARNING_AREA_INPUT_SELECTOR, SEARCH_BOX_SELECTOR, SEARCH_BUTTON_SELECTOR, SEARCH_RESULTS_TABLE_SELECTOR, SEARCH_RESULTS_ROW_SELECTOR } from "./constants.js";
const readCourses = async (page, query = {}) => {
    // parse query
    const staff = query.staff || "";
    const learningArea = query.learningArea || "";
    // search the classes
    await page.goto(URL_CLASS);
    await page.waitForSelector(SEARCH_BOX_SELECTOR);
    // staff code input
    const staffInput = await page.waitForSelector(STAFF_CODE_INPUT_SELECTOR);
    if (!staffInput) {
        throw new Error("staff code input not found!");
    }
    await staffInput.click({ clickCount: 2 });
    await staffInput.press("Backspace");
    await staffInput.type(staff);
    // learning area input
    await page.select(LEARNING_AREA_INPUT_SELECTOR, learningArea);
    await page.click(SEARCH_BUTTON_SELECTOR);
    // parse the result table
    await page.waitForSelector(SEARCH_RESULTS_TABLE_SELECTOR);
    const courses = await page.evaluate((tableSelector, rowSelector) => {
        const rows = Array.from(document.querySelectorAll(`${tableSelector} ${rowSelector}`));
        const courseDatas = [];
        for (const row of rows) {
            const cells = Array.from(row.querySelectorAll("td a"));
            const code = cells[0].innerHTML.substring(4); // remove SEN/ prefix
            const staffCode = cells[2].innerHTML.replace(/&nbsp;/g, "");
            const href = cells[0].href;
            if (staffCode.length > 0) {
                courseDatas.push({ code, staffCode, href });
            }
        }
        return courseDatas;
    }, SEARCH_RESULTS_TABLE_SELECTOR, SEARCH_RESULTS_ROW_SELECTOR);
    console.log(`found ${courses.length} classes matching the query ${JSON.stringify(query)}!`);
    return courses;
};
export default readCourses;
