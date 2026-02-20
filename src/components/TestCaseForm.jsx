import { useState } from "react";
function TestCaseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    const newTestCase = {
      id: Date.now(),
      title,
      priority,
      status: "Not Run",
      createdAt: new Date().toLocaleDateString(),
    };
    onAdd(newTestCase);
    setTitle("");
    setPriority("Low");
  };
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <div>
        {" "}
        <label>Title:</label> <br />{" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <label>Priority:</label> <br />{" "}
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {" "}
          <option value="Low">Low</option>{" "}
          <option value="Medium">Medium</option>{" "}
          <option value="High">High</option>{" "}
        </select>{" "}
      </div>{" "}
      <button type="submit">Add Test Case</button>{" "}
    </form>
  );
}
export default TestCaseForm;
