import { useState, useEffect } from "react";

/* ---------- Dados ---------- */

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#contato", label: "Contato" },
];

const FEATURES = [
  {
    icon: "📊",
    iconLabel: "Gráfico",
    title: "Análise de Liquidez",
    text: "Monitoramento contínuo de fluxo financeiro e reservas bancárias.",
  },
  {
    icon: "🛡️",
    iconLabel: "Escudo",
    title: "Segurança Bancária",
    text: "Proteção contra fraudes e monitoramento de ameaças em tempo real.",
  },
  {
    icon: "⚡",
    iconLabel: "Raio",
    title: "Alertas Inteligentes",
    text: "Notificações automáticas sobre riscos críticos e oscilações financeiras.",
  },
];

const ABOUT_POINTS = [
  { title: "Visão unificada", text: "Liquidez, risco operacional e segurança em um único painel." },
  { title: "Antecipação", text: "Modelos preditivos sinalizam pressões antes que virem crises." },
  { title: "Transparência", text: "Relatórios claros para diretoria, auditoria e reguladores." },
];

const SECURITY_POINTS = [
  "Monitoramento em tempo real",
  "Inteligência artificial preditiva",
  "Criptografia avançada",
  "Painéis executivos modernos",
];

// Valores ilustrativos. Substitua pelos números reais da sua operação.
const TRUST_METRICS = [
  { label: "Eficiência Operacional", value: 95 },
  { label: "Precisão Analítica", value: 99 },
  { label: "Confiabilidade", value: 97 },
];

const INITIAL_LIVE_METRICS = [
  { key: "liquidez", label: "Liquidez Bancária", value: 92 },
  { key: "seguranca", label: "Segurança Digital", value: 98 },
  { key: "risco", label: "Monitoramento de Risco", value: 87 },
];

/* ---------- Utilidades ---------- */

// Vermelho fica reservado para alerta; indicadores saudáveis usam verde/âmbar.
function toneFor(value) {
  if (value >= 90) return "bg-emerald-500";
  if (value >= 75) return "bg-amber-500";
  return "bg-red-600";
}

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/* ---------- Componentes ---------- */

function ProgressBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>{label}</span>
        <span className="text-gray-300">{Math.round(value)}%</span>
      </div>
      <div
        className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden"
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full ${color} transition-all duration-700 motion-reduce:transition-none`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-red-700 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#topo" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 rounded">
          <span className="block text-3xl font-extrabold tracking-widest text-red-600 leading-none">FLA</span>
          <span className="text-xs text-gray-300">Financial Liquidity Assurance</span>
        </a>

        {/* Menu desktop */}
        <nav aria-label="Principal" className="hidden md:flex gap-6 text-sm text-gray-300">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-red-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 rounded"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Botão hambúrguer (mobile) */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg border border-red-700 text-gray-200 hover:bg-red-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav id="menu-mobile" aria-label="Principal (mobile)" className="md:hidden border-t border-red-900 bg-black">
          <ul className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 text-gray-200">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block py-1 hover:text-red-500" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function StabilityPanel() {
  const [metrics, setMetrics] = useState(INITIAL_LIVE_METRICS);

  // Simula pequenas oscilações. Troque por dados reais (API/WebSocket) em produção.
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: clamp(m.value + (Math.random() * 4 - 2), 70, 100),
        }))
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-zinc-950 border border-red-900 rounded-3xl p-8 shadow-2xl shadow-red-950/30">
      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        <h3 className="text-2xl font-bold">Painel de Estabilidade</h3>
        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
          Sistema Online
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-8">Dados ilustrativos para demonstração.</p>

      <div className="space-y-6">
        {metrics.map((m) => (
          <ProgressBar key={m.key} label={m.label} value={m.value} color={toneFor(m.value)} />
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // Abre o cliente de e-mail com os dados preenchidos.
  // Para envio real, troque por uma chamada à sua API.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Solicitação de demonstração - ${form.nome}`);
    const body = encodeURIComponent(`Nome: ${form.nome}\nE-mail: ${form.email}\n\n${form.mensagem}`);
    window.location.href = `mailto:contato@fla-finance.com?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/40";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full md:max-w-md">
      <div>
        <label htmlFor="nome" className="block text-sm text-gray-300 mb-1">Nome</label>
        <input id="nome" required autoComplete="name" className={field} value={form.nome} onChange={update("nome")} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-300 mb-1">E-mail corporativo</label>
        <input id="email" type="email" required autoComplete="email" className={field} value={form.email} onChange={update("email")} />
      </div>
      <div>
        <label htmlFor="mensagem" className="block text-sm text-gray-300 mb-1">Mensagem</label>
        <textarea id="mensagem" rows={3} className={field} value={form.mensagem} onChange={update("mensagem")} />
      </div>
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-red-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
      >
        Solicitar Demonstração
      </button>
    </form>
  );
}

/* ---------- Página ---------- */

export default function FLAPlatform() {
  return (
    <div id="topo" className="min-h-screen bg-black text-white font-sans">
      <a
        href="#principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-red-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Ir para o conteúdo
      </a>

      <Header />

      <main id="principal">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-red-900/20 blur-3xl pointer-events-none" aria-hidden="true"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full border border-red-700 text-red-400 text-sm mb-6">
                Plataforma de estabilidade bancária
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Protegendo bancos com
                <span className="text-red-600"> inteligência financeira</span>
              </h2>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                A FLA monitora liquidez, riscos operacionais e estabilidade de instituições financeiras em tempo real.
              </p>

              <div className="flex gap-4 flex-wrap">
                <a
                  href="#contato"
                  className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-red-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                >
                  Solicitar Demonstração
                </a>

                <a
                  href="#plataforma"
                  className="border border-red-700 hover:bg-red-950 transition px-6 py-3 rounded-2xl font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                >
                  Ver Plataforma
                </a>
              </div>
            </div>

            <div id="plataforma" className="scroll-mt-24">
              <StabilityPanel />
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
          <div className="max-w-2xl mb-12">
            <h3 className="text-4xl font-black mb-4">Sobre a FLA</h3>
            <p className="text-gray-300 leading-relaxed">
              A Financial Liquidity Assurance ajuda instituições financeiras a enxergar,
              com antecedência, os pontos de pressão sobre liquidez e operação, para agir antes
              que eles afetem clientes e o sistema bancário.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-8">
            {ABOUT_POINTS.map((p) => (
              <li key={p.title} className="border-l-2 border-red-700 pl-5">
                <h4 className="text-xl font-bold mb-2">{p.title}</h4>
                <p className="text-gray-400 leading-relaxed">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Serviços */}
        <section id="servicos" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black mb-4">Soluções Inteligentes</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ferramentas desenvolvidas para aumentar a estabilidade, transparência e proteção financeira.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="bg-zinc-950 border border-red-900 rounded-3xl p-8 transition hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-2xl mb-6">
                  <span role="img" aria-label={f.iconLabel}>{f.icon}</span>
                </div>
                <h4 className="text-2xl font-bold mb-4">{f.title}</h4>
                <p className="text-gray-400 leading-relaxed">{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Segurança */}
        <section id="seguranca" className="bg-zinc-950 border-y border-red-950 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-black mb-6">
                Tecnologia focada em estabilidade financeira
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                Nossa plataforma utiliza inteligência artificial e análise preditiva para detectar riscos antes que afetem o sistema bancário.
              </p>

              <ul className="space-y-4 text-gray-300">
                {SECURITY_POINTS.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-emerald-400" aria-hidden="true">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black border border-red-900 rounded-3xl p-10">
              <div className="space-y-8">
                {TRUST_METRICS.map((m) => (
                  <ProgressBar key={m.label} label={m.label} value={m.value} color={toneFor(m.value)} />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-8">Indicadores ilustrativos.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Contato */}
      <footer id="contato" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between gap-10 border-t border-red-950 pt-10">
          <div>
            <h4 className="text-3xl font-black text-red-600 mb-2">FLA</h4>
            <p className="text-gray-400">Financial Liquidity Assurance © 2026</p>
            <p className="text-gray-400 mt-4">
              <a
                href="mailto:contato@fla-finance.com"
                className="hover:text-red-500 underline underline-offset-4"
              >
                contato@fla-finance.com
              </a>
            </p>
            <p className="text-gray-400">Monitoramento bancário inteligente</p>

            <nav aria-label="Legal" className="mt-6 flex gap-5 text-sm text-gray-400">
              <a href="/privacidade" className="hover:text-red-500 underline underline-offset-4">
                Política de Privacidade
              </a>
              <a href="/lgpd" className="hover:text-red-500 underline underline-offset-4">
                LGPD
              </a>
            </nav>
          </div>

          <ContactForm />
        </div>
      </footer>
    </div>
  );
}
