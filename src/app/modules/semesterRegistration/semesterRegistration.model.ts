import mongoose, { Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['UPCOMING'],
    default: 'UPCOMING',
  },
  minCredit: {
    type: Number,
    default: 0,
  },
  maxCredit: {
    type: Number,
    default: 0,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'Academicsemester',
    required: true,
  },
});

export const SemesterRegistration = mongoose.model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
