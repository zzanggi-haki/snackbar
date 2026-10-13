# Snackbar 🍿

맥 메뉴바에 올려두는 간식들 — zzanggi가 만든 macOS 메뉴바 앱 진열대. 기획은 [CLAUDE.md](CLAUDE.md).

```bash
npm install
npm run dev
```

- 앱 목록·문구: `src/lib/apps.ts`
- 버전·변경내역: 각 레포의 GitHub Releases에서 가져온다 (`src/lib/github.ts`, 1시간 캐시). 릴리스를 올리면 사이트가 따라온다.
- 환경변수: `.env.example` 참고. `GITHUB_TOKEN`(선택), giscus 네 값(없으면 Issues 링크로 대체).
