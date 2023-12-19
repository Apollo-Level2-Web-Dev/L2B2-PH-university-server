import mongoose, { Schema } from 'mongoose';
import { TCourseMarks, TEnrolledCourses } from './EnrolledCourse.interface';
import { Grade } from './enrolledCourse.constant';

const courseMarksSchema = new Schema<TCourseMarks>(
  {
    classTest1: {
      type: Number,
      required: true,
      default: 0,
    },
    midTerm: {
      type: Number,
      required: true,
      default: 0,
    },
    classTest2: {
      type: Number,
      required: true,
      default: 0,
    },
    finalTerm: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    _id: false,
    timestamps: false,
  },
);

const enrolledCoursesSchema = new Schema<TEnrolledCourses>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'SemesterRegistration',
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
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'OfferedCourse',
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
  section: { type: Number, required: true },
  courseMarks: {
    type: courseMarksSchema,
  },
  grade: {
    type: String,
    enum: Grade,
    default: 'N/A',
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const EnrolledCourse = mongoose.model<TEnrolledCourses>(
  'EnrolledCourses',
  enrolledCoursesSchema,
);

export default EnrolledCourse;
