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
  yield put({ type: REQUEST }); //dispatch

  try {
    const res1 = yield call(LoginService.login, action.payload); //阻塞调用
    const res2 = yield call(LoginService.getMoreUserInfo, res1); //阻塞调用
    yield put({ type: LOGIN_SUCCESS, payload: res2 });
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, payload: err });
  }
}

// watcher saga
//监听saga
function* loginSaga() {
  //   yield takeEvery(LOGIN_SAGA, loginHandle);
  // while (true) {
  console.log("-----------");
  const action = yield take(LOGIN_SAGA); //监听LOGIN_SAGA action payload []
  yield fork(loginHandle, action); //非阻塞调用
  // }
}

export default loginSaga;

// import { call, put, takeEvery } from 'redux-saga/effects'
// import axios from 'axios'

// // worker saga
// function* fetchUser(action) {
//   try {
//     const user = yield call(axios.get, `/api/user/${action.payload.id}`);
//     yield put({ type: "USER_FETCH_SUCCEEDED", payload: user.data });
//   } catch (e) {
//     yield put({ type: "USER_FETCH_FAILED", message: e.message });
//   }
// }

// // watcher saga
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }
