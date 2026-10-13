import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { MenuBar } from "@/components/menu-bar";
import { apps } from "@/lib/apps";
import { formatDate, getFeed, getReleases, summarize } from "@/lib/github";

export default async function Home() {
  const [feed, latest] = await Promise.all([
    getFeed(6),
    Promise.all(apps.map(async (app) => (await getReleases(app))[0]?.tag)),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
        <MenuBar />
        <p className="mt-14 text-sm font-semibold tracking-wide text-ketchup-deep uppercase">
          One bite, one job.
        </p>
        <h1 className="display mt-3 text-[2.5rem] sm:text-6xl">
          맥 메뉴바에 올려두는
          <br />
          간식들
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
          가볍고, 한 입 크기고, 하나씩만 하는 메뉴바 앱. 필요한 것만 골라
          올려두세요. 전부 무료고 소스도 열려 있어요.
        </p>
      </section>

      <section id="shelf" className="scroll-mt-6">
        <h2 className="text-sm font-semibold text-stone">오늘의 진열대</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {apps.map((app, i) => (
            <AppCard key={app.slug} app={app} version={latest[i]} />
          ))}
        </div>
      </section>

      {feed.length > 0 && (
        <section className="mt-20">
          <h2 className="text-sm font-semibold text-stone">최근 업데이트</h2>
          <ol className="mt-4 divide-y divide-hairline border-y border-hairline">
            {feed.map((item) => (
              <li
                key={`${item.app.slug}-${item.tag}`}
                className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[9rem_1fr]"
              >
                <time
                  dateTime={item.publishedAt}
                  className="tabular text-sm text-stone"
                >
                  {formatDate(item.publishedAt)}
                </time>
                <div>
                  <Link
                    href={`/${item.app.slug}#changelog`}
                    className="font-semibold hover:text-ketchup-deep"
                  >
                    <span aria-hidden>{item.app.emoji}</span> {item.app.name}{" "}
                    <span className="tabular">{item.tag}</span>
                  </Link>
                  <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-slate">
                    {summarize(item.body)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
