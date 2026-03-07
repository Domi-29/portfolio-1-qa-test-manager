import { useState } from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import TestCaseCard from "../components/TestCaseCard";
import AddTestCase from "./AddTestCase";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const { testCases } = useTestCaseContext();
  const [editingTestCase, setEditingTestCase] = useState(null);

  // Spočítame statusy pre graf
  const passed = testCases.filter((tc) => tc.status === "passed").length;
  const failed = testCases.filter((tc) => tc.status === "failed").length;
  const blocked = testCases.filter((tc) => tc.status === "blocked").length;

  const chartData = [
    { name: "Passed", value: passed },
    { name: "Failed", value: failed },
    { name: "Blocked", value: blocked },
  ];

  const COLORS = ["#4CAF50", "#F44336", "#FF9800"];

  return (
    <div style={containerStyle}>
      <h2>Dashboard</h2>

      {testCases.length === 0 && <p>No test cases yet.</p>}

      {/* Flex container pre stats + graf */}
      {testCases.length > 0 && (
        <div style={statsChartContainer}>
          <div style={statsStyle}>
            <p>Passed: {passed}</p>
            <p>Failed: {failed}</p>
            <p>Blocked: {blocked}</p>
          </div>

          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
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
      )}

      {/* Test Case list */}
      {testCases.map((tc) => (
        <TestCaseCard
          key={tc.id}
          testCase={tc}
          onEdit={setEditingTestCase}
          showDelete
        />
      ))}

      {/* Edit wrapper */}
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
  maxWidth: "700px",
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

// flex container pre stats + graf
const statsChartContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  padding: "20px",
  borderRadius: "16px",
  backgroundColor: "#f0f4f8",
};

// stats box
const statsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  fontWeight: "bold",
  fontSize: "16px",
};
