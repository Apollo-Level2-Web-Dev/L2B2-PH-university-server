import { Schema, model } from 'mongoose';
import { TEnrolledCourses } from './EnrolledCourses.interface';

const enrolledCoursesSchema = new Schema<TEnrolledCourses>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'SemesterRegistration',
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'OfferedCourse',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
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
    },
  ],
  time: {
    type: String,
    required: true,
  },
  courseMarks: {
    classTest1: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    midTerm: {
      type: Number,
      default: 0,
      min: 0,
      max: 30,
    },
    classTest2: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    finalTerm: {
      type: Number,
      default: 0,
      min: 0,
      max: 30,
    },
  },
  grade: {
    type: String,
    enum: ['A', 'A-', 'B', 'B-', 'C', 'D', 'F', 'NA'],
    default: 'NA',
  },
  gradePoints: {
    type: Number,
    default: 0,
  },
});

export const EnrolledCourses = model<TEnrolledCourses>(
  'EnrolledCourses',
  enrolledCoursesSchema,
);
