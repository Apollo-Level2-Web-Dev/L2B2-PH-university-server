import { Types } from 'mongoose';
import { TCourse } from '../Course/course.interface';

type Days =
  | 'Saturday'
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday';

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId | TCourse;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: Days[];
  startTime: string;
  endTime: string;
};
