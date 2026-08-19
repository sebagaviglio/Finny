'use client'; 
import React, { useState, useMemo } from "react";
import {
  Home, TrendingUp, User, ShieldCheck, Users, Building2, ChevronRight,
  ArrowLeft, Plus, ArrowUpRight, ArrowDownLeft, Check, Clock, AlertTriangle,
  Wallet, Link2, ChevronLeft, X, Info
} from "lucide-react";

/* ============================================================
   FINNY — Design tokens (from Brandbook v1.0)
   ============================================================ */
const C = {
  ink: "#0B0E14",
  paper: "#F8F6F2",
  cobalt: "#3654FF",
  lime: "#B6FF3D",
  coral: "#FF5C7A",
  violet: "#1B1640",
  inkSoft: "rgba(248,246,242,0.6)",
  inkFaint: "rgba(248,246,242,0.38)",
  hair: "rgba(248,246,242,0.12)",
  hairOnPaper: "rgba(11,14,20,0.1)",
};

const AURA = `linear-gradient(120deg, ${C.cobalt} 0%, ${C.violet} 55%, ${C.lime} 100%)`;

const fmt = (n) =>
  "$" + Math.round(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
.f-display{font-family:'Space Grotesk',sans-serif;letter-spacing:-0.02em;}
.f-body{font-family:'Inter',sans-serif;}
.f-mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums;letter-spacing:-0.01em;}
.finny-scope{font-family:'Inter',sans-serif;}
.finny-scroll::-webkit-scrollbar{width:0;height:0;}
.tap{transition:transform .12s ease, opacity .12s ease;}
.tap:active{transform:scale(0.97);opacity:0.9;}
@keyframes auraMove{0%{transform:translate(-4%,-2%) scale(1);}50%{transform:translate(3%,2%) scale(1.06);}100%{transform:translate(-4%,-2%) scale(1);}}
.aura-anim{animation:auraMove 14s ease-in-out infinite;}
`;

/* ============================================================
   Isotipo — "El Vínculo": dos formas que se cruzan y sostienen
   ============================================================ */
function IsoLogo({ size = 28, mono = false }) {
  const id = useMemo(() => "g" + Math.random().toString(36).slice(2, 8), []);
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={id} x1="4" y1="30" x2="36" y2="10">
          <stop offset="0%" stopColor={C.cobalt} />
          <stop offset="100%" stopColor={C.lime} />
        </linearGradient>
      </defs>
      <rect x="6" y="15" width="26" height="11" rx="5.5" transform="rotate(-24 19 20.5)"
        fill={mono ? "currentColor" : `url(#${id})`} />
      <rect x="6" y="15" width="26" height="11" rx="5.5" transform="rotate(24 19 20.5)"
        fill="none" stroke={mono ? "currentColor" : C.paper} strokeOpacity={mono ? 1 : 0.9} strokeWidth="2.25" />
    </svg>
  );
}

function Wordmark({ color = C.paper, size = 18 }) {
  return (
    <div className="flex items-center gap-2">
      <IsoLogo size={size + 6} />
      <span className="f-display font-semibold" style={{ color, fontSize: size }}>finny</span>
    </div>
  );
}

function AuraBg({ opacity = 0.55, variant = "top" }) {
  const blobStyle =
    variant === "band"
      ? { position: "absolute", left: "20%", right: "-20%", top: 0, height: 224, borderRadius: "9999px", background: AURA, opacity, filter: "blur(60px)" }
      : { position: "absolute", left: "-10%", right: "-10%", top: "-80px", height: 288, borderRadius: "9999px", background: AURA, opacity, filter: "blur(60px)" };
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="aura-anim" style={blobStyle} />
    </div>
  );
}

/* ============================================================
   Small brand components
   ============================================================ */
const BACKING = {
  garantia: { label: "Garantía", icon: ShieldCheck, color: C.cobalt },
  vinculo: { label: "Vínculo", icon: Link2, color: C.coral },
  comunidad: { label: "Comunidad", icon: Building2, color: C.lime },
};

function BackingBadge({ type, dark = true }) {
  const b = BACKING[type];
  const Icon = b.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 f-body text-xs font-medium"
      style={{
        color: type === "comunidad" && dark ? C.ink : b.color,
        background: type === "comunidad" ? b.color : `${b.color}1F`,
      }}
    >
      <Icon size={12.5} strokeWidth={2} />
      {b.label}
    </span>
  );
}

function RiskPill({ level }) {
  const cfg =
    level === "bajo"
      ? { label: "Riesgo bajo", color: C.lime, dot: C.lime }
      : { label: "Riesgo medio", color: C.coral, dot: C.coral };
  return (
    <span className="inline-flex items-center gap-1.5 f-body text-xs" style={{ color: C.inkFaint }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: cfg.dot }} />
      <span style={{ color: "inherit" }}>{cfg.label}</span>
    </span>
  );
}

function Rate({ value, size = "text-lg", color = C.lime }) {
  return (
    <span className={`f-mono font-semibold ${size}`} style={{ color }}>
      {value}% <span className="font-medium opacity-70" style={{ fontSize: "0.6em" }}>TNA</span>
    </span>
  );
}

function StatusTag({ status }) {
  const map = {
    al_dia: { label: "Al día", color: C.lime, bg: "rgba(182,255,61,0.14)" },
    proxima: { label: "Próxima cuota", color: "#FFC24B", bg: "rgba(255,194,75,0.14)" },
    mora: { label: "Atrasado", color: C.coral, bg: "rgba(255,92,122,0.14)" },
  };
  const s = map[status];
  return (
    <span className="f-body text-xs font-medium rounded-full px-2.5 py-1" style={{ color: s.color, background: s.bg }}>
      {s.label}
    </span>
  );
}

function PrimaryBtn({ children, onClick, full = true, tone = "lime", disabled = false, icon: Icon }) {
  const styles =
    tone === "lime"
      ? { background: C.lime, color: C.ink }
      : tone === "coral"
      ? { background: C.coral, color: C.ink }
      : { background: C.paper, color: C.ink };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`tap f-body font-semibold rounded-2xl py-3.5 px-5 flex items-center justify-center gap-2 ${full ? "w-full" : ""} ${disabled ? "opacity-40" : ""}`}
      style={styles}
    >
      {children}
      {Icon && <Icon size={16} strokeWidth={2.5} />}
    </button>
  );
}

