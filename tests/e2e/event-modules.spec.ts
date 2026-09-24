/**
 * @file event-modules.spec.ts
 * @description D(이벤트) 모듈 L1 실행 검증 — 쿠폰 발급, 이벤트 응모 실제 클릭/제출 흐름을
 *   실제 서버(mock Route Handler 포함)로 확인한다. EventEntryForm의 제출 버튼 type 누락
 *   버그(유닛 테스트로는 못 잡고 실제 클릭 흐름에서만 드러났던 버그)의 재발 방지용.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { test, expect } from "@playwright/test";

test("쿠폰 다운로드 버튼을 누르면 발급 완료로 바뀐다", async ({ page }) => {
  await page.goto("/exhibitions/autumn-sale");
  const firstCouponButton = page.getByRole("button", { name: "다운로드" }).first();
  await firstCouponButton.click();
  await expect(page.getByRole("button", { name: "발급 완료" }).first()).toBeDisabled();
});

test("이벤트 응모 폼을 제출하면 성공 메시지가 뜬다", async ({ page }) => {
  await page.goto("/exhibitions/autumn-sale");
  // getByLabel은 기본이 부분 일치라 exact 없이는 동의 문구("...이름/연락처를 수집...")에도
  // 걸린다 — 정확히 "이름"/"연락처" 라벨을 가진 입력만 지정한다.
  await page.getByLabel("이름", { exact: true }).fill("홍길동");
  await page.getByLabel("연락처", { exact: true }).fill("010-1234-5678");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "응모하기" }).click();
  await expect(page.getByText("응모가 완료되었습니다. 감사합니다!")).toBeVisible();
});
