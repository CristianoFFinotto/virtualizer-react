import { HTMLAttributes, ReactNode } from "react";

export interface HandleIntersectionParams
  extends Pick<VirtualizerProps, "onTopReached" | "onEndReached"> {
  entries: IntersectionObserverEntry[];
}

export interface VirtualizerProps extends HTMLAttributes<HTMLDivElement> {
  data: { id: string; item: ReactNode }[];
  threshold?: number;
  onTopReached: () => void;
  onEndReached: () => void;
}
