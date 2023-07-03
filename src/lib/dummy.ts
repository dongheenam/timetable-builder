import type { CourseGroupDict, LessonsDict, StaffDict } from './types.js';

export const DUMMY_COURSE_GROUP: CourseGroupDict = {
  'Year 7': {
    SE0701: {
      staffCode: 'QED',
      sharesTimetableWith: null,
    },
    SE0702: {
      staffCode: 'JXT',
      sharesTimetableWith: null,
    },
  },
  'Year 8': {
    SE0801: {
      staffCode: 'ABC',
      sharesTimetableWith: null,
    },
  },
};

export const DUMMY_LESSONS: LessonsDict = {
  SE0701: [
    {
      day: 1,
      period: 1,
      staffCode: 'QED',
      room: 'SE101',
    },
    {
      day: 2,
      period: 5,
      staffCode: 'QED',
      room: 'SE101',
    },
    {
      day: 3,
      period: 2,
      staffCode: 'QED',
      room: 'SE101',
    },
  ],
  SE0702: [
    {
      day: 1,
      period: 1,
      staffCode: 'JXT',
      room: 'SN201',
    },
  ],
  SE0801: [],
};

export const DUMMY_STAFF: StaffDict = {
  JXT: 'Jimmy Tan',
  QED: 'Quinn Deyoung',
  ABC: "Abraham D'Costa",
};