function GhostBtn({ children, onClick, dark = true }) {
  return (
    <button
      onClick={onClick}
      className="tap f-body font-medium rounded-2xl py-3.5 px-5 w-full border"
      style={{ color: dark ? C.paper : C.ink, borderColor: dark ? C.hair : C.hairOnPaper }}
    >
      {children}
    </button>
  );
}

function TopBar({ title, onBack, right }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      <button onClick={onBack} className="tap h-9 w-9 rounded-full flex items-center justify-center" style={{ background: "rgba(248,246,242,0.08)" }}>
        <ArrowLeft size={17} color={C.paper} />
      </button>
      <span className="f-body text-sm font-medium" style={{ color: C.paper }}>{title}</span>
      <div className="h-9 w-9 flex items-center justify-center">{right}</div>
    </div>
  );
}

/* ============================================================
   Mock data
   ============================================================ */
const OPPS = [
  {
    id: "op1", name: "Lucía Fernández", initials: "LF", amount: 350000, purpose: "Reformar el local de su emprendimiento de ropa",
    rate: 41.5, term: 12, backing: "garantia", risk: "bajo",
    detail: "Garantía: un Toyota Etios 2020 a su nombre, tasado en $4.200.000. Si no paga, Finny gestiona la ejecución de la garantía antes que vos pierdas capital.",
  },
  {
    id: "op2", name: "Martín Paz", initials: "MP", amount: 120000, purpose: "Comprar herramientas para su taller",
    rate: 47.0, term: 6, backing: "vinculo", risk: "bajo",
    detail: "Vínculo: lo conocés de Finny desde hace 8 meses. Ya le prestaste 2 veces antes y pagó las 18 cuotas en término, sin un solo atraso.",
  },
  {
    id: "op3", name: "Rocío Giménez", initials: "RG", amount: 600000, purpose: "Refinanciar una deuda de tarjeta de crédito",
    rate: 38.9, term: 18, backing: "comunidad", risk: "bajo",
    detail: "Comunidad: trabaja en Supermercados Coto hace 4 años. La cuota se descuenta directo de su sueldo antes de que le llegue a ella — no depende de que se acuerde de pagar.",
  },
  {
    id: "op4", name: "Nahuel Ortiz", initials: "NO", amount: 800000, purpose: "Viaje y gastos personales",
    rate: 52.0, term: 10, backing: "vinculo", risk: "medio",
    detail: "Vínculo: es su primer préstamo en Finny. Todavía no tiene historial en la plataforma, por eso el riesgo es medio y la tasa es más alta.",
  },
  {
    id: "op5", name: "Camila Sosa", initials: "CS", amount: 250000, purpose: "Comprar stock para su marca textil",
    rate: 43.0, term: 9, backing: "garantia", risk: "bajo",
    detail: "Garantía: una moto Honda Wave 110, tasada en $2.100.000. Queda prendada hasta la última cuota.",
  },
];

const LENDER_LOANS = [
  { id: "l1", name: "Lucía Fernández", initials: "LF", amount: 350000, paid: 8, total: 12, status: "al_dia", next: "12 sep", nextAmount: 34200, backing: "garantia" },
  { id: "l2", name: "Martín Paz", initials: "MP", amount: 120000, paid: 2, total: 6, status: "proxima", next: "21 ago", nextAmount: 21100, backing: "vinculo" },
  { id: "l3", name: "Diego Álvarez", initials: "DA", amount: 180000, paid: 4, total: 10, status: "mora", next: "13 ago", nextAmount: 22800, daysLate: 5, backing: "vinculo" },
];

const BORROWER_LOAN = {
  id: "b1", lenders: 3, amount: 300000, paid: 6, total: 12, status: "proxima", next: "24 ago", nextAmount: 29750, backing: "comunidad",
};

