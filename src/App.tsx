import { useState } from 'react'

const NAV_LINKS = ['Features', 'Protocol', 'Ecosystem', 'Docs']

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L25 8V20L14 26L3 20V8L14 2Z" stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.05)"/>
        <path d="M14 8L20 11.5V18.5L14 22L8 18.5V11.5L14 8Z" fill="rgba(0,229,255,0.12)" stroke="#00e5ff" strokeWidth="1"/>
      </svg>
    ),
    title: 'Zero-Knowledge Proofs',
    desc: 'Privacy-preserving transaction verification using cutting-edge ZK-SNARK cryptography. Your data stays yours — always.',
    tag: 'ZK Layer',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#a855f7" strokeWidth="1.5" fill="rgba(168,85,247,0.05)"/>
        <path d="M9 14L12.5 17.5L19 11" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="4" fill="rgba(168,85,247,0.1)"/>
      </svg>
    ),
    title: 'Trustless Execution',
    desc: 'Smart contracts execute autonomously with verifiable on-chain logic. No intermediaries, no counterparty risk, no downtime.',
    tag: 'Smart Contracts',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="10" height="10" rx="2" stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.05)"/>
        <rect x="15" y="3" width="10" height="10" rx="2" stroke="#a855f7" strokeWidth="1.5" fill="rgba(168,85,247,0.05)"/>
        <rect x="3" y="15" width="10" height="10" rx="2" stroke="#a855f7" strokeWidth="1.5" fill="rgba(168,85,247,0.05)"/>
        <rect x="15" y="15" width="10" height="10" rx="2" stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.05)"/>
        <path d="M13 8H15M8 13V15M20 13V15M13 20H15" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
      </svg>
    ),
    title: 'Cross-Chain Bridge',
    desc: 'Seamlessly move assets across 40+ EVM-compatible chains. Atomic swaps execute in under 3 seconds with sub-cent fees.',
    tag: 'Interoperability',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L14 6L24 20H4Z" stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.05)"/>
        <path d="M8 20L14 12L20 20H8Z" fill="rgba(0,229,255,0.1)" stroke="#a855f7" strokeWidth="1"/>
      </svg>
    ),
    title: 'On-Chain Governance',
    desc: 'Protocol upgrades and treasury allocation decided by token holders via quadratic voting. Fully transparent, fully democratic.',
    tag: 'DAO',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2"/>
        <circle cx="14" cy="14" r="5" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="2" fill="#a855f7"/>
      </svg>
    ),
    title: 'Liquid Staking',
    desc: 'Earn yield on staked assets while retaining liquidity. LST tokens are composable across the entire DeFi ecosystem.',
    tag: 'DeFi',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3V25M3 14H25" stroke="rgba(0,229,255,0.2)" strokeWidth="1"/>
        <path d="M6 6L14 14L22 22M22 6L14 14L6 22" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'MEV Protection',
    desc: 'Private mempool routing shields every transaction from front-running bots. Fair execution, guaranteed by cryptography.',
    tag: 'Security',
  },
]

const STATS = [
  { value: '$4.2B', label: 'Total Value Locked' },
  { value: '2.1M', label: 'Active Wallets' },
  { value: '140ms', label: 'Avg. Finality' },
  { value: '99.98%', label: 'Uptime SLA' },
]

