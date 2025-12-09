import Widget from "./Widget";
import "./PriorityGroceryWidget.css";
export default function UrgentGroceriesWidget({ groceries, users }) {
   const visible = groceries.filter(g => g.active !== false && g.bought === false).sort((a, b) => {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    });

  function findUser(id) {
    return users.find((u) => u.id === id) || null;
  }
  return (
    <Widget title="Grocery list" className="pg-widget">
      {visible.length === 0 ? (
        <p className="ug-empty">No items.</p>
      ) : (
        <ul className="ug-list">
          {visible.map((item) => {
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
