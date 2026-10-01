/**
 * @file ReviewCarousel.stories.tsx
 * @description ReviewCarousel Storybook 카탈로그 — 기본(사진 유무 혼합)/빈 데이터/모바일 상태
 * @author kamiz
 * @created 2026-10-01
 * @modified 2026-10-01
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReviewCarousel } from "./ReviewCarousel";

const meta: Meta<typeof ReviewCarousel> = {
  title: "Modules/ReviewCarousel",
  component: ReviewCarousel,
};
export default meta;

type Story = StoryObj<typeof ReviewCarousel>;

const reviews = [
  {
    id: "r1",
    authorName: "김민수",
    rating: 5 as const,
    content: "사진보다 실물이 더 예뻐요. 배송도 빠르고 포장도 꼼꼼했습니다. 재구매 의사 있어요.",
    photo: { src: "/globe.svg", alt: "구매 상품 착용 사진" },
    createdAt: "2026-09-20",
  },
  {
    id: "r2",
    authorName: "이지은",
    rating: 4 as const,
    content: "가격 대비 만족스러운 품질입니다.",
    createdAt: "2026-09-18",
  },
  {
    id: "r3",
    authorName: "박서준",
    rating: 3 as const,
    content: "생각보다 사이즈가 작게 나왔어요. 한 치수 크게 주문하는 걸 추천합니다.",
    photo: { src: "/globe.svg", alt: "상품 박스 개봉 사진" },
    createdAt: "2026-09-15",
  },
];

export const Default: Story = {
  args: { reviews },
};

export const Empty: Story = {
  args: { reviews: [] },
};

export const Mobile: Story = {
  args: { reviews },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
