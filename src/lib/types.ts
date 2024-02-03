export const APP_NAME = 'timetable-builder';
export const APP_VERSION = '2.0';

export type Staff = {
  code: string;
  name: string;
};

export type Course = {
  code: string;
  staffCode: string;
  sharesTimetableWith: string | null;
};
export const EMPTY_COURSE: Course = {
  code: '',
  staffCode: '',
  sharesTimetableWith: null,
};
export type CourseLookup = {
  [code: string]: Omit<Course, 'code'>;
};
export type CourseGroup = {
  name: string;
  courses: Course[];
};
export type CourseGroupLookup = {
  [group: string]: CourseLookup;
};

export type Lesson = {
  code: string;
  day: string;
  period: string;
  room: string;
  staffCode: string;
};
export const EMPTY_LESSON: Lesson = {
  code: '',
  day: '',
  period: '',
  room: '',
  staffCode: '',
};
export type LessonsLookup = {
  [code: string]: Omit<Lesson, 'code'>[];
};
