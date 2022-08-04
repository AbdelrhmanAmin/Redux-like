import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "./hooks";

const Todo = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  const [newItem, setNewItem] = useState("");
  useEffect(() => {
    console.log("Todo: I got called");
  });
  return (
    <div>
      <strong style={{ fontSize: "36px" }}>Todo</strong>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          style={{
            height: "30px",
            width: "200px",
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: "ADD_ITEM", item: "===" });
            setNewItem("");
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {/* {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default Todo;
