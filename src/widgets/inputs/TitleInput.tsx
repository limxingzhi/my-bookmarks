import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";

import { InputProps } from "./inputs";

export default function TitleInput({
  setValue,
  value,
  inputFocus,
  label,
  tabIndex,
}: InputProps<string>) {
  const input = useRef<any>(null);

  useEffect(() => {
    if (inputFocus) input.current?.focus?.();
  }, [inputFocus]);

  return (
    <TextField
      inputRef={input}
      inputProps={{ tabIndex }}
      type="email"
      size="small"
      id="bookmark-title"
      label={label ?? "Title"}
      variant="outlined"
      value={value}
      onChange={(event) => setValue(event?.target?.value ?? "")}
    />
  );
}
