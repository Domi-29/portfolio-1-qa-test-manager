import { useState } from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import TestCaseCard from "../components/TestCaseCard";
import AddTestCase from "./AddTestCase";

export default function Home() {
  const { testCases } = useTestCaseContext();
  const [editingTestCase, setEditingTestCase] = useState(null);
  const [search, setSearch] = useState("");

  const filteredCases = testCases.filter((tc) =>
    tc.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={containerStyle}>
      <h2>Home</h2>

      <input
        type="text"
        placeholder="Search test cases..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
      />

      {filteredCases.length === 0 && <p>No test cases found.</p>}

      {filteredCases.map((tc) => (
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

const searchStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};
