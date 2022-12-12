import { writable } from "svelte/store";
import { persist } from "./persist";

/**
 * Class data sets
 * @typedef { {code: string; staff: string} } ClassItem
 * @typedef { {name: string; classes: ClassItem[]} } ClassGroup
 */

/** @type {import("svelte/store").Writable<ClassGroup[]>} */
export const classGroups = persist(
  "ttb-classGroups",
  writable([
    { name: "Year 7 Science", classes: [{ code: "SE0701", staff: "JZF" }] },
  ])
);

// extract the list of staff codes from classes
const getStaffCodes = ($classGroups) => {
  let staffs = new Set();
  for (const classGroup of $classGroups) {
    classGroup.classes.forEach((item) => staffs.add(item.staff));
  }
  return [...staffs];
};

/**
 * Staff name table
 */
export const staffNames = persist(
  "ttb-staffNames",
  writable([{ code: "JZF", name: "James Frith" }])
);
classGroups.subscribe(($classGroups) => {
  const newCodes = getStaffCodes($classGroups);

  staffNames.update((prev) => {
    const currentCodes = prev.map((item) => item.code);
    // add new staff codes
    for (const code of newCodes) {
      if (currentCodes.includes(code)) continue;
      prev.push({ code: code, name: "" });
    }
    // remove old staff codes
    prev = prev.filter((staff) => newCodes.includes(staff.code));

    prev.sort((a, b) => (a.code > b.code ? 1 : a.code < b.code ? -1 : 0));
    return prev;
  });
});
