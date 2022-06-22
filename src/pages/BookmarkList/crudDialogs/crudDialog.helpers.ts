import { css } from "@emotion/css";
import { pick } from "lodash";

// interfaces for reducer state

export interface NewItemFormState {
  title: string;
  tags: Array<string>;
  url: string;
  pinned: boolean;
}

interface NewItemStateTitleOrUrlAction {
  key: "title" | "url";
  value: string;
}

interface NewStateTagItemAction {
  key: "tags";
  value: Array<string>;
}

interface NewItemStatePinnedAction {
  key: "pin";
  value: boolean;
}

interface ClearAction {
  key: "CLEAR";
}

interface FillAction {
  key: "FILL";
  value: Bookmark;
}

const newItemDefaultState: NewItemFormState = {
  title: "",
  tags: [],
  url: "",
  pinned: false,
};

const newBookmarkReducer = (
  state: NewItemFormState,
  action:
    | NewItemStateTitleOrUrlAction
    | NewStateTagItemAction
    | NewItemStatePinnedAction
    | ClearAction
    | FillAction
): NewItemFormState => {
  const newState = { ...state };

  if (action.key === "title" || action.key === "url")
    newState[action.key] = action.value;
  else if (action.key === "tags") newState.tags = action.value;
  else if (action.key === "pin") newState.pinned = action.value;
  else if (action.key === "CLEAR") return { ...newItemDefaultState };
  else if (action.key === "FILL")
    return pick(action.value, ["title", "url", "tags", "pinned"]);

  return newState;
};

export { newBookmarkReducer, newItemDefaultState };
