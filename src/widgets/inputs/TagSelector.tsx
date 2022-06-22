import { Autocomplete, TextField, Checkbox } from "@mui/material";
import {
  CheckBox as CheckIcon,
  CheckBoxOutlineBlank as CheckBlankIcon,
} from "@mui/icons-material";

import { InputProps } from "./inputs";

interface TagSelectorProps extends InputProps<string[]> {
  options: Array<string>;
}

export default function TagSelector({
  options,
  value,
  setValue,
  tabIndex,
}: TagSelectorProps) {
  return (
    <Autocomplete
      onChange={(_event, newValue) => setValue(newValue)}
      value={value}
      size="small"
      id="filter-tag"
      multiple
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{ ...params?.inputProps, tabIndex }}
          label="Select Tags"
          placeholder="Fields"
        />
      )}
      renderOption={(props, title, { selected }) => (
        <span {...props} style={{ padding: 0 }}>
          <Checkbox
            icon={<CheckBlankIcon fontSize="small" />}
            checkedIcon={<CheckIcon fontSize="small" />}
            checked={selected}
          />
          {title}
        </span>
      )}
    />
  );
}
