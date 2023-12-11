import { Types } from 'mongoose';

type TDays =
  | 'Saturday'
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday';

type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};

export type TEnrolledCourses = {
  semesterRegistration: Types.ObjectId;
  student: Types.ObjectId;
  course: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  faculty: Types.ObjectId;
  days: TDays[];
  time: string;
  courseMarks: TCourseMarks;
  grade: 'A' | 'A-' | 'B' | 'B-' | 'C' | 'D' | 'F' | 'NA';
  gradePoints: number;
  isCompleted: boolean;
};
