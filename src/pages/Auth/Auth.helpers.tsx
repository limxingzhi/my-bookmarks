import { css } from "@emotion/css";

import { getFlexed } from "../../sharedStyles";

export interface InputErrors {
  error?: boolean;
  helperText: string;
}

export const inputErrorsDefault = {
  error: false,
  helperText: "",
};

export enum LoginOrRegister {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
}

export interface AuthCardProps {
  changeCard: () => void;
}

export enum AuthErrors {
  WEAK_PASSWORDS = "auth/weak-password",
  EMAIL_USED = "auth/email-already-in-use",
  EMAIL_INVALID = "auth/invalid-email",
  USER_NOT_FOUND = "auth/user-not-found",
  WRONG_PASSWORD = "auth/wrong-password",
}

export const authStyles = {
  outerWrap: css({
    ...getFlexed("row"),
    justifyContent: "center",
    flexWrap: "wrap",
  }),
  innerWrap: css({
    maxWidth: 600,
    minWidth: 200,
    flexGrow: 1,
    // marginTop: "5vh",
  }),
  formBody: css(getFlexed("column", 16)),
  header: css({
    display: "block",
    margin: "auto auto 16px",
  }),
  formActions: css({
    ...getFlexed("row"),
    justifyContent: "space-between",
  }),
};
