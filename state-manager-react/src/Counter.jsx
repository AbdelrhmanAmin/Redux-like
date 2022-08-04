import connect from "./components/connect";

const Counter = ({ onIncrement, onDecrement, count }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
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
        <button onClick={() => onIncrement()}>Increment</button>
        <button onClick={() => count > 0 && onDecrement()}>Decrement</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => dispatch({ type: "INCREMENT", amount: 1 }),
  onDecrement: () => dispatch({ type: "DECREMENT", amount: 1 }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
