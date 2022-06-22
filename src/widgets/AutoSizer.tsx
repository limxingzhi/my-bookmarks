import { useLayoutEffect, useRef, useState } from "react";
import { css } from "@emotion/css";

const autoSizerStyles = css({
  maxHeight: "100%",
  width: "100%",
  overflow: "auto",
});

interface AutoSizerProps extends GotChildren {
  className?: string;
  setHeight?: (height: number) => void;
  setWidth?: (width: number) => void;
}

export default function AutoSizer({
  children,
  className,
  setHeight,
  setWidth,
}: AutoSizerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setHeight?.(ref?.current?.clientHeight ?? 0);
    setWidth?.(ref?.current?.clientWidth ?? 0);
  });

  return (
    <div ref={ref} className={autoSizerStyles + " " + (className ?? "")}>
      {children}
    </div>
  );
}
