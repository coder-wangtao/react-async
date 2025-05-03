import { IO } from "./symbol";
import effectRunnerMap from "./effectRunnerMap";

export default function proc(env, iterator) {
  next();

  function next(arg, isErr) {
    let result;
    if (isErr) {
      result = iterator.throw(arg);
    } else {
      result = iterator.next(arg);
    }
    // value done
    if (!result.done) {
      //
      digestEffect(result.value, next);
    }
  }

  function digestEffect(effect, cb) {
    let effectSettled;
    function currentCb(res, isErr) {
      if (effectSettled) {
        return;
      }
      effectSettled = true;
      cb(res, isErr);
    }
    runEffect(effect, currentCb);
  }

  function runEffect(effect, currentCb) {
    if (effect && effect[IO]) {
      const effectRunner = effectRunnerMap[effect.type];

      effectRunner(env, effect.payload, currentCb);
    } else {
      currentCb();
    }
  }
}
