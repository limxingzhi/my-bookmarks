import { Button } from "@mui/material";
import { AddLink, FilterList } from "@mui/icons-material";
import { css } from "@emotion/css";
import { getFlexed } from "../../sharedStyles";

const toolbarStyles = {
  wrap: css({
    ...getFlexed("row", 8),
    marginBottom: 8,
  }),
  button: css({
    ...getFlexed("row", 4),
  }),
  buttonSx: { borderRadius: 8 },
};

interface ToolbarProps {
  openNewDialogVisible: () => void;
  openFilterDialogVisible: () => void;
  filterSortsApplied: boolean;
}

export default function Toolbar({
  openNewDialogVisible,
  openFilterDialogVisible,
  filterSortsApplied,
}: ToolbarProps) {
  return (
    <div className={toolbarStyles.wrap}>
      <Button
        sx={toolbarStyles.buttonSx}
        className={toolbarStyles.button}
        variant="outlined"
        onClick={() => openNewDialogVisible()}
        size="small"
        color="secondary"
      >
        <AddLink />
        <span>New</span>
      </Button>
      <Button
        sx={toolbarStyles.buttonSx}
        className={toolbarStyles.button}
        variant={filterSortsApplied ? "contained" : "outlined"}
        onClick={() => openFilterDialogVisible()}
        size="small"
        color="secondary"
      >
        <FilterList />
        <span>Filters / Sorts</span>
      </Button>
    </div>
  );
}
