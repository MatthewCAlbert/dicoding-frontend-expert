export const delay = (ms = 0) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
});
