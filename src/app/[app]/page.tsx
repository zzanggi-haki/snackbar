import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AppDemo } from "@/components/demo/AppDemo";
import { Feedback } from "@/components/feedback";
import { InstallCommand } from "@/components/install-command";
import {
  apps,
  asset,
  dmgUrl,
  getApp,
  installCommand,
  issuesUrl,
  repoUrl,
} from "@/lib/apps";
import { formatDate, getReleases } from "@/lib/github";

export function generateStaticParams() {
  return apps.map((app) => ({ app: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[app]">): Promise<Metadata> {
  const app = getApp((await params).app);
  if (!app) return {};
  return {
    title: `${app.name} ${app.emoji}`,
    description: app.tagline,
    openGraph: { title: `${app.name} ${app.emoji}`, description: app.pitch },
  };
}

// 목록에 없는 주소는 404
export const dynamicParams = false;

export default async function AppPage({ params }: PageProps<"/[app]">) {
  const app = getApp((await params).app);
  if (!app) notFound();

  const releases = await getReleases(app);
  const latest = releases[0];

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8">
      <section className="pt-12 sm:pt-16">
        <div
          className="inline-flex rounded-3xl p-3"
          style={{ background: app.wrap }}
        >
          <Image
            src={asset(app.icon)}
            alt=""
            width={88}
            height={88}
            priority
            className="size-[88px]"
          />
        </div>
        <h1 className="display mt-6 text-5xl sm:text-6xl">
          {app.name} <span aria-hidden>{app.emoji}</span>
        </h1>
        <p className="mt-4 text-xl font-semibold tracking-tight">
          {app.tagline}
        </p>
        <p className="mt-3 text-[17px] leading-relaxed text-slate">
          {app.pitch}
        </p>
      </section>

      {/* 페이지의 주인공: 어떻게 돌아가는지 */}
      <section className="mt-10 -mx-5 sm:-mx-16">
        <AppDemo slug={app.slug} />
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold text-stone">
          터미널에 한 줄 붙여넣으면 설치 끝
        </h2>
        <div className="mt-3">
          <InstallCommand command={installCommand(app)} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <a
            href={dmgUrl(app)}
            className="rounded-full bg-ink px-5 py-2.5 font-semibold text-paper hover:bg-ketchup hover:text-white"
          >
            {app.dmg} 받기
          </a>
          <span className="tabular text-slate">
            {latest && <>{latest.tag} · </>}
            {app.requires} · Apple Silicon · Intel
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-stone">
          .dmg로 받았다면 첫 실행 때 시스템 설정 → 개인정보 보호 및 보안 →
          “그래도 열기”를 한 번 눌러주세요. 한 줄 설치는 이 단계가 없어요.
        </p>
      </section>


      <section className="mt-12">
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {app.features.map((f) => (
            <div key={f.title} className="border-t border-hairline pt-4">
              <dt className="font-bold">{f.title}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-slate">
                {f.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="changelog" className="mt-20 scroll-mt-6">
        <h2 className="text-2xl font-bold tracking-tight">변경내역</h2>
        {releases.length === 0 ? (
          <p className="mt-4 text-slate">
            지금은 변경내역을 불러오지 못했어요.{" "}
            <a
              href={`${repoUrl(app)}/releases`}
              className="font-semibold text-ink underline underline-offset-4"
            >
              GitHub Releases에서 보기
            </a>
          </p>
        ) : (
          <ol className="mt-6 space-y-10">
            {releases.map((r) => (
              <li key={r.tag}>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-lg font-bold">
                    <a href={r.url} className="hover:text-ketchup-deep">
                      {r.name}
                    </a>
                  </h3>
                  <time
                    dateTime={r.publishedAt}
                    className="tabular text-sm text-stone"
                  >
                    {formatDate(r.publishedAt)}
                  </time>
                </div>
                <div className="notes mt-3">
                  <Markdown remarkPlugins={[remarkGfm]}>{r.body}</Markdown>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight">한마디 남기기</h2>
          <a
            href={issuesUrl(app)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate underline underline-offset-4 hover:text-ink"
          >
            버그 신고는 여기로
          </a>
        </div>
        <div className="mt-6">
          <Feedback
            term={app.slug}
            fallbackHref={issuesUrl(app)}
            fallbackLabel={`${app.name} 이슈 남기기`}
          />
        </div>
      </section>
    </div>
  );
}
