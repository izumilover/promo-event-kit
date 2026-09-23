/**
 * @file Section.test.tsx
 * @description Section 컴포넌트 유닛 테스트 — 앵커 id 반영 검증
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Section } from "./Section";

describe("Section", () => {
  it("id를 section 엘리먼트에 그대로 반영한다(앵커 이동용)", () => {
    render(
      <Section id="coupon">
        <p>쿠폰 영역</p>
      </Section>,
    );
    expect(document.getElementById("coupon")).toBeInTheDocument();
    expect(screen.getByText("쿠폰 영역")).toBeInTheDocument();
  });
});
