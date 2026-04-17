/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { Button } from "@/components/ui/Button";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-ocean");

    rerender(<Button variant="gold">Gold</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-gold");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-ocean");
  });

  it("renders with different sizes", () => {
    // The Button component uses dynamic padding via inline styles
    // but still applies height classes from size definitions
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-sm");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-lg");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading state", () => {
    render(<Button isLoading>Loading</Button>);
    // When loading, button should be disabled
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  it("renders with left and right icons", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        With Icons
      </Button>
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("renders full width when fullWidth prop is true", () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("has proper accessibility attributes", () => {
    render(<Button aria-label="Custom label">Accessible</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Custom label");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref Test</Button>);
    expect(ref).toHaveBeenCalled();
  });
});
