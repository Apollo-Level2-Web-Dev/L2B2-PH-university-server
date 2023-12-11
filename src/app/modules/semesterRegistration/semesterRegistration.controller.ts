import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    
    // const result =
    
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'Semester Registration is created successfully!',
  //     data: result,
  //   });
  // },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    // const result =
    
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semester Registration is created',
    //   data: result,
    // });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // const result 
     
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semester Registration is updated successfully',
    //   data: result,
    // });
  },
);
const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    // const result =
    
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semester Registration is updated successfully',
    //   data: result,
    // });
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  updateSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
};
