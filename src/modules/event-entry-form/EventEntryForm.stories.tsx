/**
 * @file EventEntryForm.stories.tsx
 * @description EventEntryForm Storybook 카탈로그 — 기본/모바일 상태.
 *   실제 제출 흐름(mock API)은 Storybook 캔버스에서 확인 불가 — tests/e2e가 담당.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EventEntryForm } from "./EventEntryForm";

const meta: Meta<typeof EventEntryForm> = {
  title: "Modules/EventEntryForm",
  component: EventEntryForm,
};
export default meta;

type Story = StoryObj<typeof EventEntryForm>;

export const Default: Story = {
  args: {
    eventId: "autumn-sale-entry",
    privacyNotice: "개인정보 수집·이용에 동의합니다.",
  },
};

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
