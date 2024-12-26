import { VirtualizerProps } from "../types/types";

export const props: VirtualizerProps = {
  data: [{ id: "1", item: <p>item 1</p> }],
  onTopReached: () => {
    console.log("top");
  },
  onEndReached: () => {
    console.log("end");
  },
};
