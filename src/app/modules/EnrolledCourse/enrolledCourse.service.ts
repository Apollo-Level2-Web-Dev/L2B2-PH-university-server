import { TEnrolledCourse } from './enrolledCourse.interface';

const createEnrolledCourseIntoDB = async (
  payload: Partial<TEnrolledCourse>,
) => {
  /**
   * Step-1 : check if the student is already enrolled in the offered course
   * Step-2 : check if the offered course exists
   * Step-3 : create the enrolled course
   */
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
