import type { Metadata } from "next";
import { Feedback } from "@/components/feedback";
import { OWNER } from "@/lib/apps";

export const metadata: Metadata = {
  title: "About",
  description: "Snackbar를 왜 만드는지, 그리고 다음에 뭘 만들지.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8">
      <section className="pt-12 sm:pt-16">
        <p className="text-sm font-semibold tracking-wide text-ketchup-deep uppercase">
          About
        </p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">
          필요해서 만들고,
          <br />
          한 입 크기로 남깁니다
        </h1>
        <p className="mt-6 text-[17px] leading-loose text-slate">
          맥을 쓰다 보면 “이것만 되면 되는데” 싶은 순간이 있어요. 앱마다 소리를
          다른 스피커로 보내고 싶거나, 오늘 뭘 했는지 알고 싶거나, 메뉴바가
          노치에 먹히거나, 화면공유 중에 커서가 안 보이거나. 그럴 때마다 큰 앱을
          하나 더 까는 대신 그 일 하나만 하는 작은 메뉴바 앱을 만들었습니다.
          Snackbar는 그 간식들을 한자리에 올려둔 진열대예요. 전부 무료고,
          소스는 GitHub에 열려 있고, 한 가지 일만 합니다.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight">다음 간식 고르기</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate">
          다음에 뭘 만들지, 지금 있는 간식에 뭘 더할지 투표하고 제안해 주세요.
        </p>
        <div className="mt-6">
          <Feedback
            term="roadmap"
            fallbackHref={`https://github.com/${OWNER}`}
            fallbackLabel="GitHub에서 zzanggi 찾아가기"
          />
        </div>
      </section>
    </div>
  );
}
