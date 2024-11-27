import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";

interface HandleIntersectionParams {
  items: {
    id: string;
    item: ReactNode;
  }[];
  entries: IntersectionObserverEntry[];
  data: { id: string; item: ReactNode }[];
  itemsToBeRendered: number;
  startIndexRef: MutableRefObject<number>;
  endIndexRef: MutableRefObject<number>;
  setIsLoadingModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<{ id: string; item: ReactNode }[]>>;
}

export const handleIntersection = ({
  items,
  entries,
  data,
  itemsToBeRendered,
  startIndexRef,
  endIndexRef,
  setIsLoadingModalOpen,
  setItems,
}: HandleIntersectionParams) => {
  /**
   * handle intersection of the first item
   */

  const hasStartReached = data[0].id === items[0].id;
  const firstItemId = "first-item";

  if (
    entries.length === 1 &&
    entries[0].isIntersecting &&
    entries[0].target.id === firstItemId &&
    !hasStartReached
  ) {
    let computedStartIndex = startIndexRef.current - itemsToBeRendered;
    let computedEndIndex = endIndexRef.current - itemsToBeRendered;

    if (computedStartIndex < 0 || computedEndIndex < itemsToBeRendered) {
      computedStartIndex = 0;
      computedEndIndex = itemsToBeRendered;
    }

    startIndexRef.current = computedStartIndex;
    endIndexRef.current = computedEndIndex;

    setIsLoadingModalOpen(true);

    setTimeout(() => {
      setItems(data.slice(startIndexRef.current, endIndexRef.current));
      setIsLoadingModalOpen(false);
    }, 2000);

    return;
  }

  const hasEndReached = data[data.length - 1].id === items[items.length - 1].id;
  const lastItemId = "last-item";

  /**
   * handle intersection of the last item
   */
  if (
    entries.length === 1 &&
    entries[0].isIntersecting &&
    entries[0].target.id === lastItemId &&
    !hasEndReached
  ) {
    const computedEndIndex = endIndexRef.current + itemsToBeRendered;

    if (computedEndIndex > data.length) {
      startIndexRef.current = data.length - itemsToBeRendered;
      endIndexRef.current = data.length;
    } else {
      startIndexRef.current = startIndexRef.current + itemsToBeRendered;
      endIndexRef.current = computedEndIndex;
    }

    setIsLoadingModalOpen(true);

    setTimeout(() => {
      setItems(data.slice(startIndexRef.current, endIndexRef.current));
      setIsLoadingModalOpen(false);
    }, 2000);
  }
};
