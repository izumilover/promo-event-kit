/**
 * @file BenefitCards.stories.tsx
 * @description BenefitCards Storybook 카탈로그 — 2열/4열/빈 데이터/모바일 상태
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BenefitCards } from "./BenefitCards";

const meta: Meta<typeof BenefitCards> = {
  title: "Modules/BenefitCards",
  component: BenefitCards,
};
export default meta;

type Story = StoryObj<typeof BenefitCards>;

export const TwoColumns: Story = {
  args: {
    items: [
      { icon: "cardDiscount", title: "카드 할인", description: "제휴 카드 결제 시 5% 추가 할인" },
      { icon: "gift", title: "사은품", description: "10만원 이상 구매 시 사은품 증정" },
    ],
  },
};

export const FourColumns: Story = {
  args: {
    items: [
      { icon: "cardDiscount", title: "카드 할인", description: "제휴 카드 결제 시 5% 추가 할인" },
      { icon: "gift", title: "사은품", description: "10만원 이상 구매 시 사은품 증정" },
      { icon: "membership", title: "멤버십 적립", description: "구매 금액의 3% 포인트 적립" },
      { icon: "shipping", title: "무료 배송", description: "전 상품 무료 배송" },
    ],
  },
};

export const Empty: Story = {
  args: { items: [] },
};

export const Mobile: Story = {
  args: FourColumns.args,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
