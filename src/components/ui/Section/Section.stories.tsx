/**
 * @file Section.stories.tsx
 * @description Section 컴포넌트 Storybook 카탈로그 — 배경 variant + 모바일 상태
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "./Section";

const meta: Meta<typeof Section> = {
  title: "UI/Section",
  component: Section,
};
export default meta;

type Story = StoryObj<typeof Section>;

export const NoBackground: Story = {
  args: { id: "demo-section", background: "none", children: "섹션 콘텐츠 영역" },
};

export const SubtleBackground: Story = {
  args: { id: "demo-section-2", background: "subtle", children: "섹션 콘텐츠 영역" },
};

export const Mobile: Story = {
  args: { id: "demo-section-3", background: "subtle", children: "섹션 콘텐츠 영역" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
