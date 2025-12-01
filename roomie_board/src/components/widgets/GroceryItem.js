import "./GroceryItem.css";
import {useState} from "react";
export default function GroceryItem(props) {
  const { item, creator, buyer, onUpdate, onDelete} = props;
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [priceInput, setPriceInput] = useState("")
  const colorUser = buyer ? buyer.color : null;
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
   <div className={`grocery-item ${item.bought ? "grocery-bought" : ""}`}>
      <div className="grocery-main-row">
        <label className="grocery-checkbox-row">
          <input
            type="checkbox"
            checked={item.bought}
            onChange={handleCheckbox}
            style={buyer?.color ? { accentColor: buyer.color } : null}
          />
          <span>{item.title}</span>
        </label>

        <span className={`priority-chip ${item.priority.toLowerCase()}`}>
          {item.priority}
        </span>

        <button className="grocery-delete-btn" onClick={onDelete}>
          ✕
        </button>
      </div>

      <div className="grocery-meta">
        {creator && <span>Added by {creator.name}</span>}
        {buyer && <span>Bought by {buyer.name}</span>}
        {item.note && <span>{item.note}</span>}
        {item.bought && item.price != null && (
          <span>${item.price.toFixed(2)}</span>
        )}
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
