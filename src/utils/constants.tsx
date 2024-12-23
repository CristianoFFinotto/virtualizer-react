export const constants = {
  timeShowModal: 2000,
  initialStartIndex: 10,
  initialEndIndex: 15,
  spinnerTimer: 5000, 
  wholeData: Array.from({ length: 20 }).map((_, key) => ({
    id: key.toString(),
    item: <div style={{ height: 100 }}>{key.toString()}</div>,
  })),
} as const;
