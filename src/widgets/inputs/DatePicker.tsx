import { useRef } from "react";
import { TextField } from "@mui/material";
import { format } from "date-fns";

import { InputProps } from "./inputs";

export default function DatePicker({
  setValue,
  value,
  label,
  disabled,
  tabIndex,
}: InputProps<Date>) {
  const input = useRef<any>(null);

  return (
    <TextField
      disabled={disabled}
      inputRef={input}
      inputProps={{ tabIndex }}
      type="date"
      size="small"
      id="bookmark-date"
      label={label ?? "Date"}
      variant="outlined"
      value={format(value ?? new Date(), "yyyy-MM-dd")}
      onChange={(event) => setValue(new Date(event?.target?.value ?? ""))}
    />
  );
}
