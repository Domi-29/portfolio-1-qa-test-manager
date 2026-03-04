import { useState } from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import TestCaseCard from "../components/TestCaseCard";
import AddTestCase from "./AddTestCase";

export default function Dashboard() {
  const { testCases } = useTestCaseContext();
  const [editingTestCase, setEditingTestCase] = useState(null);

  return (
    <div style={containerStyle}>
      <h2>Dashboard</h2>

      {testCases.length === 0 && <p>No test cases yet.</p>}

      {testCases.map((tc) => (
        <TestCaseCard
          key={tc.id}
          testCase={tc}
          onEdit={setEditingTestCase}
          showDelete
        />
      ))}

      {editingTestCase && (
        <div style={editWrapperStyle}>
          <AddTestCase
            existingTestCase={editingTestCase}
            onFinish={() => setEditingTestCase(null)}
          />
        </div>
      )}
    </div>
  );
}

// 🎨 Styles
const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
};

const editWrapperStyle = {
  marginTop: "30px",
  padding: "20px",
  borderRadius: "16px",
  backgroundColor: "#f9fafb",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};
