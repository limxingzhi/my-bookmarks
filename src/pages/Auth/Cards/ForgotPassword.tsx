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
import { resetPassword } from "../../../data/data.crud";

export default function ForgetPassword({ changeCard }: AuthCardProps) {
  const [emailErrorHelper, setEmailErrorHelper] =
    useState<InputErrors>(inputErrorsDefault);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [requestErrors, setRequestErrors] = useState<string>("");
  const [requestDone, setRequestDone] = useState<string>("");

  const onSubmit = async (data: any) => {
    try {
      setSubmitLoading(true);
      const response = await resetPassword(data?.email);
      setRequestErrors("");
      setRequestDone("Done! Check your inbox and spam folder for a link to reset your password.");
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

  useEffect(() => {
    if (formErrors?.email?.type === "required")
      setEmailErrorHelper({
        error: true,
        helperText: "Email cannot be blank",
      });
    else setEmailErrorHelper(inputErrorsDefault);
  }, [formErrors]);

  return (
    <div className={authStyles.outerWrap}>
      <Card className={authStyles.innerWrap}>
        <CardContent>
          <div className={authStyles.header}>
            <Typography variant="h5">Reset Password</Typography>
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

            {requestErrors && <Alert severity="error">{requestErrors}</Alert>}
            {requestDone && <Alert severity="success">{requestDone}</Alert>}

            <div className={authStyles.formActions}>
              <Button
                variant={submitLoading ? "outlined" : "contained"}
                type="submit"
                disabled={submitLoading}
              >
                {submitLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  "RESET PASSWORD"
                )}
              </Button>

              <Button
                variant="outlined"
                size="small"
                disabled={submitLoading}
                onClick={changeCard}
              >
                LOGIN
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
