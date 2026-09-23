import { test, expect } from "@playwright/test";

test("스캐폴딩 스모크: 홈 페이지가 200으로 렌더된다", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBeLessThan(400);
});
