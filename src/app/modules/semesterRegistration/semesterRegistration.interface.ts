import { Types } from 'mongoose';

export type TSemesterRegistration = {
  startDate: Date;
  endDate: Date;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  minCredit: number;
  maxCredit: number;
  academicSemester: Types.ObjectId;
};