const FAQS = [
  {
    q: 'What consensus mechanism does ArcimedesChain use?',
    a: 'ArcimedesChain uses a Proof-of-Stake consensus with a BFT finality gadget. Validators stake $NXS to participate in block production, achieving single-slot finality in under 150ms under normal network conditions.',
  },
  {
    q: 'How are cross-chain transactions secured?',
    a: 'Cross-chain messages are verified by a decentralized network of light-client relayers and a threshold signature scheme (TSS). No single entity can forge or censor messages — the security is cryptographic, not reputational.',
  },
  {
    q: 'Is the protocol audited?',
    a: 'Yes. The core protocol and all smart contracts have been audited by Trail of Bits, Spearbit, and OpenZeppelin. All audit reports are public and linked in our docs. An ongoing bug-bounty program (up to $1M) is active on Immunefi.',
  },
  {
    q: 'What are the gas fees?',
    a: 'Average transaction costs are below $0.01 USD. Gas is denominated in $NXS and priced dynamically via EIP-1559–style base fee + priority tip. Batch transactions reduce costs further by up to 90%.',
  },
  {
    q: 'Can I run a validator node?',
    a: 'Absolutely. Any address with at least 1,000 $NXS can activate a validator. The validator client runs on commodity hardware (8-core CPU, 32GB RAM, 2TB SSD). Detailed setup guides are in the docs.',
  },
]

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#050508', color: '#e8eaf0', fontFamily: "'Outfit', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(5,5,8,0.8)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-7 h-7 relative">
              <svg viewBox="0 0 28 28" fill="none">
                <path d="M14 2L26 8.5V19.5L14 26L2 19.5V8.5L14 2Z" fill="rgba(0,229,255,0.08)" stroke="#00e5ff" strokeWidth="1.5"/>
                <path d="M14 8L20 11.5V18.5L14 22L8 18.5V11.5L14 8Z" fill="rgba(124,58,237,0.2)" stroke="#a855f7" strokeWidth="1"/>
                <circle cx="14" cy="14" r="2.5" fill="#00e5ff"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
              ARCIMEDES<span style={{ color: '#00e5ff' }}>CHAIN</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color: '#8b8fa8', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e8eaf0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8b8fa8')}
              >{link}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="btn-outline px-5 py-2 rounded-lg text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Connect Wallet</button>
            <button className="btn-primary px-5 py-2 rounded-lg text-sm font-semibold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Launch App</button>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(v => !v)} style={{ color: '#8b8fa8' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen
                ? <><path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
                : <><path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ color: '#8b8fa8', textDecoration: 'none', fontSize: '0.95rem', paddingTop: '0.75rem' }}>{link}</a>
            ))}
            <div className="flex gap-3 pt-2">
              <button className="btn-outline px-4 py-2 rounded-lg text-sm flex-1">Connect Wallet</button>
              <button className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold text-white flex-1">Launch App</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative grid-bg noise min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 65%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: '5%', left: '15%', width: '400px', height: '300px', background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.08) 0%, transparent 65%)', pointerEvents: 'none' }}/>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.18)', color: '#00e5ff', fontFamily: "'JetBrains Mono', monospace", zIndex: 1 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5ff', display: 'inline-block', boxShadow: '0 0 8px #00e5ff' }}/>
          Mainnet v2.0 — Now Live
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'block', color: '#e8eaf0' }}>The Execution Layer</span>
          <span className="gradient-text" style={{ display: 'block' }}>for Infinite Scale</span>
        </h1>

        <p style={{ maxWidth: '580px', fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#8b8fa8', lineHeight: 1.7, marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          ArcimedesChain is a modular Layer-1 built for developers who refuse to compromise. 10,000 TPS, sub-cent fees, and ZK-native privacy — production-ready today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4" style={{ position: 'relative', zIndex: 1 }}>
          <button className="btn-primary px-8 py-3.5 rounded-xl text-base font-semibold text-white flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Start Building
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="btn-outline px-8 py-3.5 rounded-xl text-base font-medium flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#00e5ff" strokeWidth="1.2"/><path d="M6 5.5L11 8L6 10.5V5.5Z" fill="#00e5ff"/></svg>
            Watch Demo
          </button>
        </div>

        {/* Stats bar */}
        <div className="mt-20 w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0" style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', background: 'rgba(13,13,20,0.7)', backdropFilter: 'blur(12px)', zIndex: 1, position: 'relative' }}>
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center py-6 px-4" style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #00e5ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</span>
              <span style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '0.25rem', fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: '#a855f7', fontFamily: "'JetBrains Mono', monospace" }}>
            // PROTOCOL
          </div>
          <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem' }}>
            Built for the Next Billion<br />
            <span className="gradient-text">On-Chain Users</span>
          </h2>
          <p style={{ color: '#8b8fa8', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Every primitive engineered from first principles. No shortcuts. No compromises. No legacy debt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {f.icon}
                </div>
                <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: '#6b7280', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '3px 8px', borderRadius: '4px' }}>{f.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.6rem', color: '#e8eaf0' }}>{f.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.7 }}>{f.desc}</p>
              <div className="mt-5 flex items-center gap-1.5" style={{ color: '#00e5ff', fontSize: '0.85rem', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Learn more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M8 4L11.5 7L8 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="ecosystem" className="py-24 px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(0,229,255,0.08) 100%)', border: '1px solid rgba(124,58,237,0.25)' }}>
          {/* Background geometry */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }}/>
            <div style={{ position: 'absolute', bottom: '-60px', left: '10%', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)' }}/>
            {/* Grid lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }} preserveAspectRatio="none">
              {[0,1,2,3,4].map(i => <line key={i} x1={`${i * 25}%`} y1="0" x2={`${i * 25}%`} y2="100%" stroke="#00e5ff" strokeWidth="1"/>)}
              {[0,1,2,3].map(i => <line key={i} x1="0" y1={`${i * 33}%`} x2="100%" y2={`${i * 33}%`} stroke="#00e5ff" strokeWidth="1"/>)}
            </svg>
          </div>

          <div className="relative z-10 text-center py-20 px-8">
            <div className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: '#00e5ff', fontFamily: "'JetBrains Mono', monospace" }}>
              // JOIN THE ECOSYSTEM
            </div>
            <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.2rem' }}>
              Ready to Deploy<br />
              <span className="gradient-text">on ArcimedesChain?</span>
            </h2>
            <p style={{ color: '#8b8fa8', fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Join 4,200+ developers shipping production dApps. Full EVM compatibility means your existing Solidity code deploys today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="btn-primary px-8 py-4 rounded-xl text-base font-semibold text-white flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Deploy Your First Contract
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="btn-outline px-8 py-4 rounded-xl text-base font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Read the Docs
              </button>
            </div>
            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              {['Audited by Trail of Bits', 'Open Source', '$1M Bug Bounty', 'EVM Compatible'].map(label => (
                <div key={label} className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#6b7280' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#00e5ff" strokeWidth="1.2" opacity="0.5"/><path d="M4.5 7L6.5 9L9.5 5" stroke="#00e5ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="docs" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)', color: '#00e5ff', fontFamily: "'JetBrains Mono', monospace" }}>
            // FAQ
          </div>
          <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Common Questions,<br/><span className="gradient-text-warm">Direct Answers</span>
          </h2>
        </div>

        <div>
          {FAQS.map((item, i) => (
            <div key={i} className="faq-item" style={{ padding: '1.25rem 0' }}>
              <button
                className="w-full flex items-center justify-between gap-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: '1rem', color: openFaq === i ? '#e8eaf0' : '#c4c7d4', flex: 1, transition: 'color 0.2s' }}>
                  {item.q}
                </span>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${openFaq === i ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.2s, transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1V11M1 6H11" stroke={openFaq === i ? '#00e5ff' : '#6b7280'} strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </button>
              {openFaq === i && (
                <p style={{ marginTop: '0.9rem', fontSize: '0.93rem', color: '#6b7280', lineHeight: 1.75, paddingRight: '2.5rem' }}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="mt-8 py-12 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 28 28" fill="none" width="22" height="22">
              <path d="M14 2L26 8.5V19.5L14 26L2 19.5V8.5L14 2Z" fill="rgba(0,229,255,0.06)" stroke="#00e5ff" strokeWidth="1.5"/>
              <circle cx="14" cy="14" r="3" fill="#00e5ff"/>
            </svg>
            <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em' }}>
              ARCIMEDES<span style={{ color: '#00e5ff' }}>CHAIN</span>
            </span>
          </div>
          <div className="flex gap-7">
            {['GitHub', 'Discord', 'Twitter', 'Docs'].map(link => (
              <a key={link} href="#" style={{ fontSize: '0.85rem', color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e8eaf0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
              >{link}</a>
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', color: '#3a3d50', fontFamily: "'JetBrains Mono', monospace" }}>
            © 2026 ArcimedesChain Labs. MIT Licensed.
          </p>
        </div>
      </footer>

    </div>
  )
}
