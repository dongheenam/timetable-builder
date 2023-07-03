import { z } from 'zod';

export type Staff = {
  code: string;
  name: string;
};

export const courseSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, { message: 'Course code is required' }),
  staffCode: z.string().trim().toUpperCase(),
  sharesTimetableWith: z.string().trim().toUpperCase().nullable(),
});
export type Course = z.infer<typeof courseSchema>;
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

export const lessonSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, { message: 'Course code is required' }),
  day: z.coerce.number(),
  period: z.coerce.number(),
  room: z.string().trim().toUpperCase(),
  staffCode: z.string().trim().toUpperCase(),
});
export type Lesson = z.infer<typeof lessonSchema>;
export const EMPTY_LESSON: Partial<Lesson> = {
  code: '',
  day: undefined,
  period: undefined,
  room: '',
  staffCode: '',
};
export type LessonsLookup = {
  [code: string]: Omit<Lesson, 'code'>[];
};
