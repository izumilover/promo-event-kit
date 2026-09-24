---
description: 새 기획전/이벤트 모듈을 CLAUDE.md의 "모듈 추가 절차" 6단계로 만든다
---

새 모듈 "$ARGUMENTS"을(를) 만든다. 진행 전에 반드시 프로젝트 `CLAUDE.md`(특히 "모듈 추가
절차", "설계 원칙", "파일 헤더 & 함수 주석 규칙" 섹션)를 다시 읽고 그대로 따른다.

## 순서

1. **스펙 작성** — `docs/specs/<모듈-kebab-case>.md`에 props(TypeScript 타입으로), 상태,
   반응형, 접근성, 예외 케이스를 적는다. 비슷한 기존 모듈의 스펙(`docs/specs/` 아래 파일들)을
   먼저 훑어보고 형식을 맞춘다. 초안을 쓴 뒤 사용자에게 확인받는다 — 확정 전에 코드로 넘어가지
   않는다.

2. **zod 스키마** — `src/modules/<module-name>/schema.ts`. section props를 검증하는
   스키마와 그 타입을 export한다. 파일 헤더 주석 필수.

3. **컴포넌트 구현** — `src/modules/<module-name>/<Module>.tsx`.
   - **서버 컴포넌트가 기본.** 상호작용(타이머·캐러셀·폼 제출·클립보드 등)이 있을 때만
     최상단에 `"use client"`를 추가한다.
   - **새 UI를 만들기 전에 `src/components/ui/`를 먼저 찾아 재사용한다** — Button, Badge,
     Price, ProductCard, ResponsiveImage, Section이 이미 있다.
   - **색상·여백은 `src/styles/tokens.css`의 CSS 변수만 쓴다** — 하드코딩 금지.
   - **모듈 내부에서 fetch/데이터 조회 금지** — props만 받는다. mock API를 호출해야 하면
     (`CouponDownload`, `EventEntryForm` 참고) 클라이언트 컴포넌트 안에서 `fetch`로 이 프로젝트
     자체의 Route Handler(`src/app/api/...`)만 호출한다.
   - **재사용 컴포넌트를 폼 제출 버튼으로 쓸 때 `type="submit"`을 빠뜨리지 않는다** —
     공용 `Button`의 기본값은 `type="button"`이라, 안 넘기면 클릭해도 폼이 제출되지 않는다
     (`EventEntryForm`에서 실제로 겪은 버그, README "회고" 참고).
   - 서버/클라이언트 시간 차이가 있는 값(타이머 등)은 SSR에서 placeholder만 보여주고
     `useEffect`(클라이언트 전용)에서 실제 값을 채운다 — hydration mismatch 방지
     (`CountdownTimer` 참고).

4. **Storybook 스토리** — `<Module>.stories.tsx`. 최소 기본 상태 + 빈 데이터 상태 +
   `Mobile`(뷰포트 `mobile1`) 상태를 포함한다.

5. **유닛 테스트** — `<Module>.test.tsx`. `@testing-library/react` + `vitest` 사용.
   - `matchMedia`/`IntersectionObserver`는 `tests/unit/setup.ts`에 이미 mock돼 있다.
   - `navigator.clipboard`를 테스트하려면 `userEvent.setup()` **이후에** `Object.defineProperty`로
     덮어써야 한다(순서가 바뀌면 user-event의 자체 stub이 이긴다).
   - 폼 제출 흐름처럼 재사용 컴포넌트의 숨은 기본값에 좌우되는 동작은, 가능하면 실제 클릭
     기반 e2e(`tests/e2e/`)로 한 번 더 검증한다.

6. **레지스트리 등록** — `src/registry.ts`에 `import` 2줄 + `moduleRegistry` 객체에 한 줄
   추가(`type → { component, schema }`). `@modified` 날짜를 오늘 날짜로 갱신한다.

## 마무리

- `data/exhibitions/*.json` 중 하나에 새 섹션을 추가해 실제로 조립되는지 확인한다(새 샘플
  파일을 만들어도 된다).
- `npm run format && npm run lint && npm run typecheck && npm run test && npm run build`를
  전부 통과시킨다.
- 프로덕션 서버(`npm run start`)를 실제로 기동해 curl 또는 브라우저로 렌더링 결과를 확인한
  뒤에만 "완료"라고 보고한다(코드만 보고 완료라고 하지 않는다).
- 팀 모드라면 `feat/<적절한 브랜치명>`에서 작업하고, 완료되면 PR을 연다(직접 main에 머지하지
  않는다).