/* ============================================================
   ONBOARDING
   ============================================================ */
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [mech, setMech] = useState(0);

  const mechanisms = [
    { icon: ShieldCheck, key: "garantia", title: "Garantía real", body: "Un auto, una moto, un electrodoméstico de valor. Si algo falla, hay algo físico atrás del préstamo — no solo una promesa." },
    { icon: Link2, key: "vinculo", title: "Vínculo de confianza", body: "Le prestás a alguien que ya conocés en Finny, o que te recomienda alguien de tu confianza. El historial entre ustedes vale." },
    { icon: Building2, key: "comunidad", title: "Descuento por comunidad", body: "La cuota se descuenta directo del sueldo, en empresas y organizaciones que ya trabajan con Finny. No depende de que se acuerden." },
  ];

  if (step === 0) {
    return (
      <div className="relative h-full flex flex-col justify-between px-6 pt-14 pb-8" style={{ background: C.ink }}>
        <AuraBg opacity={0.7} />
        <div className="relative z-10">
          <Wordmark size={20} />
        </div>
        <div className="relative z-10">
          <h1 className="f-display font-bold" style={{ color: C.paper, fontSize: "2.4rem", lineHeight: 1.05 }}>
            Sacamos al<br />banco del medio.
          </h1>
          <p className="f-body mt-4 leading-relaxed" style={{ color: C.inkSoft, fontSize: 15 }}>
            Finny conecta directo a quien necesita plata con quien quiere hacerla crecer. Sin sucursales, sin letra chica.
          </p>
        </div>
        <div className="relative z-10">
          <PrimaryBtn onClick={() => setStep(1)} icon={ArrowUpRight}>Empezar</PrimaryBtn>
          <p className="f-body text-center text-xs mt-3" style={{ color: C.inkFaint }}>Entre personas, sin vueltas.</p>
        </div>
      </div>
    );
  }

  if (step === 1) {
    const m = mechanisms[mech];
    const Icon = m.icon;
    return (
      <div className="relative h-full flex flex-col justify-between px-6 pt-10 pb-8" style={{ background: C.ink }}>
        <AuraBg opacity={0.22} variant="band" />
        <div className="relative z-10 flex items-center justify-between">
          <button onClick={() => setStep(0)} className="tap h-9 w-9 rounded-full flex items-center justify-center" style={{ background: "rgba(248,246,242,0.08)" }}>
            <ArrowLeft size={16} color={C.paper} />
          </button>
          <div className="flex gap-1.5">
            {mechanisms.map((_, i) => (
              <span key={i} className="h-1 rounded-full" style={{ width: i === mech ? 20 : 8, background: i === mech ? C.lime : C.hair, transition: "all .2s" }} />
            ))}
          </div>
          <button onClick={() => setStep(2)} className="f-body text-xs" style={{ color: C.inkFaint }}>Saltear</button>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <p className="f-body text-xs font-medium mb-4" style={{ color: C.lime }}>Cómo bajamos el riesgo — {mech + 1} de 3</p>
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${BACKING[m.key].color}22` }}>
            <Icon size={26} color={BACKING[m.key].color} strokeWidth={1.8} />
          </div>
          <h2 className="f-display text-3xl font-semibold" style={{ color: C.paper }}>{m.title}</h2>
          <p className="f-body mt-3 leading-relaxed" style={{ color: C.inkSoft, fontSize: 15 }}>{m.body}</p>
        </div>

        <div className="relative z-10 flex gap-3">
          {mech > 0 && (
            <button onClick={() => setMech(mech - 1)} className="tap h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center border" style={{ borderColor: C.hair }}>
              <ChevronLeft size={18} color={C.paper} />
            </button>
          )}
          <PrimaryBtn onClick={() => (mech < 2 ? setMech(mech + 1) : setStep(2))} icon={ChevronRight}>
            {mech < 2 ? "Siguiente" : "Ya entendí, seguimos"}
          </PrimaryBtn>
        </div>
      </div>
    );
  }

  // step 2 — role select
  return (
    <div className="relative h-full flex flex-col justify-between px-6 pt-10 pb-8" style={{ background: C.ink }}>
      <AuraBg opacity={0.35} />
      <div className="relative z-10">
        <button onClick={() => setStep(1)} className="tap h-9 w-9 rounded-full flex items-center justify-center" style={{ background: "rgba(248,246,242,0.08)" }}>
          <ArrowLeft size={16} color={C.paper} />
        </button>
      </div>
      <div className="relative z-10">
        <h2 className="f-display leading-tight font-semibold" style={{ color: C.paper, fontSize: "1.9rem" }}>
          ¿Qué venís a hacer hoy?
        </h2>
        <p className="f-body text-sm mt-2 mb-7" style={{ color: C.inkSoft }}>Podés cambiar esto después, desde tu perfil.</p>

        <button onClick={() => onDone("presta")} className="tap w-full text-left rounded-3xl p-5 mb-3 border" style={{ borderColor: C.hair, background: "rgba(248,246,242,0.04)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="f-body text-xs font-medium" style={{ color: C.lime }}>Quiero que mi plata rinda</p>
              <p className="f-display text-xl font-semibold mt-1" style={{ color: C.paper }}>Prestar</p>
              <p className="f-body text-sm mt-1.5" style={{ color: C.inkFaint }}>Elegís a quién, ves el respaldo y cobrás intereses reales.</p>
            </div>
            <div className="h-11 w-11 rounded-full flex items-center justify-center shrink-0 ml-3" style={{ background: C.lime }}>
              <TrendingUp size={18} color={C.ink} />
            </div>
          </div>
        </button>

        <button onClick={() => onDone("pide")} className="tap w-full text-left rounded-3xl p-5 border" style={{ borderColor: C.hair, background: "rgba(248,246,242,0.04)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="f-body text-xs font-medium" style={{ color: C.cobalt }}>Necesito plata ahora</p>
              <p className="f-display text-xl font-semibold mt-1" style={{ color: C.paper }}>Pedir</p>
              <p className="f-body text-sm mt-1.5" style={{ color: C.inkFaint }}>Simulás en 30 segundos y una tasa mejor que la del banco.</p>
            </div>
            <div className="h-11 w-11 rounded-full flex items-center justify-center shrink-0 ml-3" style={{ background: C.cobalt }}>
              <Wallet size={18} color={C.paper} />
            </div>
          </div>
        </button>
      </div>
      <p className="relative z-10 f-body text-center text-xs" style={{ color: C.inkFaint }}>Tocá una opción para entrar</p>
    </div>
  );
}

/* ============================================================
   LENDER — Home
   ============================================================ */
function LenderHome({ onOpenOpp, loans }) {
  const invested = loans.reduce((a, l) => a + l.amount, 0);
  const active = loans.length;
  return (
    <div className="h-full overflow-y-auto finny-scroll" style={{ background: C.paper }}>
      <div className="relative px-5 pt-14 pb-7" style={{ background: C.ink }}>
        <AuraBg opacity={0.4} />
        <div className="relative z-10 flex items-center justify-between mb-6">
          <Wordmark size={16} />
          <div className="h-9 w-9 rounded-full flex items-center justify-center f-body text-xs font-semibold" style={{ background: C.lime, color: C.ink }}>AH</div>
        </div>
        <p className="relative z-10 f-body text-sm" style={{ color: C.inkSoft }}>Tu plata, trabajando</p>
        <p className="relative z-10 f-mono font-semibold leading-none mt-1" style={{ color: C.paper, fontSize: "2.6rem" }}>
          {fmt(invested)}<span style={{ color: C.inkFaint }}>.00</span>
        </p>
        <div className="relative z-10 flex gap-3 mt-5">
          <div className="flex-1 rounded-2xl px-4 py-3" style={{ background: "rgba(248,246,242,0.06)" }}>
            <p className="f-body text-xs" style={{ color: C.inkFaint }}>Rendimiento este mes</p>
            <p className="f-mono text-lg font-semibold" style={{ color: C.lime }}>+3,8%</p>
          </div>
          <div className="flex-1 rounded-2xl px-4 py-3" style={{ background: "rgba(248,246,242,0.06)" }}>
            <p className="f-body text-xs" style={{ color: C.inkFaint }}>Préstamos activos</p>
            <p className="f-mono text-lg font-semibold" style={{ color: C.paper }}>{active}</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-28">
        <div className="flex items-center justify-between mb-1">
          <h3 className="f-display text-lg font-semibold" style={{ color: C.ink }}>Oportunidades</h3>
          <span className="f-body text-xs" style={{ color: "rgba(11,14,20,0.45)" }}>{OPPS.length} disponibles</span>
        </div>
        <p className="f-body text-sm mb-4" style={{ color: "rgba(11,14,20,0.55)" }}>Cada una muestra a qué te exponés antes de invertir.</p>

        <div className="flex flex-col gap-3">
          {OPPS.map((o) => (
            <button key={o.id} onClick={() => onOpenOpp(o.id)} className="tap text-left rounded-3xl p-4" style={{ background: C.ink }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center f-body text-xs font-semibold" style={{ background: "rgba(248,246,242,0.1)", color: C.paper }}>
                    {o.initials}
                  </div>
                  <div>
                    <p className="f-body text-sm font-medium" style={{ color: C.paper }}>{o.name}</p>
                    <p className="f-body text-xs mt-0.5 truncate" style={{ color: C.inkFaint, maxWidth: 160 }}>{o.purpose}</p>
                  </div>
                </div>
                <ChevronRight size={16} color={C.inkFaint} className="shrink-0 mt-2" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <BackingBadge type={o.backing} />
                  <RiskPill level={o.risk} />
                </div>
                <Rate value={o.rate} />
              </div>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${C.hair}` }}>
                <span className="f-body text-xs" style={{ color: C.inkFaint }}>Monto pedido</span>
                <span className="f-mono text-sm font-medium" style={{ color: C.paper }}>{fmt(o.amount)} · {o.term} cuotas</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   OPPORTUNITY DETAIL
   ============================================================ */
