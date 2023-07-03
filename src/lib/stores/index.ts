import { writable } from 'svelte/store';

import { DUMMY_COURSE_GROUP, DUMMY_LESSONS, DUMMY_STAFF } from '$lib/dummy.js';
import type { LessonsDict, CourseGroupDict, StaffDict } from '$lib/types.js';
// import persist from './persist.js';

/** course information by course group */
export const courseGroups = writable<CourseGroupDict>(DUMMY_COURSE_GROUP);

// extract the list of staff codes from classes
const getStaffCodes = ($courseGroups: CourseGroupDict) => {
  const staffs = new Set<string>();
  for (const courses of Object.values($courseGroups)) {
    Object.values(courses).forEach((item) => staffs.add(item.staffCode));
  }
  return [...staffs];
};

/** staff name lookup */
export const staffCodes = writable<StaffDict>(DUMMY_STAFF);
courseGroups.subscribe(($courseGroups) => {
  const newCodes = getStaffCodes($courseGroups);

  staffCodes.update((prev) => {
    const currentCodes = Object.keys(prev);
    // add new staff codes
    for (const code of newCodes) {
      if (currentCodes.includes(code)) continue;
      prev[code] = '';
    }
    // remove old staff codes
    for (const code in prev) {
      if (newCodes.includes(code)) continue;
      delete prev[code];
    }
    return prev;
  });
});

/** timetable information */
export const lessons = writable<LessonsDict>(DUMMY_LESSONS);

/** timetable view settings */
export const settings = writable({
  isMonospace: false,
  baseFont_pt: 10.5,
});
