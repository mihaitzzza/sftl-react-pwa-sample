import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signoutRedirectCallback, signoutRedirect } from "services/user";

export const SignoutOidc = () => {
  const history = useHistory();
  useEffect(() => {
    async function signoutAsync() {
      await signoutRedirect();
      history.push("/");
    }
    signoutAsync();
  }, [history]);

  return <div>Redirecting...</div>;
};
