/**
 * @file CountdownTimer.stories.tsx
 * @description CountdownTimer Storybook 카탈로그 — 진행중/종료/모바일 상태
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CountdownTimer } from "./CountdownTimer";

const meta: Meta<typeof CountdownTimer> = {
  title: "Modules/CountdownTimer",
  component: CountdownTimer,
};
export default meta;

type Story = StoryObj<typeof CountdownTimer>;

const future = new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString();
const past = new Date(Date.now() - 1000 * 60 * 60).toISOString();

export const Active: Story = {
  args: { endAt: future },
};

export const Ended: Story = {
  args: { endAt: past },
};

export const Mobile: Story = {
  args: { endAt: future },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
