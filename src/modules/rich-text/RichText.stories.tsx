/**
 * @file RichText.stories.tsx
 * @description RichText Storybook 카탈로그 — 기본/빈 데이터/모바일 상태
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RichText } from "./RichText";

const meta: Meta<typeof RichText> = {
  title: "Modules/RichText",
  component: RichText,
};
export default meta;

type Story = StoryObj<typeof RichText>;

export const Default: Story = {
  args: {
    blocks: [
      { type: "heading", text: "행사 안내", level: 2 },
      {
        type: "paragraph",
        text: "본 행사는 2026년 10월 한 달간 진행되며, 매장별로 재고가 상이할 수 있습니다.",
      },
      { type: "heading", text: "참여 방법", level: 3 },
      { type: "list", items: ["회원가입 후 로그인", "쿠폰 다운로드", "상품 구매 시 자동 적용"] },
    ],
  },
};

export const Empty: Story = {
  args: { blocks: [] },
};

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
