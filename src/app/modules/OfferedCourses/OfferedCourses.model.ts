import mongoose, { Schema } from 'mongoose';
import { TOfferedCourse } from './OfferedCourses.interface';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SemesterRegistration',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicSemester',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  section: {
    type: Number,
    required: true,
  },
  days: [
    {
      type: String,
      enum: [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
      ],
      required: true,
    },
  ],
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

export const OfferedCourse = mongoose.model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
