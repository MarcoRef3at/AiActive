export function setUserData(state, payload) {
  if (payload) {
    //Set UserData
    state.userData = payload;
  } else {
    // Clear Token and UserData
    state.userData = null;
  }
}
