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

// types/advisor.ts

export interface AdvisorList {
  id: number; // Unique identifier for the advisor
  pers_fName: string; // First name of the advisor
  pers_lName: string; // Last name of the advisor
  pers_profilePic: string | null; // Profile picture (url or null if not available)
  ed_name: string; // Education or qualification name (e.g., degree, certification)
  pp_jobTitle: string; // Job title of the advisor
  pp_jobDesc: string; // Job description of the advisor
  email: string; // Email address of the advisor
  pers_phone1: string; // Primary phone number
  pers_preferredTimezone: string; // Preferred time zone
  pers_location: string; // Location of the advisor (e.g., city, country)
  skills: string[]; // List of skills
  about: string; // Short description about the advisor
  time: string; // Preferred work time
}
