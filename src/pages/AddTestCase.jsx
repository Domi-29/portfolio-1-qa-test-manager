import { useState } from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import { TEST_CASE_STATUS } from "../constants/status";

export default function AddTestCase({ existingTestCase, onFinish }) {
  const { addTestCase, updateTestCase } = useTestCaseContext();
  const [title, setTitle] = useState(existingTestCase?.title || "");
  const [status, setStatus] = useState(
    existingTestCase?.status || TEST_CASE_STATUS.BLOCKED,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    if (existingTestCase) {
      updateTestCase({ ...existingTestCase, title, status });
    } else {
      addTestCase({ title, status });
    }

    setTitle("");
    setStatus(TEST_CASE_STATUS.BLOCKED);
    onFinish?.();
  };

  return (
    <div style={formWrapperStyle}>
      <h2>{existingTestCase ? "Edit Test Case" : "Add Test Case"}</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {Object.values(TEST_CASE_STATUS).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit">{existingTestCase ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

// 🎨 Styles
const formWrapperStyle = {
  marginBottom: "20px",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: "#f5f5f5",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
