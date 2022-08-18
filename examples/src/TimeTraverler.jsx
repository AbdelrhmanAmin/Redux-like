import { useEffect } from "react";
import { useDispatch, useSelector } from "redux-like-react";

const TimeTraveler = () => {
  const history = useSelector((state) => state.past);
  const dispatch = useDispatch();
  useEffect(() => {
    // @Todo this is not working?
    console.log(history);
  }, [history]);
  return (
    <div>
      <strong style={{ fontSize: "36px" }}>Time Traveler</strong>
      <ul>
        {Object.entries(history).map(([time, entry], i) => (
          <li key={i}>
            <strong>
              {entry.action} - {time  }  
            </strong>
            <button onClick={() => dispatch({ type: "TRAVEL", timestamp: time })}>
              Visit
            </button>
            <button
              onClick={() =>
                dispatch({ type: "TRAVEL", timestamp: time, shouldRemove: true })
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeTraveler;
