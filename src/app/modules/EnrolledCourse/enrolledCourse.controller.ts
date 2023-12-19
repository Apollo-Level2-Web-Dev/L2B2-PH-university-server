const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course is created successfully',
    data: result,
  });
});

const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.getAllEnrolledCoursesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses are retrieved successfully',
    data: result,
  });
});

const getSingleEnrolledCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result =
    await EnrolledCourseServices.getSingleEnrolledCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course is retrieved successfully',
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  console.log(req.body, 'req.body');
  const result = await EnrolledCourseServices.updateMarksOfEnrolledCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course Mark is updated successfully',
    data: result,
  });
});
const updateEnrolledCourseFinalMarks = catchAsync(async (req, res) => {
  console.log(req.body, 'req.body');
  const result =
    await EnrolledCourseServices.updateFinalMarksOfEnrolledCourseIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course final Mark is updated successfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getAllEnrolledCourses,
  getSingleEnrolledCourse,
  updateEnrolledCourseMarks,
  updateEnrolledCourseFinalMarks,
};
