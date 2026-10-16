"use client";

import { Stage, type DemoInfo } from "./Stage";
import { AppGlyph, Cursor, Desktop, MenuBar, Popover, StatusItem } from "./primitives";

// 팝오버 배치(960×600 좌표). 커서 좌표를 레이아웃에서 바로 계산하려고 절대 배치로 그린다.
const POP = { x: 700, left: 510, top: 36, w: 380 };
const ROW_Y = { spotify: 156, chrome: 208, zoom: 260 };
const DROP_X = 216; // 팝오버 안에서 드롭다운 시작 x
const dropCenter = (row: number) => ({ x: POP.left + DROP_X + 75, y: POP.top + row + 26 });
const menuItemY = (row: number, i: number) => POP.top + row + 46 + i * 28 + 13;

const DEVICES = [
  { id: "mac", icon: "💻", name: "MacBook Pro 스피커" },
  { id: "airpods", icon: "🎧", name: "AirPods Pro" },
  { id: "britz", icon: "🔊", name: "Britz BR-1600BT" },
] as const;
type DeviceId = (typeof DEVICES)[number]["id"];

const APPS = [
  { id: "spotify", name: "Spotify", glyph: <AppGlyph bg="#1ed760">♫</AppGlyph> },
  {
    id: "chrome",
    name: "Google Chrome",
    glyph: <AppGlyph bg="conic-gradient(#ea4335 0 120deg,#fbbc05 0 240deg,#34a853 0)">●</AppGlyph>,
  },
  { id: "zoom", name: "Zoom", glyph: <AppGlyph bg="#2d8cff">▶</AppGlyph> },
] as const;
type AppId = (typeof APPS)[number]["id"];

const beats = [0, 700, 1500, 2600, 3300, 4100, 4700, 6700, 7400, 8200, 8800, 10800];

function frame(b: number) {
  const routes: Record<AppId, DeviceId | null> = {
    spotify: b >= 6 ? "britz" : null,
    chrome: b >= 10 ? "airpods" : null,
    zoom: null,
  };
  const open = b >= 2 && b <= 10;
  const menu: AppId | null = b === 4 || b === 5 ? "spotify" : b === 8 || b === 9 ? "chrome" : null;
  const hover = b === 5 ? 2 : b === 9 ? 1 : -1;

  const cursor =
    b === 0 ? { x: 470, y: 330 }
    : b <= 2 ? { x: POP.x - 4, y: 10 }
    : b <= 4 ? dropCenter(ROW_Y.spotify)
    : b <= 6 ? { x: 810, y: menuItemY(ROW_Y.spotify, 2) }
    : b <= 8 ? dropCenter(ROW_Y.chrome)
    : b <= 10 ? { x: 810, y: menuItemY(ROW_Y.chrome, 1) }
    : { x: 380, y: 470 };
  const click = [2, 4, 6, 8, 10, 11].includes(b) ? b : 0;

  return { routes, open, menu, hover, cursor, click };
}

export function SoundwichDemo({ app }: { app: DemoInfo }) {
  return (
    <Stage
      label={app.name}
      scenes={app.scenes}
      beats={beats}
      duration={12500}
      posterBeat={10}
      focus={(b) => (b === 6 || b === 11 ? { x: 16, w: 480, y: 90 } : { x: 470, w: 480 })}
      sceneOf={(b) => (b <= 2 ? 0 : b <= 5 ? 1 : b === 6 ? 2 : 3)}
      render={(b) => {
        const f = frame(b);
        const deviceOf = (a: AppId): DeviceId => f.routes[a] ?? "mac";
        return (
          <Desktop tone="sea">
            <MenuBar
              right={
                <>
                  <StatusItem active={f.open}>
                    <span className="sw-mbicon">🥪</span>
                  </StatusItem>
                  <StatusItem>⌁</StatusItem>
                  <StatusItem>◑</StatusItem>
                </>
              }
            />

            {/* 기기 패널: 어떤 앱 소리가 어디로 나가는지 */}
            <div className="sw-devices">
              {DEVICES.map((d) => {
                const here = APPS.filter((a) => deviceOf(a.id) === d.id);
                return (
                  <div key={d.id} className={`sw-device ${here.length ? "is-live" : ""}`}>
                    <div className="sw-device-icon">{d.icon}</div>
                    <div className="sw-device-body">
                      <div className="sw-device-name">{d.name}</div>
                      <div className="sw-device-apps">
                        {here.map((a) => (
                          <span key={a.id} className="sw-chip">
                            {a.glyph}
                          </span>
                        ))}
                        {!here.length && <span className="sw-silent">조용함</span>}
                      </div>
                    </div>
                    <div className="sw-eq" aria-hidden>
                      <i /><i /><i /><i />
                    </div>
                  </div>
                );
              })}
            </div>

            <Popover x={POP.x} width={POP.w} open={f.open}>
              <div className="sw-pop">
                <div className="sw-head">
                  <span>🥪</span>
                  <b>Soundwich</b>
                  <span className="sw-head-actions">⟳ ⚙︎ ⏻</span>
                </div>
                <div className="sw-label" style={{ top: 62 }}>SYSTEM</div>
                <div className="sw-row" style={{ top: 80 }}>
                  <span className="sw-row-icon">🔈</span>
                  <div>
                    <div className="sw-row-title">출력 장치</div>
                    <div className="sw-row-sub">MacBook Pro 스피커</div>
                  </div>
                  <span className="sw-drop">MacBook Pro 스피커</span>
                </div>
                <div className="sw-label" style={{ top: 138 }}>APPS</div>
                {APPS.map((a) => {
                  const routed = f.routes[a.id];
                  const dev = DEVICES.find((d) => d.id === (routed ?? "mac"))!;
                  return (
                    <div key={a.id} className="sw-row sw-row--app" style={{ top: ROW_Y[a.id] }}>
                      {a.glyph}
                      <div>
                        <div className="sw-row-title">{a.name}</div>
                        <div className={`sw-row-sub ${routed ? "is-routed" : ""}`}>
                          {routed ? `→ ${dev.name}` : "시스템 출력 따름"}
                        </div>
                      </div>
                      <span className={`sw-drop ${f.menu === a.id ? "is-pressed" : ""}`}>{dev.name}</span>
                      {f.menu === a.id && (
                        <div className="sw-menu">
                          {DEVICES.map((d, i) => (
                            <div key={d.id} className={i === f.hover ? "is-hover" : ""}>
                              {d.id === (routed ?? "mac") ? "✓ " : " "}
                              {d.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="sw-foot">
                  <span>
                    {Object.values(f.routes).filter(Boolean).length}개 라우팅 중
                  </span>
                  <span>v0.25</span>
                </div>
              </div>
            </Popover>

            <Cursor {...f.cursor} click={f.click} />
          </Desktop>
        );
      }}
    />
  );
}
