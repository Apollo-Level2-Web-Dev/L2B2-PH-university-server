/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  // myStaticMethod(): number;
  isUserExist(id: string): Promise<IUser>;
}
