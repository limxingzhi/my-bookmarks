import { useEffect, useMemo, useState } from "react";
import { uniq, flatten } from "lodash";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Divider,
  Chip,
  Switch,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import {
  TagSelector,
  URLInput,
  TitleInput,
  DatePicker,
} from "../../../../widgets/inputs/inputs";
import { formStyles } from "../../../../sharedStyles";
import {
  defaultFilterSorts,
  FilterAndSortsConfig,
} from "../../BookmarkList.helper";

interface FilterDialogProps {
  visible: boolean;
  setCloseDialog: () => void;
  allBookmarks: Array<Bookmark>;
  defaultFilterSortsFromParent: FilterAndSortsConfig;
  setFilterSorts: (config: FilterAndSortsConfig) => void;
}

export default function FilterDialog({
  visible,
  setCloseDialog,
  allBookmarks,
  defaultFilterSortsFromParent,
  setFilterSorts,
}: FilterDialogProps) {
  const [localFilterSorts, setLocalFilterSort] =
    useState<FilterAndSortsConfig>(defaultFilterSorts);

  const [titleFilter, setTitleFilter] = useState<string>("");
  const [urlFilter, setUrlFilter] = useState<string>("");
  const [tagsFilter, setTagsFilter] = useState<Array<string>>([]);

  const [filterConsiderDate, setFilterConsiderDate] = useState(false);
  const [dateSorted, setDateSorted] = useState(new Date());
  const [beforeAfter, setBeforeAfter] = useState<"before" | "after">("before");

  const [pinnedFirstSorted, setPinnedFirstSorted] = useState(true);
  const [readLastSorted, setReadLastSorted] = useState(true);

  const [markAsReadWhenOpened, setMarkAsReadWhenOpened] = useState(true);

  // write default values to local fields
  useEffect(() => {
    const {
      filterBy: filters,
      sortBy: sorts,
      others,
    } = defaultFilterSortsFromParent;

    setTitleFilter(filters.title);
    setUrlFilter(filters.url);
    setTagsFilter(filters.tags);

    if (filters.lastUpdated) {
      setFilterConsiderDate(true);
      setBeforeAfter(filters.lastUpdated?.beforeAfter);
      setDateSorted(filters.lastUpdated?.date);
    }

    setPinnedFirstSorted(sorts.pinnedFirst);
    setReadLastSorted(sorts.readLast);

    setMarkAsReadWhenOpened(Boolean(others?.markAsReadWhenOpened));
  }, [defaultFilterSortsFromParent]);

  // close dialog
  const closeDialog = () => {
    setLocalFilterSort(defaultFilterSorts);
    setCloseDialog();
  };

  // pass filter and sorts to parent before closing dialog
  const submitHandler = (reset?: boolean) => () => {
    setFilterSorts(reset ? defaultFilterSorts : localFilterSorts);
    closeDialog();
  };

  // write all tags to memorized array
  const availableTags = useMemo(() => {
    const tagsOfAllBookmarks = flatten(
      allBookmarks.map((bookmark) => bookmark?.tags ?? [])
    );
    return uniq(tagsOfAllBookmarks);
  }, [allBookmarks]);

  // write to local state whenever field changes
  useEffect(() => {
    const newFilterSortsConfig: FilterAndSortsConfig = {
      filterBy: {
        title: titleFilter,
        url: urlFilter,
        tags: tagsFilter,
      },
      sortBy: {
        pinnedFirst: pinnedFirstSorted,
        readLast: readLastSorted,
      },
      others: {
        markAsReadWhenOpened,
      },
    };

    if (filterConsiderDate) {
      newFilterSortsConfig.filterBy.lastUpdated = {
        beforeAfter,
        date: dateSorted,
      };
    }

    setLocalFilterSort(newFilterSortsConfig);
  }, [
    titleFilter,
    urlFilter,
    tagsFilter,
    pinnedFirstSorted,
    readLastSorted,
    filterConsiderDate,
    dateSorted,
    beforeAfter,
    markAsReadWhenOpened,
  ]);

  return (
    <Dialog
      open={visible}
      onClose={closeDialog}
      onKeyDown={(event) => event.code === "Escape" && closeDialog()}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Filters and Sorts</DialogTitle>
      <DialogContent>
        <Typography variant="caption">
          *All of the options here are AND
        </Typography>
        <div className={formStyles.formBody}>
          <Divider textAlign="center">
            <Chip size="small" label="FILTER BY" color="secondary" />
          </Divider>
          <TitleInput
            inputFocus
            value={titleFilter}
            setValue={setTitleFilter}
            label="Title contains"
          />
          <URLInput
            value={urlFilter}
            setValue={setUrlFilter}
            label="URL contains"
          />
          <TagSelector
            value={tagsFilter}
            setValue={setTagsFilter}
            options={availableTags}
          />
          <div className={formStyles.formOneLiner}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={filterConsiderDate}
                  onChange={(event) =>
                    setFilterConsiderDate(event.target.checked)
                  }
                />
              }
              label="Last Updated"
            />
            <Select
              disabled={!filterConsiderDate}
              size="small"
              id="before-after-select"
              value={beforeAfter}
              onChange={(event) =>
                setBeforeAfter(event.target.value as "before" | "after")
              }
            >
              <MenuItem value="after">After</MenuItem>
              <MenuItem value="before">Before</MenuItem>
            </Select>
            <DatePicker
              disabled={!filterConsiderDate}
              value={dateSorted}
              setValue={setDateSorted}
            />
          </div>
          <Divider textAlign="center">
            <Chip size="small" label="SORT BY" color="secondary" />
          </Divider>
          <div className={formStyles.formOneLiner}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={pinnedFirstSorted}
                  onChange={(event) =>
                    setPinnedFirstSorted(event.target.checked)
                  }
                />
              }
              label="Pinned first"
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={readLastSorted}
                  onChange={(event) => setReadLastSorted(event.target.checked)}
                />
              }
              label="Read last"
            />
          </div>

          <Divider textAlign="center">
            <Chip size="small" label="OTHERS" color="secondary" />
          </Divider>
          <div className={formStyles.formOneLiner}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={markAsReadWhenOpened}
                  onChange={(event) =>
                    setMarkAsReadWhenOpened(event.target.checked)
                  }
                />
              }
              label="Mark links as read after opening"
            />
          </div>

          <div className={formStyles.formOneLiner}></div>
        </div>
      </DialogContent>
      <DialogActions>
        <div className={formStyles.formActions}>
          <Button onClick={submitHandler(true)} variant="outlined">
            Reset
          </Button>
          <div className={formStyles.formSubActions}>
            <Button onClick={closeDialog} variant="outlined">
              Cancel
            </Button>
            <Button onClick={submitHandler()} variant="contained">
              Apply
            </Button>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}
