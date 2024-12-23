import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import { VirtualizerProps } from "../types/types";
import { handleIntersection } from "../utils/helpers";

export const Virtualizer = ({
  data,
  threshold = 1.0,
  onTopReached,
  onEndReached,
  ...restDivProps
}: VirtualizerProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!parentRef.current) {
      return;
    }

    /**
     * scroll to the first item of the list, this makes possible to scroll up with the placeholder
     */

    parentRef.current.firstElementChild?.nextElementSibling?.scrollIntoView();
  }, [data]);

  useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    const options = {
      root: parentRef.current,
      threshold,
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection({
          entries,
          onTopReached,
          onEndReached,
        }),
      options
    );

    /**
     * attach the observer to the first and last item of the list
     */

    const firstChild = parentRef.current.firstElementChild;
    const lastChild = parentRef.current.lastElementChild;

    if (firstChild) {
      intersectionObserver.observe(firstChild);
    }
    if (lastChild) {
      intersectionObserver.observe(lastChild);
    }

    return () => {
      if (firstChild) {
        intersectionObserver.unobserve(firstChild);
      }
      if (lastChild) {
        intersectionObserver.unobserve(lastChild);
      }
    };
  }, [onEndReached, onTopReached, threshold]);

  return (
    <div ref={parentRef} {...restDivProps}>
      {/* required to load previous items */}
      <div id="first-item" style={{ height: 10 }} aria-hidden="true" />
      {data.map(({ id, item }) => (
        <Fragment key={id}>{item}</Fragment>
      ))}
      {/* required to load next items */}
      <div id="last-item" style={{ height: 10 }} aria-hidden="true" />
    </div>
  );
};
