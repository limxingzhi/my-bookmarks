import {
  Tooltip,
  Link,
  IconButton,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import {
  ContentPasteSearch as Edit,
  Visibility as MarkAsRead,
  VisibilityOff as MarkAsUnread,
  BookmarkAdd as Pin,
  BookmarkRemove as UnPin,
} from "@mui/icons-material";
import { formatRelative } from "date-fns";
import { css } from "@emotion/css";
import { get } from "lodash";

import { pinBookmark, readBookmark } from "../../../data/data.crud";

import TagManager from "../../../widgets/TagsManager";
import { getFlexed } from "../../../sharedStyles";

const actionStyles = css(getFlexed("row"));
const readStyles = css({ opacity: 0.6 });

export enum TableFields {
  ACTIONS = "actions",
  URL = "url",
  TAGS = "tags",
  TITLE = "title",
  DATE_LAST_UPDATED = "dateLastUpdated",
  DATE_ADDED = "dateAdded",
}

export interface MyTableColumnConfig {
  field: TableFields;
  label: string;
  padding?: boolean;
  actions?: Array<JSX.Element>;
  renderer?: (cellValue: any, rowValue?: any) => JSX.Element | string;
}

export const getColumns = (
  fields: string[],
  setEditId: (editId: string) => void,
  markAsReadWhenOpened: boolean
): MyTableColumnConfig[] => {
  const allColumns: MyTableColumnConfig[] = [
    { field: TableFields.TITLE, label: "Title" },
    {
      field: TableFields.URL,
      label: "URL",
      renderer: linkRenderWithcallback(readBookmark, markAsReadWhenOpened),
    },
    {
      field: TableFields.TAGS,
      label: "Tags",
      renderer: tagsRenderer,
    },
    {
      field: TableFields.DATE_ADDED,
      label: "Added on",
      renderer: dateRenderer,
    },
    {
      field: TableFields.DATE_LAST_UPDATED,
      label: "Updated on",
      renderer: dateRenderer,
    },
    {
      field: TableFields.ACTIONS,
      label: "Actions",
      renderer: actionsRenderer(setEditId),
    },
  ];
  return fields.reduce((prev, current) => {
    const columnToAdd = allColumns.find((column) => column.field === current);

    if (columnToAdd) return [...prev, columnToAdd];
    else return [...prev];
  }, [] as MyTableColumnConfig[]);
};

export const tagsRenderer = (value: string[]) => {
  return <TagManager tags={value ?? []} />;
};

export const linkRenderWithcallback =
  (
    clickedCallback: (bookmarkId: string) => void,
    markAsReadWhenOpened: boolean
  ) =>
  (value: string, row: Bookmark) => {
    return (
      <div
        className={
          css(getFlexed("column", 4)) + (row.read ? " " + readStyles : "")
        }
      >
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (markAsReadWhenOpened) clickedCallback(row.id ?? "");
          }}
        >
          {value}
        </Link>
        {row.title || row.tags ? (
          <Typography variant="caption">
            {row.read ? <i>{row.title}</i> : row.title}
            <Typography component="span" variant="caption" color="secondary">
              <strong>
                {" " +
                  row.tags
                    .reduce((prevTags, tag) => `${prevTags} - ${tag}`, "")
                    .toUpperCase()}
              </strong>
            </Typography>
          </Typography>
        ) : null}
      </div>
    );
  };

export const dateRenderer = (value: Date | string) => {
  return <>{formatRelative(new Date(value) ?? new Date(), new Date())}</>;
};

export const actionsRenderer =
  (setEditId: (editId: string) => void) =>
  (_bookmarkId: string, rowValue: Bookmark) => {
    return (
      <div className={actionStyles}>
        <IconButton
          size="small"
          onClick={() => readBookmark(rowValue.id ?? "", !rowValue.read)}
        >
          {rowValue.read ? <MarkAsUnread /> : <MarkAsRead />}
        </IconButton>
        <IconButton
          size="small"
          onClick={() => pinBookmark(rowValue?.id ?? "", !rowValue.pinned)}
        >
          {rowValue.pinned ? <UnPin /> : <Pin />}
        </IconButton>
        <IconButton size="small" onClick={() => setEditId(rowValue?.id ?? "")}>
          <Edit />
        </IconButton>
      </div>
    );
  };

export const bodyRenderer = (
  rows: Array<Bookmark>,
  columns: MyTableColumnConfig[],
  pinnedStyle?: string
) => {
  return rows.map((bookmark) => (
    <TableRow key={bookmark.id} className={bookmark.pinned ? pinnedStyle : ""}>
      {columns.map((column) => (
        <TableCell
          key={column.field + " " + bookmark.id}
          padding={column.padding ? "none" : "normal"}
        >
          {column?.renderer?.(get(bookmark, column.field), bookmark) ??
            get(bookmark, column.field).toString()}
        </TableCell>
      ))}
    </TableRow>
  ));
};
