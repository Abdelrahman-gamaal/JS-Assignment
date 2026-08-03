var createCounter = function (init) {
  let res = init;
  function reset() {
    init = res;
    return init;
  }
  function increment() {
    return ++init;
  }
  function decrement() {
    return --init;
  }
  return {
    reset,
    increment,
    decrement,
  };
};
//
const counter = createCounter(5);
console.log(counter.increment()); // 6
console.log(counter.reset()); // 5
console.log(counter.decrement()); // 4
