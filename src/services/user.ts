import { UserManager } from "oidc-client";
import { setAuthHeader } from "utils/axiosHeaders";
import { loadingUser, storeUser, resetState } from "../state/slices/user";

const config = {
  authority: "https://trainingidentityserver.azurewebsites.net/",
  client_id: "react.client",
  redirect_uri: process.env.PUBLIC_URL + "/signin-oidc", //"http://localhost:3000/signin-oidc", //we need some env vars for this
  response_type: "id_token token",
  scope: "openid profile ReactTraining.Api",
  post_logout_redirect_uri: process.env.PUBLIC_URL + "/signout-oidc",
};

const userManager = new UserManager(config);

export async function loadUserFromStorage(store: any) {
  try {
    let user = await userManager.getUser();
    if (!user) {
      return store.dispatch(resetState());
    }
    setAuthHeader(user?.access_token);
    store.dispatch(storeUser(user?.profile));
  } catch (e) {
    console.error(`User not found: ${e}`);
    store.dispatch(resetState());
  }
}

export function signinRedirect() {
  return userManager.signinRedirect();
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback();
}

export function signoutRedirect() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirect();
}

export function signoutRedirectCallback() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirectCallback();
}

export default userManager;
