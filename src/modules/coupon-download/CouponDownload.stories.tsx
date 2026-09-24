/**
 * @file CouponDownload.stories.tsx
 * @description CouponDownload Storybook 카탈로그 — 기본/모바일 상태.
 *   Storybook 캔버스에는 실제 API 서버가 없어 클릭 시 발급 흐름 자체는 확인 불가 —
 *   그건 tests/e2e가 담당한다. 여기서는 초기 렌더 상태만 다룬다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CouponDownload } from "./CouponDownload";

const meta: Meta<typeof CouponDownload> = {
  title: "Modules/CouponDownload",
  component: CouponDownload,
};
export default meta;

type Story = StoryObj<typeof CouponDownload>;

const coupons = [
  { id: "c1", amount: 10000, minPrice: 100000 },
  { id: "c2", amount: 5000 },
];

export const Default: Story = {
  args: { coupons },
};

export const Mobile: Story = {
  args: { coupons },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
