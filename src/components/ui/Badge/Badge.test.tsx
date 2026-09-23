/**
 * @file Badge.test.tsx
 * @description Badge 컴포넌트 유닛 테스트
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("children 텍스트를 렌더링한다", () => {
    render(<Badge variant="danger">마감임박</Badge>);
    expect(screen.getByText("마감임박")).toBeInTheDocument();
  });
});
