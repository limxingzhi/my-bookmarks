import { useEffect, useState, useMemo } from "react";
import { isEqual } from "lodash";

import { useReactiveRef } from "../../data/data.hooks";
import {
  getAllBookmarksRef,
  getFilterSortsConfigRef,
  writeFilterSorts,
} from "../../data/data.crud";

import MyTable from "./MyTable/MyTable";
import NewItemDialog from "./crudDialogs/NewItemDialog";
import EditItemDialog from "./crudDialogs/EditItemDialog";
import {
  dataBookmarksFormatter,
  defaultFilterSorts,
  filterSortBookmarks,
  FilterAndSortsConfig,
  dataFilterSortsConfigFormatter,
} from "./BookmarkList.helper";
import Toolbar from "./Toolbar";
import FilterDialog from "./MyTable/Filters/FilterDialog";

export default function BookmarkList() {
  const {
    data: bookmarksData,
    loading: bookmarksLoading,
    error: bookmarksError,
  } = useReactiveRef(getAllBookmarksRef(), dataBookmarksFormatter);

  const {
    data: filterSortsData,
    loading: filterSortsLoading,
    error: filterSortsError,
  } = useReactiveRef(getFilterSortsConfigRef(), dataFilterSortsConfigFormatter);

  const filterSortedRows = useMemo(() => {
    return filterSortBookmarks(
      bookmarksData ?? [],
      filterSortsData ?? defaultFilterSorts
    );
  }, [filterSortsData, bookmarksData]);

  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editId, setEditId] = useState("");

  const [showFilterDialog, setShowFilterDialog] = useState(false);

  const closeDialog = () => {
    setShowEditDialog(false);
    setEditId("");
  };

  useEffect(() => {
    if (editId) setShowEditDialog(true);
    else setShowEditDialog(false);
  }, [editId, showEditDialog]);

  return (
    <>
      {/* unmounting will purge all local state data for filter dialogs */}
      {showFilterDialog && (
        <FilterDialog
          defaultFilterSortsFromParent={filterSortsData ?? defaultFilterSorts}
          setFilterSorts={writeFilterSorts}
          allBookmarks={bookmarksData ?? []}
          visible={showFilterDialog}
          setCloseDialog={() => setShowFilterDialog(false)}
        />
      )}
      <NewItemDialog
        visible={showNewDialog}
        setCloseDialog={() => setShowNewDialog(false)}
      />
      <EditItemDialog
        visible={showEditDialog}
        setCloseDialog={closeDialog}
        bookmark={bookmarksData?.find((bookmark) => bookmark.id === editId)}
      />
      <MyTable
        loading={bookmarksLoading || filterSortsLoading}
        rows={filterSortedRows ?? []}
        showNewBookmarkDialog={() => setShowNewDialog(true)}
        setEditBookmarkId={setEditId}
        markAsReadWhenOpened={
          Boolean(filterSortsData?.others?.markAsReadWhenOpened)
        }
      >
        <Toolbar
          filterSortsApplied={!isEqual(defaultFilterSorts, filterSortsData)}
          openFilterDialogVisible={() => setShowFilterDialog(true)}
          openNewDialogVisible={() => setShowNewDialog(true)}
        />
      </MyTable>
    </>
  );
}
