/**
 * @file BannerCarousel.stories.tsx
 * @description BannerCarousel Storybook 카탈로그 — 단일/다중 슬라이드/모바일 상태
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BannerCarousel } from "./BannerCarousel";

const meta: Meta<typeof BannerCarousel> = {
  title: "Modules/BannerCarousel",
  component: BannerCarousel,
};
export default meta;

type Story = StoryObj<typeof BannerCarousel>;

const image = { pc: "/globe.svg", mo: "/window.svg", alt: "프로모션 배너" };

export const SingleSlide: Story = {
  args: {
    slides: [{ id: "s1", title: "단일 배너", image }],
  },
};

export const MultipleSlides: Story = {
  args: {
    slides: [
      { id: "s1", title: "가을 특가", badge: "한정 수량", periodLabel: "9.1~9.30", image },
      { id: "s2", title: "신상품 입고", href: "#new", image },
      { id: "s3", title: "멤버십 혜택", image },
    ],
    autoplayInterval: 4000,
  },
};

export const Mobile: Story = {
  args: MultipleSlides.args,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
