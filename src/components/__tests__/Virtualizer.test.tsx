import { render, screen } from "@testing-library/react";
import { expect, it, vitest } from "vitest";
import { props } from "../../__mocks__/mocks";
import { Virtualizer } from "../Virtualizer";

const scrollIntoViewMock = vitest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

export class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}
window.IntersectionObserver = IntersectionObserver;

it("renders without crashing", () => {
  render(<Virtualizer {...props} />);
  expect(screen.getByText("item 1")).toBeTruthy();
});
