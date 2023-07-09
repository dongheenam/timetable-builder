import { writable, derived, get, type Readable } from 'svelte/store';

import {
  DUMMY_COURSE_GROUPS,
  DUMMY_LESSONS,
  DUMMY_STAFFS,
} from '$lib/dummy.js';
import type { LessonsLookup, CourseGroup, Staff, Lesson } from '$lib/types.js';
import slice from './slice';
import persist from './persist.js';

// keys used for storing data in localStorage
export const STORAGE_KEYS = {
  courseGroups: 'course-groups',
  staffs: 'staffs',
  lessonsLookup: 'lessons-lookup',
  settings: 'settings',
};

// get the type of a store
export type StoredIn<T> = T extends Readable<infer U> ? U : never;

/** course information by course group */
export const courseGroups = persist(
  writable<CourseGroup[]>(DUMMY_COURSE_GROUPS),
  STORAGE_KEYS.courseGroups
);
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
export const staffs = persist(
  writable<Staff[]>(DUMMY_STAFFS),
  STORAGE_KEYS.staffs
);
courseGroups.subscribe(($courseGroups) => {
  const newCodes = getStaffCodes($courseGroups);

  staffs.update((prev) => {
    const currentCodes = prev.map((staff) => staff.code);
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

/** lesson information */
export const lessonsLookup = persist(
  writable<LessonsLookup>(DUMMY_LESSONS),
  STORAGE_KEYS.lessonsLookup
);
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
export const settings = persist(
  writable({
    isMonospace: false,
    fontSize_pt: 10.5,
  }),
  STORAGE_KEYS.settings
);

/** timetable data */
const getLessonsInGroup = (
  courseGroup: CourseGroup,
  $lessonsLookup: LessonsLookup
) => {
  const lessons = [];
  for (const course of courseGroup.courses) {
    if (!(course.code in $lessonsLookup)) continue;
    const lessonsSlice = $lessonsLookup[course.code].map((lesson) => ({
      code: course.code,
      ...lesson,
    }));
    lessons.push(...lessonsSlice);
  }
  return lessons;
};

export type TimetableEntry = {
  name: string;
  lessonsWithCode: (Lesson & { code: string })[];
}[];
const DAYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const PERIODS = ['1', '2', '3', '4', '5'];
const groupLessonsByPeriod = (
  lessonGroups: {
    name: string;
    lessonsWithCode: (Lesson & { code: string })[];
  }[]
): TimetableEntry[][] => {
  const grid = new Array(DAYS.length);
  for (let iDay = 0; iDay < DAYS.length; iDay++) {
    const day = DAYS[iDay];
    grid[iDay] = new Array(PERIODS.length);

    for (let iPeriod = 0; iPeriod < PERIODS.length; iPeriod++) {
      const period = PERIODS[iPeriod];

      const lessonGroupsNow = lessonGroups.flatMap((group) => {
        const lessonsNow = group.lessonsWithCode.filter(
          (lesson) => lesson.day === day && lesson.period === period
        );

        // remove the group if no lessons are in this period
        if (lessonsNow.length === 0) return [];

        return [{ name: group.name, lessonsWithCode: lessonsNow }];
      });

      grid[iDay][iPeriod] = lessonGroupsNow;
    }
  }

  return grid;
};

export const timetableByPeriod = derived(
  [courseGroups, lessonsLookup],
  ([$courseGroups, $lessonsLookup]) => {
    const lessonGroups = $courseGroups.map((group) => ({
      name: group.name,
      lessonsWithCode: getLessonsInGroup(group, $lessonsLookup),
    }));

    return groupLessonsByPeriod(lessonGroups);
  }
);
