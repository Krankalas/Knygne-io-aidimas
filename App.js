import { useState, useEffect, useRef, useCallback } from "react";

// ─── QUESTIONS BY LEVEL ──────────────────────────────────────────────────────
const Q_LEVEL_1 = [
  {
    q: "Kuriai imperijai priklausė Lietuva XIX amžiuje?",
    opts: ["Prancūzijos", "Rusijos", "Vokietijos", "Austrijos"],
    a: 1,
  },
  {
    q: "Ką veikė knygnešiai?",
    opts: [
      "Rašė knygas",
      "Slapta gabeno knygas",
      "Degino knygas",
      "Vertė knygas",
    ],
    a: 1,
  },
  {
    q: "Kiek metų truko spaudos draudimas?",
    opts: ["20 metų", "30 metų", "40 metų", "50 metų"],
    a: 2,
  },
  {
    q: "Kuo svarbios buvo lietuviškos knygos?",
    opts: ["Pramogai", "Religijai", "Padėjo išsaugoti kalbą", "Tik prekybai"],
    a: 2,
  },
  {
    q: "Knygnešiai laikomi...",
    opts: [
      "Nusikaltėliais",
      "Pirkliais",
      "Keistuoliais",
      "Lietuvos didvyriais",
    ],
    a: 3,
  },
];

const Q_LEVEL_2 = [
  {
    q: "Kodėl knygnešiai dažniausiai keliaudavo naktimis?",
    opts: [
      "Kad nebūtų karšta",
      "Kad nebūtų pastebėti",
      "Nes naktimis nesimiegojo",
      "Kad gyvūnų būtų mažiau",
    ],
    a: 1,
  },
  {
    q: "Kur buvo spausdinamos lietuviškos knygos?",
    opts: ["Vilniuje", "Rygoje", "Mažojoje Lietuvoje", "Varšuvoje"],
    a: 2,
  },
  {
    q: "Kaip vadinosi slapti mokytojai?",
    opts: ["Knygnešiai", "Daraktoriai", "Vyskupai", "Rašeivos"],
    a: 1,
  },
  {
    q: "Kur knygnešiai slėpė knygas?",
    opts: [
      "Po grindimis",
      "Šiene",
      "Bažnyčių bokštuose",
      "Visi atsakymai teisingai",
    ],
    a: 3,
  },
  {
    q: "Kas buvo Motiejus Valančius?",
    opts: ["Caras", "Žemaičių vyskupas", "Karvedys", "Pirklys"],
    a: 1,
  },
];

const Q_LEVEL_3 = [
  {
    q: "Kuriais metais buvo uždraustos lietuviškos knygos?",
    opts: ["1864", "1855", "1840", "1900"],
    a: 0,
  },
  {
    q: "Kuriais metais panaikintas spaudos draudimas?",
    opts: ["1900", "1902", "1904", "1910"],
    a: 2,
  },
  {
    q: "Ką knygnešiai platino be knygų?",
    opts: [
      "Tik kalendorius",
      "Visi atsakymai teisingi",
      "Tik maldaknyges",
      "Tik laikraščius",
    ],
    a: 1,
  },
  {
    q: "Kokia bausmė grėsė sugautiems knygnešiams?",
    opts: [
      "Knygų konfiskavimas",
      "Baudos",
      "Tremtis",
      "Visi atsakymai teisingi",
    ],
    a: 3,
  },
  {
    q: "Kaip vadinosi žymiausias knygnešys?",
    opts: [
      "Motiejus Valančius",
      "Jonas Basanavičius",
      "Jurgis Bielinis",
      "Vincas Kudirka",
    ],
    a: 2,
  },
];

const Q_LEVEL_4 = [
  {
    q: "Kokiu raidynu spausdintos lietuviškos knygos buvo draudžiamos?",
    opts: [
      "Lotynišku raidynu",
      "Kirilica",
      "Graikų raidynu",
      "Hebrajišku raidynu",
    ],
    a: 0,
  },
  {
    q: "Kur dažniausiai būdavo tremiami sugauti knygnešiai?",
    opts: ["Į Lenkija", "Į Italiją", "Į Prancūziją", "Į Sibirą"],
    a: 3,
  },
  {
    q: "Kurią dieną minima Knygnešio diena?",
    opts: ["Kovo 11 d.", "Kovo 16 d.", "Vasario 16 d.", "Sausio 13 d."],
    a: 1,
  },
  {
    q: "Koks judėjimas stiprėjo dėl knygnešių veiklos?",
    opts: [
      "Pramonės plėtra",
      "Tautinis atgimimas",
      "Sporto sąjūdis",
      "Jūrų prekyba",
    ],
    a: 1,
  },
  {
    q: "Kas buvo daraktoriai?",
    opts: [
      "Slapti mokytojai",
      "Karininkai",
      "Knygų spaustuvininkai",
      "Muitininkai",
    ],
    a: 0,
  },
];

