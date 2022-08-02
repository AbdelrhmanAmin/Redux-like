import { useDispatch, useSelector } from "./hooks";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <strong style={{ fontSize: "36px", marginBottom: "30px" }}>
        Count: {count}
      </strong>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button onClick={() => dispatch({ type: "INCREMENT", amount: 1 })}>
          Increment
        </button>
        <button
          onClick={() =>
            count > 0 && dispatch({ type: "DECREMENT", amount: 1 })
          }
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
