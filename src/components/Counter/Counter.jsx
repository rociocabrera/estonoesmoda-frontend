import { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubstract = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div>
      <button className="counterStyle" onClick={handleSubstract}>
        -
      </button>
      <span className="countSpan">{count}</span>
      <button className="counterStyle" onClick={handleAdd}>
        +
      </button>
    </div>
  );
}

export default Counter;
