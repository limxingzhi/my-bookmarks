import { css } from "@emotion/css";
import { getFlexed } from "../../sharedStyles";

const inputWithButtonStyles = {
  textField: css({
    width: "100%",
  }),
  wrap: css({
    ...getFlexed("row"),
    justifyContent: "space-between",
    gap: 16,
  }),
};

export { inputWithButtonStyles };
