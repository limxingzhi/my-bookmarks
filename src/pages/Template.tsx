import { useContext, useEffect } from "react";

import { GlobalState } from "../utils/useGlobalState";

export interface TemplateProps extends GotChildren {
  title: string;
}

export default ({ children, title }: TemplateProps) => {
  const [, setGlobal] = useContext(GlobalState);
  useEffect(() => {
    setGlobal((state) => ({ ...state, title }));
  }, [children]);

  return <>{children}</>;
};
