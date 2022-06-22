import { css } from "@emotion/css";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  useTheme,
} from "@mui/material";

import { bodyRenderer, getColumns } from "./MyTable.helper";

import AutoSizer from "../../../widgets/AutoSizer";
import Loader from "../../../widgets/Loader";
import NoBookmarksAlert from "./NoBookmarkAlerts";

const myTableStyles = css({
  display: "block",
  height: "100%",
  width: "100%",
});

interface MyTableProps extends GotChildren {
  rows: Array<Bookmark>;
  loading?: boolean;
  showNewBookmarkDialog?: () => void;
  setEditBookmarkId: (bookmarkId: string) => void;
  markAsReadWhenOpened: boolean;
}

export default function MyTable({
  rows,
  loading,
  showNewBookmarkDialog,
  children,
  setEditBookmarkId,
  markAsReadWhenOpened,
}: MyTableProps) {
  const theme = useTheme();
  const pinnedTheme = css({
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[100],
  });

  const columns = [
    "actions",
    "url",
    // "tags",
    // "title",
    "dateLastUpdated",
    // "dateAdded",
  ];

  if (loading) return <Loader />;

  return (
    <>
      <AutoSizer>
        <>
          {children}
          {rows.length === 0 ? (
            <NoBookmarksAlert addBookmarkCallback={showNewBookmarkDialog} />
          ) : (
            <Table size="small" stickyHeader className={myTableStyles}>
              <TableHead>
                <TableRow>
                  {getColumns(
                    columns,
                    setEditBookmarkId,
                    markAsReadWhenOpened
                  ).map((column) => (
                    <TableCell key={column.field}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bodyRenderer(
                  rows,
                  getColumns(columns, setEditBookmarkId, markAsReadWhenOpened),
                  pinnedTheme
                )}
              </TableBody>
            </Table>
          )}
        </>
      </AutoSizer>
    </>
  );
}
