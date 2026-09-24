/**
 * @file NoticeAccordion.stories.tsx
 * @description NoticeAccordion Storybook 카탈로그 — 닫힘/열림/모바일 상태
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NoticeAccordion } from "./NoticeAccordion";

const meta: Meta<typeof NoticeAccordion> = {
  title: "Modules/NoticeAccordion",
  component: NoticeAccordion,
};
export default meta;

type Story = StoryObj<typeof NoticeAccordion>;

const items = [
  "쿠폰은 1인 1회 사용 가능합니다.",
  "본 행사는 당사 사정에 의해 예고 없이 변경/종료될 수 있습니다.",
  "일부 상품은 재고 소진 시 조기 종료될 수 있습니다.",
];

export const Closed: Story = {
  args: { items, defaultOpen: false },
};

export const Open: Story = {
  args: { items, defaultOpen: true },
};

export const Mobile: Story = {
  args: { items, defaultOpen: true },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