function OpportunityDetail({ opp, onBack, onInvest }) {
  const [done, setDone] = useState(false);
  const b = BACKING[opp.backing];
  const Icon = b.icon;
  const cuota = Math.round((opp.amount * (1 + (opp.rate / 100) * (opp.term / 12))) / opp.term);

  if (done) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8" style={{ background: C.ink }}>
        <div className="h-16 w-16 rounded-full flex items-center justify-center mb-5" style={{ background: C.lime }}>
          <Check size={26} color={C.ink} strokeWidth={2.5} />
        </div>
        <h2 className="f-display text-2xl font-semibold" style={{ color: C.paper }}>Ya invertiste</h2>
        <p className="f-body text-sm mt-2 leading-relaxed" style={{ color: C.inkSoft }}>
          {fmt(opp.amount)} van para {opp.name}. Vas a ver la primera cuota reflejada en tu cartera el {opp.term > 0 ? "mes que viene" : ""}.
        </p>
        <div className="mt-8 w-full">
          <PrimaryBtn onClick={() => onBack()}>Volver a oportunidades</PrimaryBtn>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto finny-scroll" style={{ background: C.ink }}>
      <TopBar title="Oportunidad" onBack={onBack} />
      <div className="px-5 pb-32">
        <div className="flex items-center gap-3 mt-2">
          <div className="h-12 w-12 rounded-full flex items-center justify-center f-body font-semibold" style={{ background: "rgba(248,246,242,0.1)", color: C.paper }}>
            {opp.initials}
          </div>
          <div>
            <p className="f-display text-lg font-semibold" style={{ color: C.paper }}>{opp.name}</p>
            <RiskPill level={opp.risk} />
          </div>
        </div>

        <p className="f-body text-sm mt-4 leading-relaxed" style={{ color: C.inkSoft }}>
          Pide <span style={{ color: C.paper }}>{fmt(opp.amount)}</span> para: {opp.purpose.toLowerCase()}.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="rounded-2xl p-4" style={{ background: "rgba(248,246,242,0.06)" }}>
            <p className="f-body text-xs" style={{ color: C.inkFaint }}>Tasa</p>
            <Rate value={opp.rate} size="text-xl" />
          </div>
          <div className="rounded-2xl p-4" style={{ background: "rgba(248,246,242,0.06)" }}>
            <p className="f-body text-xs" style={{ color: C.inkFaint }}>Plazo</p>
            <p className="f-mono text-xl font-semibold mt-0.5" style={{ color: C.paper }}>{opp.term} <span className="text-xs font-medium opacity-60">cuotas</span></p>
          </div>
        </div>

        <div className="rounded-2xl p-4 mt-3 flex items-center justify-between" style={{ background: "rgba(248,246,242,0.06)" }}>
          <span className="f-body text-sm" style={{ color: C.inkSoft }}>Cuota mensual estimada que cobrás</span>
          <span className="f-mono text-base font-semibold" style={{ color: C.lime }}>{fmt(cuota)}</span>
        </div>

        <div className="mt-6">
          <p className="f-body text-xs font-medium mb-2" style={{ color: C.inkFaint }}>A qué te exponés</p>
          <div className="rounded-3xl p-5" style={{ background: `${b.color}14`, border: `1px solid ${b.color}33` }}>
            <div className="flex items-center gap-2 mb-2.5">
              <Icon size={16} color={b.color} />
              <span className="f-body text-sm font-semibold" style={{ color: b.color }}>{b.label}</span>
            </div>
            <p className="f-body text-sm leading-relaxed" style={{ color: C.inkSoft }}>{opp.detail}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 mt-5 rounded-2xl p-4" style={{ background: "rgba(248,246,242,0.04)" }}>
          <Info size={15} color={C.inkFaint} className="shrink-0 mt-0.5" />
          <p className="f-body text-xs leading-relaxed" style={{ color: C.inkFaint }}>
            Si {opp.name.split(" ")[0]} no paga, Finny te avisa apenas se atrasa y gestiona el cobro. Vos siempre ves el estado real, no una promesa.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-4" style={{ background: `linear-gradient(to top, ${C.ink} 60%, transparent)` }}>
        <PrimaryBtn onClick={() => setDone(true)}>Invertir {fmt(opp.amount)}</PrimaryBtn>
        <p className="f-body text-center text-xs mt-2.5" style={{ color: C.inkFaint }}>Tasa fija de {opp.rate}% anual. Sin costos ocultos.</p>
      </div>
    </div>
  );
}

