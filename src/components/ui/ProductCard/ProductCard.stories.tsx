/**
 * @file ProductCard.stories.tsx
 * @description ProductCard Storybook 카탈로그 — 기본/할인/가격숨김/모바일 상태
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCard } from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "UI/ProductCard",
  component: ProductCard,
};
export default meta;

type Story = StoryObj<typeof ProductCard>;

const image = { src: "/globe.svg", alt: "샘플 상품" };

export const Default: Story = {
  args: { name: "무선 이어폰", price: 89000, image, href: "#" },
};

export const Discounted: Story = {
  args: { name: "블루투스 스피커", price: 39000, originalPrice: 59000, image, href: "#" },
};

export const WithoutPrice: Story = {
  args: { name: "곧 출시", price: 0, image, showPrice: false },
};

export const Mobile: Story = {
  args: Discounted.args,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
