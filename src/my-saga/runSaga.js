import proc from "./proc";

export default function runSaga(
  { channel, getState, dispatch }, //{{take, put},getState, dispatch}
  saga, //rootSaga
  ...args
) {
  const iterator = saga(...args); //yield all([loginSaga()]);

  proc({ channel, getState, dispatch }, iterator);
}
