import mongoose, { Schema } from 'mongoose';
import { TOfferedCourse } from './OfferedCourses.interface';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'SemesterRegistration',
    required: true,
  },
});

export const OfferedCourse = mongoose.model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
