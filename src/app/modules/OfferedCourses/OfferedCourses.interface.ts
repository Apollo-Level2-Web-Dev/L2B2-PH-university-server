import { Types } from 'mongoose';

export type TOfferedCourse = {
  course: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  semesterRegistration: Types.ObjectId;
};
