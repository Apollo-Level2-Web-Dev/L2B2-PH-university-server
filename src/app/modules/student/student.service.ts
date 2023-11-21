import { PipelineStage } from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await Student.create(studentData);
  return result;
};

interface Filters {
  [key: string]: unknown;
}

interface Pagination {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 1 | -1;
}

const getAllStudentsFromDB = async (
  filtersOptions: Filters,
  pagination: Pagination,
) => {
  const { searchTerm, ...filters } = filtersOptions;
  const { sortBy, sortOrder, limit } = pagination;

  const pipeline: PipelineStage[] = [];

  let queryStr = JSON.stringify(filters);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  const queryObj = JSON.parse(queryStr);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: ['name', 'email'].map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  console.log(filters);
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(queryObj).length) {
    andConditions.push({
      $and: Object.entries(queryObj).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  console.log(JSON.stringify(andConditions, null, 2));

  const result = await Student.aggregate();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
