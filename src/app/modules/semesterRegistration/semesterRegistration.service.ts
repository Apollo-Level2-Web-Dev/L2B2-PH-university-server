import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const isAcademicSemesterExists = await AcademicSemester.findById(
    payload?.academicSemester,
  );

  if (!isAcademicSemesterExists) {
    throw new AppError(404, 'Academic Semester not found !');
  }

  const isRegistrationSemesterExists = await SemesterRegistration.findOne({
    academicSemester: payload?.academicSemester,
  });

  if (isRegistrationSemesterExists) {
    throw new AppError(400, 'This semester is already registered!');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .search(['academicSemester.name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(404, 'Registration Semester not found !');
  }

  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isRegistrationSemesterExists = await SemesterRegistration.findById(id);

  if (!isRegistrationSemesterExists) {
    throw new AppError(404, 'Registration Semester not found !');
  }

  const currentStatus = isRegistrationSemesterExists.status;
  const requestedStatus = payload?.status;

  if (currentStatus === 'ENDED') {
    throw new AppError(
      404,
      `Registration Semester  can not be updated . Because it is ${currentStatus}`,
    );
  }

  if (currentStatus === 'UPCOMING' && requestedStatus === 'ENDED') {
    throw new AppError(
      400,
      `Registration Semester  can not be updated . Because it is ${currentStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
};
