/**
 * @file ProductGrid.stories.tsx
 * @description ProductGrid Storybook 카탈로그 — 2열/4열/빈 데이터/모바일 상태
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductGrid } from "./ProductGrid";

const meta: Meta<typeof ProductGrid> = {
  title: "Modules/ProductGrid",
  component: ProductGrid,
};
export default meta;

type Story = StoryObj<typeof ProductGrid>;

const image = { src: "/globe.svg", alt: "샘플 상품" };
const products = [
  { id: "p1", name: "무선 이어폰", price: 89000, image, href: "#" },
  { id: "p2", name: "블루투스 스피커", price: 39000, originalPrice: 59000, image, href: "#" },
  { id: "p3", name: "보조 배터리", price: 25000, image, href: "#" },
  { id: "p4", name: "케이블 세트", price: 12000, image, href: "#" },
];

export const FourColumns: Story = {
  args: { products, columns: 4 },
};

export const TwoColumns: Story = {
  args: { products: products.slice(0, 2), columns: 2 },
};

export const Empty: Story = {
  args: { products: [] },
};

export const Mobile: Story = {
  args: { products, columns: 4 },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
