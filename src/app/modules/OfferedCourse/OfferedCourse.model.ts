import mongoose, { Schema } from 'mongoose';
import { Days } from './OfferedCourse.constant';
import { TOfferedCourse } from './OfferedCourses.interface';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    maxCapacity: {
      type: Number,
      default: 10,
    },
    section: {
      type: Number,
      required: true,
    },
    days: {
      type: String,
      enum: Days,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const OfferedCourse = mongoose.model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
