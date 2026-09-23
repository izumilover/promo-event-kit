/**
 * @file Badge.stories.tsx
 * @description Badge 컴포넌트 Storybook 카탈로그 — variant별 + 모바일 상태
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { variant: "default", children: "신상품" },
};

export const Accent: Story = {
  args: { variant: "accent", children: "최대 30%" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "마감임박" },
};

export const Mobile: Story = {
  args: { variant: "danger", children: "마감임박" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
