import { useDispatch, useSelector } from "redux-like-react";
import { useState } from "react";

const Todo = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [newItem, setNewItem] = useState("");
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
            newItem.length > 0 && dispatch({ type: "ADD_ITEM", item: newItem });
            setNewItem("");
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
