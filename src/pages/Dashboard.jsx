import { useTestCases } from "../context/TestCaseContext";

function Dashboard() {
  const { testCases } = useTestCases();

  const total = testCases.length;

  const passed = testCases.filter((tc) => tc.status === "Passed").length;
  const failed = testCases.filter((tc) => tc.status === "Failed").length;
  const blocked = testCases.filter((tc) => tc.status === "Blocked").length;
  const notRun = testCases.filter((tc) => tc.status === "Not Run").length;

  const successRate = total === 0 ? 0 : Math.round((passed / total) * 100);

  const cardStyle = {
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>Total</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{total}</p>
        </div>

        <div style={{ ...cardStyle, backgroundColor: "#d4edda" }}>
          <h3>Passed</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{passed}</p>
        </div>

        <div style={{ ...cardStyle, backgroundColor: "#f8d7da" }}>
          <h3>Failed</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{failed}</p>
        </div>

        <div style={{ ...cardStyle, backgroundColor: "#fff3cd" }}>
          <h3>Blocked</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{blocked}</p>
        </div>
      </div>

      <div>
        <h3>Success Rate: {successRate}%</h3>

        <div
          style={{
            height: "20px",
            width: "100%",
            backgroundColor: "#eee",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${successRate}%`,
              backgroundColor:
                successRate > 70
                  ? "green"
                  : successRate > 40
                    ? "orange"
                    : "red",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
