/**
 * @file exhibition.spec.ts
 * @description /exhibitions/[id] 라우트 L1 실행 검증 — 실제 서버를 띄워 렌더링/404를 확인한다
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { test, expect } from "@playwright/test";

test("존재하는 기획전 JSON은 제목과 기간을 렌더링한다", async ({ page }) => {
  const response = await page.goto("/exhibitions/sample-empty");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { name: "파이프라인 검증용 샘플 (섹션 없음)" }),
  ).toBeVisible();
  await expect(page.getByText("2026-01-01")).toBeVisible();
});

test("존재하지 않는 기획전 id는 404를 반환한다", async ({ page }) => {
  const response = await page.goto("/exhibitions/does-not-exist");
  expect(response?.status()).toBe(404);
});
