import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signinRedirectCallback } from "services/user";

export const SigninOidc = () => {
  const history = useHistory();

  useEffect(() => {
    async function signinAsync() {
      await signinRedirectCallback();
      history.push("/");
    }
    signinAsync();
  }, [history]);

  return <div>Check is authenticated...</div>;
};
