import {push} from 'react-router-redux';
import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {
    checkAuthorizationSuccess, checkAuthorizationFailure,
    signInSuccess, signInFailure,
    getDatabasesSuccess, getDatabasesFailure,
    updateUserSuccess, updateUserFailure, updateUserPasswordSuccess,
    getSubusersSuccess, getSubusersFailure,
    getSchemasSuccess, getSchemasFailure,
    getGC2ConfigurationSuccess, checkAuthorizationRequest, processSuccess, processFailure
} from './actions';


import {
    CHECK_AUTHORIZATION_REQUEST,
    CHECK_AUTHORIZATION_SUCCESS,
    SIGN_IN_REQUEST,
    SIGN_OUT,
    GET_DATABASES_REQUEST,
    UPDATE_USER_REQUEST,
    GET_SUBUSERS_REQUEST,
    GET_SCHEMAS_REQUEST,
    GET_GC2_CONFIGURATION_REQUEST, PROCESS_REQUEST
} from './constants';

import {
    checkAuthorizationCall, signInCall, updateUserCall, getDatabasesCall,
    getSubusersCall, getSchemasCall,
    getGC2ConfigurationCall, processCall
} from '../../api';

import config from './../../config'

const appBaseURL = config.homepage;

export function* checkAuthorizationGenerator() {
    try {
        const response = yield call(checkAuthorizationCall);
        yield put(checkAuthorizationSuccess(response.data.data));
    } catch (err) {
        yield put(checkAuthorizationFailure());
    }
}

export function* signInGenerator(credentials) {
    try {
        const result = yield call(signInCall, credentials);
        yield put(signInSuccess(result.data.data));

        if (result.data.data.passwordExpired) {
            yield put(push(`${appBaseURL}account`));
        } else {
            yield put(push(appBaseURL));
        }
    } catch (err) {
        yield put(signInFailure());
    }
}

export function* getDatabasesGenerator(data) {
    try {
        const result = yield call(getDatabasesCall, data);
        yield put(getDatabasesSuccess({
            databases: result.data.databases,
            userName: data.payload
        }));
    } catch (err) {
        yield put(getDatabasesFailure());
    }
}

export function* signOutGenerator() {
    yield put(push(`${appBaseURL}sign-in`));
}

export function* updateUserGenerator(action) {
    try {
        const response = yield call(updateUserCall, action);
        if (response.status === 200) {
            yield put(updateUserSuccess());
            if (action.payload.data.onSuccess) action.payload.data.onSuccess();
            if (action.payload.data && action.payload.data.oldPassword && action.payload.data.newPassword) {
                yield put(updateUserPasswordSuccess());
            }
        } else if (response.status === 403) {
            yield put(updateUserFailure(response.data.errorCode));
        } else {
            if (response.data && response.data.errorCode) {
                yield put(updateUserFailure(response.data.errorCode));
            } else {
                yield put(updateUserFailure());
            }
        }
    } catch (err) {
        yield put(updateUserFailure());
    }
}

export function* getSubusersGenerator(action) {
    const response = yield call(getSubusersCall, action);
    try {
        yield put(getSubusersSuccess(response.data.data));
    } catch (err) {
        yield put(getSubusersFailure());
    }
}

export function* getSchemasGenerator(action) {
    const response = yield call(getSchemasCall, action);
    try {
        yield put(getSchemasSuccess(response.data.data));
    } catch (err) {
        yield put(getSchemasFailure());
    }
}


export function* forceUserUpdateGenerator(action) {
    if (action.payload.passwordExpired) {
        yield put(push(`${appBaseURL}account`));
    }
}

export function* getGC2ConfigurationGenerator() {
    const response = yield call(getGC2ConfigurationCall);
    try {
        yield put(getGC2ConfigurationSuccess(response.data));
        yield put(checkAuthorizationRequest({}));
        if (response.data && response.data.gc2Al) {
            if (response.data.gc2Al.indexOf(`da_`) === 0) {
                yield put(`da`);
            } else if (response.data.gc2Al.indexOf(`en_`) === 0) {
                yield put(`en`);
            }
        }
    } catch (err) {
        yield put(getGC2ConfigurationSuccess({}));
        yield put(checkAuthorizationRequest({}));

    }
}

export function* processGenerator(credentials) {
    try {
        const response = yield call(processCall, credentials);
        if (response.status === 200)
            yield put(processSuccess(response));
        else
            yield put(processFailure(response));

    } catch (err) {
        yield put(processFailure(err));
    }
}

export default function* checkAuthorization() {
    yield takeLatest(CHECK_AUTHORIZATION_REQUEST, checkAuthorizationGenerator);
    yield takeLatest(SIGN_IN_REQUEST, signInGenerator);
    yield takeLatest(GET_DATABASES_REQUEST, getDatabasesGenerator);
    yield takeLatest(SIGN_OUT, signOutGenerator);
    yield takeLatest(UPDATE_USER_REQUEST, updateUserGenerator);
    yield takeLatest(CHECK_AUTHORIZATION_SUCCESS, forceUserUpdateGenerator);
    yield takeLatest(GET_SUBUSERS_REQUEST, getSubusersGenerator);
    yield takeLatest(GET_SCHEMAS_REQUEST, getSchemasGenerator);
    yield takeLatest(GET_GC2_CONFIGURATION_REQUEST, getGC2ConfigurationGenerator);
    yield takeEvery(PROCESS_REQUEST, processGenerator);
}
