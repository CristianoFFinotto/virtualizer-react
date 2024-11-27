import { isEqual } from "lodash-es";
import {
  Dispatch,
  Fragment,
  HTMLAttributes,
  memo,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Spinner from "./Spinner";
import { handleIntersection } from "./handleInteraction";

interface VirtualizerProps extends HTMLAttributes<HTMLDivElement> {
  data: { id: string; item: ReactNode }[];
  itemsToBeRendered: number;
}

export const Virtualizer = memo(
  ({ data, itemsToBeRendered, ...restDivProps }: VirtualizerProps) => {
    const [items, setItems] = useState(() => data.slice(0, itemsToBeRendered));
    const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);

    const startIndexRef = useRef(0);
    const endIndexRef = useRef(itemsToBeRendered);
    const parentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!parentRef.current) {
        return;
      }

      /**
       * scroll to the first item of the list, this makes possible to scroll up with the placeholder
       */

      parentRef.current?.firstElementChild?.nextElementSibling?.scrollIntoView();

      const options = {
        root: parentRef.current,
        threshold: 1.0,
      };

      const intersectionObserver = new IntersectionObserver(
        (entries) =>
          handleIntersection({
            items,
            entries,
            data,
            itemsToBeRendered,
            startIndexRef,
            endIndexRef,
            setIsLoadingModalOpen,
            setItems,
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
    }, [data, items, itemsToBeRendered]);

    return (
      <>
        <div ref={parentRef} {...restDivProps}>
          {/* required to load previous items */}
          <div id="first-item" style={{ height: 10 }} aria-hidden="true" />
          {items.map(({ id, item }) => (
            <Fragment key={id}>{item}</Fragment>
          ))}
          {/* required to load next items */}
          <div id="last-item" style={{ height: 10 }} aria-hidden="true" />
        </div>
        {createPortal(<Spinner open={isLoadingModalOpen} />, document.body)}
      </>
    );
  },
  isEqual
);
