import "./GroceryItem.css";
import {useState} from "react";
export default function GroceryItem(props) {
  const { item, creator, buyer, onUpdate, onDelete} = props;
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [priceInput, setPriceInput] = useState("")

  function handleCheckbox(e) {
    const checked = e.target.checked;

    if (checked && !item.bought && item.price == null) {
      setShowPriceForm(true);
    } else {
      onUpdate({ bought: checked });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const n = parseFloat(priceInput);
    if (isNaN(n) || n < 0) return;
    onUpdate({ bought: true, price: n });
    setShowPriceForm(false);
    setPriceInput("");
  }

  function handleCancel() {
    setShowPriceForm(false);
    setPriceInput("");
    if (!item.bought) {
      onUpdate({ bought: false });
    }
  }
  return (
   <div className="grocery-row">

      <div className="col status-col">
        <input
          type="checkbox"
          checked={item.bought}
          onChange={handleCheckbox}
          style={buyer?.color ? { accentColor: buyer.color } : null}
        />
      </div>

      <div className="col title-col">{item.title}</div>
      <div className="col priority-col">{item.priority}</div>
      <div className="col note-col">{item.note || ""}</div>

      <div className="col price-col">
        {item.bought && item.price != null ? `$${item.price.toFixed(2)}` : ""}
      </div>

      <div className="col buyer-col"> {buyer ? buyer.name : ""}</div>

      <div className="col delete-col">
        <button className="delete-btn" onClick={onDelete}>✕</button>
      </div>

      {showPriceForm && (
        <form className="price-form" onSubmit={handleSubmit}>
          <label>
            Price: $
            <input
              type="number"
              step="0.01"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
