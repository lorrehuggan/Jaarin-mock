const development = 'http://localhost:5000/api/v1';
const production = 'https://infinite-depths-91540.herokuapp.com/api/v1';
const BASE_URL = production;

export const userRoutes = {
  base: `${BASE_URL}/user`,
  login: `${BASE_URL}/user/login`,
  create: `${BASE_URL}/user/create`,
};

export const jobRoutes = {
  base: `${BASE_URL}/job`,
  deleteShift: `${BASE_URL}/job/delete-shift`,
  createShift: `${BASE_URL}/job/create-shift`,
  updateShift: `${BASE_URL}/job/update-shift`,
};
