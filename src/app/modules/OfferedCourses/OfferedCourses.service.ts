import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferedCourses.interface';
import { OfferedCourse } from './OfferedCourses.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicSemester,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistration =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistration) {
    throw new AppError(404, 'Semester registration not found!');
  }

  if (isSemesterRegistration.status === 'ENDED') {
    throw new AppError(
      400,
      'This registered semester is  ENDED. You cannot add course to this semester',
    );
  }

  const isAcademicDepartmentexists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentexists) {
    throw new AppError(404, 'Academic Department not found !');
  }

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(404, 'Course not found !');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(404, 'Faculty not found');
  }

  const isOfferedCourseExistsWithSameCourseSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      academicSemester,
      course,
      section,
    });

  if (isOfferedCourseExistsWithSameCourseSection) {
    throw new AppError(400, 'Offered course with same section already exists');
  }

  const assignedFacultySchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime -_id');

  const newSlot = {
    days,
    startTime,
    endTime,
  };

  assignedFacultySchedules.forEach((schedule) => {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);
    const newStartTime = new Date(`1970-01-01T${newSlot.startTime}:00`);
    const newEndTime = new Date(`1970-01-01T${newSlot.endTime}:00`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.CONFLICT,
        'This faculty is not available at that time !',
      );
    }
  });

  const result = await OfferedCourse.create(payload);

  return result;
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getByIdFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

const updateOneInDB = async (id: string, payload: Partial<TOfferedCourse>) => {
  const { faculty, days, startTime, endTime } = payload;

  const currentOfferedCourse = await OfferedCourse.findById(id);

  if (!currentOfferedCourse) {
    throw new AppError(404, 'Offered Course not found !');
  }

  if (faculty) {
    const isFacultyExists = await Faculty.findById(faculty);

    if (!isFacultyExists) {
      throw new AppError(404, 'Faculty not found');
    }
  }

  const assignedFacultySchedules = await OfferedCourse.find({
    semesterRegistration: currentOfferedCourse.semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSlot = {
    days,
    startTime,
    endTime,
  };

  assignedFacultySchedules.forEach((schedule) => {
    if (schedule._id.toString() != id) {
      const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
      const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);
      const newStartTime = new Date(`1970-01-01T${newSlot.startTime}:00`);
      const newEndTime = new Date(`1970-01-01T${newSlot.endTime}:00`);

      if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
        throw new AppError(
          httpStatus.CONFLICT,
          'This faculty is not available at that time !',
        );
      }
    }
  });

  const updatedOfferedCourse = await OfferedCourse.findByIdAndUpdate(
    id,
    {
      faculty,
      days,
      startTime,
      endTime,
    },
    { new: true, runValidators: true },
  );

  return updatedOfferedCourse;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
};
