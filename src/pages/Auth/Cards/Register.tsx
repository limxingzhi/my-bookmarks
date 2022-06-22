import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Alert,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import { InputErrors, AuthCardProps, AuthErrors } from "../Auth.helpers";
import { authStyles, inputErrorsDefault } from "../Auth.helpers";
import { signUp } from "../../../data/data.crud";

export default function Register({ changeCard }: AuthCardProps) {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors: formErrors },
  } = useForm();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [requestErrors, setRequestErrors] = useState<string>("");

  const onSubmit = async (data: any) => {
    try {
      setSubmitLoading(true);
      const response = await signUp(data?.email, data?.password);
      console.log(response);
      setRequestErrors('');
    } catch (exception: any) {
      switch (exception?.code) {
        case AuthErrors.EMAIL_INVALID:
          setEmailErrorHelper({
            error: true,
            helperText: "Invalid email format",
          });
          break;
        case AuthErrors.WEAK_PASSWORDS:
          setPasswordErrorHelper({
            error: true,
            helperText: "Password needs at least 6 characters",
          });
          setRepeatPasswordErrorHelper({
            error: true,
            helperText: "Password needs at least 6 characters",
          });
          break;
        case AuthErrors.EMAIL_USED:
          setRequestErrors("Email is already registered");
          break;
        default:
          setRequestErrors(
            `Oops, something went wrong${
              exception?.code ? "\n" + exception?.code : ""
            }`
          );
          break;
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const [emailErrorHelper, setEmailErrorHelper] =
    useState<InputErrors>(inputErrorsDefault);
  const [passwordErrorHelper, setPasswordErrorHelper] =
    useState<InputErrors>(inputErrorsDefault);
  const [repeatPasswordErrorHelper, setRepeatPasswordErrorHelper] =
    useState<InputErrors>(inputErrorsDefault);

  useEffect(() => {
    if (formErrors?.email?.type === "required")
      setEmailErrorHelper({
        error: true,
        helperText: "Email cannot be blank",
      });
    else setEmailErrorHelper(inputErrorsDefault);

    if (formErrors?.password?.type === "required")
      setPasswordErrorHelper({
        error: true,
        helperText: "Password cannot be blank",
      });
    else setPasswordErrorHelper(inputErrorsDefault);

    if (formErrors?.repeatPassword?.type === "required")
      setRepeatPasswordErrorHelper({
        error: true,
        helperText: "Repeat password cannot be blank",
      });
    else if (formErrors?.repeatPassword?.message)
      setRepeatPasswordErrorHelper({
        error: true,
        helperText: formErrors?.repeatPassword?.message,
      });
    else setRepeatPasswordErrorHelper(inputErrorsDefault);
  }, [formErrors]);

  return (
    <div className={authStyles.outerWrap}>
      <Card className={authStyles.innerWrap}>
        <CardContent>
          <div className={authStyles.header}>
            <Typography variant="h5">Register</Typography>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={authStyles.formBody}
          >
            <TextField
              disabled={submitLoading}
              size="small"
              id="email"
              label="Email"
              variant="outlined"
              {...emailErrorHelper}
              {...register("email", { required: true })}
            />

            <TextField
              disabled={submitLoading}
              type="password"
              size="small"
              id="password"
              label="Password"
              variant="outlined"
              {...passwordErrorHelper}
              {...register("password", { required: true })}
            />

            <TextField
              disabled={submitLoading}
              type="password"
              size="small"
              id="password-retry"
              label="Repeat Password"
              variant="outlined"
              {...repeatPasswordErrorHelper}
              {...register("repeatPassword", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />

            {requestErrors && <Alert severity="error">{requestErrors}</Alert>}

            <div className={authStyles.formActions}>
              <Button
                variant={submitLoading ? "outlined" : "contained"}
                type="submit"
                disabled={submitLoading}
              >
                {submitLoading ? <CircularProgress size={20} /> : "REGISTER"}
              </Button>
              <Button variant="outlined" onClick={changeCard} disabled={submitLoading}>
                LOGIN
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
