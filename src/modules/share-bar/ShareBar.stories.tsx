/**
 * @file ShareBar.stories.tsx
 * @description ShareBar Storybook 카탈로그 — 기본/모바일 상태
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ShareBar } from "./ShareBar";

const meta: Meta<typeof ShareBar> = {
  title: "Modules/ShareBar",
  component: ShareBar,
};
export default meta;

type Story = StoryObj<typeof ShareBar>;

export const Default: Story = {
  args: { channels: ["kakao", "facebook", "url"] },
};

export const UrlOnly: Story = {
  args: { channels: ["url"] },
};

export const Mobile: Story = {
  args: { channels: ["kakao", "facebook", "url"] },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
