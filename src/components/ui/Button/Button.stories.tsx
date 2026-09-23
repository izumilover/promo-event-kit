/**
 * @file Button.stories.tsx
 * @description Button 컴포넌트 Storybook 카탈로그 — variant/size/링크형/비활성/모바일 상태
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", size: "md", children: "구매하기" },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", children: "장바구니" },
};

export const Ghost: Story = {
  args: { variant: "ghost", size: "md", children: "자세히 보기" },
};

export const AsLink: Story = {
  args: { variant: "primary", size: "md", href: "/exhibitions/sample", children: "기획전 보기" },
};

export const Disabled: Story = {
  args: { variant: "primary", size: "md", disabled: true, children: "품절" },
};

export const Mobile: Story = {
  args: { variant: "primary", size: "lg", children: "최대 30% 할인 받기" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
