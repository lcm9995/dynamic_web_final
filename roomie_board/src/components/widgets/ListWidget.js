import "./ListWidget.css";
import Widget from "./Widget";
import { useState } from "react";

export default function ListWidget(props) {
  const {
    title,
    items,
    renderItem,
    onAddItem,
    AddForm,
    headers,   
    previewCount = 5,
  } = props;
  //const previewItems = items.slice(0, previewCount);

  //state for adding new item 
  const [isAdding, setIsAdding] = useState(false);
  function handleSubmit(formData) {
    onAddItem(formData);
    setIsAdding(false);
  }
  function handleCancel() {
    setIsAdding(false);
  }
  return (
      <Widget title={title} action={{label: `+ Add ${title.slice(0, -1) || "Item"}`,onClick: () => setIsAdding(!isAdding) }}>
      <div className="lists-widget">
        {isAdding && AddForm && (
          <div className="lists-add-form-container">
            <AddForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        )}

        <div className="list-header-row">
          {headers.map((h, idx) => (
            <div key={idx} className="list-header-col">{h}</div>
          ))}
          <div className="list-header-col action-col"></div>
        </div>
        <div className="lists-widget-items">
          {items.length === 0 ? (
            <p className="empty-message">No items yet.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="lists-widget-item">
                {renderItem(item)}
              </div>
            ))
          )}
        </div>

      </div>
    </Widget>
  );
}
