# 기획전·이벤트 통합 모듈 카탈로그

"기획전 페이지를 새로 개발하지 않고, 공통 모듈을 JSON 설정으로 조립해서 만든다"를 실제 동작하는
코드로 보여주는 Next.js 테스트앱입니다. **입사 준비용 포트폴리오 프로젝트**이며 실제 서비스가
아닙니다 — 로그인·결제·DB 연동은 전부 mock이고, 데이터는 `data/exhibitions/*.json`으로만
관리합니다. 전체 기획 배경은 [`docs/plan.md`](docs/plan.md)를 참고하세요.

## 시작하기

```bash
npm install
npm run dev          # http://localhost:3000
npm run storybook     # http://localhost:6006 — 컴포넌트 카탈로그
```

```bash
npm run lint && npm run typecheck && npm run test && npm run build   # 전체 검증
npm run test:e2e                                                     # 실제 브라우저 시나리오
```

샘플 기획전:

- `/exhibitions/autumn-sale` — 구현된 11개 모듈을 전부 한 페이지에서 확인
- `/exhibitions/winter-event` — 같은 모듈(BenefitCards)을 다르게 쓰고, ProductGrid 대신
  ProductSlider를 쓰는 두 번째 샘플
- `/exhibitions/broken-section-demo` — 알 수 없는 모듈 type과 스키마 검증 실패 섹션이 섞여
  있어도 페이지가 깨지지 않고 정상 섹션만 렌더링되는지 보여주는 샘플

## 구조

```
data/exhibitions/*.json    # 기획전 설정 — 이 파일만 추가하면 새 페이지가 뜬다
docs/
├─ plan.md                 # 원본 기획안
└─ specs/<모듈>.md          # 모듈별 스펙(구현 전에 먼저 작성)
src/
├─ app/exhibitions/[id]/    # 기획전 상세 페이지(JSON을 읽어 SectionRenderer로 렌더링)
├─ app/api/                 # 쿠폰 발급, 이벤트 응모 mock Route Handler
├─ styles/tokens.css        # 색상·여백·타이포 — 모든 값의 단일 소스
├─ components/ui/           # Button, Badge, Price, ProductCard, Section 등 공통 UI
├─ modules/<module-name>/   # 모듈 하나 = 폴더 하나(컴포넌트+schema+story+test)
├─ registry.ts              # type → { component, schema } 매핑
└─ SectionRenderer.tsx       # sections[] → registry 조회 → zod 검증 → 렌더링
```

**아키텍처**: 기획전 JSON → zod 스키마 검증 → `SectionRenderer`가 `registry`에서 컴포넌트를
찾아 순서대로 렌더링. 새 기획전은 JSON만 추가, 새 모듈은 컴포넌트+스키마를 레지스트리에
등록만 하면 됩니다. 모르는 `type`이나 스키마 검증 실패는 페이지 전체를 깨뜨리지 않고 해당
섹션만 건너뜁니다.

## 모듈 카탈로그 (11개 — P0 6개 + P1 4개 + 공통 5개)

| 분류    | 모듈                                                                                             | 비고                 |
| ------- | ------------------------------------------------------------------------------------------------ | -------------------- |
| 공통 UI | Button, Badge, Price, ProductCard, ResponsiveImage, Section                                      | `src/components/ui/` |
| P0      | HeroBanner, BannerCarousel, AnchorTabs, ProductGrid/ProductSlider, BenefitCards, NoticeAccordion | 정적 배포 기준       |
| P1      | CouponDownload, CountdownTimer, EventEntryForm, ShareBar                                         | mock API 연동        |

각 모듈 스펙은 `docs/specs/`에, Storybook 카탈로그(전부 PC/모바일 상태 포함)는
`npm run storybook`으로 확인할 수 있습니다.

## 새 모듈 추가하기

`/new-module <모듈명>` 커스텀 명령(`.claude/commands/new-module.md`)으로 시작하면 아래
6단계를 순서대로 안내합니다:

1. `docs/specs/<모듈>.md`에 스펙 작성
2. `src/modules/<module-name>/schema.ts`에 zod 스키마
3. `<Module>.tsx` 구현(서버 컴포넌트 기본, 상호작용 있는 부분만 `"use client"`)
4. `<Module>.stories.tsx`(기본/빈 데이터/모바일 상태)
5. `<Module>.test.tsx`
6. `src/registry.ts`에 등록

