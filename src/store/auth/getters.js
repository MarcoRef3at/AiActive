export function isLoggedIn(state) {
  return state.userData !== null;
}

export function user(state) {
  return state.userData;
}

export const check = state => roles => {
  const user = state.userData;
  if (user) {
    if (Array.isArray(roles) && roles.length) {
      for (let role of roles) {
        if (user.role == "admin") {
          return true;
        } else if (!user.role.includes(role)) {
          return false;
        }
      }
    } else if (roles) {
      if (!user.role.includes(roles)) {
        return false;
      }
    }
    return true;
  }
  return false;
};
