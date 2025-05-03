//调用异步操作 call
//状态更新（dispatch） put
//做监听 take

// import { call, put, takeEvery, take, fork } from "redux-saga/effects";
import { call, put, take, fork } from "../my-saga/effects";

import LoginService from "../service/login";
import {
  LOGIN_FAILURE,
  LOGIN_SAGA,
  LOGIN_SUCCESS,
  REQUEST,
} from "../store/const";

function* loginHandle(action) {
  yield put({ type: REQUEST });

  try {
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({ type: LOGIN_SUCCESS, payload: res2 });
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, payload: err });
  }
}

// watcher saga
function* loginSaga() {
  //   yield takeEvery(LOGIN_SAGA, loginHandle);

  while (true) {
    const action = yield take(LOGIN_SAGA);
    yield fork(loginHandle, action);
  }
}

export default loginSaga;
