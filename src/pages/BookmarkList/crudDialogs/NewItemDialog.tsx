import CrudTemplateDialog from "./crudDialog.template";

import { createBookmark } from "../../../data/data.crud";

interface NewItemDialogProps {
  visible: boolean;
  setCloseDialog: () => void;
}

export default function NewItemDialog({
  visible,
  setCloseDialog,
}: NewItemDialogProps) {
  return (
    <CrudTemplateDialog
      title="New Bookmark"
      onSubmit={createBookmark}
      visible={visible}
      setCloseDialog={setCloseDialog}
    />
  );
}
