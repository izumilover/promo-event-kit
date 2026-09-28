/**
 * @file RichText.test.tsx
 * @description RichText 유닛 테스트 — 블록 타입별 렌더링, 빈 데이터 검증
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RichText } from "./RichText";

describe("RichText", () => {
  it("heading/paragraph/list를 각각 실제 시맨틱 엘리먼트로 렌더링한다", () => {
    render(
      <RichText
        blocks={[
          { type: "heading", text: "제목", level: 2 },
          { type: "paragraph", text: "본문 내용" },
          { type: "list", items: ["항목1", "항목2"] },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { level: 2, name: "제목" })).toBeInTheDocument();
    expect(screen.getByText("본문 내용")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("level이 없으면 h3로 렌더링한다(기본값)", () => {
    render(<RichText blocks={[{ type: "heading", text: "기본 제목" }]} />);
    expect(screen.getByRole("heading", { level: 3, name: "기본 제목" })).toBeInTheDocument();
  });

  it("blocks가 빈 배열이면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<RichText blocks={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
