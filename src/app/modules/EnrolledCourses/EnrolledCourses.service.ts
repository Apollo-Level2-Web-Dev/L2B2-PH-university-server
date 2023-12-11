import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourses/OfferedCourses.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Student } from '../student/student.model';
import { TEnrolledCourses } from './EnrolledCourses.interface';
import { EnrolledCourses } from './EnrolledCourses.model';

// const createEnrolledCourseIntoDB = async (payload: TEnrolledCourses) => {
//   const result = await EnrolledCourses.create(payload);
//   return result;
// };

const getAllEnrolledCoursesFromDB = async (query: Record<string, unknown>) => {
  const enrollCoursesQuery = new QueryBuilder(
    EnrolledCourses.find()
      .populate('student')
      .populate('course')
      .populate('offeredCourse')
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('faculty'),

    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await enrollCoursesQuery.modelQuery;
  return result;
};

const getSingleEnrolledCourseFromDB = async (id: string) => {
  const result = await EnrolledCourses.findById(id)
    .populate('student')
    .populate('course')
    .populate('offeredCourse')
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('faculty');

  return result;
};

const updateCourseIntoDB = async () =>
  // id: string,
  // payload: Partial<TEnrolledCourses>,
  {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      await session.commitTransaction();
      await session.endSession();
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }
  };

const enrollIntoCourse = async (payload: TEnrolledCourses) => {
  const { student, offeredCourse, semesterRegistration } = payload;

  const isSemesterRegistrationOngoing =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationOngoing) {
    throw new AppError(400, 'There is no semester registration Ongoing !');
  }

  // const alreadyEnrolledCourse = await EnrolledCourses.findOne({
  //   semesterRegistration,
  //   offeredCourse,
  //   student
  // })

  // if(alreadyEnrolledCourse){
  //   throw new AppError(403, 'You alreay enrolled in this course !');
  // }

  const studentEnrolledCourses = await EnrolledCourses.aggregate([
    {
      $match: {
        semesterRegistration: new mongoose.Types.ObjectId(semesterRegistration),
        student: new mongoose.Types.ObjectId(student),
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'courseInfo',
      },
    },
    {
      $unwind: '$courseInfo',
    },
    {
      $group: {
        _id: null,
        totalCredits: { $sum: '$courseInfo.credits' },
      },
    },
  ]);

  const totalCredits =
    studentEnrolledCourses.length > 0
      ? studentEnrolledCourses[0].totalCredits
      : 0;

  const isOfferedCourseExist =
    await OfferedCourse.findById(offeredCourse).populate('course');

  if (!isOfferedCourseExist) {
    throw new AppError(404, 'Offered Course does not exist !');
  }

  console.log('offered course data: ', isOfferedCourseExist);

  if (
    //  "credits" in isOfferedCourseExist.course &&
    isSemesterRegistrationOngoing.maxCredit >=
    totalCredits + isOfferedCourseExist.course.credits
  ) {
    console.log('total credits: ', totalCredits);
  }

  const isExistStudent = await Student.findById(student);
  if (!isExistStudent) {
    throw new AppError(404, 'Student does not exist !');
  }

  const enrollCourseData = {
    semesterRegistration,
    student,
    offeredCourse,
    course: isOfferedCourseExist.course,
    academicSemester: isOfferedCourseExist.academicSemester,
    academicDepartment: isOfferedCourseExist.academicDepartment,
    faculty: isOfferedCourseExist.faculty,
    days: isOfferedCourseExist.days,
    time: `${isOfferedCourseExist.startTime} - ${isOfferedCourseExist.endTime}`,
  };

  //const result = await EnrolledCourses.create(enrollCourseData);
  return enrollCourseData;
};

export const EnrolledCoursesServices = {
  getAllEnrolledCoursesFromDB,
  getSingleEnrolledCourseFromDB,
  updateCourseIntoDB,
  enrollIntoCourse,
};
