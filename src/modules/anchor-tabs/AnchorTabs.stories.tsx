/**
 * @file AnchorTabs.stories.tsx
 * @description AnchorTabs Storybook 카탈로그 — 기본/모바일 상태.
 *   Storybook 캔버스에는 target 섹션이 없어 스크롤 스파이 동작 자체는 확인 불가 —
 *   실제 스크롤 동작 확인은 /exhibitions/[id] 페이지의 e2e 테스트가 담당한다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AnchorTabs } from "./AnchorTabs";

const meta: Meta<typeof AnchorTabs> = {
  title: "Modules/AnchorTabs",
  component: AnchorTabs,
};
export default meta;

type Story = StoryObj<typeof AnchorTabs>;

const items = [
  { label: "쿠폰", target: "coupon" },
  { label: "상품", target: "products" },
  { label: "유의사항", target: "notice" },
];

export const Default: Story = {
  args: { items, sticky: true },
};

export const NotSticky: Story = {
  args: { items, sticky: false },
};

export const Mobile: Story = {
  args: { items, sticky: true },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
