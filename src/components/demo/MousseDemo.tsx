"use client";

import { Stage, type DemoInfo } from "./Stage";
import { Cursor, Desktop, KeyHud, MenuBar, StatusItem } from "./primitives";

const RECT = { x: 540, y: 240, w: 230, h: 215 };
const PEN = "M190 186 C 260 192, 360 180, 470 190";

const beats = [0, 800, 1600, 2400, 3400, 4400, 6200, 6800, 7400, 8600, 9800, 11200, 12400];

function frame(b: number) {
  const cursor = (
    [
      { x: 300, y: 330 },
      { x: 470, y: 280 },
      { x: 470, y: 280 },
      { x: 660, y: 340 },
      { x: 360, y: 400 },
      { x: 690, y: 400 },
      { x: 690, y: 400 },
      { x: RECT.x, y: RECT.y },
      { x: RECT.x + RECT.w, y: RECT.y + RECT.h },
      { x: 470, y: 190 },
      { x: 470, y: 190 },
      { x: 600, y: 500 },
      { x: 600, y: 500 },
    ] as const
  )[b];
  const keys = b === 2 ? ["⌃", "⌥", "H"] : b === 5 ? ["⌃", "⌥", "L"] : b === 7 ? ["⌃", "⌥", "A"] : b === 8 ? ["R"] : b === 9 ? ["P"] : null;
  return {
    cursor,
    keys,
    halo: b >= 2 && b <= 4,
    spot: b === 5,
    drawMode: b >= 7 && b <= 10,
    rect: b >= 8 && b <= 11,
    pen: b >= 9 && b <= 11,
    fading: b === 11,
  };
}

export function MousseDemo({ app }: { app: DemoInfo }) {
  return (
    <Stage
      label={app.name}
      scenes={app.scenes}
      beats={beats}
      duration={13200}
      posterBeat={10}
      focus={() => ({ x: 100, w: 760, y: 40 })}
      sceneOf={(b) => (b <= 4 ? 0 : b <= 6 ? 1 : b <= 10 ? 2 : 3)}
      render={(b) => {
        const f = frame(b);
        return (
          <Desktop tone="plum">
            <MenuBar
              app="Keynote"
              right={
                <>
                  <StatusItem active={f.halo || f.drawMode}>🍫</StatusItem>
                  <StatusItem>⌁</StatusItem>
                </>
              }
            />

            <div className="ms-slide">
              <div className="ms-slide-kicker">Q3 REVIEW</div>
              <div className="ms-slide-title">3분기, 신규 가입이 두 배</div>
              <div className="ms-slide-bullets">
                <p>· 온보딩 3단계 → 1단계</p>
                <p>· 추천 코드 도입</p>
                <p>· 리텐션 41% → 52%</p>
              </div>
              <div className="ms-chart">
                {[38, 44, 52, 61, 96, 118].map((h, i) => (
                  <span key={i} style={{ height: h * 1.4 }} className={i >= 4 ? "is-hot" : ""} />
                ))}
              </div>
              <div className="ms-share">● 화면 공유 중</div>
            </div>

            {/* 그리기 레이어 */}
            <svg className={`ms-ink ${f.fading ? "is-fading" : ""}`} width="960" height="600">
              <rect
                className={`ms-ink-rect ${f.rect ? "is-drawn" : ""}`}
                x={RECT.x}
                y={RECT.y}
                width={RECT.w}
                height={RECT.h}
                rx="6"
                pathLength={1}
              />
              <path className={`ms-ink-pen ${f.pen ? "is-drawn" : ""}`} d={PEN} pathLength={1} />
            </svg>
            {f.drawMode && <div className="ms-drawmode">그리기 모드 · R 사각형 · P 펜 · Esc 끝</div>}
            {b === 10 && <div className="ms-fadehint">다 그리면 3초 뒤 사라져요</div>}

            <div
              className={`ms-spot ${f.spot ? "is-on" : ""}`}
              style={{ left: f.cursor.x + 4, top: f.cursor.y + 6 }}
            />

            <KeyHud keys={f.keys ?? []} show={!!f.keys} />
            <Cursor {...f.cursor} halo={f.halo} />
          </Desktop>
        );
      }}
    />
  );
}
