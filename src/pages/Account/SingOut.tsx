import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signoutRedirectCallback } from "services/user";

export const SignoutOidc = () => {
  const history = useHistory();
  useEffect(() => {
    async function signoutAsync() {
      await signoutRedirectCallback();
      history.push("/");
    }
    signoutAsync();
  }, [history]);

  return <div>Redirecting...</div>;
};
