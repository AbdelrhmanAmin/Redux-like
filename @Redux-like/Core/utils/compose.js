const compose = (...funcs) =>
  funcs.reduce(
    (fn1, fn2) =>
      (...args) =>
        fn1(fn2(...args))
  );
export default compose;
