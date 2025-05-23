// import { all } from "redux-saga/effects";
import { all } from "../my-saga/effects";

import loginSaga from "./loginSaga";

export default function* rootSaga(params) {
  // 并发监听多个 takeEvery/takeLatest。
  // 启动多个 watcher saga。
  //loginSaga() effects
  debugger;
  yield all([loginSaga()]);
}
