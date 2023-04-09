let uniqueId = (function () {
  let num = 0;
  return function (prefix: string) {
    prefix = String(prefix) || "";
    num += 1;
    return prefix + num;
  };
})();
export { uniqueId };
