export const fadeAway = (element) => {
  return new Promise((resolve) => {
    element.classList.add('fadeOut');
    setTimeout(() => {
      element.remove();
      resolve();
    }, 360);
  });
};

export const resetAnimationClass = (element) => {
  element.classList.remove('fadeIn');
  setTimeout(() => {
    element.classList.add('fadeIn');
  }, 1);
};
