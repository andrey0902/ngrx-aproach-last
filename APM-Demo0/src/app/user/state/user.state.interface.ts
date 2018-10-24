import * as fromRoot from '../../state/app.state';
import { User } from '../user';

export interface State extends fromRoot.AppState {
  users: UserState;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}
