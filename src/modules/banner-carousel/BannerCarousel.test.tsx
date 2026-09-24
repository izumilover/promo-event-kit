/**
 * @file BannerCarousel.test.tsx
 * @description BannerCarousel 유닛 테스트 — 단일/다중 슬라이드, 이전·다음, 자동재생 검증
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { BannerCarousel } from "./BannerCarousel";

const image = { pc: "/pc.jpg", mo: "/mo.jpg", alt: "배너" };

describe("BannerCarousel", () => {
  it("슬라이드가 1개면 이전/다음/일시정지 컨트롤을 렌더링하지 않는다", () => {
    render(<BannerCarousel slides={[{ id: "s1", title: "단일 배너", image }]} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("다음 버튼을 누르면 다음 슬라이드 제목이 보인다", async () => {
    const user = userEvent.setup();
    render(
      <BannerCarousel
        slides={[
          { id: "s1", title: "첫 번째", image },
          { id: "s2", title: "두 번째", image },
        ]}
      />,
    );
    expect(screen.getByText("첫 번째")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "다음 슬라이드" }));
    expect(screen.getByText("두 번째")).toBeInTheDocument();
  });

  it("일시정지 버튼을 누르면 라벨이 바뀐다(재생 상태 토글)", async () => {
    const user = userEvent.setup();
    render(
      <BannerCarousel
        slides={[
          { id: "s1", title: "첫 번째", image },
          { id: "s2", title: "두 번째", image },
        ]}
      />,
    );
    const pauseButton = screen.getByRole("button", { name: "자동재생 일시정지" });
    await user.click(pauseButton);
    expect(screen.getByRole("button", { name: "자동재생 재개" })).toBeInTheDocument();
  });
});

describe("BannerCarousel 자동재생", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("autoplayInterval이 지나면 다음 슬라이드로 자동 전환된다", () => {
    render(
      <BannerCarousel
        slides={[
          { id: "s1", title: "첫 번째", image },
          { id: "s2", title: "두 번째", image },
        ]}
        autoplayInterval={2000}
      />,
    );
    expect(screen.getByText("첫 번째")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText("두 번째")).toBeInTheDocument();
  });
});
