const DEV = import.meta.env.DEV;
const BACKEND_URL = DEV ? "http://localhost:4000" : "";

export {
  DEV,
  BACKEND_URL,
};
