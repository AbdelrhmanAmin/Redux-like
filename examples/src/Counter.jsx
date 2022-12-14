import { connect } from "redux-like-react";

const Counter = ({ onIncrement, onDecrement, count }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        marginRight: "40px",
        paddingRight: "40px",
        borderRight: "1px solid #ccc",
        height: "100vh",
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
        }}
      >
        <button
          style={{
            marginRight: "10px",
          }}
          onClick={() => onIncrement()}
        >
          Increment
        </button>
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
