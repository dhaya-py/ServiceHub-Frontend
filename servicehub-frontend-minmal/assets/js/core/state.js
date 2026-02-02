const state = {
    user: null,
    isAuthenticated: false,
  };
  
  export function setUser(user) {
    state.user = user;
    state.isAuthenticated = true;
  }
  
  export function clearUser() {
    state.user = null;
    state.isAuthenticated = false;
  }
  
  export function getState() {
    return state;
  }
  