export const OWNER = "zzanggi-haki";

export type SnackApp = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  pitch: string;
  repo: string;
  dmg: string;
  requires: string;
  icon: string;
  // shown: 화면에 보여줄 폭(px). 원본은 레티나 캡처라 그대로 쓰면 너무 크거나 작다.
  shot?: {
    src: string;
    width: number;
    height: number;
    shown: number;
    alt: string;
  };
  // 카드·상세 헤더에 깔리는 앱별 포장지 색
  wrap: string;
  features: { title: string; body: string }[];
};

export const apps: SnackApp[] = [
  {
    slug: "soundwich",
    name: "Soundwich",
    emoji: "🥪",
    tagline: "앱별 오디오 라우팅 — 앱마다 다른 출력 장치로",
    pitch:
      "스포티파이는 블루투스 스피커로, 화상회의는 에어팟으로, 나머지는 맥북 스피커로. 가상 오디오 드라이버 없이 앱마다 소리를 제자리로 보내요.",
    repo: "soundwich",
    dmg: "Soundwich.dmg",
    requires: "macOS 14.2+",
    icon: "/apps/soundwich-icon.png",
    shot: {
      src: "/apps/soundwich-shot.png",
      width: 1124,
      height: 1184,
      shown: 420,
      alt: "앱 3개를 서로 다른 출력 장치로 라우팅한 Soundwich 화면",
    },
    wrap: "#f3d9a4",
    features: [
      { title: "앱별 라우팅", body: "앱마다 출력 장치를 따로 지정해요." },
      { title: "동시 라우팅", body: "스포티파이는 스피커, 크롬은 헤드폰. 동시에." },
      { title: "설정 기억", body: "앱별로 저장되고, 다시 켜도 그대로예요." },
      {
        title: "기기 교체 대응",
        body: "에어팟을 빼면 자연스럽게 폴백, 다시 끼면 라우팅 복원.",
      },
    ],
  },
  {
    slug: "crumble",
    name: "Crumble",
    emoji: "🍪",
    tagline: "오늘 한 일이 부스러기처럼 남는 작업시간 트래커",
    pitch:
      "타이머를 켤 필요 없어요. 지금 쓰는 앱을 알아서 따라가며 일한 시간을 부스러기처럼 모아두고, 하루 끝에 “오늘 뭐 했지?”에 대신 답해줘요.",
    repo: "crumble",
    dmg: "Crumble.dmg",
    requires: "macOS 14+",
    icon: "/apps/crumble-icon.png",
    wrap: "#f6dfb8",
    features: [
      { title: "자동 기록", body: "맨 앞에 있는 앱을 따라가며 시간이 쌓여요." },
      { title: "유휴 감지", body: "입력이 없거나 화면이 잠기면 측정을 멈춰요." },
      { title: "목표와 축하", body: "앱별 목표 시간을 채우면 컨페티가 터져요." },
      { title: "통계", body: "주간·월간 차트와 CSV 내보내기." },
    ],
  },
  {
    slug: "pac-men-u",
    name: "Pac-men-u",
    emoji: "🟡",
    tagline: "픽셀 팩맨이 메뉴바 아이콘을 먹고 뱉는 메뉴바 정리기",
    pitch:
      "팩맨을 클릭하면 아이콘을 챱챱 먹어서 숨기고, 다시 클릭하면 뱉어서 보여줘요. 노치 뒤로 사라진 아이콘도 찾아서 구출합니다.",
    repo: "pac-men-u",
    dmg: "PAC-MEN-U.dmg",
    requires: "macOS 13+",
    icon: "/apps/pac-men-u-icon.png",
    shot: {
      src: "/apps/pac-men-u-shot.png",
      width: 380,
      height: 66,
      shown: 380,
      alt: "메뉴바에 올라간 Pac-men-u 팩맨 아이콘",
    },
    wrap: "#f7e08a",
    features: [
      { title: "먹기 / 뱉기", body: "클릭 한 번으로 메뉴바 아이콘을 숨기고 꺼내요." },
      { title: "노치 구출", body: "노치에 가려지는 순간 알아서 먹어 자리를 비워요." },
      { title: "팩미 바", body: "뱉어도 안 보이는 아이콘은 메뉴바 아래 바에 펼쳐요." },
      { title: "뱃속 리스트", body: "우클릭하면 숨긴 메뉴가 이름과 함께 나와요." },
    ],
  },
  {
    slug: "mousse",
    name: "Mousse",
    emoji: "🍫",
    tagline: "화면공유·발표용 커서 강조 / 찾기 / 그리기",
    pitch:
      "화면공유나 발표할 때 켜두는 커서 도구. 커서를 강조하고, 어디 있는지 스포트라이트로 찾고, 화면 위에 바로 그려요.",
    repo: "mousse",
    dmg: "Mousse.dmg",
    requires: "macOS 14.2+",
    icon: "/apps/mousse-icon.png",
    shot: {
      src: "/apps/mousse-shot.png",
      width: 800,
      height: 530,
      shown: 400,
      alt: "커서 강조, 위치 찾기, 그리기 도구가 있는 Mousse 메뉴",
    },
    wrap: "#e3c4a8",
    features: [
      { title: "커서 강조 ⌃⌥H", body: "채움 또는 링으로, 색·크기·투명도를 골라요." },
      { title: "위치 찾기 ⌃⌥L", body: "스포트라이트가 커서로 좁혀져요." },
      { title: "그리기 ⌃⌥A", body: "R 사각형, P 펜. 그린 건 3초 뒤 사라져요." },
      { title: "권한 없음", body: "세 도구 모두 별도 권한 없이 동작해요." },
    ],
  },
];

/** next/image는 basePath를 자동으로 붙여주지 않아서 public 경로에 직접 붙인다. */
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export function getApp(slug: string) {
  return apps.find((a) => a.slug === slug);
}

export const repoUrl = (app: SnackApp) =>
  `https://github.com/${OWNER}/${app.repo}`;

export const dmgUrl = (app: SnackApp) =>
  `${repoUrl(app)}/releases/latest/download/${app.dmg}`;

export const issuesUrl = (app: SnackApp) => `${repoUrl(app)}/issues/new`;

export const installCommand = (app: SnackApp) =>
  `curl -fsSL https://raw.githubusercontent.com/${OWNER}/${app.repo}/main/scripts/install.sh | bash`;
