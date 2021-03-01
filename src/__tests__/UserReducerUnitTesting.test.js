import expect from 'expect';
import {
  userInitialState,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESOLVE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESOLVE,
} from '../state/ducks/userDuck';

import { userReducer } from '../state/ducks';

describe("User Duck Testing", () => {
  test("User reducer with mocked loginThunk test", () => {
    // mock test data
    const testUserid = 1;
    const testUsername = 'testuser';
    const testRoleName = 'testrole';
    const testErrorMessage = 'this is a test login error message';
    const testIdleStatus = 'idle';
    const testPendingStatus = 'get/pending';
    const testSuccessStatus = 'get/success';
    const testErrorStatus = 'get/error';

    // mock actions
    const mockLoginStart = { type: LOGIN_START };
    const mockLoginSuccess = { type: LOGIN_SUCCESS, payload: {userid: testUserid, username: testUsername, roles: [{ role: { name: testRoleName }}]}};
    const mockLoginFailure = { type: LOGIN_FAIL, payload: testErrorMessage};
    const mockLoginResolve = { type: LOGIN_RESOLVE };

    // assertions
    expect(userReducer(userInitialState, mockLoginStart).status).toEqual(testPendingStatus);
    expect(userReducer(userInitialState, mockLoginSuccess).user.userid).toEqual(testUserid);
    expect(userReducer(userInitialState, mockLoginSuccess).user.username).toEqual(testUsername);
    expect(userReducer(userInitialState, mockLoginSuccess).status).toEqual(testSuccessStatus);
    expect(userReducer(userInitialState, mockLoginSuccess).loggedIn).toBeTruthy();
    expect(userReducer(userInitialState, mockLoginFailure).loggedIn).toBeFalsy();
    expect(userReducer(userInitialState, mockLoginFailure).error).toEqual(testErrorMessage);
    expect(userReducer(userInitialState, mockLoginFailure).status).toEqual(testErrorStatus);
    expect(userReducer(userInitialState, mockLoginResolve).status).toEqual(testIdleStatus);
  });

  test("User reducer with mocked updateUserThunk test", () => {
    // mock test data
    const testUpdateUserid = 1;
    const testUpdateUsername = 'newtestuser';
    const testUpdateRoleName = 'newtestrole';
    const testUpdateErrorMessage = 'this is a update fail error message';
    const testUpdateIdleStatus = 'idle';
    const testUpdatePendingStatus = 'edit/pending';
    const testUpdateSuccessStatus = 'edit/success';
    const testUpdateErrorStatus = 'edit/error';

    // mock actions
    const mockUpdateUserStart = { type: UPDATE_USER_START };
    const mockUpdateUserSuccess = { type: UPDATE_USER_SUCCESS, payload: {userid: testUpdateUserid, username: testUpdateUsername, roles: [{ role: { name: testUpdateRoleName }},]}};
    const mockUpdateUserFailure = { type: UPDATE_USER_FAIL, payload: testUpdateErrorMessage };
    const mockUpdateUserResolve = { type: UPDATE_USER_RESOLVE };

    // assertions
    expect(userReducer(userInitialState, mockUpdateUserStart).status).toEqual(testUpdatePendingStatus);
    expect(userReducer(userInitialState, mockUpdateUserSuccess).user.userid).toEqual(testUpdateUserid);
    expect(userReducer(userInitialState, mockUpdateUserSuccess).user.username).toEqual(testUpdateUsername);
    expect(userReducer(userInitialState, mockUpdateUserSuccess).status).toEqual(testUpdateSuccessStatus);
    expect(userReducer(userInitialState, mockUpdateUserFailure).error).toEqual(testUpdateErrorMessage);
    expect(userReducer(userInitialState, mockUpdateUserFailure).status).toEqual(testUpdateErrorStatus);
    expect(userReducer(userInitialState, mockUpdateUserResolve).status).toEqual(testUpdateIdleStatus);
  });
});