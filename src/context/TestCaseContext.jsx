import { createContext, useContext, useState, useEffect } from "react";

const TestCaseContext = createContext();

export function TestCaseProvider({ children }) {
  const [testCases, setTestCases] = useState(() => {
    const saved = localStorage.getItem("testCases");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("testCases", JSON.stringify(testCases));
  }, [testCases]);

  const addTestCase = (newTestCase) => {
    setTestCases((prev) => [...prev, newTestCase]);
  };

  const updateStatus = (id, newStatus) => {
    setTestCases((prev) =>
      prev.map((tc) => (tc.id === id ? { ...tc, status: newStatus } : tc)),
    );
  };

  const deleteTestCase = (id) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  return (
    <TestCaseContext.Provider
      value={{
        testCases,
        addTestCase,
        updateStatus,
        deleteTestCase,
      }}
    >
      {children}
    </TestCaseContext.Provider>
  );
}

export function useTestCases() {
  return useContext(TestCaseContext);
}
