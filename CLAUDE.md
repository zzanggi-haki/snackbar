# Snackbar — 맥 메뉴바 간식 가게

zzanggi가 만든 macOS 메뉴바 앱들을 모아 보여주고, 다운로드하고, 피드백을 받는 사이트.
브랜드 한 줄: **"맥 메뉴바에 올려두는 간식들"** — 가볍고, 한 입 크기고, 하나씩만 하는 앱.
슬로건: "One bite, one job."

## 진열할 앱 (4개)

| 앱 | 이모지 | 한 줄 | 레포 |
|---|---|---|---|
| Soundwich | 🥪 | 앱별 오디오 라우팅 — 앱마다 다른 출력 장치로 | github.com/zzanggi-haki/soundwich |
| Crumble | 🍪 | 오늘 한 일이 부스러기처럼 남는 작업시간 트래커 | github.com/zzanggi-haki/crumble (소스 폴더명은 MyWorkTracker) |
| Pac-men-u | 🟡 | 픽셀 팩맨이 메뉴바 아이콘을 먹고 뱉는 메뉴바 정리기 | github.com/zzanggi-haki/pac-men-u |
| Mousse | 🍫 | 화면공유·발표용 커서 강조/찾기/그리기 | github.com/zzanggi-haki/mousse |

mac-downloads-sorter는 **제외** (안 씀).

## 설계 원칙

- **진실의 원천은 GitHub, 사이트는 창.** 앱 버전·변경내역·다운로드 링크는 각 레포의
  GitHub Releases에서 빌드 시 fetch. 릴리스만 올리면 사이트가 갱신되어야 한다.
- 댓글·피드백은 **giscus**(GitHub Discussions). 별도 백엔드·DB 없음.
  Discussions는 `zzanggi-haki/snackbar` 한 곳에 모은다 (댓글은 Announcements, 로드맵 투표는 Polls).
- 버그 신고는 각 레포 Issues 링크. 폼 직접 만들지 않는다.
- 다운로드는 `.dmg` 직링크 + **한 줄 설치 커맨드 복사 버튼**
  (`curl -fsSL https://raw.githubusercontent.com/zzanggi-haki/<repo>/main/scripts/install.sh | bash`).
  네 앱 모두 `scripts/install.sh`가 있고, 각 레포 최신 릴리스에 고정 이름 `<App>.dmg` 자산이 있다
  (Soundwich.dmg / Crumble.dmg / PAC-MEN-U.dmg / Mousse.dmg) — `releases/latest/download/<App>.dmg`로 접근 가능.
  빌드는 각 레포 `scripts/build_dmg.sh` (universal, ad-hoc 서명).
- 배포: GitHub Pages (정적 내보내기 + Actions, 6시간마다 예약 빌드로 릴리스 반영). 수익화 계획이 있어 Vercel 무료 플랜은 제외.
  분석 도구는 미정.

## 페이지

1. `/` — 간식 진열대. 앱 카드 4개(이모지·한 줄·다운로드), 아래 "최근 업데이트" 피드(릴리스 노트 자동).
2. `/<app>` — 스크린샷 또는 15초 영상, 한 줄 설치 커맨드, 변경내역, giscus 댓글.
   쓰레드/인스타에서 링크하는 유일한 주소.
3. `/about` — 왜 만드는지 한 문단, 로드맵 투표(Discussions 투표).

## 스택

Next.js (App Router) + TypeScript + Tailwind v4, `src/` 구조, npm.
howmuchbook(zzanggi-haki/howmuchbook)과 같은 결로 — Pretendard Variable 폰트, CSS-first 토큰.

## 아직 안 정한 것

- 도메인 (snackbar.* 가격 확인 후 결정, 비싸면 서브 경로)
- 스크린샷 통일: 네 앱 모두 같은 배경에서 다시 찍기

## 홍보 (참고)

쓰레드 주력(주 3~4회: 문제→간식 / 빌드 로그 / 질문형 / 피드백 인용, 링크는 첫 댓글에),
인스타 보조(15초 before/after 릴스 + 앱 카드 그리드). 생산성 카테고리.
