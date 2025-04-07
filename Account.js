import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./Account.css";

export default function Account() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  // State to store additional rows
  const [additionalRows, setAdditionalRows] = useState([]);

  // State for new row input
  const [newRow, setNewRow] = useState({
    fullName: "",
    balance: "",
    mobile: "",
  });

  const handleAddRow = () => {
    // Check if all fields are filled
    if (!newRow.fullName || !newRow.balance || !newRow.mobile) {
      alert("Please fill in all fields before adding a new row.");
      return;
    }

    // Check if the name already exists in the table
    const isNameExists =
      newRow.fullName === data.account.fullName ||
      additionalRows.some((row) => row.fullName === newRow.fullName);

    if (isNameExists) {
      alert("Name already exists. Please enter a different name.");
      return;
    }

    // Add the new row to the additionalRows state
    setAdditionalRows([...additionalRows, newRow]);

    // Clear the input fields
    setNewRow({ fullName: "", balance: "", mobile: "" });
  };

  return (
    <div className="account-container">
      <h2 className="account-heading">Account Details</h2>
      <table className="account-table">
        <thead>
          <tr>
            <th>Balance</th>
            <th>Full Name</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the main account details */}
          <tr>
            <td>${data.account.balance}</td>
            <td>{data.account.fullName}</td>
            <td>{data.account.mobile}</td>
          </tr>

          {/* Render additional rows */}
          {additionalRows.map((row, index) => (
            <tr key={index}>
              <td>${row.balance}</td>
              <td>{row.fullName}</td>
              <td>{row.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to Add New Row */}
      {/* <div className="add-row-form">
        <h3>Add New Account Details</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={newRow.fullName}
          onChange={(e) => setNewRow({ ...newRow, fullName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Balance"
          value={newRow.balance}
          onChange={(e) => setNewRow({ ...newRow, balance: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={newRow.mobile}
          onChange={(e) => setNewRow({ ...newRow, mobile: e.target.value })}
        />
        <button onClick={handleAddRow}>Add Row</button>
      </div> */}

      {/* Transaction Details */}
      <h2 className="account-heading">Transaction Details</h2>
      <table className="account-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.transcation.map((tr) => (
            <tr key={tr.id}>
              <td>{tr.id}</td>
              <td>{tr.amount}</td>
              <td>{tr.type}</td>
              <td>{tr.date ? tr.date.toString() : "N/A"}</td>
            </tr>
          ))}
          {data.transcation.length === 0 && (
            <tr>
              <td colSpan="4" className="no-data">
                No transactions available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
