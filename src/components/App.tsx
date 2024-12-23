import { useState } from "react";
import { createPortal } from "react-dom";
import { constants } from "../utils/constants";
import { Spinner } from "./Spinner/Spinner";
import { Virtualizer } from "./Virtualizer";

/**
 * integration sample
 */

export const App = () => {
  const [data, setData] = useState(() =>
    constants.wholeData.slice(
      constants.initialStartIndex,
      constants.initialEndIndex
    )
  );
  const [isSpinnerShowing, setIsSpinnerShowing] = useState(false);

  const handleTopReached = () => {
    if (data[0].id !== constants.wholeData[0].id) {
      setTimeout(() => {
        setData((prev) => {
          const start = constants.wholeData.indexOf(prev[0]) - 5;
          const end = constants.wholeData.indexOf(prev[prev.length - 1]) - 4;

          return constants.wholeData.slice(start, end);
        });

        setIsSpinnerShowing(false);
      }, constants.spinnerTimer);
      setIsSpinnerShowing(true);
    }
  };

  const handleEndReached = () => {
    if (
      data[data.length - 1].id !==
      constants.wholeData[constants.wholeData.length - 1].id
    ) {
      setTimeout(() => {
        setData((prev) =>
          constants.wholeData.slice(
            constants.wholeData.indexOf(prev[0]) + 5,
            constants.wholeData.indexOf(prev[prev.length - 1]) + 6
          )
        );
        setIsSpinnerShowing(false);
      }, constants.spinnerTimer);
      setIsSpinnerShowing(true);
    }
  };

  return (
    <>
      <Virtualizer
        data={data}
        onTopReached={handleTopReached}
        onEndReached={handleEndReached}
        style={{
          height: 500,
          width: 800,
          overflowY: "scroll",
          border: "1px solid lime",
          textAlign: "center",
        }}
      />
      {createPortal(<Spinner open={isSpinnerShowing} />, document.body)}
    </>
  );
};
