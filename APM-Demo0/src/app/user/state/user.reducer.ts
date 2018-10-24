import { UserActions, UserActionTypes } from '../action/user.actions';
import { User } from '../user';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: {
    id: null,
    userName: null,
    isAdmin: null
  }
};

export function userReducer(state: UserState = initialState, action: UserActions): any {

  switch (action.type) {

    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}
