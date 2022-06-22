import { useEffect, useRef } from "react";
import { TextField, Button, Tooltip } from "@mui/material";
import { Assignment } from "@mui/icons-material";

import { InputProps } from "./inputs";
import { inputWithButtonStyles } from "./inputs.styles";

interface URLInputProps extends InputProps<string> {
  showButton?: boolean;
}

export default function URLInput({
  setValue,
  value,
  errorMessage,
  label,
  showButton,
  tabIndex,
}: URLInputProps) {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (Boolean(errorMessage)) inputRef.current?.focus?.();
  }, [errorMessage]);

  const copyFromClipboard = async () => {
    const clipboardText = await navigator.clipboard.readText();
    setValue(clipboardText);
  };

  return (
    <div className={inputWithButtonStyles.wrap}>
      <TextField
        inputRef={inputRef}
        inputProps={{ tabIndex }}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        className={inputWithButtonStyles.textField}
        size="small"
        id="bookmark-url"
        label={label ?? "URL"}
        variant="outlined"
        value={value}
        onChange={(event) => setValue(event?.target?.value ?? "")}
      />
      {showButton && (
        <Button variant="outlined" size="small" onClick={copyFromClipboard}>
          <Tooltip title="Paste from clipboard" arrow>
            <Assignment />
          </Tooltip>
        </Button>
      )}
    </div>
  );
}
