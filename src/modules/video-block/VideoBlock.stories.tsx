/**
 * @file VideoBlock.stories.tsx
 * @description VideoBlock Storybook 카탈로그 — 기본/모바일 상태
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VideoBlock } from "./VideoBlock";

const meta: Meta<typeof VideoBlock> = {
  title: "Modules/VideoBlock",
  component: VideoBlock,
};
export default meta;

type Story = StoryObj<typeof VideoBlock>;

export const Default: Story = {
  args: {
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "제품 소개 영상",
  },
};

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
