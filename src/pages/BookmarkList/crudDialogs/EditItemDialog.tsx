import CrudTemplateDialog from "./crudDialog.template";

import { updateBookmark, deleteBookmark } from "../../../data/data.crud";

interface EditItemDialogProps {
  visible: boolean;
  setCloseDialog: () => void;
  bookmark?: Bookmark;
}

export default function EditItemDialog({
  visible,
  setCloseDialog,
  bookmark,
}: EditItemDialogProps) {
  return (
    <CrudTemplateDialog
      title="Edit Bookmark"
      onSubmit={updateBookmark}
      visible={visible}
      setCloseDialog={setCloseDialog}
      defaultValues={bookmark}
      onDelete={() => deleteBookmark(bookmark?.id ?? "")}
    />
  );
}
