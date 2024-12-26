import { beforeEach, describe, expect, it, vitest } from "vitest";
import { handleIntersection } from "../helpers";

describe("handleIntersection", () => {
  const onTopReached = vitest.fn();
  const onEndReached = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it("calls onTopReached when the first item is intersecting", () => {
    const entries = [
      {
        isIntersecting: true,
        target: { id: "first-item" },
      },
    ] as IntersectionObserverEntry[];

    handleIntersection({ entries, onTopReached, onEndReached });

    expect(onTopReached).toHaveBeenCalledTimes(1);
    expect(onEndReached).not.toHaveBeenCalled();
  });

  it("calls onEndReached when the last item is intersecting", () => {
    const entries = [
      {
        isIntersecting: true,
        target: { id: "last-item" },
      },
    ] as IntersectionObserverEntry[];

    handleIntersection({ entries, onTopReached, onEndReached });

    expect(onEndReached).toHaveBeenCalledTimes(1);
    expect(onTopReached).not.toHaveBeenCalled();
  });

  it("doesn't call onTopReached or onEndReached when there are no entries", () => {
    const entries = [] as IntersectionObserverEntry[];

    handleIntersection({ entries, onTopReached, onEndReached });

    expect(onTopReached).not.toHaveBeenCalled();
    expect(onEndReached).not.toHaveBeenCalled();
  });

  it("doesn't call onTopReached or onEndReached when the entry is not intersecting", () => {
    const entries = [
      {
        isIntersecting: false,
        target: { id: "first-item" },
      },
    ] as IntersectionObserverEntry[];

    handleIntersection({ entries, onTopReached, onEndReached });

    expect(onTopReached).not.toHaveBeenCalled();
    expect(onEndReached).not.toHaveBeenCalled();
  });

  it("doesn't call onTopReached or onEndReached when the entry is not the first or last item", () => {
    const entries = [
      {
        isIntersecting: true,
        target: { id: "some-other-item" },
      },
    ] as IntersectionObserverEntry[];

    handleIntersection({ entries, onTopReached, onEndReached });

    expect(onTopReached).not.toHaveBeenCalled();
    expect(onEndReached).not.toHaveBeenCalled();
  });
});