## AI(Claude Code) 활용 방식

혼자 개발하지만 3~4인 팀이 쓰는 방식(가상 역할 분담 + 브랜치 + PR)을 그대로 따랐습니다 —
`CLAUDE.md`에 기록된 개인 하네스([`react-webapp`](https://github.com/izumilover/claude-global-config))
오케스트레이션을 사용합니다.

- **가상 역할별 브랜치**: A(기반) → main 먼저 병합 → B(전시)/C(상품)/D(이벤트) 순차 진행,
  각각 `feat/*` 브랜치 + PR(`docs/specs/`에 스펙 먼저, 리뷰 체크리스트 포함)
- **모듈 추가 절차 고정**: 스펙 → 스키마 → 컴포넌트 → 스토리 → 테스트 → 레지스트리 등록 순서를
  프로젝트 `CLAUDE.md`에 규칙으로 박아두고 모든 모듈이 이 순서를 따름
- **완료 보고에는 증거**: "빌드된다"와 "실제로 된다"를 구분 — 매 PR마다 프로덕션 서버를 실제
  기동해 curl/Playwright로 렌더링 결과를 직접 확인한 뒤에만 완료로 보고

## 회고 — Claude가 실전에서 틀렸던 것과 막은 방법

코드 리뷰나 타입체크만으로는 못 잡고, 실제로 클릭해보거나 CI를 돌려봐야 드러난 문제들입니다.

| 문제                                                            | 원인                                                                                                      | 대응                                                                                            |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `EventEntryForm` 제출이 안 됨                                   | 공용 `Button`의 기본값이 `type="button"`인데 폼에서 `type="submit"`을 안 넘김                             | 유닛테스트로 발견 → 재발 방지로 실제 클릭→제출 e2e(`event-modules.spec.ts`) 추가                |
| CI 워크플로우가 즉시 실패(잡 0개)                               | `env: { KEY: ${{ ... }} }` flow-style YAML에서 `${{`의 중괄호가 파싱 충돌                                 | block 스타일로 전환, 로컬에서 `python -c "import yaml..."`로 재현·검증 후 수정                  |
| CI에서만 테스트가 깨짐                                          | jsdom 30.x가 Node 20을 지원 안 함(engines 요구사항) — 로컬은 Node 24라 안 보였음                          | CI Node 버전을 로컬과 맞추고 `package.json`에 `engines` 명시                                    |
| 팀 모드로 하네스를 프로젝트에 복사했더니 팀원 환경에서 무용지물 | `cp -r`이 심볼릭 링크(`~/.claude/agents` 등)를 그대로 복사 — 링크 자체가 복사한 사람의 로컬 경로를 가리킴 | `cp -rL`(역참조)로 실제 파일을 복사하도록 하네스 스킬 문서 자체를 수정                          |
| `BannerCarousel`/`CountdownTimer`에서 React 19 lint 에러        | `react-hooks/set-state-in-effect` — effect 안에서 setState를 동기 호출                                    | 가능한 경우 lazy initializer로 이동, hydration-safety처럼 의도된 경우는 이유를 남기고 예외 처리 |
| 클립보드 복사 테스트가 mock을 무시함                            | `userEvent.setup()`이 자체 clipboard stub을 심어 우리 mock을 덮어씀                                       | `defineProperty`를 `setup()` **이후**에 호출하도록 순서 변경                                    |
| `getByLabel("이름")`이 엉뚱한 체크박스도 찾음                   | Playwright `getByLabel`은 기본이 부분 일치라 동의 문구("...이름/연락처...")에도 매치                      | `{ exact: true }` 명시                                                                          |

**설계 선택**: 문서의 `productIds` 조회 방식 대신 section props에 상품 데이터를 직접 기술하도록
단순화했습니다(자체 DB/상품 API가 없는 프로젝트 특성상 조회 계층을 새로 만들 이유가 없어서 —
자세한 이유는 `docs/specs/product-grid.md` 참고). Server/Client Component 분리, zod 런타임
검증, registry를 통한 CMS 이식 용이성은 처음 설계대로 유지했습니다.
