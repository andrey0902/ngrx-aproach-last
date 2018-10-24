import { UserActions, UserActionTypes } from '../action/user.actions';
import { UserState } from './user.state.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const initialState: UserState = {
  maskUserName: true,
  currentUser: {
    id: null,
    userName: null,
    isAdmin: null
  }
};

const getUsersFeatureState = createFeatureSelector<UserState>('users');

export const getUsersMaskName = createSelector(
  getUsersFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUsersFeatureState,
  state => state.currentUser
);

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
