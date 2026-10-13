import Link from "next/link";
import { apps, OWNER } from "@/lib/apps";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 text-sm text-slate sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div>
          <p className="font-bold text-ink">🍿 Snackbar</p>
          <p className="mt-1">One bite, one job.</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {apps.map((app) => (
            <li key={app.slug}>
              <Link href={`/${app.slug}`} className="hover:text-ink">
                {app.emoji} {app.name}
              </Link>
            </li>
          ))}
        </ul>
        <p>
          만든 사람{" "}
          <a
            href={`https://github.com/${OWNER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline underline-offset-4"
          >
            zzanggi
          </a>
        </p>
      </div>
    </footer>
  );
}
