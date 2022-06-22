import { useState, createContext } from "react";

const GlobalState = createContext<
  [any, React.Dispatch<React.SetStateAction<{}>>]
>([
  {
    title: "",
  },
  () => {},
]);

function GlobalStateProvider({ children }: GotChildren) {
  const store = useState({});

  return <GlobalState.Provider value={store}>{children}</GlobalState.Provider>;
}

export { GlobalStateProvider, GlobalState };
