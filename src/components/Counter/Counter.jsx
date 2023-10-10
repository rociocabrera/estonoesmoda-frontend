import { useEffect, useState } from "react";
import "./Counter.css";

function Counter({ onSetCount }) {
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubstract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    onSetCount(count);
  }, [count, onSetCount]);

  return (
    <div className="counterBorder">
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
