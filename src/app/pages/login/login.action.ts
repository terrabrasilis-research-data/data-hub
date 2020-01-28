import { createAction, props, createSelector } from '@ngrx/store';

/**
 * add ser info to store
 */
export const addUserData = createAction(
    '[User Component] Data',
    props<object>()
);
