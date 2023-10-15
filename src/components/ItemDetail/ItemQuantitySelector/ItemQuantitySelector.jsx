import "./ItemQuantitySelector.css";

function ItemQuantitySelector({ count, setCount }) {
  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubstract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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

export default ItemQuantitySelector;
