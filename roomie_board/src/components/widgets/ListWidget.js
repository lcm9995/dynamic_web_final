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
    previewCount = 5,
  } = props;

  const previewItems = items.slice(0, previewCount);
  const [isAdding, setIsAdding] = useState(false);

  function handleSubmit(formData) {
    onAddItem(formData);
    setIsAdding(false);
  }

  function handleCancel() {
    setIsAdding(false);
  }

  return (
    <Widget title={title}>
      <div className="lists-widget">

        <div className="lists-header-row">
          <button
            className="lists-add-btn"
            type="button"
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? "Close" : `+ Add ${title.slice(0, -1) || "Item"}`}
          </button>
        </div>

        {isAdding && AddForm && (
          <div className="lists-add-form-container">
            <AddForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        )}

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
