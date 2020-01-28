import { createReducer, on } from '@ngrx/store';
import {
    addUserData,
} from './login.action';
import { LoginState } from './login.state';

/** initial values to Explore State */
const initialState: LoginState = {
  userData: null
};

export interface AppState {
  login: LoginState;
}

export const reducer = createReducer(initialState,
    on(addUserData, (state, payload) => {
      return { ...state, user: payload };
    }),
)