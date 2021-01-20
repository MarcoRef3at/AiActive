import { Cookies } from "quasar";

export function setLoggedIn(state, payload) {
  state.loggedIn = payload.success; //Boolean true or false
  var cookiesToken;
  if (process.env.NODE_ENV == "development") {
    cookiesToken = payload.token; //Token from body
  } else {
    cookiesToken = Cookies.get("token"); //Token from cookies
  }
  //payload is either data or false
  //if not false set cookies
  if (payload != false) {
    state.token = cookiesToken;
    //if development-mode set cookies from body
    if (process.env.NODE_ENV == "development")
      Cookies.set("token", cookiesToken);
  }
  // if false remove cookies
  else {
    Cookies.remove("token");
  }
}
export function setUserData(state, payload) {
  //Set UserData
  state.userData = payload;

  // Clear Token and UserData
  if (!payload) {
    state.userData = "";
    state.token = null;
  }
}
