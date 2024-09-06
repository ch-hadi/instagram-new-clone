// src/utils/session.js
export const setSession = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const getSession = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
  
  export const clearSession = () => {
    localStorage.removeItem('user');
  };
  
  export const isAuthenticated = () => {
    return !!getSession();  // Returns true if a user session exists
  };
  