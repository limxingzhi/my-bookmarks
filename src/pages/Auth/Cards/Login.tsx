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

import { AuthCardProps, InputErrors, AuthErrors } from "../Auth.helpers";
import { authStyles, inputErrorsDefault } from "../Auth.helpers";
import { signIn } from "../../../data/data.crud";

interface LoginProps extends AuthCardProps {
  forgotPasswordCallback: () => void;
}

export default function Login({
  changeCard,
  forgotPasswordCallback,
}: LoginProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [requestErrors, setRequestErrors] = useState<string>("");

  const onSubmit = async (data: any) => {
    try {
      setSubmitLoading(true);
      await signIn(data?.email, data?.password);
      setRequestErrors("");
    } catch (exception: any) {
      switch (exception?.code) {
        case AuthErrors.EMAIL_INVALID:
          setEmailErrorHelper({
            error: true,
            helperText: "Invalid email format",
          });
          break;
        case AuthErrors.USER_NOT_FOUND:
          setRequestErrors(
            "You do not exist (in our system). Please register!"
          );
          break;
        case AuthErrors.WRONG_PASSWORD:
          setRequestErrors(
            "Wrong password"
          );
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
  }, [formErrors]);

  return (
    <div className={authStyles.outerWrap}>
      <Card className={authStyles.innerWrap}>
        <CardContent>
          <div className={authStyles.header}>
            <Typography variant="h5">Login</Typography>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={authStyles.formBody}
          >
            <TextField
              size="small"
              id="email"
              label="Email"
              variant="outlined"
              disabled={submitLoading}
              {...emailErrorHelper}
              {...register("email", { required: true })}
            />

            <TextField
              type="password"
              size="small"
              id="password"
              label="Password"
              variant="outlined"
              disabled={submitLoading}
              {...passwordErrorHelper}
              {...register("password", { required: true })}
            />

            {requestErrors && <Alert severity="error">{requestErrors}</Alert>}

            <div className={authStyles.formActions}>
              <Button
                variant={submitLoading ? "outlined" : "contained"}
                type="submit"
                disabled={submitLoading}
              >
                {submitLoading ? <CircularProgress size={20} /> : "LOGIN"}
              </Button>
              <Button
                variant="outlined"
                disabled={submitLoading}
                onClick={changeCard}
              >
                REGISTER
              </Button>
            </div>
            <div>
              <Button
                variant="text"
                size="small"
                disabled={submitLoading}
                onClick={forgotPasswordCallback}
              >
                Forgot Password?
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
