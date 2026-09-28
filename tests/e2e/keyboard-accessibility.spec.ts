/**
 * @file keyboard-accessibility.spec.ts
 * @description CLAUDE.md 완료 기준 "키보드만으로 탭·캐러셀·아코디언을 조작할 수 있다" 검증.
 *   마우스 클릭이 아니라 실제 포커스 이동 + 키보드 입력(Enter/Space)만으로 상호작용한다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-28
 */
import { test, expect } from "@playwright/test";

test.describe("키보드만으로 조작 가능해야 하는 모듈들", () => {
  test("NoticeAccordion: Enter로 펼쳐진다", async ({ page }) => {
    await page.goto("/exhibitions/autumn-sale");
    const trigger = page.getByRole("button", { name: "유의사항" });
    await trigger.focus();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("BannerCarousel: '다음 슬라이드' 버튼을 Enter로 눌러 슬라이드가 바뀐다", async ({
    page,
  }) => {
    await page.goto("/exhibitions/autumn-sale");
    await expect(page.getByText("한정 수량 특가")).toBeVisible();

    // autumn-sale에는 배너 캐러셀이 2개 있으므로(#promo, #product-lineup) 첫 번째로 범위를 좁힌다
    const nextButton = page.locator("#promo").getByRole("button", { name: "다음 슬라이드" });
    await nextButton.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByText("신상품 소모품")).toBeVisible();
  });

  test("AnchorTabs: 탭을 Enter로 활성화하면 aria-selected가 바뀐다", async ({ page }) => {
    await page.goto("/exhibitions/autumn-sale");
    const productsTab = page.getByRole("tab", { name: "제품라인업" });
    await productsTab.focus();
    await page.keyboard.press("Enter");

    await expect(productsTab).toHaveAttribute("aria-selected", "true");
  });
});
