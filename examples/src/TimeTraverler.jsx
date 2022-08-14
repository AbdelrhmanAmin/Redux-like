import { useSelector } from "redux-like-react";

const TimeTraveler = () => {
  // const history = useSelector((state) => state.history);
  return (
    <div>
      <strong style={{ fontSize: "36px" }}>Time Traveler</strong>
      <ul>
        {/* {Object.entries(history).map(([time, entry], i) => (
          <li key={i}>
            {time}-{entry.action}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default TimeTraveler;
