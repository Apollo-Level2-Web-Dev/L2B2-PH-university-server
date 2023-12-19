import { TEnrolledCourses } from './EnrolledCourse.interface';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import EnrolledCourse from './enrolledCourse.model';

const createEnrolledCourseIntoDB = async (
  payload: Partial<TEnrolledCourses>,
) => {
  /**
   * Step-1 : check if the student is already enrolled in the offered course
   * Step-2 : check if the offered course exists
   * Step-3 : create the enrolled course
   */

  const { student, offeredCourse } = payload;

  //check if the offered course exists
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Offered course does not exist');
  }

  //check if the student is already enrolled in the offered course
  const studentEnrolledCourse = await EnrolledCourse.findOne({
    student,
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    offeredCourse,
  });

  if (studentEnrolledCourse) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are already enrolled in this course',
    );
  }

  const result = await EnrolledCourse.create({
    academicDepartment: isOfferedCourseExists.academicDepartment,
    academicSemester: isOfferedCourseExists.academicSemester,
    course: isOfferedCourseExists.course,
    faculty: isOfferedCourseExists.faculty,
    student,
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    offeredCourse,
    section: isOfferedCourseExists.section,
  });
  return result;
};

const getAllEnrolledCoursesFromDB = async (): Promise<any> => {};

const getSingleEnrolledCourseFromDB = async (id: string): Promise<any> => {};

const updateMarksOfEnrolledCourseIntoDB = async (
  payload: any,
): Promise<any> => {
  /**
   * Step-1 : check if the student is already enrolled in the offered course
   * Step-2 : check if the offered course exists
   * Step-3 : update the enrolled course
   * Step-4 : calculate the final marks and grade
   * Step-5 : update the enrolled course
   */

  const { student, faculty, semesterRegistration, offeredCourse, courseMarks } =
    payload;

  const studentEnrolledCourse = await EnrolledCourse.findOne({
    student,
    semesterRegistration,
    offeredCourse,
    faculty,
  });

  if (!studentEnrolledCourse) {
    throw new AppError(httpStatus.BAD_REQUEST, 'The course data not found!');
  }

  const getGradeFromMarks = (marks: number) => {
    let result = {
      grade: '',
      point: 0,
    };
    if (marks >= 0 && marks <= 39) {
      result = {
        grade: 'F',
        point: 0,
      };
    } else if (marks >= 40 && marks <= 49) {
      result = {
        grade: 'D',
        point: 2.0,
      };
    } else if (marks >= 50 && marks <= 59) {
      result = {
        grade: 'C',
        point: 2.5,
      };
    } else if (marks >= 60 && marks <= 69) {
      result = {
        grade: 'B',
        point: 3.0,
      };
    } else if (marks >= 70 && marks <= 79) {
      result = {
        grade: 'A',
        point: 3.5,
      };
    } else if (marks >= 80 && marks <= 100) {
      result = {
        grade: 'A+',
        point: 4.0,
      };
    }

    return result;
  };

  if (courseMarks?.finalTerm) {
    const totalFinalMarks =
      Math.ceil(courseMarks.classTest1 * 0.05) +
      Math.ceil(courseMarks.classTest2 * 0.05) +
      Math.ceil(courseMarks.midTerm * 0.3) +
      Math.ceil(courseMarks.finalTerm * 0.6);

    const result = getGradeFromMarks(totalFinalMarks);

    const updateStudentMarks = await EnrolledCourse.findOneAndUpdate(
      { _id: studentEnrolledCourse._id },
      {
        courseMarks: payload.courseMarks,
        isCompleted: true,
        grade: result.grade,
        gradePoint: result.point,
      },
      { new: true },
    );

    return updateStudentMarks;
  }

  const updateStudentMarks = await EnrolledCourse.findOneAndUpdate(
    { _id: studentEnrolledCourse._id },
    { courseMarks: payload.courseMarks },
    { new: true },
  );

  return updateStudentMarks;
};

// const updateFinalMarksOfEnrolledCourseIntoDB = async (payload: any) => {
//   /**
//    * Step-1 : check if the student is already enrolled in the offered course
//    * Step-2 : check if the offered course exists
//    * Step-3 : update the enrolled course
//    * Step-4 : calculate the final marks and grade
//    * Step-5 : update the enrolled course
//    */

//   const { student, semesterRegistration, offeredCourse, courseMarks } = payload;

//   const studentEnrolledCourseMarks = await EnrolledCourse.findOne({
//     student,
//     semesterRegistration,
//     offeredCourse,
//     isCompleted: false,
//   });

//   if (!studentEnrolledCourseMarks) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       'The course is already completed or Course marks data not found!',
//     );
//   }

//   const totalFinalMarks =
//     Math.ceil(courseMarks.classTest1 * 0.05) +
//     Math.ceil(courseMarks.classTest2 * 0.05) +
//     Math.ceil(courseMarks.midTerm * 0.3) +
//     Math.ceil(courseMarks.finalTerm * 0.6);
//   const result =
//     StudentEnrolledCourseMarkUtils.getGradeFromMarks(totalFinalMarks);

//   const updateStudentMarks = await EnrolledCourse.findOneAndUpdate(
//     { _id: studentEnrolledCourseMarks._id },
//     {
//       courseMarks: payload.courseMarks,
//       grade: result.grade,
//       gradePoints: result.point,
//       isCompleted: true,
//     },
//     { new: true },
//   );

//   return updateStudentMarks;
// };

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  getAllEnrolledCoursesFromDB,
  getSingleEnrolledCourseFromDB,
  updateMarksOfEnrolledCourseIntoDB,
  updateFinalMarksOfEnrolledCourseIntoDB,
};
