import { useEffect, useRef } from "react";
import { Switch, FormControlLabel } from "@mui/material";

import { InputProps } from "./inputs";

export default function PinnedInput({
  setValue,
  value,
  errorMessage,
  label,
  tabIndex,
}: InputProps<boolean>) {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (Boolean(errorMessage)) inputRef.current?.focus?.();
  }, [errorMessage]);

  return (
    <FormControlLabel
      label={label ?? "Pin to top"}
      control={
        <Switch
          inputProps={{ tabIndex }}
          size="small"
          checked={value}
          onChange={(event) => setValue(event.target.checked)}
        />
      }
    />
  );
}
