# CouponDownload 스펙

> 작성: kamiz · 2026-09-24 · 브랜치: `feat/event-modules` (D)

## 개요

쿠폰 목록을 보여주고 "다운로드(발급)" 버튼을 누르면 mock Route Handler를 호출해 발급 상태를
갱신한다. 실제 로그인/결제가 없는 프로젝트라 "발급"은 서버 메모리에만 기록되는 mock이다
(서버 재시작하면 초기화됨 — 데모용이라는 걸 문서에 명시).

## Props

```typescript
type Coupon = {
  id: string;
  amount: number; // 원 단위 정액 할인
  minPrice?: number; // 최소 구매 금액 조건
  endAt?: string; // 쿠폰 유효기간(ISO)
};

type CouponDownloadProps = {
  coupons: Coupon[];
};
```

## Mock API

`POST /api/coupons/claim` — body `{ couponId: string }`

- 응답 `{ status: "claimed" }` — 성공
- 응답 `{ status: "sold-out" }` — (mock) 특정 쿠폰은 항상 소진 상태로 고정해 UI 분기를 보여줌
- 이미 발급받은 쿠폰을 다시 요청하면 `{ status: "already-claimed" }`

## 상태

- `idle` → 버튼 클릭 → `loading`(버튼 disabled + "발급 중...") → `claimed`/`sold-out`/
  `already-claimed`/`error`
- `claimed` 이후에는 버튼이 "발급 완료"로 바뀌고 비활성화

## 접근성

- 버튼 상태 전환마다 `aria-live="polite"` 영역에 결과 문구를 함께 노출(스크린리더 사용자도
  발급 성공/실패를 알 수 있게)

## 예외 케이스

- `coupons`가 빈 배열이면 렌더링하지 않는다
- API 호출 자체가 실패(네트워크 오류 등)하면 `error` 상태로 "잠시 후 다시 시도해주세요" 표시,
  재시도 가능(버튼 다시 활성화)
