import { cacheLife } from "next/cache";
import { apps, OWNER, type SnackApp } from "./apps";

export type Release = {
  tag: string;
  name: string;
  body: string;
  url: string;
  publishedAt: string;
};

type GitHubRelease = {
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
};

async function fetchReleases(repo: string): Promise<Release[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${repo}/releases?per_page=10`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        // 없어도 동작하지만(시간당 60회), Vercel 공유 IP에서는 토큰이 있어야 안전하다.
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    },
  );
  // 실패는 캐시되지 않도록 던진다. 호출부(getReleases)가 받아서 빈 목록으로 바꾼다.
  if (!res.ok) throw new Error(`GitHub releases ${repo}: ${res.status}`);

  const data: GitHubRelease[] = await res.json();
  return data
    .filter((r) => !r.draft && !r.prerelease && r.published_at)
    .map((r) => ({
      tag: r.tag_name,
      name: r.name || r.tag_name,
      body: r.body ?? "",
      url: r.html_url,
      publishedAt: r.published_at!,
    }));
}

export async function getReleases(app: SnackApp): Promise<Release[]> {
  try {
    return await fetchReleases(app.repo);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export type FeedItem = Release & { app: SnackApp };

export async function getFeed(limit = 6): Promise<FeedItem[]> {
  const all = await Promise.all(
    apps.map(async (app) =>
      (await getReleases(app)).map((r) => ({ ...r, app })),
    ),
  );
  return all
    .flat()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Seoul",
});

export const formatDate = (iso: string) => dateFormat.format(new Date(iso));

/** 릴리스 노트의 첫 문단만 — 피드용 요약. 설치 안내 등 이후 섹션은 버린다. */
export function summarize(body: string) {
  const first = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#"));
  return (first ?? "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ");
}
