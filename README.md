# Snackbar 🍿

맥 메뉴바에 올려두는 간식들 — zzanggi가 만든 macOS 메뉴바 앱 진열대. 기획은 [CLAUDE.md](CLAUDE.md).

```bash
npm install
npm run dev
```

- 앱 목록·문구: `src/lib/apps.ts`
- 버전·변경내역: 각 레포의 GitHub Releases에서 가져온다 (`src/lib/github.ts`, 빌드 시점).
- 환경변수: `.env.example` 참고. `GITHUB_TOKEN`(선택), giscus 네 값(없으면 Issues 링크로 대체).
- 배포: GitHub Pages. `main`에 push하면 `.github/workflows/deploy.yml`이 정적 빌드(`out/`)를 올리고, 앱 레포가 릴리스 직후 `app-released` 신호를 보내면 다시 빌드해 반영한다. 신호 없이 릴리스했으면 Actions 탭에서 수동 실행.
