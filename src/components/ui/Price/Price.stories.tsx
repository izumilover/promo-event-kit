/**
 * @file Price.stories.tsx
 * @description Price 컴포넌트 Storybook 카탈로그 — 기본/할인/모바일 상태
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Price } from "./Price";

const meta: Meta<typeof Price> = {
  title: "UI/Price",
  component: Price,
};
export default meta;

type Story = StoryObj<typeof Price>;

export const Basic: Story = {
  args: { value: 129000 },
};

export const Discounted: Story = {
  args: { value: 89000, originalValue: 129000 },
};

export const Mobile: Story = {
  args: { value: 89000, originalValue: 129000 },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
