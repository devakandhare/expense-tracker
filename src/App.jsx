import { useState } from "react";
import "./App.css";
import { Expenses } from "./Expenses";

const categories = [
  { value: "", label: "Select Category" },
  { value: "Grocery", label: "Grocery" },
  { value: "Clothing", label: "Clothing" },
  { value: "Hotelling", label: "Hotelling" },
  { value: "Other", label: "Other" },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [expenses, setExpsenses] = useState([]);

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeAmount = (event) => {
    const numberRegex = /^\d+$/;
    if (numberRegex.test(event.target.value)) {
      setAmount(event.target.value);
    }
  };

  const resetExpenseForm = () => {
    setSelectedCategory("");
    setAmount("");
    setDescription("");
  };

  const addExpense = (event) => {
    event.preventDefault();

    if (!selectedCategory || !amount || !description) {
      setError(true);
      return;
    }
    const theExpense = {
      id: new Date().getTime(),
      category: selectedCategory,
      amount,
      description,
    };
    setExpsenses((prevExpenses) => [...prevExpenses, theExpense]);
    resetExpenseForm();
  };

  const deleteExpense = (id) => {
    setExpsenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };
  return (
    <>
      <div className="container">
        <h2>Expense Tracker</h2>
        <form onSubmit={addExpense}>
          <select
            className="category-select"
            value={selectedCategory}
            onChange={handleChangeCategory}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <input
            className="input-description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleChangeDescription}
          />
          <input
            className="input-amount"
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={handleChangeAmount}
          />
          <button className="btn" type="submit">
            Add Expense
          </button>
        </form>
        {error && <div className="error">Please enter all values</div>}
        <div className="expense-display-container">
          <Expenses expenses={expenses} handleDelete={deleteExpense} />
        </div>
      </div>
    </>
  );
}

export default App;
