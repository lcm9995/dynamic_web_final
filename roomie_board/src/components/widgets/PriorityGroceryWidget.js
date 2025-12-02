import Widget from "./Widget";
import "./PriorityGroceryWidget.css";
export default function UrgentGroceriesWidget({ groceries, users }) {
  const urgent = groceries
    .filter((g) => g.active !== false)
    .filter((g) =>
      g.priority
        ? g.priority.toLowerCase() === "high" ||
          g.priority.toLowerCase() === "urgent"
        : false
    )
    .slice(0, 5);

  function findUser(id) {
    return users.find((u) => u.id === id) || null;
  }
  return (
    <Widget title="Urgent Groceries" className="pg-widget">
      {urgent.length === 0 ? (
        <p className="ug-empty">No urgent items.</p>
      ) : (
        <ul className="ug-list">
          {urgent.map((item) => {
            const buyer = findUser(item.boughtById);
            return (
              <li key={item.id} className="ug-item">
                <div className="ug-main-row">
                  <span className="ug-title">{item.title}</span>
                  <span className="ug-chip">{item.priority}</span>
                </div>
                <div className="ug-meta-row">
                  {item.note && <span className="ug-note">{item.note}</span>}
                  {buyer && (
                    <span className="ug-buyer">
                      Bought by {buyer.name}
                      {item.price != null
                        ? ` • $${item.price.toFixed(2)}`
                        : ""}
                    </span>
                  )}
                  {!buyer && item.price != null && (
                    <span className="ug-buyer">
                      Last price: ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Widget>
  );
}
