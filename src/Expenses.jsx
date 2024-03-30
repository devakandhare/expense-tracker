import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import "./Expenses.css";

export const Expenses = ({ expenses, handleDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.length === 0 && (
          <tr>
            <td colSpan={4}>No Data Found</td>
          </tr>
        )}
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.category}</td>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>
              <MdDelete
                className="delete-icon"
                onClick={() => handleDelete(expense.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Expenses.propTypes = {
  expenses: PropTypes.array,
  handleDelete: PropTypes.func,
};
