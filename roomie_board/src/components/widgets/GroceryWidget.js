import "./GroceryWidget.css";
import ListWidget from "./ListWidget";
import GroceryItem from "./GroceryItem";
import axios from "axios";
import AddGroceryForm from "./AddGroceryForm";
import { useContext } from "react";
import UserContext from "../../context/UserContext";


export default function GroceryWidget(props) {

  const { groceries, setGroceries, users} = props;
  const { currentUser } = useContext(UserContext);
  function getPriorityValue(item) {
    if (!item.priority) return 3;  

    if (item.priority === "High") return 1;
    else if (item.priority === "Medium") return 2;
    else return 3; 
  }
  const visibleGroceries = groceries.filter((g) => g.active !== false).slice().sort((a, b) => {
      // incomplete first
      if (a.bought !== b.bought) return a.bought ? 1 : -1;
      if (!a.bought && !b.bought) {
        //show incomplete items by priority value
        const pa = getPriorityValue(a)
        const pb = getPriorityValue(b);
        if (pa !== pb) return pa - pb;
          return a.createdAt - b.createdAt;
      }
      if (a.bought && b.bought) {
        return b.boughtAt - a.boughtAt;
      }
      if (a.bought && b.bought) return b.boughtAt - a.boughtAt;
      return 0;
    });

  function handleAddGrocery(formData) {
    const newItem = {
      title: formData.title,
      priority: formData.priority,
      note: formData.note,
      bought: false,
      price: null,
      boughtById: null,
      creatorId: currentUser.id,
      active: true,
      createdAt: Date.now(), 
      boughtAt: null
    };
    axios.post("http://localhost:3001/groceries", newItem).then((res) => setGroceries([...groceries, res.data]));
  }
  function handleUpdate(id, fields) {
    const existing = groceries.find((g) => g.id === id);
    if (!existing) return; 
    const updated = { ...existing, ...fields };
    if (fields.bought === true && !existing.boughtById) {
      updated.boughtById = currentUser.id;
    }
    if (fields.bought === true && !existing.boughtAt) {
      updated.boughtAt = Date.now();
    }
    if (fields.bought === false) {
      updated.boughtById = null;
      updated.boughtAt = null;
    }
    axios
      .patch(`http://localhost:3001/groceries/${id}`, updated)
      .then((res) => {
        setGroceries(groceries.map((g) => (g.id === id ? res.data : g)));
      });
  }
  function handleDelete(item) {
    if (item.bought) {
      const updated = { ...item, active: false };
      axios
        .patch(`http://localhost:3001/groceries/${item.id}`, updated)
        .then((res) => {
          setGroceries(
            groceries.map((g) => (g.id === item.id ? res.data : g))
          );
        });
    } else {
      axios
        .delete(`http://localhost:3001/groceries/${item.id}`)
        .then(() =>
          setGroceries(groceries.filter((g) => g.id !== item.id))
        );
    }
  }
  function findUser(id) {
    return users.find((u) => u.id === id) || null;
  }
  return (
    <ListWidget
      title="Groceries"
      headers={["Status", "Title", "Priority", "Note", "Price", "Buyer"]}
      items={visibleGroceries}
      AddForm={AddGroceryForm}
      onAddItem={handleAddGrocery}
      renderItem={(item) => (
        <GroceryItem
          item={item}
          creator={findUser(item.creatorId)}
          buyer={findUser(item.boughtById)}
          onUpdate={(fields) => handleUpdate(item.id, fields)}
          onDelete={() => handleDelete(item)}
        />
      )}
    />
  );
}
