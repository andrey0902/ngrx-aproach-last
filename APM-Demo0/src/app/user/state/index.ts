
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import * as fromRoot from './../../state/app.state';

export interface State extends fromRoot.AppState {
  users: UserState;
}

const getUsersFeatureState = createFeatureSelector<UserState>('users');

export const getUsersMaskName = createSelector(
  getUsersFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUsersFeatureState,
  state => state.currentUser
);
