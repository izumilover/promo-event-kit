/**
 * @file ReviewCarousel.test.tsx
 * @description ReviewCarousel 유닛 테스트 — 렌더링, photo 없는 리뷰, 빈 데이터, 별점 접근성,
 *   이전/다음 버튼 동작 검증
 * @author kamiz
 * @created 2026-10-01
 * @modified 2026-10-01
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ReviewCarousel } from "./ReviewCarousel";
import type { Review } from "./schema";

const photoReview: Review = {
  id: "r1",
  authorName: "홍길동",
  rating: 4,
  content: "만족스러운 구매였습니다.",
  photo: { src: "/review1.jpg", alt: "제품 착용 사진" },
  createdAt: "2026-09-30",
};

const noPhotoReview: Review = {
  id: "r2",
  authorName: "김철수",
  rating: 5,
  content: "재구매 의사 있습니다.",
  createdAt: "2026-09-25",
};

describe("ReviewCarousel", () => {
  it("리뷰 여러 개의 작성자명/별점/날짜/본문을 렌더링한다", () => {
    render(<ReviewCarousel reviews={[photoReview, noPhotoReview]} />);

    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("만족스러운 구매였습니다.")).toBeInTheDocument();
    expect(screen.getByLabelText("평점 4점, 5점 만점")).toBeInTheDocument();
    expect(screen.getByText("2026년 9월 30일")).toBeInTheDocument();

    expect(screen.getByText("김철수")).toBeInTheDocument();
    expect(screen.getByText("재구매 의사 있습니다.")).toBeInTheDocument();
    expect(screen.getByLabelText("평점 5점, 5점 만점")).toBeInTheDocument();
    expect(screen.getByText("2026년 9월 25일")).toBeInTheDocument();
  });

  it("photo가 없는 리뷰는 이미지 없이 정상 렌더링된다", () => {
    const { container } = render(<ReviewCarousel reviews={[noPhotoReview]} />);

    expect(screen.getByText("김철수")).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("reviews가 빈 배열이면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<ReviewCarousel reviews={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("별점 시각 글리프는 aria-hidden이고 대신 aria-label로 숫자 정보를 제공한다", () => {
    const { container } = render(<ReviewCarousel reviews={[photoReview]} />);

    const glyph = container.querySelector("[aria-hidden='true']");
    expect(glyph).toHaveTextContent("★★★★☆");

    const ratingWrap = screen.getByLabelText("평점 4점, 5점 만점");
    expect(ratingWrap).toContainElement(glyph as HTMLElement);
  });

  it("이전/다음 버튼이 존재하고 클릭하면 스크롤 핸들러가 호출된다", async () => {
    const scrollBySpy = vi.fn();
    Element.prototype.scrollBy = scrollBySpy;

    const user = userEvent.setup();

    render(<ReviewCarousel reviews={[photoReview, noPhotoReview]} />);

    const prevButton = screen.getByRole("button", { name: "이전 리뷰" });
    const nextButton = screen.getByRole("button", { name: "다음 리뷰" });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    await user.click(nextButton);
    expect(scrollBySpy).toHaveBeenCalledTimes(1);

    await user.click(prevButton);
    expect(scrollBySpy).toHaveBeenCalledTimes(2);
  });
});
