export const fadeAway = (element) => {
  return new Promise((resolve) => {
    element.classList.add('fadeOut');
    setTimeout(() => {
      element.remove();
      resolve();
    }, 360);
  });
};
