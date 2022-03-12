import { Wage } from '../../utils/types/job-types';

export const jobInitialState: JobInitState = {
  filteredShifts: [],
};

interface Action extends JobInitState {
  type: string;
}

interface JobInitState {
  filteredShifts: Wage[];
}

export const jobReducer = (state: JobInitState, action: Action) => {
  switch (action.type) {
    case 'FILTERED_SHIFTS':
      return {
        ...state,
        filteredShifts: action.filteredShifts,
      };
    default:
      return state;
  }
};
