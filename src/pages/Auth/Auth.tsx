import { useState } from "react";
import { css } from "@emotion/css";

import Login from "./Cards/Login";
import Register from "./Cards/Register";
import ForgotPassword from "./Cards/ForgotPassword";

import { LoginOrRegister } from "./Auth.helpers";

const authStyle = css({
  padding: 16,
});

export default function Auth() {
  const [card, setCard] = useState<LoginOrRegister>(LoginOrRegister.LOGIN);
  return (
    <div className={authStyle}>
      {card === LoginOrRegister.LOGIN && (
        <Login
          changeCard={() => setCard(LoginOrRegister.REGISTER)}
          forgotPasswordCallback={() =>
            setCard(LoginOrRegister.FORGOT_PASSWORD)
          }
        />
      )}
      {card === LoginOrRegister.REGISTER && (
        <Register changeCard={() => setCard(LoginOrRegister.LOGIN)} />
      )}
      {card === LoginOrRegister.FORGOT_PASSWORD && (
        <ForgotPassword changeCard={() => setCard(LoginOrRegister.LOGIN)} />
      )}
    </div>
  );
}
