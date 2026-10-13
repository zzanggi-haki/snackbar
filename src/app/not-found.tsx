import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <p className="text-5xl" aria-hidden>
        🫙
      </p>
      <h1 className="display mt-6 text-4xl">이 칸은 비어 있어요</h1>
      <p className="mt-4 text-slate">
        찾는 간식이 없거나 주소가 바뀌었어요.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ketchup hover:text-white"
      >
        진열대로 돌아가기
      </Link>
    </div>
  );
}
