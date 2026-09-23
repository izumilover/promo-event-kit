/**
 * @file HeroBanner.stories.tsx
 * @description HeroBanner Storybook 카탈로그 — 기본/CTA 없음/모바일 상태
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroBanner } from "./HeroBanner";

const meta: Meta<typeof HeroBanner> = {
  title: "Modules/HeroBanner",
  component: HeroBanner,
};
export default meta;

type Story = StoryObj<typeof HeroBanner>;

const baseImage = { pc: "/globe.svg", mo: "/window.svg", alt: "가을 특가" };

export const Default: Story = {
  args: {
    title: "가을맞이 소모품 특가전",
    subtitle: "최대 30% 할인",
    periodLabel: "2026.10.1 ~ 2026.10.31",
    image: baseImage,
    cta: { label: "지금 보기", href: "#products" },
  },
};

export const WithoutCta: Story = {
  args: {
    title: "쿠폰만 받아가세요",
    image: baseImage,
  },
};

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
