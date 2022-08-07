// compose is a function that takes multiple functions as arguments and returns a new function that is the composition of those functions.
const compose = (...funcs) =>
  funcs.reduce(
    (fn1, fn2) =>
      (...args) =>
        fn1(fn2(...args))
  );
// compose [fn1, fn2, fn3]
// initial: () => () => {}
// first iteration: () => (fn1) => (...args) => fn1(fn2(...args))
