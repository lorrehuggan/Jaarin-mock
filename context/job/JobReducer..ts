import { Wage, Job } from '../../utils/types/job-types';

export const jobInitialState: JobInitState = {
  filteredShifts: [],
  job: null,
};

interface Action extends JobInitState {
  type: string;
}

interface JobInitState {
  filteredShifts: Wage[];
  job: Job | null;
}

export const jobReducer = (state: JobInitState, action: Action) => {
  switch (action.type) {
    case 'FILTERED_SHIFTS':
      return {
        ...state,
        filteredShifts: action.filteredShifts,
      };
    case 'JOB':
      return {
        ...state,
        job: action.job,
      };
    default:
      return state;
  }
};
