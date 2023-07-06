import type { CourseGroup, LessonsLookup, Staff } from './types.js';

export const DUMMY_COURSE_GROUPS: CourseGroup[] = [
  {
    name: 'Year 7',
    courses: [
      { code: 'SE0701', staffCode: 'QED', sharesTimetableWith: null },
      { code: 'SE0702', staffCode: 'JXT', sharesTimetableWith: null },
    ],
  },
  {
    name: 'Year 8',
    courses: [{ code: 'SE0801', staffCode: 'ABC', sharesTimetableWith: null }],
  },
];

export const DUMMY_LESSONS: LessonsLookup = {
  SE0701: [
    {
      day: '1',
      period: '1',
      staffCode: 'QED',
      room: 'SE101',
    },
    {
      day: '2',
      period: '5',
      staffCode: 'QED',
      room: 'SE101',
    },
    {
      day: '3',
      period: '2',
      staffCode: 'QED',
      room: 'SE101',
    },
  ],
  SE0702: [
    {
      day: '1',
      period: '1',
      staffCode: 'JXT',
      room: 'SN201',
    },
  ],
  SE0801: [],
};

export const DUMMY_STAFFS: Staff[] = [
  { code: 'JXT', name: 'Jimmy Tan' },
  { code: 'QED', name: 'Quinn Deyoung' },
  { code: 'ABC', name: "Abraham D'Costa" },
];