/* ============================================================
   BORROWER — Home / simulator + application flow
   ============================================================ */
function BorrowerHome({ onOpenFlow, hasLoan, loan, onOpenMora }) {
  return (
    <div className="h-full overflow-y-auto finny-scroll" style={{ background: C.paper }}>
      <div className="relative px-5 pt-14 pb-8" style={{ background: C.ink }}>
        <AuraBg opacity={0.45} />
        <div className="relative z-10 flex items-center justify-between mb-6">
          <Wordmark size={16} />
          <div className="h-9 w-9 rounded-full flex items-center justify-center f-body text-xs font-semibold" style={{ background: C.cobalt, color: C.paper }}>AH</div>
        </div>
        <p className="relative z-10 f-body text-sm" style={{ color: C.inkSoft }}>¿Cuánto necesitás?</p>
        <h2 className="relative z-10 f-display text-2xl font-semibold mt-1" style={{ color: C.paper }}>
          Simulá tu préstamo en 30 segundos
        </h2>
        <div className="relative z-10 mt-5">
          <PrimaryBtn onClick={onOpenFlow} icon={ArrowUpRight}>Simular ahora</PrimaryBtn>
        </div>
      </div>

      <div className="px-5 pt-6 pb-28">
        <h3 className="f-display text-base font-semibold mb-3" style={{ color: C.ink }}>Tu préstamo</h3>
        {!hasLoan ? (
          <div className="rounded-3xl p-6 text-center" style={{ background: C.ink }}>
            <div className="h-12 w-12 rounded-2xl mx-auto flex items-center justify-center mb-3" style={{ background: "rgba(248,246,242,0.08)" }}>
              <Wallet size={20} color={C.inkFaint} />
            </div>
            <p className="f-body text-sm font-medium" style={{ color: C.paper }}>Todavía no pediste nada</p>
            <p className="f-body text-xs mt-1.5 leading-relaxed" style={{ color: C.inkFaint }}>
              Simulá tu préstamo y mirá la tasa antes de pedir nada. No queda registrado hasta que confirmes.
            </p>
          </div>
        ) : (
          <button onClick={() => (loan.status === "mora" ? onOpenMora() : null)} className="tap w-full text-left rounded-3xl p-5" style={{ background: C.ink }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="f-body text-xs" style={{ color: C.inkFaint }}>Financiado por {loan.lenders} personas</p>
                <p className="f-mono text-xl font-semibold mt-1" style={{ color: C.paper }}>{fmt(loan.amount)}</p>
              </div>
              <StatusTag status={loan.status} />
            </div>
            <div className="mt-4">
              <div className="flex justify-between f-body text-xs mb-1.5" style={{ color: C.inkFaint }}>
                <span>{loan.paid} de {loan.total} cuotas pagas</span>
                <span>{Math.round((loan.paid / loan.total) * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full w-full" style={{ background: C.hair }}>
                <div className="h-1.5 rounded-full" style={{ width: `${(loan.paid / loan.total) * 100}%`, background: loan.status === "mora" ? C.coral : C.lime }} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: `1px solid ${C.hair}` }}>
              <span className="f-body text-xs" style={{ color: C.inkFaint }}>Próxima cuota · {loan.next}</span>
              <span className="f-mono text-sm font-semibold" style={{ color: C.paper }}>{fmt(loan.nextAmount)}</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

function BorrowerFlow({ onClose }) {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(300000);
  const [term, setTerm] = useState(12);
  const [backing, setBacking] = useState(null);

  const rate = useMemo(() => {
    let base = 55;
    if (backing === "garantia") base -= 13.5;
    if (backing === "vinculo") base -= 8;
    if (backing === "comunidad") base -= 16.5;
    if (!backing) base -= 4;
    if (term > 12) base -= 1.5;
    return Math.max(base, 31).toFixed(1);
  }, [backing, term]);

  const cuota = Math.round((amount * (1 + (rate / 100) * (term / 12))) / term);

  const steps = ["Simulá", "Respaldo", "Tus datos", "Estado"];

  return (
    <div className="h-full overflow-y-auto finny-scroll" style={{ background: C.ink }}>
      <TopBar title={steps[step]} onBack={() => (step === 0 ? onClose() : setStep(step - 1))} right={
        <button onClick={onClose} className="tap"><X size={17} color={C.inkFaint} /></button>
      } />

      <div className="flex gap-1.5 px-5 mb-4">
        {steps.map((_, i) => (
          <span key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? C.lime : C.hair }} />
        ))}
      </div>

      {/* STEP 0 — simulator */}
      {step === 0 && (
        <div className="px-5 pb-28">
          <p className="f-body text-sm mb-1" style={{ color: C.inkSoft }}>Monto</p>
          <p className="f-mono text-4xl font-semibold" style={{ color: C.paper }}>{fmt(amount)}</p>
          <input type="range" min={50000} max={1000000} step={10000} value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full mt-4" style={{ accentColor: C.lime }} />
          <div className="flex justify-between f-body text-xs mt-1" style={{ color: C.inkFaint }}>
            <span>$50.000</span><span>$1.000.000</span>
          </div>

          <p className="f-body text-sm mt-7 mb-1" style={{ color: C.inkSoft }}>Plazo</p>
          <p className="f-mono text-4xl font-semibold" style={{ color: C.paper }}>{term} <span className="text-lg opacity-60">cuotas</span></p>
          <input type="range" min={3} max={24} step={1} value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full mt-4" style={{ accentColor: C.lime }} />
          <div className="flex justify-between f-body text-xs mt-1" style={{ color: C.inkFaint }}>
            <span>3</span><span>24</span>
          </div>

          <div className="rounded-3xl p-5 mt-7" style={{ background: "rgba(248,246,242,0.06)" }}>
            <div className="flex items-center justify-between">
              <span className="f-body text-sm" style={{ color: C.inkSoft }}>Tasa estimada</span>
              <Rate value={rate} />
            </div>
            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${C.hair}` }}>
              <span className="f-body text-sm" style={{ color: C.inkSoft }}>Cuota mensual</span>
              <span className="f-mono text-lg font-semibold" style={{ color: C.paper }}>{fmt(cuota)}</span>
            </div>
          </div>
          <p className="f-body text-xs text-center mt-3" style={{ color: C.inkFaint }}>Elegí un respaldo en el próximo paso y la tasa baja.</p>

          <div className="mt-8">
            <PrimaryBtn onClick={() => setStep(1)} icon={ChevronRight}>Continuar</PrimaryBtn>
          </div>
        </div>
      )}

      {/* STEP 1 — backing */}
      {step === 1 && (
        <div className="px-5 pb-28">
          <p className="f-body text-sm mb-5" style={{ color: C.inkSoft }}>Elegí qué respalda tu pedido. Cuanto más claro el respaldo, mejor tasa.</p>
          {Object.entries(BACKING).map(([key, b]) => {
            const Icon = b.icon;
            const active = backing === key;
            return (
              <button key={key} onClick={() => setBacking(key)} className="tap w-full text-left rounded-3xl p-4 mb-3 border" style={{
                borderColor: active ? b.color : C.hair,
                background: active ? `${b.color}14` : "rgba(248,246,242,0.04)",
              }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${b.color}22` }}>
                    <Icon size={18} color={b.color} />
                  </div>
                  <div className="flex-1">
                    <p className="f-body text-sm font-semibold" style={{ color: C.paper }}>{b.label}</p>
                    <p className="f-body text-xs mt-0.5" style={{ color: C.inkFaint }}>
                      {key === "garantia" && "Un bien tasable a tu nombre (auto, moto, etc.)"}
                      {key === "vinculo" && "Alguien de Finny te conoce o te recomienda"}
                      {key === "comunidad" && "Trabajás en una empresa asociada a Finny"}
                    </p>
                  </div>
                  {active && <Check size={16} color={b.color} className="shrink-0" />}
                </div>
              </button>
            );
          })}
          <div className="mt-8">
            <PrimaryBtn onClick={() => setStep(2)} disabled={!backing} icon={ChevronRight}>Continuar</PrimaryBtn>
          </div>
        </div>
      )}

      {/* STEP 2 — data */}
      {step === 2 && (
        <div className="px-5 pb-28">
          <p className="f-body text-sm mb-5" style={{ color: C.inkSoft }}>Solo lo justo para verificar quién sos. Nada de formularios eternos.</p>
          {["DNI", "CUIL", "Ingresos mensuales aproximados"].map((label) => (
            <div key={label} className="mb-3">
              <label className="f-body text-xs" style={{ color: C.inkFaint }}>{label}</label>
              <div className="mt-1.5 rounded-2xl px-4 py-3.5 f-body text-sm" style={{ background: "rgba(248,246,242,0.06)", color: C.inkFaint }}>
                {label === "DNI" ? "38.402.117" : label === "CUIL" ? "20-38402117-4" : "$720.000"}
              </div>
            </div>
          ))}
          <div className="mt-8">
            <PrimaryBtn onClick={() => setStep(3)}>Enviar pedido</PrimaryBtn>
          </div>
        </div>
      )}

      {/* STEP 3 — status */}
      {step === 3 && (
        <div className="px-5 pb-10 flex flex-col items-center text-center pt-6">
          <div className="h-16 w-16 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(182,255,61,0.14)" }}>
            <Clock size={26} color={C.lime} />
          </div>
          <h2 className="f-display text-2xl font-semibold" style={{ color: C.paper }}>Estamos revisando tu pedido</h2>
          <p className="f-body text-sm mt-2 leading-relaxed" style={{ color: C.inkSoft }}>Te avisamos en menos de 2 horas. No tenés que hacer nada más.</p>

          <div className="w-full rounded-3xl p-5 mt-7 text-left" style={{ background: "rgba(248,246,242,0.06)" }}>
            <div className="flex justify-between f-body text-sm mb-2" style={{ color: C.inkFaint }}><span>Monto</span><span className="f-mono" style={{ color: C.paper }}>{fmt(amount)}</span></div>
            <div className="flex justify-between f-body text-sm mb-2" style={{ color: C.inkFaint }}><span>Plazo</span><span className="f-mono" style={{ color: C.paper }}>{term} cuotas</span></div>
            <div className="flex justify-between f-body text-sm mb-2" style={{ color: C.inkFaint }}><span>Respaldo</span><BackingBadge type={backing} /></div>
            <div className="flex justify-between f-body text-sm"><span style={{ color: C.inkFaint }}>Tasa</span><Rate value={rate} size="text-sm" /></div>
          </div>

          <div className="w-full mt-7">
            <PrimaryBtn onClick={onClose}>Listo, volver al inicio</PrimaryBtn>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   DASHBOARD (seguimiento) — shared, differs by role
   ============================================================ */
