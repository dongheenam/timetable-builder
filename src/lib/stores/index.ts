import { writable, derived, get } from 'svelte/store';

import {
  DUMMY_COURSE_GROUPS,
  DUMMY_LESSONS,
  DUMMY_STAFFS,
} from '$lib/dummy.js';
import type { LessonsLookup, CourseGroup, Staff } from '$lib/types.js';
import slice from './slice';
// import persist from './persist.js';

/** course information by course group */
export const courseGroups = writable<CourseGroup[]>(DUMMY_COURSE_GROUPS);
export const groupNames = derived(courseGroups, ($courseGroups) =>
  $courseGroups.map((group) => group.name)
);

// extract the list of staff codes from classes
const getStaffCodes = ($courseGroups: CourseGroup[]) => {
  const staffs = new Set<string>();
  for (const { courses } of $courseGroups) {
    courses.forEach((item) => staffs.add(item.staffCode));
  }
  return [...staffs];
};

/** staff names */
export const staffs = writable<Staff[]>(DUMMY_STAFFS);
courseGroups.subscribe(($courseGroups) => {
  const newCodes = getStaffCodes($courseGroups);

  staffs.update((prev) => {
    const currentCodes = Object.keys(prev);
    // add new staff codes
    for (const code of newCodes) {
      if (currentCodes.includes(code)) continue;
      prev = [...prev, { code, name: '' }];
    }
    // remove old staff codes
    prev = prev.filter((staff) => newCodes.includes(staff.code));
    return prev;
  });
});

/** timetable information */
export const lessonsLookup = writable<LessonsLookup>(DUMMY_LESSONS);
export const getLessons = (classCode: string) => {
  if (!classCode) return;
  if (!(classCode in get(lessonsLookup))) {
    lessonsLookup.update((prev) => ({
      ...prev,
      [classCode]: [],
    }));
  }
  return slice(lessonsLookup, classCode);
};

/** timetable view settings */
export const settings = writable({
  isMonospace: false,
  baseFont_pt: 10.5,
});
