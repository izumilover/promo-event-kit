# AnchorTabs 스펙

> 작성: kamiz · 2026-09-24 · 브랜치: `feat/product-modules` (C)

## 개요

페이지 내 다른 섹션(id)으로 이동하는 탭 내비게이션. 클릭 시 해당 섹션으로 스크롤하고, 스크롤에
따라 현재 보이는 섹션의 탭을 하이라이트한다. 상호작용(스크롤 감지 + 클릭 이동)이 있어 클라이언트
컴포넌트로 구현한다.

## Props

```typescript
type AnchorTabItem = {
  label: string;
  /** 이동 대상 섹션의 id (SectionRenderer가 각 섹션에 부여하는 id와 동일) */
  target: string;
};

type AnchorTabsProps = {
  items: AnchorTabItem[];
  sticky?: boolean; // 기본 true
};
```

## 상태

- 초기 활성 탭: 뷰포트 최상단에서 가장 가까운(또는 처음 교차하는) 섹션의 탭
- `target`에 해당하는 id를 가진 섹션이 실제로 페이지에 없으면(SectionRenderer가 스키마 검증
  실패 등으로 건너뛴 경우) 그 탭은 클릭해도 아무 동작 안 함 — 페이지가 깨지지 않는 것이 우선

## 반응형

- `sticky: true`면 `position: sticky; top: 0`로 상단 고정
- 탭 개수가 많아 한 줄에 안 들어가면 가로 스크롤(모바일 공통)

## 접근성 (필수 — 문서 체크포인트)

- 탭 컨테이너는 `role="tablist"`, 각 탭은 `role="tab"` + `aria-selected`
- 키보드로 탭 이동/활성화 가능 — 탭은 실제 `<button>`이라 Tab/Enter/Space로 기본 동작
- 스크롤 위치 감지는 `IntersectionObserver`로 구현(스크롤 이벤트 폴링 대신 — 성능/정확도)
- `prefers-reduced-motion: reduce`면 `scrollIntoView`에 `behavior: "smooth"`를 쓰지 않고
  즉시 이동

## 예외 케이스

- `items`가 빈 배열이면 렌더링하지 않는다
- 페이지 최하단까지 스크롤했는데 마지막 섹션이 뷰포트 절반도 안 채우는 경우: 마지막 탭을
  활성으로 유지(IntersectionObserver 임계값 설계로 자연스럽게 처리)
