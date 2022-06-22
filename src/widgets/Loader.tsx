import { CircularProgress, Typography } from "@mui/material";
import { css } from "@emotion/css";

const loaderStyles = {
  wrap: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "20px",
  }),
  child: css({
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
  }),
};

export default function Loader() {
  return (
    <div className={loaderStyles.wrap}>
      <div className={loaderStyles.child}>
        <Typography>Loading your bookmarks</Typography>
        <CircularProgress style={{margin: '0 auto'}}/>
      </div>
    </div>
  );
}
