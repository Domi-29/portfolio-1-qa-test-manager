import { useState } from "react";
import TestCaseCard from "../components/TestCaseCard";
import { useTestCases } from "../context/TestCaseContext";

function Home() {
  const { testCases, updateStatus, deleteTestCase } = useTestCases();

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTestCases = testCases.filter((tc) => {
    const statusMatch = statusFilter === "All" || tc.status === statusFilter;

    const priorityMatch =
      priorityFilter === "All" || tc.priority === priorityFilter;

    const searchMatch = tc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return statusMatch && priorityMatch && searchMatch;
  });

  return (
    <div>
      <h2>All Test Cases</h2>

      {/* SEARCH */}
      <div style={{ marginBottom: "20px" }}>
        <label>Search: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
        />
      </div>

      {/* FILTERS */}
      <div style={{ marginBottom: "20px" }}>
        <label>Status: </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Not Run">Not Run</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
          <option value="Blocked">Blocked</option>
        </select>

        <label style={{ marginLeft: "20px" }}>Priority: </label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {filteredTestCases.length === 0 ? (
        <p>No matching test cases.</p>
      ) : (
        filteredTestCases.map((tc) => (
          <TestCaseCard
            key={tc.id}
            testCase={tc}
            onUpdateStatus={updateStatus}
            onDelete={deleteTestCase}
          />
        ))
      )}
    </div>
  );
}

export default Home;
