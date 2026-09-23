@AGENTS.md

## 오케스트레이션 체계

- **선택**: 개인 하네스(react-webapp) — bkit PDCA 대신 이 방식을 쓴다
- **선택 일자**: 2026-09-23
- 상세 내용: `.claude/skills/react-webapp/SKILL.md`, 개요는 `.claude/agents/react-*.md` 각 파일 참고
- 이 선택은 append-only 원칙에 따라 유지된다 — 바꾸려면 사용자가 명시적으로 요청해야 한다 (전역
  `CLAUDE.md`의 "신규 프로젝트는 오케스트레이션 체계를 선택해 프로젝트 CLAUDE.md에 고정한다" 규칙)

## 프로젝트 개요

"기획전 페이지를 새로 개발하지 않고, 공통 모듈을 설정값(JSON)으로 조립해서 만든다"를 실제
동작하는 코드로 보여주는 테스트앱. **입사 준비용 포트폴리오 프로젝트**이며 실제 서비스가 아니다
— 로그인·결제·DB 연동은 전부 mock, 데이터는 `data/exhibitions/*.json`로 관리한다(자체 DB 없음).
전체 기획안: `docs/plan.md` 참고(원본은 claude.ai 아티팩트, 이 파일이 로컬 사본).

## 협업 방식 — 혼자서 팀처럼

실제로는 1인 개발이지만, 3~4인 팀이 쓰는 방식(가상 역할 분담 + 브랜치 + PR 리뷰)을 그대로
따른다. 이게 이 프로젝트의 목적 중 하나(팀 바이브코딩 경험 + 포트폴리오/면접 어필)다 — "혼자니까
그냥 대충"으로 축소하지 않는다.

| 가상 담당  | 범위                                                                              | 브랜치                 |
| ---------- | --------------------------------------------------------------------------------- | ---------------------- |
| A (기반)   | 디자인 토큰, 공통 UI(Button/Badge/Price/Image/Section), registry, SectionRenderer | `feat/foundation`      |
| B (전시)   | HeroBanner, BannerCarousel, BenefitCards                                          | `feat/display-modules` |
| C (상품)   | ProductCard, ProductGrid/Slider, AnchorTabs                                       | `feat/product-modules` |
| D (이벤트) | CouponDownload, CountdownTimer, EventEntryForm, ShareBar, NoticeAccordion         | `feat/event-modules`   |

A를 먼저 `main`에 병합한 뒤 B·C·D를 병렬로 진행한다(각각 register.ts/SectionRenderer.tsx가
확정돼야 개별 모듈을 등록할 수 있으므로). 병렬 진행 시 브랜치(또는 git worktree)마다 별도
세션으로 작업해 실제 여러 사람이 합치는 경험에 가깝게 한다.

## 폴더 구조

```
promo-event-kit/
├─ CLAUDE.md
├─ docs/
│  ├─ plan.md            # 원본 기획안 사본
│  └─ specs/<모듈>.md     # 모듈별 스펙 (props·상태·반응형·예외) — 구현 전에 먼저 작성
├─ data/exhibitions/*.json   # 기획전 설정 (여기 JSON을 추가하는 것만으로 새 페이지가 떠야 한다)
├─ src/
│  ├─ app/exhibitions/[id]/page.tsx
│  ├─ app/api/coupons/route.ts   # mock Route Handler
│  ├─ styles/tokens.css      # 색상/여백/타이포 — 모든 값의 단일 소스
│  ├─ components/ui/         # Button, Badge, Price, Image, Section 래퍼 등 공통 UI
│  ├─ modules/
│  │  └─ <module-name>/
│  │     ├─ <Module>.tsx
│  │     ├─ schema.ts        # zod 스키마 (props 검증 + 타입 추론)
│  │     ├─ <Module>.stories.tsx
│  │     └─ <Module>.test.tsx
│  ├─ registry.ts            # type → { component, schema } 매핑
│  └─ SectionRenderer.tsx    # JSON sections[] → registry 조회 → 순서대로 렌더링
└─ .github/workflows/ci.yml
```

## 모듈 추가 절차 (순서대로)

1. `docs/specs/<모듈>.md`에 props·상태·반응형·예외 케이스를 먼저 적는다 (초안은 Claude가 쓰고
   확정은 사람이 한다)
2. `src/modules/<module-name>/schema.ts`에 zod 스키마 작성
3. `<Module>.tsx` 구현 — **서버 컴포넌트가 기본**, 상호작용이 있는 부분(캐러셀·타이머·쿠폰
   다운로드)만 `"use client"`
4. `<Module>.stories.tsx` 작성 — 기본/빈 데이터/모바일 상태 최소 포함
5. `<Module>.test.tsx` 작성
6. `src/registry.ts`에 `type → { component, schema }` 등록

## 파일 헤더 & 함수 주석 규칙

새로 만드는 모든 코드 파일(`.ts`/`.tsx`/`.css`) 맨 위에 헤더 주석을 단다. JSON은 주석을 지원하지
않으므로 예외.

```typescript
/**
 * @file Button.tsx
 * @description 공통 버튼 — variant/size, href 지정 시 <a>로 렌더링
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
```

- `@author`는 `git config user.name` 값(코드 변경 이력 주석의 `@author`와 동일 소스)
- `@created`는 최초 생성일 — 이후 수정해도 바꾸지 않는다
- `@modified`는 그 파일을 건드릴 때마다 그날 날짜로 갱신한다
- 함수/메서드에도 무엇을 하는지 한 줄 이상 주석을 단다(자명한 1줄짜리 getter성 함수는 생략 가능) —
  전역 `CLAUDE.md`의 "주석은 WHY가 비자명할 때만"보다 이 팀 규칙이 우선한다(팀 규칙 최우선 원칙)

## 설계 원칙 (위반하면 안 됨)

- **모듈은 데이터를 직접 안 불러온다** — props만 받는다. 상품 조회 등은 서버 컴포넌트가 처리해서
  props로 내려준다. **모듈 내부에서 fetch 금지**
- **새 UI를 만들기 전에 `src/components/ui`를 먼저 찾아 재사용한다** — 같은 버튼/카드를
  중복으로 만들지 않는다
- **색상·여백은 `src/styles/tokens.css`의 변수만 쓴다** — 하드코딩 금지 (예: `color: #333` 대신
  `color: var(--color-fg)`)
- 알 수 없는 `type`이나 스키마 검증 실패는 페이지 전체를 깨지 않고 **해당 섹션만 숨기고 개발
  모드에서 경고**한다
- 모듈 간 간격·배경은 Section 래퍼가 담당한다 — 모듈 내부에 바깥 여백을 넣지 않는다
- **새 라이브러리를 임의로 추가하지 않는다** — 필요하면 먼저 사용자에게 이유와 함께 제안

## 완료 기준

- [ ] `data/exhibitions/*.json` 파일만 추가해서 새 기획전 페이지가 뜬다 (코드 수정 0줄)
- [ ] 같은 모듈로 모양이 다른 샘플 기획전이 2개 이상 있다
- [ ] 잘못된 JSON을 넣어도 페이지가 깨지지 않고 해당 섹션만 빠진다
- [ ] 모든 모듈이 Storybook에 있고, PC/모바일 스토리가 있다
- [ ] `npm run lint && npm run typecheck && npm run test && npm run build` 통과
- [ ] 키보드만으로 탭·캐러셀·아코디언을 조작할 수 있다 (jsx-a11y 경고 없음)

상세 배경(벤치마킹, 모듈 카탈로그 전체, 일정, 면접 어필 포인트)은 `docs/plan.md` 참고.
