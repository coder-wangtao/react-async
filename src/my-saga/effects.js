//搞定
import effectTypes from "./effectTypes";
import { IO } from "./symbol";

function makeEffect(type, payload) {
  return {
    [IO]: IO,
    type,
    payload,
  };
}

export function take(pattern) {
  //take这个方法，是用来监听action，返回的是监听到的action对象。
  return makeEffect(effectTypes.TAKE, { pattern });
}

export function put(action) {
  return makeEffect(effectTypes.PUT, { action });
}

export function call(fn, ...args) {
  return makeEffect(effectTypes.CALL, { fn, args });
}

export function fork(fn, ...args) {
  return makeEffect(effectTypes.FORK, { fn, args });
}

export function all(effects) {
  return makeEffect(effectTypes.ALL, { effects });
}
