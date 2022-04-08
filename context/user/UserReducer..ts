import {
  AuthenticatedUser,
  MenuState,
  UserID,
} from '../../utils/types/user-types';

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
  mobileMenu: {
    isOpen: false,
  },
};

interface Action extends UserInitState {
  type: string;
}
export interface UserInitState {
  authenticatedUser: AuthenticatedUser;
  mobileMenu: MenuState;
}

export const userReducer = (state: UserInitState, action: Action) => {
  switch (action.type) {
    case 'AUTHENTICATION':
      return {
        ...state,
        authenticatedUser: action.authenticatedUser,
      };
    case 'MOBILE_MENU':
      return {
        ...state,
        mobileMenu: action.mobileMenu,
      };
    default:
      return state;
  }
};
