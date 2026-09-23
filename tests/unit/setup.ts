/**
 * @file setup.ts
 * @description Vitest 유닛 테스트 전역 설정 — jest-dom 매처 등록 + 테스트 간 DOM cleanup
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// globals: true를 안 쓰므로, render()가 매 테스트마다 남긴 DOM을 명시적으로 정리해야 한다.
// 이게 없으면 이전 테스트의 렌더 결과가 다음 테스트 DOM에 남아 getByText가 중복 매치로 실패한다.
afterEach(() => {
  cleanup();
});
