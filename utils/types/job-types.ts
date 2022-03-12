export interface Job {
  _id: string;
  company_name: string;
  job_title: string;
  wages: Wage[];
  user: string;
  createdAt: number;
  __v: number;
  updatedAt: number;
}

export interface Wage {
  tips: number;
  hours_worked: number;
  date: number;
  _id: string;
}
