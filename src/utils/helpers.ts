import { HandleIntersectionParams } from "../types/types";

export const handleIntersection = ({
  entries,
  onTopReached,
  onEndReached,
}: HandleIntersectionParams) => {
  /**
   * handle intersection of the first item
   */

  const firstItemId = "first-item";

  if (
    entries.length === 1 &&
    entries[0].isIntersecting &&
    entries[0].target.id === firstItemId
  ) {
    onTopReached();
    return;
  }

  const lastItemId = "last-item";

  /**
   * handle intersection of the last item
   */
  if (
    entries.length === 1 &&
    entries[0].isIntersecting &&
    entries[0].target.id === lastItemId
  ) {
    onEndReached();
  }
};
