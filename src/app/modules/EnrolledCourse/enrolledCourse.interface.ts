import { Types } from 'mongoose';

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'N/A';

export type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};

export type TEnrolledCourses = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  student: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  section: number;
  courseMarks: TCourseMarks;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
};
