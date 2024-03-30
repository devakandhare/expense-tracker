import PropTypes from "prop-types";
import "./Expenses.css";

export const ExpensesByCategory = ({ expenses }) => {
  const expensesByCategory = expenses.reduce(
    (arrayByCategory = [], currentItem) => {
      if (
        arrayByCategory.filter(
          (theCt) => theCt.category === currentItem.category
        ).length > 0
      ) {
        return arrayByCategory.map((theCt) =>
          theCt.category === currentItem.category
            ? {
                id: theCt.id,
                category: theCt.category,
                amount: +theCt.amount + +currentItem.amount,
              }
            : { id: theCt.id, category: theCt.category, amount: theCt.amount }
        );
      } else {
        arrayByCategory.push({
          id: currentItem.id,
          category: currentItem.category,
          amount: currentItem.amount,
        });
        return arrayByCategory;
      }
    },
    []
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Total Amount Spent</th>
        </tr>
      </thead>
      <tbody>
        {expensesByCategory.length === 0 && (
          <tr>
            <td colSpan={4}>No Data Found</td>
          </tr>
        )}
        {expensesByCategory.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.category}</td>
            <td>{expense.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ExpensesByCategory.propTypes = {
  expenses: PropTypes.array,
};
