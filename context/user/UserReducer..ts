import { AuthenticatedUser, UserID } from '../../utils/types/user-types';

export const userInitialState: UserInitState = {
  authenticatedUser: {
    id: '',
    email: '',
    username: '',
    iat: 0,
    exp: 0,
    createdAt: 0,
    currency: '',
  },
};

interface Action extends UserInitState {
  type: string;
}
export interface UserInitState {
  authenticatedUser: AuthenticatedUser;
}

export const userReducer = (state: UserInitState, action: Action) => {
  switch (action.type) {
    case 'AUTHENTICATION':
      return {
        ...state,
        authenticatedUser: action.authenticatedUser,
      };
    default:
      return state;
  }
};
