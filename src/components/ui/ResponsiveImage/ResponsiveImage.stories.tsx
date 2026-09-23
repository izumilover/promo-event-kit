/**
 * @file ResponsiveImage.stories.tsx
 * @description ResponsiveImage 컴포넌트 Storybook 카탈로그 — 기본/모바일 상태
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResponsiveImage } from "./ResponsiveImage";

const meta: Meta<typeof ResponsiveImage> = {
  title: "UI/ResponsiveImage",
  component: ResponsiveImage,
};
export default meta;

type Story = StoryObj<typeof ResponsiveImage>;

// 실제 프로젝트에서는 기획전별 배너 이미지로 교체된다 — 여기선 placeholder(svg)만 사용
export const Default: Story = {
  args: { pc: "/globe.svg", mo: "/window.svg", alt: "가을 특가 배너" },
};

export const Mobile: Story = {
  args: { pc: "/globe.svg", mo: "/window.svg", alt: "가을 특가 배너" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
