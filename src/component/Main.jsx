import { useEffect, useState } from "react";
import Header from "./Header";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheckCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const [localData, setLocalData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const data = localStorage.getItem("todoData");
    if (data) {
      try {
        let parsedData = JSON.parse(data);
        if (!Array.isArray(parsedData)) {
          parsedData = [parsedData];
        }
        setLocalData(parsedData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setLocalData([]);
      }
    }
  }, []);

  // Function to handle delete by index
  const handleDelete = (index) => {
    const updatedData = localData.filter((_, i) => i !== index);
    setLocalData(updatedData);
    localStorage.setItem("todoData", JSON.stringify(updatedData));
  };

  const handleEdit = (index) => {
    const itemToEdit = localData[index];
    setEditingIndex(index);
    setEditForm({
      title: itemToEdit.title,
      description: itemToEdit.description,
    });
  };

  const saveEdit = () => {
    const updatedData = localData.map((item, index) =>
      index === editingIndex ? { ...item, ...editForm } : item
    );
    setLocalData(updatedData);
    localStorage.setItem("todoData", JSON.stringify(updatedData));
    setEditingIndex(null);
    setEditForm({ title: "", description: "" });
  };

  const handleComplete = (index) => {
    const updatedData = localData.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setLocalData(updatedData);
    localStorage.setItem("todoData", JSON.stringify(updatedData));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Function to filter todo items based on the selected filter
  const getFilteredTodos = () => {
    if (filter === "completed") {
      return localData.filter((item) => item.completed);
    } else if (filter === "pending") {
      return localData.filter((item) => !item.completed);
    } else {
      return localData;
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 flex space-x-4">
        <div className="w-3/5">
          <h2 className="text-xl font-bold mb-4">Saved To-Do Items</h2>

           {/* Filter Dropdown */}
          <div className="mb-4">
            <label htmlFor="filter" className="block text-gray-700 font-bold">
              Filter Todos:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="all">Show All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {getFilteredTodos().length > 0 ? (
            <ul className="space-y-4">
              {getFilteredTodos().map((val, index) => (
                <li
                  key={index}
                  className={`bg-white p-4 shadow-md rounded-md flex justify-between items-center ${
                    val.completed ? "line-through bg-gray-200" : ""
                  }`}
                >
                  {editingIndex === index ? (
                    <div>
                      <input
                        type="text"
                        className="border p-2 w-full"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                      />
                      <textarea
                        className="border p-2 w-full mt-2"
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <button
                          className="text-lg"
                          onClick={() => handleComplete(index)}
                        >
                          <FontAwesomeIcon
                            icon={val.completed ? faCheckCircle : faCircle}
                            className={`text-${
                              val.completed ? "green" : "yellow"
                            }-500`}
                          />
                        </button>
                        <div className="ml-2">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {val.title}
                          </h3>
                          <p className="text-gray-600">{val.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          className="text-blue-500"
                          onClick={() => handleEdit(index)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No to-do items found.</p>
          )}
        </div>
        <div className="w-2/5">
          <Form />
        </div>
      </div>
    </>
  );
};

export default Main;
