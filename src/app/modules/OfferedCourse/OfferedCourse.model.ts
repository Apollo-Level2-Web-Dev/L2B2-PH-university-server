import mongoose from 'mongoose';
import { TOfferedCourse } from './OfferedCourses.interface';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistration: {},
    academicSemester: {},
    academicDepartment: {},
    course: {},
    faculty: {},
    maxCapacity: {},
    section: {},
    days: {},
    startTime: {},
    endTime: {},
  },
  {
    timestamps: true,
  },
);

export const OfferedCourse = mongoose.model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