function Dashboard({ role, mode, loans, borrowerLoan, onOpenMora, onSimulateMora }) {
  if (mode === "empty") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8" style={{ background: C.paper }}>
        <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: C.ink }}>
          {role === "presta" ? <TrendingUp size={22} color={C.lime} /> : <Wallet size={22} color={C.cobalt} />}
        </div>
        <h2 className="f-display text-xl font-semibold" style={{ color: C.ink }}>
          {role === "presta" ? "Todavía no prestaste nada" : "Todavía no pediste nada"}
        </h2>
        <p className="f-body text-sm mt-2 leading-relaxed" style={{ color: "rgba(11,14,20,0.55)" }}>
          {role === "presta"
            ? "Elegí una oportunidad y hacé que tu plata rinda. Cada una te muestra el riesgo antes de que decidas."
            : "Simulá tu préstamo y mirá la tasa en 30 segundos, antes de pedir nada."}
        </p>
      </div>
    );
  }

  if (role === "presta") {
    return (
      <div className="h-full overflow-y-auto finny-scroll px-5 pt-14 pb-28" style={{ background: C.paper }}>
        <h2 className="f-display text-2xl font-semibold" style={{ color: C.ink }}>Tu cartera</h2>
        <p className="f-body text-sm mt-1 mb-5" style={{ color: "rgba(11,14,20,0.55)" }}>{loans.length} préstamos activos</p>
        <div className="flex flex-col gap-3">
          {loans.map((l) => (
            <button key={l.id} onClick={() => (l.status === "mora" ? onOpenMora(l.id) : null)} className="tap text-left rounded-3xl p-4" style={{ background: C.ink }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center f-body text-xs font-semibold" style={{ background: "rgba(248,246,242,0.1)", color: C.paper }}>{l.initials}</div>
                  <div>
                    <p className="f-body text-sm font-medium" style={{ color: C.paper }}>{l.name}</p>
                    <p className="f-mono text-xs mt-0.5" style={{ color: C.inkFaint }}>{fmt(l.amount)}</p>
                  </div>
                </div>
                <StatusTag status={l.status} />
              </div>
              <div className="mt-3">
                <div className="h-1.5 rounded-full w-full" style={{ background: C.hair }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${(l.paid / l.total) * 100}%`, background: l.status === "mora" ? C.coral : C.lime }} />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${C.hair}` }}>
                <span className="f-body text-xs" style={{ color: C.inkFaint }}>
                  {l.status === "mora" ? `Atrasado hace ${l.daysLate} días` : `Próxima cuota · ${l.next}`}
                </span>
                <span className="f-mono text-sm font-semibold" style={{ color: l.status === "mora" ? C.coral : C.paper }}>{fmt(l.nextAmount)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // borrower dashboard
  const loan = borrowerLoan;
  return (
    <div className="h-full overflow-y-auto finny-scroll px-5 pt-14 pb-28" style={{ background: C.paper }}>
      <h2 className="f-display text-2xl font-semibold" style={{ color: C.ink }}>Tus cuotas</h2>
      <p className="f-body text-sm mt-1 mb-5" style={{ color: "rgba(11,14,20,0.55)" }}>Financiado por {loan.lenders} personas</p>
      <button onClick={() => (loan.status === "mora" ? onOpenMora("b1") : null)} className="tap w-full text-left rounded-3xl p-5" style={{ background: C.ink }}>
        <div className="flex items-center justify-between">
          <p className="f-mono text-2xl font-semibold" style={{ color: C.paper }}>{fmt(loan.amount)}</p>
          <StatusTag status={loan.status} />
        </div>
        <div className="mt-4">
          <div className="flex justify-between f-body text-xs mb-1.5" style={{ color: C.inkFaint }}>
            <span>{loan.paid} de {loan.total} cuotas pagas</span><span>{Math.round((loan.paid / loan.total) * 100)}%</span>
          </div>
          <div className="h-1.5 rounded-full w-full" style={{ background: C.hair }}>
            <div className="h-1.5 rounded-full" style={{ width: `${(loan.paid / loan.total) * 100}%`, background: loan.status === "mora" ? C.coral : C.lime }} />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: `1px solid ${C.hair}` }}>
          <span className="f-body text-xs" style={{ color: C.inkFaint }}>{loan.status === "mora" ? "Atrasada hace 4 días" : `Próxima cuota · ${loan.next}`}</span>
          <span className="f-mono text-sm font-semibold" style={{ color: loan.status === "mora" ? C.coral : C.paper }}>{fmt(loan.nextAmount)}</span>
        </div>
      </button>

      <div className="mt-6">
        <p className="f-body text-xs font-medium mb-2" style={{ color: "rgba(11,14,20,0.45)" }}>Historial</p>
        {Array.from({ length: loan.paid }).slice(0, 3).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(11,14,20,0.08)" }}>
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ background: "rgba(182,255,61,0.18)" }}>
                <Check size={12} color="#5A8A00" />
              </div>
              <span className="f-body text-sm" style={{ color: C.ink }}>Cuota {loan.paid - i}</span>
            </div>
            <span className="f-mono text-sm" style={{ color: "rgba(11,14,20,0.5)" }}>{fmt(loan.nextAmount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MORA — estado de atraso
   ============================================================ */
function MoraDetail({ role, onBack }) {
  return (
    <div className="h-full overflow-y-auto finny-scroll" style={{ background: C.ink }}>
      <TopBar title="Cuota atrasada" onBack={onBack} />
      <div className="px-5 pb-10">
        <div className="rounded-3xl p-5 mt-2" style={{ background: "rgba(255,92,122,0.1)", border: `1px solid ${C.coral}44` }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} color={C.coral} />
            <span className="f-body text-sm font-semibold" style={{ color: C.coral }}>
              {role === "presta" ? "Atrasado hace 5 días" : "Atrasada hace 4 días"}
            </span>
          </div>
          <p className="f-body text-sm leading-relaxed" style={{ color: C.inkSoft }}>
            {role === "presta"
              ? "Diego Álvarez no pagó la cuota que vencía el 13 ago. Ya le mandamos dos avisos. Esto es lo que podés hacer ahora."
              : "No llegó a acreditarse la cuota que vencía el 20 ago. Pasa. Elegí cómo seguir — cuanto antes te pongas al día, menos crece el interés por mora."}
          </p>
        </div>

        <div className="rounded-2xl p-4 mt-4" style={{ background: "rgba(248,246,242,0.06)" }}>
          <div className="flex justify-between f-body text-sm mb-2"><span style={{ color: C.inkFaint }}>Monto adeudado</span><span className="f-mono font-semibold" style={{ color: C.paper }}>{fmt(22800)}</span></div>
          <div className="flex justify-between f-body text-sm"><span style={{ color: C.inkFaint }}>Interés por mora</span><span className="f-mono font-semibold" style={{ color: C.coral }}>{fmt(1140)}</span></div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {role === "presta" ? (
            <>
              <PrimaryBtn tone="coral">Iniciar gestión de cobro</PrimaryBtn>
              <GhostBtn>Contactar a Diego</GhostBtn>
            </>
          ) : (
            <>
              <PrimaryBtn>Pagar ahora</PrimaryBtn>
              <GhostBtn>Pedir una extensión de 5 días</GhostBtn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROFILE (incluye modo demo)
   ============================================================ */
function Profile({ role, onSwitchRole, mode, setMode }) {
  return (
    <div className="h-full overflow-y-auto finny-scroll px-5 pt-14 pb-28" style={{ background: C.paper }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-14 w-14 rounded-full flex items-center justify-center f-body font-semibold text-lg" style={{ background: C.ink, color: C.lime }}>AH</div>
        <div>
          <p className="f-display text-lg font-semibold" style={{ color: C.ink }}>Afolabi Hameed</p>
          <p className="f-body text-xs" style={{ color: "rgba(11,14,20,0.5)" }}>{role === "presta" ? "Perfil: Prestamista" : "Perfil: Tomador"}</p>
        </div>
      </div>

      <p className="f-body text-xs font-medium mb-2" style={{ color: "rgba(11,14,20,0.45)" }}>Tu rol</p>
      <div className="rounded-2xl p-1.5 flex mb-6" style={{ background: C.ink }}>
        {["presta", "pide"].map((r) => (
          <button key={r} onClick={() => onSwitchRole(r)} className="tap flex-1 rounded-xl py-2.5 f-body text-sm font-medium" style={{
            background: role === r ? C.lime : "transparent",
            color: role === r ? C.ink : C.inkFaint,
          }}>
            {r === "presta" ? "Prestar" : "Pedir"}
          </button>
        ))}
      </div>

      <p className="f-body text-xs font-medium mb-2" style={{ color: "rgba(11,14,20,0.45)" }}>Modo demo — ver estados de la cartera</p>
      <div className="flex flex-col gap-2">
        {[
          { key: "normal", label: "Con préstamos activos" },
          { key: "empty", label: "Vacío (recién empezás)" },
          { key: "mora", label: "Con una cuota atrasada" },
        ].map((m) => (
          <button key={m.key} onClick={() => setMode(m.key)} className="tap w-full flex items-center justify-between rounded-2xl px-4 py-3.5" style={{ background: C.ink }}>
            <span className="f-body text-sm" style={{ color: C.paper }}>{m.label}</span>
            {mode === m.key && <Check size={15} color={C.lime} />}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   BOTTOM NAV
   ============================================================ */
function BottomNav({ role, tab, setTab }) {
  const items =
    role === "presta"
      ? [{ k: "inicio", l: "Inicio", i: Home }, { k: "seguimiento", l: "Cartera", i: TrendingUp }, { k: "perfil", l: "Perfil", i: User }]
      : [{ k: "inicio", l: "Pedir", i: Wallet }, { k: "seguimiento", l: "Mis cuotas", i: TrendingUp }, { k: "perfil", l: "Perfil", i: User }];
  return (
    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-2" style={{ background: "linear-gradient(to top, rgba(11,14,20,1), rgba(11,14,20,0))" }}>
      <div className="rounded-full flex items-center px-2 py-2" style={{ background: C.ink, border: `1px solid ${C.hair}` }}>
        {items.map((it) => {
          const Icon = it.i;
          const active = tab === it.k;
          return (
            <button key={it.k} onClick={() => setTab(it.k)} className="tap flex-1 flex flex-col items-center gap-1 py-1.5 rounded-full" style={{ background: active ? "rgba(182,255,61,0.12)" : "transparent" }}>
              <Icon size={17} color={active ? C.lime : C.inkFaint} strokeWidth={2} />
              <span className="f-body font-medium" style={{ color: active ? C.lime : C.inkFaint, fontSize: 10 }}>{it.l}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function FinnyPrototype() {
  const [phase, setPhase] = useState("onboarding"); // onboarding | app
  const [role, setRole] = useState("presta");
  const [tab, setTab] = useState("inicio");
  const [push, setPush] = useState(null); // {type:'opportunity'|'flow'|'mora', id}
  const [demoMode, setDemoMode] = useState("normal"); // normal | empty | mora

  const loans = demoMode === "mora" ? LENDER_LOANS : demoMode === "empty" ? [] : LENDER_LOANS.filter((l) => l.status !== "mora");
  const borrowerLoan = demoMode === "mora" ? { ...BORROWER_LOAN, status: "mora" } : BORROWER_LOAN;
  const hasBorrowerLoan = demoMode !== "empty";

  const handleOnboardDone = (r) => {
    setRole(r);
    setPhase("app");
    setTab("inicio");
  };

  const openOpp = (id) => setPush({ type: "opportunity", id });
  const openMora = () => setPush({ type: "mora" });

  let content = null;
  if (push?.type === "opportunity") {
    const opp = OPPS.find((o) => o.id === push.id);
    content = <OpportunityDetail opp={opp} onBack={() => setPush(null)} />;
  } else if (push?.type === "flow") {
    content = <BorrowerFlow onClose={() => setPush(null)} />;
  } else if (push?.type === "mora") {
    content = <MoraDetail role={role} onBack={() => setPush(null)} />;
  } else if (tab === "inicio") {
    content =
      role === "presta" ? (
        <LenderHome onOpenOpp={openOpp} loans={loans} />
      ) : (
        <BorrowerHome onOpenFlow={() => setPush({ type: "flow" })} hasLoan={hasBorrowerLoan} loan={borrowerLoan} onOpenMora={openMora} />
      );
  } else if (tab === "seguimiento") {
    content = (
      <Dashboard role={role} mode={demoMode} loans={loans} borrowerLoan={borrowerLoan} onOpenMora={openMora} />
    );
  } else if (tab === "perfil") {
    content = <Profile role={role} onSwitchRole={(r) => { setRole(r); setTab("inicio"); }} mode={demoMode} setMode={setDemoMode} />;
  }

  return (
    <div className="finny-scope min-h-screen w-full flex items-center justify-center py-8 px-4" style={{ background: "#e8e6e1" }}>
      <style>{FONTS}</style>
      <div className="relative w-full shadow-2xl overflow-hidden" style={{ maxWidth: "26rem", height: 860, borderRadius: "2.75rem", border: "6px solid #0e0e0e", background: C.ink }}>
        {/* notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 rounded-b-2xl z-30" style={{ background: "#0e0e0e" }} />

        <div className="relative h-full w-full">
          {phase === "onboarding" ? (
            <Onboarding onDone={handleOnboardDone} />
          ) : (
            <>
              <div className="h-full">{content}</div>
              {!push && <BottomNav role={role} tab={tab} setTab={setTab} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
