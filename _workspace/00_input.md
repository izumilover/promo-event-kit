# 프로젝트 입력 정리 (수정본 — 최초 작성 후 실제 기획안 확인하고 정정)

## 앱 설명

"기획전 페이지를 새로 개발하지 않고, 공통 모듈을 JSON 설정으로 조립해서 만든다"를 보여주는
Next.js 테스트앱. LG 입사(10월 초 투입) 준비용 포트폴리오 프로젝트 — 실제 서비스가 아니다.
전체 기획안은 `docs/plan.md` 참고.

## 정정된 내용 (최초 입력 대비)

최초 AskUserQuestion 답변에서 "풀스택(자체 DB)"으로 확인했으나, 실제 기획안(`docs/plan.md`)을
받아보니 **DB/로그인/결제가 전혀 없고 JSON 파일 + mock Route Handler로 충분**한 구조였다.
아래는 정정된 내용:

- **프로젝트 성향**: 우리 하네스의 3분류(풀스택/BFF·프론트전용/정적) 중 어디에도 완전히
  맞지 않는다 — DB는 없지만(정적에 가까움) `app/api/coupons/route.ts` 같은 경량 mock API는
  있다(순수 정적은 아님). 실질적으로는 "정적 + 경량 mock API"로 취급하고, mock Route Handler는
  react-backend-dev를 별도로 투입하지 않고 오케스트레이터/frontend가 직접 작성한다(로직이
  간단해서 별도 에이전트 투입 이득이 없음).
- **스타일링**: Tailwind+shadcn/ui 대신 **CSS Modules + `src/styles/tokens.css`** — 다른
  회사(LG) 코드베이스에 이식하기 쉬워야 한다는 이유로 사용자가 확정
- **테스트 도구**: Storybook 추가 필요(문서 필수 요구사항), eslint-plugin-jsx-a11y, Prettier 추가

## 협업 방식

"팀"이라고 답했던 것의 실체 확인: **실제로는 1인 개발, 3~4인 가상 팀처럼 브랜치로 나눠 진행**
(A 기반/B 전시/C 상품/D 이벤트). 다른 사람이 clone해서 쓸 일은 없지만, 브랜치+PR 워크플로우는
그대로 유효하다 — PR 리뷰는 사람 대신 "다른 Claude 세션"이 담당(문서의 "PR 리뷰는 사람 + AI").
자세한 건 프로젝트 `CLAUDE.md`의 "협업 방식 — 혼자서 팀처럼" 참고.

## 완료된 것 (스캐폴딩 2차 수정)

- Next.js App Router + TS, CSS Modules(+tokens.css)로 전환, Prisma/Auth.js/Tailwind/shadcn 제거
- Storybook, Prettier, eslint-plugin-jsx-a11y 추가
- lint/typecheck/format/test/e2e/build/storybook build 전부 통과 확인
- 프로젝트 `CLAUDE.md`를 실제 기획안 기반 팀 규칙으로 재작성
- `docs/plan.md`에 원본 기획안 전문 저장

## 다음 단계 (Day 2 나머지 — feat/foundation)

공통 UI 5개(Button/Badge/Price/Image/Section 래퍼) + registry.ts + SectionRenderer.tsx 구현.
`main`에 먼저 병합해야 B/C/D(전시/상품/이벤트 모듈)가 병렬 진행 가능.
