import "./GroceryItem.css";

export default function GroceryItem(props) {
  const { item, onToggleBought } = props;

  return (
    <div className={`grocery-item ${item.bought ? "grocery-bought" : ""}`}>
      <div className="grocery-main">
        <label className="grocery-checkbox-row">
          <input
            type="checkbox"
            checked={item.bought}
            onChange={(e) => onToggleBought(e.target.checked)}
          />
          <span className="grocery-title">{item.title}</span>
        </label>

        <span className={`grocery-priority priority-${item.priority.toLowerCase()}`}>
          {item.priority}
        </span>
      </div>

      {item.note && (
        <div className="grocery-note">
          {item.note}
        </div>
      )}

      {item.bought && item.price != null && (
        <div className="grocery-price-row">
          Paid: ${item.price.toFixed(2)}
        </div>
      )}
    </div>
  );
}
