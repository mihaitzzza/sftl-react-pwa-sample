import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { signinRedirect } from "services/user";

export const Login = () => {
  const user = useSelector((state: RootState) => {
    return state.userState.user; //isLoading not used right now --not sure if we need it or not
  });

  useEffect(() => {
    //we can dispatch loadingUser such that we can show some spinner in some other places of the app
    if (!user) {
      signinRedirect();
    }
  }, [user]);

  return user ? (
    <Redirect to={"/"} />
  ) : (
    <div>
      <div>Some spinner....</div>
      <div>Signing in...</div>
      <div>Please wait</div>
    </div>
  );
};
