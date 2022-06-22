import { useEffect, useState, useRef } from "react";
import { TextField, Button, Tooltip } from "@mui/material";
import { LibraryAdd, HighlightOff } from "@mui/icons-material";

import { InputProps } from "./inputs";
import { inputWithButtonStyles } from "./inputs.styles";
import TagManager from "../TagsManager";

interface TagInputProps extends InputProps<Array<string>> {
  inputFieldValue: string;
}

export default function TagInput({
  value,
  setValue,
  disabled,
  inputFieldValue,
  tabIndex
}: TagInputProps) {
  const textFieldRef = useRef<any>(null);

  const [input, setInput] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>(value);

  // overwites input field
  useEffect(() => {
    setInput(inputFieldValue);
  }, [inputFieldValue]);

  useEffect(() => {
    setTags(value);
  }, [value]);

  const [showHint, setShowHint] = useState(false);
  const [hintTimeoutId, setHintTimeoutId] =
    useState<ReturnType<typeof setTimeout>>();

  const addTagHandler = () => {
    setInput("");
    const newTags = [...tags];
    input.split(",").map((value) => {
      const cleanedInput = checkInput(value);
      if (cleanedInput && !newTags.includes(cleanedInput)) newTags.push(value);
    });
    setTags(newTags);
    setValue(newTags);

    // textFieldRef?.current?.focus();
  };

  const removeTag = (tag: string) => {
    if (disabled) return;
    const newTags = tags.filter((value) => value !== tag);
    setTags(newTags);
    setValue(newTags);
  };

  const inputHandler = (event: any) => {
    const cleanedInput = checkInput(event?.target?.value);
    setInput(cleanedInput);
  };

  const checkInput = (value: string) => {
    // clean input
    const cleanedInput = value.toUpperCase().replaceAll(" ", "_");

    // show hint if input is not pretty
    if (!cleanedInput || value !== cleanedInput) {
      setShowHint(true);

      const timeoutId = setTimeout(() => {
        setShowHint(false);
      }, 6_000);
      setHintTimeoutId(timeoutId);
    } else if (showHint) {
      // clean hint if hint is showing + input is acceptable
      cleanHint();
    }

    return cleanedInput;
  };

  // remove the previous interval when there's a new one
  useEffect(() => {
    return () => {
      if (hintTimeoutId) {
        clearInterval(hintTimeoutId);
      }
    };
  }, [hintTimeoutId]);

  // cleanup function for hint
  const cleanHint = () => {
    if (hintTimeoutId) {
      setHintTimeoutId(undefined);
      setShowHint(false);
    }
  };

  return (
    <>
      <div className={inputWithButtonStyles.wrap}>
        <Tooltip
          title="Upper case and spaces are not allowed"
          open={showHint}
          arrow
        >
          <TextField
            disabled={disabled}
            inputProps={{ tabIndex }}
            onKeyDown={(event) => event.code === "Enter" && addTagHandler()}
            inputRef={textFieldRef}
            className={inputWithButtonStyles.textField}
            onBlur={cleanHint}
            size="small"
            id="bookmark-tags-select"
            label="Tags"
            variant="outlined"
            value={input}
            onChange={inputHandler}
          />
        </Tooltip>
        <Button
          disabled={disabled}
          onClick={addTagHandler}
          variant="outlined"
          size="small"
        >
          <Tooltip title="Add tag" arrow>
            <LibraryAdd />
          </Tooltip>
        </Button>
      </div>
      <div className={inputWithButtonStyles.wrap}>
        <TagManager icon={<HighlightOff />} tags={tags} onClick={removeTag} />
      </div>
    </>
  );
}
