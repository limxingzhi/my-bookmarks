import { css } from "@emotion/css";

export const getFlexed = (
  direction: "column" | "row" = "column",
  gap?: number
) => ({
  display: "flex",
  flexDirection: direction,
  gap,
});

export const unselectableStyled = css({
  userSelect: "none",
});

export const formStyles = {
  formBody: css({
    ...getFlexed(),
    justifyContent: "flex-start",
    gap: 16,
    paddingTop: 8,
  }),
  formActions: css({
    ...getFlexed("row", 4),
    justifyContent: "space-between",
    width: "100%",
  }),
  formSubActions: css({
    ...getFlexed("row", 4),
  }),
  formOneLiner: css({
    ...getFlexed("row", 4),
    justifyContent: "flex-start",
    flexWrap: "wrap",
  }),
};
