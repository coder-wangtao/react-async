//func：接收一个参数 f，判断它是不是一个函数，返回布尔值。
export const func = (f) => typeof f === "function";
//这是判断一个对象是否是 Promise 最常用的方式，因为 Promise 对象一定有 .then 方法。
export const promise = (p) => p && func(p.then);
