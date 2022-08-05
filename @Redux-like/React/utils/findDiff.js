const findDiff = (prev, next) => {
  if (Array.isArray(prev) && Array.isArray(next)) {
    return findDiffBetweenArrays(prev, next);
  }
  return findDiffBetweenObjects(prev, next);
};

const findDiffBetweenArrays = (prev, next) => {
  return next.filter((item, index) => {
    return prev[index] !== item;
  });
};

const findDiffBetweenObjects = (prev, next) => {
  const keys = Object.keys(prev);
  const diff = {};
  keys.forEach((key) => {
    if (prev[key] !== next[key]) {
      diff[key] = next[key];
    }
  });
  return diff;
};

export default findDiff;
