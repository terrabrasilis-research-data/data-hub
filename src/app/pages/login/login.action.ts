import { createAction, props, createSelector } from '@ngrx/store';

/**
 * add user info to store
 */
export const addUserData = createAction(
    '[User Component] Data',
    props<object>()
);

/**
 * remove user info to store
 */
export const rmvUserData = createAction(
    '[User Component] Data',
    props()
);