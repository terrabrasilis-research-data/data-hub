import { createReducer, on } from '@ngrx/store';
import {
    addUserData,
    rmvUserData
} from './login.action';
import { LoginState } from './login.state';

/** initial values to Explore State */
const initialState: LoginState = {
  user: localStorage.getItem('user') && localStorage.getItem('user') != "undefined" ? JSON.parse(localStorage.getItem('user')) : null
};

export interface AppState {
  login: LoginState;
}

export const reducer = createReducer(initialState,

    on(addUserData, (state, payload) => {
      localStorage.setItem('user', JSON.stringify(payload['user']));
      return { ...state, user: payload['user'] };
    }),
/*
    on(rmvUserData, (state) => {
      localStorage.setItem('user', null);
      return { ...state, user: null };
    }),
*/
)

