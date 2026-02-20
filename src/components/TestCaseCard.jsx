function TestCaseCard({ testCase, onUpdateStatus, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Passed":
        return "green";
      case "Failed":
        return "red";
      case "Blocked":
        return "orange";
      default:
        return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      default:
        return "green";
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <h3>{testCase.title}</h3>

      <p>
        <span
          style={{
            color: "white",
            backgroundColor: getPriorityColor(testCase.priority),
            padding: "3px 8px",
            borderRadius: "5px",
            marginRight: "8px",
          }}
        >
          {testCase.priority}
        </span>

        <span
          style={{
            color: "white",
            backgroundColor: getStatusColor(testCase.status),
            padding: "3px 8px",
            borderRadius: "5px",
          }}
        >
          {testCase.status}
        </span>
      </p>

      <div style={{ marginTop: "10px" }}>
        <label>Status: </label>
        <select
          value={testCase.status}
          onChange={(e) => onUpdateStatus(testCase.id, e.target.value)}
        >
          <option value="Not Run">Not Run</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      <button
        onClick={() => {
          const confirmed = window.confirm(
            "Are you sure you want to delete this test case?",
          );

          if (confirmed) {
            onDelete(testCase.id);
          }
        }}
        style={{
          marginTop: "10px",
          backgroundColor: "black",
          color: "white",
          padding: "5px 10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>

      <small>Created: {testCase.createdAt}</small>
    </div>
  );
}

export default TestCaseCard;
