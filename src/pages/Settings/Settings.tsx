import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Alert,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { css } from "@emotion/css";

import { resetPassword, deleteAccount, signOut } from "../../data/data.crud";
import { useUserAuthenticated } from "../../data/data.hooks";
import { formStyles, getFlexed } from "../../sharedStyles";

interface SettingsProp {
  visible: boolean;
  setVisible?: (visible: boolean) => void;
}
export default function Settings({ visible, setVisible }: SettingsProp) {
  const { user } = useUserAuthenticated();

  const [showEmailSent, setShowEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const closeDialog = () => {
    setVisible?.(false);
  };

  const tryToResetPassword = () => {
    resetPassword(user?.email ?? "").then(() => setShowEmailSent(true));
  };

  const tryToDeleteAccount = () => {
    deleteAccount().catch((exception: any) => {
      if (exception?.code === "auth/requires-recent-login") {
        setError(
          "You must be logged in recently to delete your account. Try again after a new login"
        );
      } else {
        setError(exception?.code ?? "Oops, something went wrong");
      }
    });
  };

  return (
    <Dialog
      open={visible}
      onClose={closeDialog}
      onKeyDown={(event) => event.code === "Escape" && closeDialog()}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        {showEmailSent && (
          <>
            <Alert
              severity="success"
              action={
                <IconButton size="small" onClick={() => setShowEmailSent(false)}>
                  <CloseIcon />
                </IconButton>
              }
            >
              Done! Check your inbox and spam folder for a link to reset your
              password.
            </Alert>
            <br />
          </>
        )}
        {error && (
          <>
            <Alert
              severity="error"
              action={
                <Button
                  variant="outlined"
                  size="small"
                  onClick={signOut}
                  color="secondary"
                >
                  logout now
                </Button>
              }
            >
              {error}
            </Alert>
            <br />
          </>
        )}
        <div className={formStyles.formBody}>
          <div className={formStyles.formActions}>
            <Typography>I want to reset my password</Typography>
            <Button
              size="small"
              variant="contained"
              onClick={tryToResetPassword}
            >
              Send me an email to reset my password
            </Button>
          </div>
          <div className={formStyles.formActions}>
            <Typography>I want to delete my account</Typography>
            <div className={css(getFlexed("column", 4))}>
              <Button
                color="error"
                disabled={!deleteConfirmed}
                size="small"
                variant="contained"
                onClick={tryToDeleteAccount}
              >
                Delete my account
              </Button>
              <FormControlLabel
                control={
                  <Switch
                    color="error"
                    size="small"
                    checked={deleteConfirmed}
                    onChange={(event) =>
                      setDeleteConfirmed(event.target.checked)
                    }
                  />
                }
                label="I understand its not reversible."
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
