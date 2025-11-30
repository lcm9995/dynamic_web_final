import "./GroceryWidget.css";
import ListWidget from "./ListWidget";
import GroceryItem from "./GroceryItem";
import axios from "axios";
import AddGroceryForm from "./AddGroceryForm"

export default function GroceryWidget(props) {
  const { groceries, setGroceries, currentUser } = props;

  function handleAddGrocery(formData) {
    const newItem = {
      title: formData.title,
      priority: formData.priority,
      note: formData.note,
      bought: false,
      price: null,
      boughtById: null
    };

    axios
      .post("http://localhost:3001/groceries", newItem)
      .then((res) => {
        setGroceries([...groceries, res.data]);
      });
  }

  function handleToggleBought(id, checked) {
    const existing = groceries.find((g) => g.id === id);
    if (!existing) return;

    const updated = {
      ...existing,
      bought: checked,
      boughtById: checked
        ? currentUser
          ? currentUser.id
          : null
        : null
    };

    axios
      .patch(`http://localhost:3001/groceries/${id}`, updated)
      .then((res) => {
        setGroceries(groceries.map((g) => (g.id === id ? res.data : g)));
      });
  }

  return (
     <ListWidget
      title="Groceries"
      items={groceries}
      AddForm={AddGroceryForm}
      onAddItem={handleAddGrocery}
      renderItem={(item) => (
        <GroceryItem
          item={item}
          onToggleBought={(checked) => handleToggleBought(item.id, checked)}
        />
      )}
    />
  );
}
