import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import TestCaseForm from "./components/TestCaseForm";
import { useState } from "react";

// Pomocná funkcia pre jednoduchý wrapper s providerom/stavom
function renderWithForm() {
  const Wrapper = () => {
    const [testCases, setTestCases] = useState([]);
    const addTestCase = (tc) => setTestCases([...testCases, tc]);
    return (
      <>
        <TestCaseForm onAdd={addTestCase} />
        <div data-testid="test-case-list">
          {testCases.map((tc) => (
            <div key={tc.id}>{tc.title}</div>
          ))}
        </div>
      </>
    );
  };
  render(<Wrapper />);
  return screen;
}

describe("QA Test Case Manager basic tests", () => {
  test("renders Add Test Case button", () => {
    renderWithForm();
    const addButton = screen.getByRole("button", { name: /Add Test Case/i });
    expect(addButton).toBeInTheDocument();
  });

  test("can add a new test case", () => {
    renderWithForm();
    const titleInput = screen.getByLabelText(/Title:/i);
    const addButton = screen.getByRole("button", { name: /Add Test Case/i });

    fireEvent.change(titleInput, { target: { value: "Test Case 1" } });
    fireEvent.click(addButton);

    // overíme, že input sa vyprázdnil
    expect(titleInput.value).toBe("");
  });

  test("displays added test case on Home", () => {
    renderWithForm();
    const titleInput = screen.getByLabelText(/Title:/i);
    const addButton = screen.getByRole("button", { name: /Add Test Case/i });

    fireEvent.change(titleInput, { target: { value: "Test Display" } });
    fireEvent.click(addButton);

    const list = screen.getByTestId("test-case-list");
    expect(list).toHaveTextContent("Test Display");
  });
});
