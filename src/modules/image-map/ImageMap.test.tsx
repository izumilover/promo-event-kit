/**
 * @file ImageMap.test.tsx
 * @description ImageMap 유닛 테스트 — area 렌더링, 이미지-맵 연결 검증
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ImageMap } from "./ImageMap";

describe("ImageMap", () => {
  it("area들을 alt 텍스트와 함께 렌더링하고 이미지와 usemap으로 연결한다", () => {
    const { container } = render(
      <ImageMap
        image={{ src: "/store.jpg", width: 400, height: 400, alt: "매장 배치도" }}
        areas={[
          { coords: "0,0,200,200", href: "/a", alt: "A 구역" },
          { coords: "200,200,400,400", href: "/b", alt: "B 구역" },
        ]}
      />,
    );

    const img = container.querySelector("img");
    const map = container.querySelector("map");
    expect(img).toHaveAttribute("usemap", `#${map?.getAttribute("name")}`);

    // jsdom은 <map>/<area>에 접근성 role을 계산하지 않으므로(getByRole 불가) DOM을 직접 조회한다
    const areas = container.querySelectorAll("area");
    expect(areas[0]).toHaveAttribute("href", "/a");
    expect(areas[0]).toHaveAttribute("alt", "A 구역");
    expect(areas[1]).toHaveAttribute("href", "/b");
    expect(areas[1]).toHaveAttribute("alt", "B 구역");
  });

  it("areas가 없으면 이미지 자체 alt를 그대로 쓴다", () => {
    render(
      <ImageMap
        image={{ src: "/store.jpg", width: 100, height: 100, alt: "매장 사진" }}
        areas={[]}
      />,
    );
    expect(screen.getByAltText("매장 사진")).toBeInTheDocument();
  });
});