const Q_LEVEL_5 = [
  {
    q: "Iš kur dažniausiai buvo gabenama draudžiama lietuviška spauda?",
    opts: [
      "Iš Rusijos gilumos",
      "Iš Latvijos",
      "Iš Mažosios Lietuvos",
      "Iš Lenkijos",
    ],
    a: 2,
  },
  {
    q: "Kuo Motiejus Valančius prisidėjo prie knygnešystės?",
    opts: [
      "Draudė lietuviškas knygas",
      "Organizavo ir rėmė lietuviškų knygų platinimą",
      "Buvo caro pareigūnas",
      "Uždarinėjo slaptas mokyklas",
    ],
    a: 1,
  },
  {
    q: "Koks buvo vienas svarbiausių knygnešių tikslų?",
    opts: [
      "Pelnas",
      "Išlaikyti lietuvių kalbą ir tapatybę",
      "Plėsti karinę galią",
      "Kurti valdžios įstatymus",
    ],
    a: 1,
  },
  {
    q: "Koks laikraštis tapo svarbus tautiniam atgimimui?",
    opts: ["Šviesa", "Lietuva", "Žemaitis", "Aušra"],
    a: 3,
  },
  {
    q: "Kodėl knygnešių veikla buvo reikšminga Lietuvos istorijai?",
    opts: [
      "Ji padėjo išsaugoti kalbą, švietimą ir tautinę savimonę",
      "Ji skatino emigraciją",
      "Ji buvo tik religinė veikla",
      "Ji neturėjo didelės reikšmės",
    ],
    a: 0,
  },
];

// ─── STABLE STATIC DATA ───────────────────────────────────────────────────────
const STATIC_TREES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: 15 + i * 33 + (i % 3) * 7,
  y: 195 + (i % 4) * 16,
  h: 52 + (i % 5) * 13,
  w: 15 + (i % 4) * 5,
  delay: (i * 0.25).toFixed(2),
}));

const STATIC_STARS = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  x: parseFloat(((i * 137.508) % 720).toFixed(1)),
  y: parseFloat(((i * 97.31) % 185).toFixed(1)),
  r: 0.5 + (i % 3) * 0.5,
  dur: (1.5 + (i % 4) * 0.7).toFixed(1),
  delay: ((i * 0.13) % 3).toFixed(2),
}));

const ROAD_Y = 316;
const PLAYER_START_X = 80;
const FINISH_X = 678;
const GUARD_POSITIONS = [150, 260, 370, 480, 590];

// ─── SVG COMPONENTS ──────────────────────────────────────────────────────────
function Guard({ x, y, alertLevel }) {
  const col =
    alertLevel > 0.7 ? "#ef4444" : alertLevel > 0.4 ? "#f59e0b" : "#6b7280";

  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="-22" r="8" fill={col} opacity="0.9" />
      <rect
        x="-6"
        y="-14"
        width="12"
        height="18"
        rx="2"
        fill={col}
        opacity="0.85"
      />
      <rect
        x="-10"
        y="-14"
        width="5"
        height="14"
        rx="2"
        fill={col}
        opacity="0.7"
      />
      <rect
        x="5"
        y="-14"
        width="5"
        height="14"
        rx="2"
        fill={col}
        opacity="0.7"
      />
      <rect
        x="-5"
        y="4"
        width="4"
        height="12"
        rx="2"
        fill={col}
        opacity="0.7"
      />
      <rect x="1" y="4" width="4" height="12" rx="2" fill={col} opacity="0.7" />
      {alertLevel > 0.5 && (
        <text x="0" y="-36" textAnchor="middle" fontSize="14" fill="#fbbf24">
          !
        </text>
      )}
    </g>
  );
}

