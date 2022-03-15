export const useLocalStorage = () => {
  const token = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return;
    }
  };
  return { token: token() };
};
