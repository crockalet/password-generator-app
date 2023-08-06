export function debounce<
  Parameters extends any[],
  Func extends (...args: Parameters) => void
>(func: Func, timeout: number = 300) {
  let timer;
  return (...args: Parameters) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
