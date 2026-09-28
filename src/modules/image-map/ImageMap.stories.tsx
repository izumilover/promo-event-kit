/**
 * @file ImageMap.stories.tsx
 * @description ImageMap Storybook 카탈로그 — 기본/핫스팟 없음/모바일 상태
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImageMap } from "./ImageMap";

const meta: Meta<typeof ImageMap> = {
  title: "Modules/ImageMap",
  component: ImageMap,
};
export default meta;

type Story = StoryObj<typeof ImageMap>;

export const Default: Story = {
  args: {
    image: { src: "/globe.svg", width: 400, height: 400, alt: "매장 배치도" },
    areas: [
      { coords: "0,0,200,200", href: "#", alt: "왼쪽 상단 구역" },
      { coords: "200,200,400,400", href: "#", alt: "오른쪽 하단 구역" },
    ],
  },
};

export const NoAreas: Story = {
  args: {
    image: { src: "/globe.svg", width: 400, height: 400, alt: "일반 이미지" },
    areas: [],
  },
};

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
