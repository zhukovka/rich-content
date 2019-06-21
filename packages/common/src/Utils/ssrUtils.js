export const isWindowAvailable = () => {
  try {
    return typeof window !== 'undefined';
  } catch (e) {
    return false;
  }
};

export const getWindow = () => (isWindowAvailable() ? window : {});
