import { useState, useReducer, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Done, Clear, Delete } from "@mui/icons-material";

import { TitleInput, URLInput, TagInput } from "../../../widgets/inputs/inputs";
import { newBookmarkReducer, newItemDefaultState } from "./crudDialog.helpers";

import { formStyles } from "../../../sharedStyles";
import PinnedInput from "../../../widgets/inputs/PinnedInput";

interface CrudTemplateDialogProps {
  title: string;
  onSubmit: (bookmark: Bookmark) => Promise<boolean>;
  visible: boolean;
  setCloseDialog: () => void;
  defaultValues?: Bookmark;
  onDelete?: () => Promise<boolean>;
}

export default function CrudTemplateDialog({
  title,
  onSubmit,
  visible,
  setCloseDialog,
  defaultValues,
  onDelete,
}: CrudTemplateDialogProps) {
  const [urlError, setUrlError] = useState("");

  const [formState, dispatch] = useReducer(
    newBookmarkReducer,
    newItemDefaultState
  );

  useEffect(() => {
    if (defaultValues) dispatch({ key: "FILL", value: defaultValues });
  }, [defaultValues]);

  const [tagInputField, setTagInputField] = useState("");

  const clearForm = () => {
    dispatch({ key: "CLEAR" });
    setTagInputField("");
    setUrlError("");
  };

  const closeDialog = () => {
    clearForm();
    setCloseDialog();
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    const response = await onDelete();

    if (response) closeDialog();
  };

  const handleSubmit = async () => {
    if (!formState.url) {
      setUrlError("URL cannot be blank");
      return;
    }

    setUrlError("");

    const response = await onSubmit({
      dateAdded: new Date(),
      read: false,
      ...defaultValues,
      ...formState,
      dateLastUpdated: new Date(),
    });

    if (response) closeDialog();
  };

  return (
    <Dialog
      open={visible}
      maxWidth="md"
      fullWidth
      onKeyDown={(event) => event.code === "Escape" && closeDialog()}
      onClose={closeDialog}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={formStyles.formBody}>
        <div className={formStyles.formBody}>
          <TitleInput
            tabIndex={1}
            inputFocus={true}
            value={formState.title}
            setValue={(value: string) => {
              dispatch({ key: "title", value });
            }}
          />
          <URLInput
            tabIndex={2}
            showButton
            errorMessage={urlError}
            value={formState.url}
            setValue={(value: string) => {
              dispatch({ key: "url", value });
            }}
          />
          <TagInput
            tabIndex={3}
            inputFieldValue={tagInputField}
            value={formState.tags}
            setValue={(value: string[]) => {
              dispatch({ key: "tags", value });
            }}
          />
          <PinnedInput
            tabIndex={4}
            value={formState.pinned}
            setValue={(value) => dispatch({ key: "pin", value })}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div className={formStyles.formActions}>
          <div>
            {Boolean(onDelete) && (
              <Tooltip title="Delete bookmark" arrow>
                <IconButton onClick={handleDelete}>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <div>
            <IconButton onClick={closeDialog} tabIndex={6}>
              <Tooltip title="Close" arrow>
                <Clear />
              </Tooltip>
            </IconButton>
            <IconButton onClick={handleSubmit} tabIndex={5}>
              <Tooltip title="Save" arrow>
                <Done color="primary" />
              </Tooltip>
            </IconButton>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}
