/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import Login from "../pages/login";

describe("<Login />", () => {
  it("renders without errors", () => {
    render(<Login />);
    expect(screen.getByText(/Username/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
  });
});
