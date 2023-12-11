import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCoursesServices } from './EnrolledCourses.service';


const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const result = await EnrolledCoursesServices.getAllEnrolledCoursesFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses are retrieved successfully',
    data: result,
  });
});

const getSingleEnrolledCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await EnrolledCoursesServices.getSingleEnrolledCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course is retrieved succesfully',
    data: result,
  });
});

const updateEnrolledCourseIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EnrolledCoursesServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course is updated succesfully',
    data: result,
  });
});

const enrollIntoCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCoursesServices.enrollIntoCourse(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Enrolled successfully !',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  getAllEnrolledCourses,
  getSingleEnrolledCourse,
  updateEnrolledCourseIntoDB,
  enrollIntoCourse
};
