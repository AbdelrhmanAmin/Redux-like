const findDiff = (prev, next) => {
  const keys = Object.keys(prev);
  const diff = {};
  keys.forEach((key) => {
    if (prev[key] !== next[key]) {
      diff[key] = next[key];
    }
  });
  return diff;
};

module.exports = {
  findDiff,
};
