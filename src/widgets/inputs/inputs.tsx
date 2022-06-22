import TitleInput from "./TitleInput";
import URLInput from "./URLInput";
import TagInput from "./TagInput";
import TagSelector from "./TagSelector";
import DatePicker from "./DatePicker"

export interface InputProps<T> {
  setValue: (input: T) => void;
  value: T;
  errorMessage?: string;
  inputFocus?: boolean;
  label?: string;
  disabled?: boolean;
  tabIndex?: number;
}

export { TitleInput, URLInput, TagInput, TagSelector, DatePicker };
