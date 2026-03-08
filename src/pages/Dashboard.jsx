import { useState } from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import TestCaseCard from "../components/TestCaseCard.jsx";
import AddTestCase from "./AddTestCase";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const { testCases } = useTestCaseContext();
  const [editingTestCase, setEditingTestCase] = useState(null);

  const passed = testCases.filter((tc) => tc.status === "passed").length;
  const failed = testCases.filter((tc) => tc.status === "failed").length;
  const blocked = testCases.filter((tc) => tc.status === "blocked").length;

  const total = testCases.length;

  const chartData = [
    { name: "Passed", value: passed },
    { name: "Failed", value: failed },
    { name: "Blocked", value: blocked },
  ];

  const COLORS = ["#4CAF50", "#F44336", "#FF9800"];

  return (
    <div style={containerStyle}>
      <h2>Dashboard</h2>

      {testCases.length === 0 && (
        <div style={emptyStateStyle}>
          <p>No test cases yet. Add your first test case!</p>
        </div>
      )}

      {testCases.length > 0 && (
        <>
          {/* Stats cards */}
          <div style={statsGrid}>
            <div style={{ ...statCard, borderLeft: "6px solid #6366f1" }}>
              <p>Total</p>
              <h3>{total}</h3>
            </div>

            <div style={{ ...statCard, borderLeft: "6px solid #4CAF50" }}>
              <p>Passed</p>
              <h3>{passed}</h3>
            </div>

            <div style={{ ...statCard, borderLeft: "6px solid #F44336" }}>
              <p>Failed</p>
              <h3>{failed}</h3>
            </div>

            <div style={{ ...statCard, borderLeft: "6px solid #FF9800" }}>
              <p>Blocked</p>
              <h3>{blocked}</h3>
            </div>
          </div>

          {/* Chart */}
          <div style={chartWrapper}>
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </>
      )}

      {/* Test case list */}
      <div style={testCaseListContainer}>
        {testCases.map((tc) => (
          <TestCaseCard
            key={tc.id}
            testCase={tc}
            onEdit={setEditingTestCase}
            showDelete
          />
        ))}
      </div>

      {/* Edit form */}
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
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "16px",
  marginTop: "20px",
  marginBottom: "30px",
};

const statCard = {
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  textAlign: "center",
};

const chartWrapper = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "30px",
};

const testCaseListContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const editWrapperStyle = {
  marginTop: "30px",
  padding: "25px",
  borderRadius: "16px",
  backgroundColor: "#f9fafb",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const emptyStateStyle = {
  padding: "40px",
  textAlign: "center",
  color: "#555",
  fontStyle: "italic",
  fontSize: "16px",
  backgroundColor: "#f9fafb",
  borderRadius: "16px",
  marginTop: "20px",
};
