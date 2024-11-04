// ==============================|| TYPES - CUSTOMER  ||============================== //

export interface CustomerProps {
  modal: boolean;
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export interface CustomerList {
  firstName: string;
  lastName: string;
  id?: any;
  avatar: number;
  name: string;
  fatherName: string;
  email: string;
  age: number;
  gender: Gender|string;
  role: string;
  orders: number;
  progress: number;
  status: number;
  orderStatus: string;
  contact: string;
  country: string;
  location: string;
  about: string;
  skills: string[];
  time: string[];
  date: Date | string | number;
}