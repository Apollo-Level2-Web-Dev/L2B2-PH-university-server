import mongoose, { Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: ['UPCOMING', 'ONGOING', 'ENDED'],
    default: 'UPCOMING',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    min: 3,
  },
  maxCredit: {
    type: Number,
    max: 20,
    default: 16,
  },
});

export const SemesterRegistration = mongoose.model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
