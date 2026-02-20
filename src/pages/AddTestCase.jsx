import TestCaseForm from "../components/TestCaseForm";
import { useTestCases } from "../context/TestCaseContext";
import { useNavigate } from "react-router-dom";

function AddTestCase() {
  const { addTestCase } = useTestCases();
  const navigate = useNavigate();

  const handleAdd = (newTestCase) => {
    addTestCase(newTestCase);
    navigate("/");
  };

  return (
    <div>
      <h2>Add New Test Case</h2>
      <TestCaseForm onAdd={handleAdd} />
    </div>
  );
}

export default AddTestCase;