function Player({ x, y, scared }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x="-14"
        y="-12"
        width="11"
        height="15"
        rx="2"
        fill="#92400e"
        opacity="0.95"
      />
      <rect
        x="-12"
        y="-10"
        width="7"
        height="2"
        rx="1"
        fill="#f0c040"
        opacity="0.7"
      />
      <circle cx="0" cy="-22" r="9" fill="#d97706" />
      <rect x="-7" y="-13" width="14" height="18" rx="2" fill="#78350f" />
      <rect x="-11" y="-13" width="5" height="15" rx="2" fill="#92400e" />
      <rect x="6" y="-13" width="5" height="15" rx="2" fill="#92400e" />
      <rect x="-6" y="5" width="5" height="12" rx="2" fill="#78350f" />
      <rect x="1" y="5" width="5" height="12" rx="2" fill="#78350f" />
      {scared && (
        <text x="0" y="-40" textAnchor="middle" fontSize="14" fill="#fca5a5">
          !
        </text>
      )}
    </g>
  );
}

function GameScene({ level, playerX, guardAlerts, nextCheckpoint, scared }) {
  const moonOp = 0.52 + level * 0.09;

  return (
    <svg
      viewBox="0 0 720 400"
      style={{ display: "block", width: "100%", background: "#050c07" }}
    >
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020a04" />
          <stop offset="100%" stopColor="#0b1c0e" />
        </linearGradient>
        <linearGradient id="roadG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#191006" />
          <stop offset="100%" stopColor="#0c0b06" />
        </linearGradient>
      </defs>

      <rect width="720" height="400" fill="url(#skyG)" />

      {STATIC_STARS.map((s) => (
        <circle
          key={s.id}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="white"
          opacity="0.7"
          style={{
            animation: `twinkle ${s.dur}s ${s.delay}s infinite alternate`,
          }}
        />
      ))}

      <circle cx="618" cy="54" r="42" fill="#fefce8" opacity={moonOp * 0.25} />
      <circle
        cx="618"
        cy="54"
        r="31"
        fill="#fefce8"
        opacity={moonOp}
        style={{ animation: "moonGlow 4s infinite" }}
      />
      <circle cx="631" cy="47" r="26" fill="#050c07" opacity={moonOp * 0.97} />

      {STATIC_TREES.map((t) => (
        <g
          key={t.id}
          style={{
            animation: `sway 4s ${t.delay}s infinite ease-in-out`,
            transformOrigin: `${t.x}px ${t.y}px`,
          }}
        >
          <rect
            x={t.x - t.w / 4}
            y={t.y - t.h * 0.18}
            width={t.w / 2}
            height={t.h * 0.22}
            fill="#2d1900"
          />
          <polygon
            points={`${t.x},${t.y - t.h} ${t.x + t.w / 2},${t.y - t.h * 0.22} ${
              t.x - t.w / 2
            },${t.y - t.h * 0.22}`}
            fill="#091a09"
          />
          <polygon
            points={`${t.x},${t.y - t.h * 0.72} ${t.x + t.w * 0.63},${t.y} ${
              t.x - t.w * 0.63
            },${t.y}`}
            fill="#0c2a0c"
          />
        </g>
      ))}

      <rect x="0" y={ROAD_Y - 10} width="720" height="110" fill="url(#roadG)" />
      <rect
        x="0"
        y={ROAD_Y - 10}
        width="720"
        height="2"
        fill="#3d2200"
        opacity="0.55"
      />

      {[70, 150, 230, 310, 390, 470, 550, 630].map((x) => (
        <rect
          key={x}
          x={x}
          y={ROAD_Y + 22}
          width="38"
          height="4"
          rx="2"
          fill="#3d2200"
          opacity="0.4"
        />
      ))}

      <rect
        x={FINISH_X - 4}
        y={ROAD_Y - 14}
        width="7"
        height="100"
        fill="#f0c040"
        opacity="0.85"
      />
      <text x={FINISH_X + 5} y={ROAD_Y - 18} fill="#f0c040" fontSize="11">
        Tikslas
      </text>

      {GUARD_POSITIONS.map((gx, i) => (
        <line
          key={i}
          x1={gx}
          y1={ROAD_Y - 14}
          x2={gx}
          y2={ROAD_Y + 88}
          stroke={i < nextCheckpoint ? "#4ade80" : "#ef4444"}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.35"
        />
      ))}

      {GUARD_POSITIONS.map((gx, i) =>
        guardAlerts[i] > 0.3 ? (
          <circle
            key={i}
            cx={gx}
            cy={ROAD_Y + 16}
            r={88 * guardAlerts[i]}
            fill="none"
            stroke={guardAlerts[i] > 0.7 ? "#ef4444" : "#f59e0b"}
            strokeWidth="1"
            opacity={guardAlerts[i] * 0.38}
          />
        ) : null
      )}

      {GUARD_POSITIONS.map((gx, i) => (
        <Guard key={i} x={gx} y={ROAD_Y + 16} alertLevel={guardAlerts[i]} />
      ))}

      {GUARD_POSITIONS.map((gx, i) => (
        <ellipse
          key={i}
          cx={gx}
          cy={ROAD_Y + 38}
          rx="30"
          ry="14"
          fill="#f59e0b"
          opacity={0.03 + guardAlerts[i] * 0.08}
        />
      ))}

      <Player x={playerX} y={ROAD_Y + 16} scared={scared} />

      <text x="28" y={ROAD_Y - 18} fill="#6b4400" fontSize="10">
        Pradžia
      </text>
    </svg>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Game() {
  const [screen, setScreen] = useState("intro");
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(PLAYER_START_X);
  const [moving, setMoving] = useState(false);
  const [guardAlerts, setGuardAlerts] = useState([0, 0, 0, 0, 0]);
  const [currentQ, setCurrentQ] = useState(null);
  const [used1, setUsed1] = useState([]);
  const [used2, setUsed2] = useState([]);
  const [used3, setUsed3] = useState([]);
  const [used4, setUsed4] = useState([]);
  const [used5, setUsed5] = useState([]);
  const [selAns, setSelAns] = useState(null);
  const [ansRes, setAnsRes] = useState(null);
  const [scared, setScared] = useState(false);
  const [nextCP, setNextCP] = useState(0);
  const [totalAns, setTotalAns] = useState(0);
  const [totalOk, setTotalOk] = useState(0);

  const animRef = useRef(null);
  const pxRef = useRef(PLAYER_START_X);
  const movRef = useRef(false);
  const cpRef = useRef(0);
  const lvlRef = useRef(1);

  useEffect(() => {
    lvlRef.current = level;
  }, [level]);

  useEffect(() => {
    cpRef.current = nextCP;
  }, [nextCP]);

  function pickQ(lvl, u1, u2, u3, u4, u5) {
    const pools = {
      1: [Q_LEVEL_1, u1, setUsed1],
      2: [Q_LEVEL_2, u2, setUsed2],
      3: [Q_LEVEL_3, u3, setUsed3],
      4: [Q_LEVEL_4, u4, setUsed4],
      5: [Q_LEVEL_5, u5, setUsed5],
    };

    const [pool, used, setUsed] = pools[lvl] || pools[1];
    const avail = pool.filter((_, i) => !used.includes(i));
    const src = avail.length > 0 ? avail : pool;

    if (avail.length === 0) setUsed([]);

    const idx = Math.floor(Math.random() * src.length);

    setUsed((prev) => {
      const origIdx = pool.indexOf(src[idx]);
      return prev.includes(origIdx) ? prev : [...prev, origIdx];
    });

    return src[idx];
  }

  const stopMove = useCallback(() => {
    movRef.current = false;
    setMoving(false);
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  const triggerQ = useCallback(() => {
    stopMove();
    const q = pickQ(lvlRef.current, used1, used2, used3, used4, used5);
    setCurrentQ(q);
    setSelAns(null);
    setAnsRes(null);
    setScreen("question");
  }, [stopMove, used1, used2, used3, used4, used5]);

  const toggleMove = useCallback(() => {
    if (movRef.current) {
      stopMove();
      return;
    }

    movRef.current = true;
    setMoving(true);

    const speedMap = {
      1: 1.0,
      2: 1.25,
      3: 1.55,
      4: 1.9,
      5: 2.3,
    };

    const speed = speedMap[lvlRef.current] || 1.0;

    const tick = () => {
      if (!movRef.current) return;

      pxRef.current = Math.min(pxRef.current + speed, FINISH_X);
      setPlayerX(pxRef.current);
      setGuardAlerts(
        GUARD_POSITIONS.map((gx) =>
          Math.max(0, 1 - Math.abs(pxRef.current - gx) / 112)
        )
      );

      const cp = GUARD_POSITIONS[cpRef.current];
      if (
        cp !== undefined &&
        pxRef.current >= cp - 20 &&
        pxRef.current <= cp + 6
      ) {
        const ci = cpRef.current;
        cpRef.current = ci + 1;
        setNextCP(ci + 1);
        triggerQ();
        return;
      }

      if (pxRef.current >= FINISH_X) {
        movRef.current = false;
        setMoving(false);
        setScreen("levelup");
        return;
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
  }, [stopMove, triggerQ]);

  function answerQ(idx) {
    if (ansRes) return;

    setSelAns(idx);
    setTotalAns((t) => t + 1);

    const ok = idx === currentQ.a;
    setAnsRes(ok ? "correct" : "wrong");

    if (ok) {
      setTotalOk((t) => t + 1);
      setScore(
        (s) =>
          s +
          (level === 1
            ? 8
            : level === 2
            ? 10
            : level === 3
            ? 12
            : level === 4
            ? 16
            : 20)
      );
    } else {
      setScared(true);
      setTimeout(() => setScared(false), 900);
    }

    setTimeout(() => {
      if (!ok) {
        const nl = lives - 1;
        setLives(nl);
        if (nl <= 0) {
          setScreen("gameover");
          return;
        }
      }
      setScreen("playing");
    }, 1400);
  }

  function initLvl(lvl) {
    pxRef.current = PLAYER_START_X;
    cpRef.current = 0;
    setPlayerX(PLAYER_START_X);
    setNextCP(0);
    setGuardAlerts([0, 0, 0, 0, 0]);
    setMoving(false);
    movRef.current = false;
    setCurrentQ(null);
    setSelAns(null);
    setAnsRes(null);
    setLevel(lvl);
    lvlRef.current = lvl;
    setScreen("playing");
  }

  function doNextLevel() {
    const nl = level + 1;

    if (nl > 5) {
      setScreen("win");
      return;
    }

    setLives((l) => Math.min(l + 1, 3));
    initLvl(nl);
  }

  function reset() {
    setLives(3);
    setScore(0);
    setUsed1([]);
    setUsed2([]);
    setUsed3([]);
    setUsed4([]);
    setUsed5([]);
    setTotalAns(0);
    setTotalOk(0);
    setScared(false);
    setCurrentQ(null);
    setSelAns(null);
    setAnsRes(null);
    setScreen("intro");
  }

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    if (screen === "question" && !currentQ) {
      setCurrentQ(pickQ(level, used1, used2, used3, used4, used5));
    }
  }, [screen, currentQ, level, used1, used2, used3, used4, used5]);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    .gw{min-height:100vh;background:linear-gradient(180deg,#030a04 0%,#091409 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Crimson Text',Georgia,serif;padding:1rem;user-select:none;}
    @keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.9}}
    @keyframes sway{0%,100%{transform:rotate(-1.3deg)}50%{transform:rotate(1.3deg)}}
    @keyframes moonGlow{0%,100%{opacity:.85}50%{opacity:1}}
    @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
    @keyframes slideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes glow{0%,100%{box-shadow:0 0 10px rgba(212,160,23,.3)}50%{box-shadow:0 0 28px rgba(212,160,23,.75)}}
    .mbtn{background:linear-gradient(135deg,#78350f,#92400e);border:2px solid #d97706;border-radius:50px;color:#fde68a;font-family:'Crimson Text',serif;font-size:1.05rem;font-weight:600;padding:.7rem 1.8rem;cursor:pointer;transition:all .2s;}
    .mbtn:hover{transform:scale(1.03);}
    .mbtn.on{background:linear-gradient(135deg,#14532d,#166534);border-color:#4ade80;color:#bbf7d0;animation:pulse 1s infinite;}
    .obtn{background:rgba(25,15,3,.88);border:2px solid #6b4400;border-radius:10px;color:#fde68a;font-family:'Crimson Text',serif;font-size:1rem;padding:.7rem 1rem;cursor:pointer;text-align:left;transition:all .2s;backdrop-filter:blur(4px);}
    .obtn:hover:not(:disabled){border-color:#d97706;background:rgba(48,28,4,.92);transform:translateX(4px);}
    .obtn.ok{background:rgba(20,83,45,.95);border-color:#4ade80;color:#bbf7d0;}
    .obtn.bad{background:rgba(69,10,10,.95);border-color:#ef4444;color:#fca5a5;}
  `;

  const lvlNames = [
    "Pirmasis žingsnis",
    "Slaptas kelias",
    "Pavojingas perėjimas",
    "Sunki naktis",
    "Paskutinė siena",
  ];

  const lvlColors = ["#4ade80", "#84cc16", "#f59e0b", "#f97316", "#ef4444"];

  const difficultyNames = [
    "Labai lengvas",
    "Lengvas",
    "Vidutinis",
    "Sunkus",
    "Labai sunkus",
  ];

  const progress = Math.min(
    100,
    ((playerX - PLAYER_START_X) / (FINISH_X - PLAYER_START_X)) * 100
  );

  if (screen === "intro") {
    return (
      <div className="gw">
        <style>{css}</style>
        <div
          style={{
            textAlign: "center",
            maxWidth: 520,
            animation: "slideIn .5s ease",
          }}
        >
          <div style={{ fontSize: "5rem", marginBottom: ".4rem" }}>🌙</div>
          <h1
            style={{
              fontFamily: "'Crimson Text',serif",
              fontSize: "clamp(1.8rem,5vw,2.8rem)",
              color: "#f0c040",
              textShadow: "0 0 20px rgba(240,192,64,.5)",
              marginBottom: ".3rem",
            }}
          >
            Knygnešio kelias
          </h1>
          <p
            style={{
              color: "#92400e",
              fontSize: ".95rem",
              marginBottom: "1.5rem",
              fontStyle: "italic",
            }}
          >
            1864–1904 · Spaudos draudimo laikai
          </p>
          <div
            style={{
              background: "rgba(18,10,0,.9)",
              border: "1px solid #6b4400",
              borderRadius: 14,
              padding: "1.2rem 1.5rem",
              marginBottom: "1.4rem",
              textAlign: "left",
            }}
          >
            <p style={{ color: "#fde68a", lineHeight: 1.8, fontSize: "1rem" }}>
              Tu esi <strong style={{ color: "#f0c040" }}>knygnešys</strong>.
              Naktį turi pervežti draudžiamas lietuviškas knygas per sargybinių
              postus. Paspausk mygtuką – eisi. Paspausk vėl – sustosi.
              Kiekvienas sargybinis užduos klausimą. Atsakyk teisingai ir
              prasibrauk.
            </p>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: ".9rem",
                flexWrap: "wrap",
              }}
            >
              {[
                ["3 gyvybės", "#ef4444"],
                ["25 klausimai", "#f0c040"],
                ["5 lygiai", "#60a5fa"],
              ].map(([t, c]) => (
                <span
                  key={t}
                  style={{ color: c, fontSize: ".87rem", fontWeight: 600 }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <button
            className="mbtn"
            onClick={() => initLvl(1)}
            style={{
              fontSize: "1.15rem",
              padding: "1rem 3rem",
              animation: "glow 2s infinite",
            }}
          >
            Pradėti kelionę
          </button>
        </div>
      </div>
    );
  }

  if (screen === "question") {
    return (
      <div className="gw">
        <style>{css}</style>
        <div
          style={{
            width: "100%",
            maxWidth: 560,
            animation: "slideIn .3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".9rem",
              marginBottom: ".9rem",
              background: "rgba(55,10,10,.68)",
              border: "1px solid #ef4444",
              borderRadius: 12,
              padding: ".75rem 1rem",
            }}
          >
            <div>
              <p
                style={{
                  color: "#fca5a5",
                  fontWeight: 600,
                  fontSize: ".98rem",
                }}
              >
                Sargybinis sustabdė tave.
              </p>
              <p
                style={{
                  color: "#fde68a",
                  fontSize: ".8rem",
                  fontStyle: "italic",
                }}
              >
                Atsakyk teisingai, kad praeitum.
              </p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "1.2rem",
                    color: i < lives ? "#ef4444" : "rgba(255,255,255,0.2)",
                  }}
                >
                  ●
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: ".65rem",
              color: "#92400e",
              fontSize: ".8rem",
            }}
          >
            <span>{lvlNames[level - 1]}</span>
            <span style={{ color: lvlColors[level - 1], fontWeight: 700 }}>
              {difficultyNames[level - 1]}
            </span>
            <span style={{ color: "#f0c040" }}>Taškai: {score}</span>
          </div>

          <div
            style={{
              background: "rgba(12,8,0,.94)",
              border: "2px solid #92400e",
              borderRadius: 13,
              padding: "1rem 1.2rem",
              marginBottom: ".9rem",
            }}
          >
            <p
              style={{
                color: "#fde68a",
                fontSize: "1.06rem",
                lineHeight: 1.65,
                fontWeight: 600,
              }}
            >
              {currentQ?.q}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: ".55rem",
            }}
          >
            {currentQ?.opts.map((opt, i) => {
              let cls = "obtn";
              if (ansRes) {
                if (i === currentQ.a) cls += " ok";
                else if (i === selAns) cls += " bad";
              }

              return (
                <button
                  key={i}
                  className={cls}
                  disabled={!!ansRes}
                  onClick={() => answerQ(i)}
                >
                  <span
                    style={{
                      color: "#d97706",
                      fontWeight: 700,
                      marginRight: ".35rem",
                    }}
                  >
                    {["A", "B", "C", "D"][i]}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {ansRes && (
            <div
              style={{
                marginTop: ".75rem",
                textAlign: "center",
                animation: "slideIn .3s ease",
              }}
            >
              {ansRes === "correct" ? (
                <p style={{ color: "#4ade80", fontWeight: 700 }}>
                  Teisingai. +
                  {level === 1
                    ? 8
                    : level === 2
                    ? 10
                    : level === 3
                    ? 12
                    : level === 4
                    ? 16
                    : 20}{" "}
                  taškų
                </p>
              ) : (
                <p style={{ color: "#ef4444", fontWeight: 700 }}>
                  Neteisingai. Teisingas atsakymas:{" "}
                  <span style={{ color: "#4ade80" }}>
                    {currentQ?.opts[currentQ.a]}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === "levelup") {
    return (
      <div className="gw">
        <style>{css}</style>
        <div
          style={{
            textAlign: "center",
            maxWidth: 460,
            animation: "slideIn .4s ease",
          }}
        >
          <div
            style={{
              fontSize: "3.5rem",
              marginBottom: ".4rem",
              color: "#f0c040",
            }}
          >
            {level >= 5 ? "Pergalė" : "Puiku"}
          </div>
          <h2
            style={{
              color: "#f0c040",
              fontFamily: "'Crimson Text',serif",
              fontSize: "1.85rem",
              marginBottom: ".4rem",
            }}
          >
            {level >= 5 ? "Pergalė" : `${level} lygis įveiktas`}
          </h2>
          <p
            style={{
              color: "#fde68a",
              marginBottom: "1.2rem",
              fontSize: ".98rem",
              lineHeight: 1.65,
            }}
          >
            {level >= 5
              ? "Knygos saugiai pristatytos. Tu – tikras knygnešys."
              : "Knygos pristatytos. Kitas lygis – sunkesnis."}
          </p>
          <div
            style={{
              background: "rgba(18,38,10,.8)",
              border: "1px solid #4ade80",
              borderRadius: 12,
              padding: "1rem",
              marginBottom: "1.2rem",
            }}
          >
            <p style={{ color: "#bbf7d0" }}>
              Taškai: <strong style={{ color: "#f0c040" }}>{score}</strong>
            </p>
            <p style={{ color: "#bbf7d0" }}>
              Gyvybės: <strong style={{ color: "#f87171" }}>{lives}</strong>
            </p>
          </div>
          <button
            className="mbtn"
            onClick={doNextLevel}
            style={{ animation: "glow 2s infinite" }}
          >
            {level >= 5 ? "Žaisti iš naujo" : `${level + 1} lygis`}
          </button>
        </div>
      </div>
    );
  }

  if (screen === "gameover") {
    return (
      <div className="gw">
        <style>{css}</style>
        <div
          style={{
            textAlign: "center",
            maxWidth: 440,
            animation: "slideIn .4s ease",
          }}
        >
          <div
            style={{
              fontSize: "3.5rem",
              marginBottom: ".4rem",
              color: "#ef4444",
            }}
          >
            Pabaiga
          </div>
          <h2
            style={{
              color: "#ef4444",
              fontFamily: "'Crimson Text',serif",
              fontSize: "1.9rem",
              marginBottom: ".4rem",
            }}
          >
            Sugautas
          </h2>
          <p
            style={{
              color: "#fca5a5",
              marginBottom: "1.2rem",
              lineHeight: 1.65,
            }}
          >
            Sargybiniai tave sustabdė.
            <br />
            Bet knygnešiai niekada nepasiduodavo.
          </p>
          <div
            style={{
              background: "rgba(40,8,8,.8)",
              border: "1px solid #ef4444",
              borderRadius: 12,
              padding: "1rem",
              marginBottom: "1.2rem",
            }}
          >
            <p style={{ color: "#fde68a" }}>
              Taškai: <strong style={{ color: "#f0c040" }}>{score}</strong>
            </p>
            <p style={{ color: "#fde68a" }}>
              Teisingi:{" "}
              <strong style={{ color: "#4ade80" }}>
                {totalOk} / {totalAns}
              </strong>
            </p>
          </div>
          <button
            className="mbtn"
            onClick={reset}
            style={{ animation: "glow 2s infinite" }}
          >
            Bandyti iš naujo
          </button>
        </div>
      </div>
    );
  }

  if (screen === "win") {
    return (
      <div className="gw">
        <style>{css}</style>
        <div
          style={{
            textAlign: "center",
            maxWidth: 490,
            animation: "slideIn .4s ease",
          }}
        >
          <div
            style={{
              fontSize: "3.8rem",
              marginBottom: ".4rem",
              color: "#f0c040",
            }}
          >
            Pergalė
          </div>
          <h2
            style={{
              color: "#f0c040",
              fontFamily: "'Crimson Text',serif",
              fontSize: "2.1rem",
              marginBottom: ".3rem",
            }}
          >
            Tikras knygnešys
          </h2>
          <p
            style={{
              color: "#fde68a",
              marginBottom: "1.2rem",
              lineHeight: 1.65,
              fontSize: "1.02rem",
            }}
          >
            Įveikei visus penkis lygius ir pristatei knygas.
            <br />
            Lietuvių kalba išliko – ir tu prie to prisidėjai.
          </p>
          <div
            style={{
              background: "rgba(8,28,10,.88)",
              border: "2px solid #4ade80",
              borderRadius: 14,
              padding: "1.2rem",
              marginBottom: "1.2rem",
            }}
          >
            <p
              style={{ color: "#f0c040", fontSize: "1.3rem", fontWeight: 700 }}
            >
              {score} taškų
            </p>
            <p style={{ color: "#bbf7d0", marginTop: ".35rem" }}>
              {totalOk} / {totalAns} teisingų atsakymų
            </p>
            <p style={{ color: "#bbf7d0" }}>Likusios gyvybės: {lives}</p>
            <p
              style={{
                color: "#fbbf24",
                marginTop: ".55rem",
                fontSize: "1.05rem",
              }}
            >
              {totalOk >= 20
                ? "Lietuviško žodžio sargas"
                : totalOk >= 15
                ? "Drąsus pasiuntinys"
                : "Žinių knygnešys"}
            </p>
          </div>
          <button
            className="mbtn"
            onClick={reset}
            style={{ animation: "glow 2s infinite" }}
          >
            Žaisti iš naujo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gw">
      <style>{css}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 720,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: ".4rem",
          padding: "0 .3rem",
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: "1.1rem",
                color: i < lives ? "#ef4444" : "rgba(255,255,255,0.18)",
                transition: "color .3s",
              }}
            >
              ●
            </span>
          ))}
        </div>

        <span
          style={{
            color: lvlColors[level - 1],
            fontSize: ".88rem",
            fontWeight: 700,
          }}
        >
          {lvlNames[level - 1]}
        </span>
        <span style={{ color: "#f0c040", fontWeight: 700 }}>
          Taškai: {score}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 720,
          height: 5,
          background: "rgba(255,255,255,.06)",
          borderRadius: 3,
          marginBottom: ".45rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg,#92400e,#f0c040)",
            borderRadius: 3,
            transition: "width .1s",
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 720,
          borderRadius: 16,
          overflow: "hidden",
          border: "2px solid #3d2200",
          boxShadow: "0 0 40px rgba(0,0,0,.88)",
        }}
      >
        <GameScene
          level={level}
          playerX={playerX}
          guardAlerts={guardAlerts}
          nextCheckpoint={nextCP}
          scared={scared}
        />
      </div>

      <div
        style={{
          marginTop: ".85rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button className={`mbtn${moving ? " on" : ""}`} onClick={toggleMove}>
          {moving ? "Eini... paspausk, kad sustotum" : "Paspausk – eiti pirmyn"}
        </button>
      </div>

      <p
        style={{
          color: "#3d2800",
          fontSize: ".72rem",
          marginTop: ".4rem",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Sargybiniai pažymėti raudonomis linijomis. Paspausk mygtuką eiti arba
        sustoti.
      </p>
    </div>
  );
}
