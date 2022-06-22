import { Alert, AlertTitle, Typography, Button } from "@mui/material";
import { css } from "@emotion/css";

const noBookmarkAlertStyle = css({
  display: "block",
  marginTop: 12,
});

interface NoBookmarksAlertProps {
  addBookmarkCallback?: () => void;
}

export default function NoBookmarksAlert({
  addBookmarkCallback,
}: NoBookmarksAlertProps) {
  return (
    <Alert severity="info" className={noBookmarkAlertStyle}>
      <AlertTitle>You have no bookmarks!</AlertTitle>
      <Typography>
        Start by adding some bookmarks{" "}
        {addBookmarkCallback ? (
          <Button
            size="small"
            color="secondary"
            variant="text"
            onClick={addBookmarkCallback}
          >
            here
          </Button>
        ) : (
          <></>
        )}
      </Typography>
    </Alert>
  );
}
