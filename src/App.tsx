/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  Clock,
  Train,
  Bus,
  Car,
  Plane,
  CheckCircle,
  XCircle,
  Utensils,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  History,
  Users,
  Wind,
  Smile,
  Mountain,
  Check,
  X,
  Mail,
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react';
import {
  DESTINATIONS,
  DESTINATION_LIST,
  getDestination,
  searchDestinations,
  destinationsForPersona,
  type Destination,
  type DestinationSummary
} from './data/destinations';

// --- View State ---
type InfoTopic =
  | 'how-it-works'
  | 'mint-scoring'
  | 'careers'
  | 'travel-tribes'
  | 'ambassadors'
  | 'support'
  | 'privacy'
  | 'terms'
  | 'cookies';

type View =
  | { kind: 'home' }
  | { kind: 'city'; cityId: string }
  | { kind: 'destinations' }
  | { kind: 'personas' }
  | { kind: 'about' }
  | { kind: 'search'; query: string }
  | { kind: 'info'; topic: InfoTopic };

const PERSONALITIES = [
  { id: 'All', icon: <TrendingUp size={16} /> },
  { id: 'Introvert', icon: <Wind size={16} /> },
  { id: 'Extrovert', icon: <Users size={16} /> },
  { id: 'History Lover', icon: <History size={16} /> },
  { id: 'Adventure Lover', icon: <Mountain size={16} /> },
  { id: 'Spiritual', icon: <Smile size={16} /> },
  { id: 'Young', icon: <Smile size={16} /> },
  { id: 'Old', icon: <History size={16} /> },
];

const INFO_CONTENT: Record<InfoTopic, { title: string; intro: string; sections: { heading: string; body: string }[] }> = {
  'how-it-works': {
    title: 'How It Works',
    intro: 'Every ReviewMint blueprint is a 24-hour, locally-verified plan. No filler, only the facts.',
    sections: [
      { heading: '1. We pick a city', body: 'We choose destinations where a single day is genuinely enough to capture the soul of the place — not a watered-down sample.' },
      { heading: '2. We build a 24-hour blueprint', body: 'Every itinerary is timed, sequenced, and stress-tested against traffic, queues, opening hours, and weather windows.' },
      { heading: '3. We score the trip', body: 'Each blueprint receives a Mint Score that combines verified payoff, effort intensity, and crowd-honesty against a fixed rubric.' }
    ]
  },
  'mint-scoring': {
    title: 'The Mint Scoring System',
    intro: 'A single 0-100 number that tells you whether a destination is worth your day. Higher is better.',
    sections: [
      { heading: 'Visual / Soul Payoff (50%)', body: 'How memorable is the experience? We weight architecture, culture, and atmosphere — not Instagram appeal alone.' },
      { heading: 'Effort Intensity (30%)', body: 'Combined fatigue and money cost relative to the duration. A great trip that destroys you is penalized.' },
      { heading: 'Crowd Honesty (20%)', body: 'How well does the destination handle peak traffic? Tourist traps lose points; underrated gems gain them.' }
    ]
  },
  'careers': {
    title: 'Careers at ReviewMint',
    intro: 'We hire generalists, walkers, photographers, and skeptics. We do not hire affiliate marketers.',
    sections: [
      { heading: 'Field Reviewer', body: 'Spend 3-5 days in a city, walk every route on this site, and write a verdict no sponsor would let you write elsewhere.' },
      { heading: 'Frontend Engineer', body: 'React, TypeScript, Tailwind. Help us keep the experience tight, the load times under 1s, and the animations meaningful.' },
      { heading: 'Open applications', body: 'No matching role? Send a city you would review and a single page on what is wrong with the existing guides for it.' }
    ]
  },
  'travel-tribes': {
    title: 'Travel Tribes',
    intro: 'Find people who travel the way you do — same rhythm, same intensity, same definition of "worth it".',
    sections: [
      { heading: 'Slow & Spiritual', body: 'Riverside mornings, single-monastery days, journals. No 4-stop itineraries.' },
      { heading: 'Adrenaline & Altitude', body: 'Rafting, trekking, paragliding — for people whose Sundays involve helmets.' },
      { heading: 'History & Architecture', body: 'Forts, frescoes, footnotes. We will hand you a 1500-page reading list. You will love it.' }
    ]
  },
  'ambassadors': {
    title: 'Ambassador Program',
    intro: 'A small, paid network of city-specific writers who refuse paid placements.',
    sections: [
      { heading: 'How we pay', body: 'Flat per-blueprint rate. We never share affiliate revenue with reviewers, because affiliate incentives corrupt judgment.' },
      { heading: 'How we vet', body: 'Six-month minimum residence in the city, three sample blueprints, and one interview with the editorial lead.' },
      { heading: 'How we publish', body: 'Every blueprint is reviewed by two other ambassadors before it goes live — disagreements are recorded in a public changelog.' }
    ]
  },
  'support': {
    title: 'Support',
    intro: 'Real humans. No tier-one bots. Replies in under 24 hours during business days.',
    sections: [
      { heading: 'Trip-day issues', body: 'If something we recommended is closed, dangerous, or substantially worse than described, message us — we will make it right.' },
      { heading: 'Editorial corrections', body: 'Spot a factual error? Email corrections@reviewmint.example with the URL and the source — we publish a public changelog.' },
      { heading: 'Press & partnerships', body: 'We do not accept sponsored placements. We do answer press inquiries.' }
    ]
  },
  'privacy': {
    title: 'Privacy Policy',
    intro: 'We collect only what we need to run the service. We never sell your data.',
    sections: [
      { heading: 'What we collect', body: 'Email address (if you subscribe), aggregate page-view analytics with no personally identifiable data, and trip-history if you choose to save itineraries.' },
      { heading: 'What we share', body: 'Nothing with advertisers. Nothing with data brokers. Service providers (hosting, email) only when strictly required to operate.' },
      { heading: 'Your rights', body: 'You can export, edit, or delete every piece of data we hold about you from your account settings, with no questions asked.' }
    ]
  },
  'terms': {
    title: 'Terms of Service',
    intro: 'The short version: use the site to plan trips, do not scrape it for ad copy, and do not blame us for the weather.',
    sections: [
      { heading: 'Editorial use', body: 'You may quote up to 200 words of any blueprint with attribution. Anything more requires written permission.' },
      { heading: 'No warranty', body: 'Our blueprints are built carefully but the world changes. Verify hours, prices, and entry requirements before you travel.' },
      { heading: 'Changes', body: 'We may update these terms. If a change is material we will notify subscribers by email at least 30 days in advance.' }
    ]
  },
  'cookies': {
    title: 'Cookie Policy',
    intro: 'Three cookies. No tracking pixels. No third-party advertising tags.',
    sections: [
      { heading: 'Session', body: 'A short-lived cookie that keeps you logged in while you are using the site. Expires when you close the browser.' },
      { heading: 'Preferences', body: 'Stores your last-used personality filter and dark-mode setting so the site remembers you between visits.' },
      { heading: 'Analytics', body: 'A single first-party analytics cookie counts page views in aggregate. No demographic profiling, no cross-site tracking.' }
    ]
  }
};

export default function App() {
  const [view, setView] = useState<View>({ kind: 'home' });
  const [activePersonality, setActivePersonality] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const heroSearchRef = useRef<HTMLInputElement>(null);

  const navigate = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCity = (cityId: string) => {
    if (!getDestination(cityId)) {
      showToast(`No blueprint yet for "${cityId}" — coming soon.`);
      return;
    }
    navigate({ kind: 'city', cityId });
  };

  const submitSearch = (q: string) => {
    const trimmed = q.trim();
    navigate({ kind: 'search', query: trimmed });
  };

  const focusHeroSearch = () => {
    if (view.kind !== 'home') {
      navigate({ kind: 'home' });
      setTimeout(() => heroSearchRef.current?.focus(), 350);
    } else {
      heroSearchRef.current?.focus();
      heroSearchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const showToast = (message: string) => {
    setToast(message);
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const selectedCity = view.kind === 'city' ? getDestination(view.cityId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-surface-bg">
      {/* Navigation - NON STICKY, DARK COLOR */}
      <nav className="w-full bg-slate-950 border-b border-slate-900 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate({ kind: 'home' })}
          >
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-brand/20 group-hover:bg-white transition-all">RM</div>
            <span className="font-display text-2xl font-black text-white tracking-tighter">Review<span className="text-brand">Mint</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-400">
            <NavLink active={view.kind === 'destinations'} onClick={() => navigate({ kind: 'destinations' })}>Destinations</NavLink>
            <NavLink active={view.kind === 'personas'} onClick={() => navigate({ kind: 'personas' })}>Persona Guides</NavLink>
            <NavLink active={view.kind === 'about'} onClick={() => navigate({ kind: 'about' })}>About</NavLink>
            <button
              onClick={() => setLoginOpen(true)}
              className="bg-brand/10 text-brand px-6 py-2.5 rounded-xl border border-brand/20 hover:bg-brand hover:text-slate-950 transition-all font-black"
            >
              LOGIN
            </button>
          </div>
          <button
            className="md:hidden text-white"
            onClick={focusHeroSearch}
            aria-label="Search"
          >
            <Search size={24} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {view.kind === 'home' && (
          <HomeView
            onCityClick={openCity}
            activePersonality={activePersonality}
            setActivePersonality={setActivePersonality}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSubmitSearch={submitSearch}
            heroSearchRef={heroSearchRef}
          />
        )}
        {view.kind === 'city' && selectedCity && (
          <CityView
            city={selectedCity}
            activePersonality={activePersonality}
            setActivePersonality={setActivePersonality}
          />
        )}
        {view.kind === 'destinations' && (
          <DestinationsView onCityClick={openCity} />
        )}
        {view.kind === 'personas' && (
          <PersonaGuidesView onCityClick={openCity} />
        )}
        {view.kind === 'about' && (
          <AboutView onExploreClick={() => navigate({ kind: 'destinations' })} />
        )}
        {view.kind === 'search' && (
          <SearchView
            initialQuery={view.query}
            onCityClick={openCity}
            onSubmitSearch={submitSearch}
          />
        )}
        {view.kind === 'info' && (
          <InfoPageView
            topic={view.topic}
            onHome={() => navigate({ kind: 'home' })}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate({ kind: 'home' })}
              >
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-slate-950 font-black text-sm">RM</div>
                <span className="font-display text-xl font-bold text-white tracking-tight">ReviewMint</span>
              </div>
              <p className="text-sm leading-relaxed opacity-60">High-efficiency travel blueprints for the modern traveler. No filler, only the facts.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-xs font-bold">
                <li><FooterLink onClick={() => navigate({ kind: 'about' })}>About Us</FooterLink></li>
                <li><FooterLink onClick={() => navigate({ kind: 'info', topic: 'how-it-works' })}>How it Works</FooterLink></li>
                <li><FooterLink onClick={() => navigate({ kind: 'info', topic: 'mint-scoring' })}>Mint Scoring</FooterLink></li>
                <li><FooterLink onClick={() => navigate({ kind: 'info', topic: 'careers' })}>Careers</FooterLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Community</h4>
              <ul className="space-y-4 text-xs font-bold">
                <li><FooterLink onClick={() => navigate({ kind: 'destinations' })}>Destinations</FooterLink></li>
                <li><FooterLink onClick={() => navigate({ kind: 'info', topic: 'travel-tribes' })}>Travel Tribes</FooterLink></li>
                <li><FooterLink onClick={() => navigate({ kind: 'info', topic: 'ambassadors' })}>Ambassadors</FooterLink></li>
                <li><FooterLink onClick={() => navigate({ kind: 'info', topic: 'support' })}>Support</FooterLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-brand">Stay Updated</h4>
              <p className="text-xs mb-4 opacity-60">Get 1-day guides for your next trip.</p>
              <NewsletterForm onSubscribed={(email) => showToast(`Subscribed ${email} — check your inbox.`)} />
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2026 ReviewMint Travel. Final Proof of Experience.</p>
            <div className="flex gap-6">
              <FooterLink onClick={() => navigate({ kind: 'info', topic: 'privacy' })}>Privacy</FooterLink>
              <FooterLink onClick={() => navigate({ kind: 'info', topic: 'terms' })}>Terms</FooterLink>
              <FooterLink onClick={() => navigate({ kind: 'info', topic: 'cookies' })}>Cookies</FooterLink>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <AnimatePresence>
        {loginOpen && (
          <LoginModal
            onClose={() => setLoginOpen(false)}
            onSuccess={(email) => {
              setLoginOpen(false);
              showToast(`Welcome back, ${email.split('@')[0]} (demo mode).`);
            }}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-slate-950 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-slate-950/40 border border-slate-800 flex items-center gap-3"
          >
            <Check size={16} className="text-brand" strokeWidth={3} />
            <span className="text-xs font-bold uppercase tracking-widest">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Reusable link components ---

function NavLink({ children, onClick, active }: { children: React.ReactNode; onClick: () => void; active?: boolean }) {
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`hover:text-brand transition-colors ${active ? 'text-brand' : ''}`}
    >
      {children}
    </a>
  );
}

function FooterLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="hover:text-brand"
    >
      {children}
    </a>
  );
}

function NewsletterForm({ onSubscribed }: { onSubscribed: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const submit = () => {
    const e = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      onSubscribed('Invalid email — please try again.');
      return;
    }
    onSubscribed(e);
    setEmail('');
  };
  return (
    <div className="flex gap-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-brand w-full"
      />
      <button
        onClick={submit}
        className="bg-brand text-slate-950 px-4 py-2 rounded-lg text-xs font-bold"
      >
        Join
      </button>
    </div>
  );
}

function LoginModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    onSuccess(email.trim());
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.form
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="bg-slate-950 border border-slate-800 rounded-[2rem] p-10 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-slate-950 font-black text-xl">RM</div>
            <span className="font-display text-xl font-black text-white tracking-tighter">Sign In</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="Close login"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">Demo mode • no real account required</p>
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand mb-4"
          autoFocus
        />
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand mb-8"
        />
        <button
          type="submit"
          className="w-full bg-brand text-slate-950 font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-white transition-colors"
        >
          Sign In
        </button>
        <p className="text-[10px] text-slate-500 mt-6 text-center">By signing in you agree to our placeholder terms.</p>
      </motion.form>
    </motion.div>
  );
}

// --- Views ---

function HomeView({
  onCityClick,
  activePersonality,
  setActivePersonality,
  searchQuery,
  setSearchQuery,
  onSubmitSearch,
  heroSearchRef
}: {
  onCityClick: (id: string) => void;
  activePersonality: string;
  setActivePersonality: (p: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSubmitSearch: (q: string) => void;
  heroSearchRef: React.RefObject<HTMLInputElement | null>;
}) {
  const visibleCities = useMemo(
    () => activePersonality === 'All' ? DESTINATION_LIST : destinationsForPersona(activePersonality),
    [activePersonality]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      <section className="relative h-[450px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop"
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full w-fit mx-auto mb-8 backdrop-blur-md"
          >
            Verified One-Day Blueprints
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl text-white mb-8 font-black tracking-tighter uppercase"
          >
            EFFORTLESS <span className="text-brand">TRAVEL.</span><br />
            MAXIMAL <span className="italic">JOY.</span>
          </motion.h1>
          <div className="relative max-w-xl mx-auto group">
            <input
              ref={heroSearchRef}
              type="text"
              placeholder="Where are you heading?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') onSubmitSearch(searchQuery); }}
              className="w-full h-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl pl-16 pr-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-4 focus:ring-brand/30 transition-all shadow-2xl group-hover:bg-white/20"
            />
            <button
              type="button"
              onClick={() => onSubmitSearch(searchQuery)}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-brand transition-colors"
              aria-label="Submit search"
            >
              <Search size={24} />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-[-40px] relative z-20">
        <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/40 mb-12 flex items-center gap-2 overflow-x-auto no-scrollbar border border-slate-100/50">
          <span className="text-[10px] font-black uppercase text-slate-400 px-6 shrink-0 border-r border-slate-100 py-2 hidden md:block">Personality</span>
          <div className="flex gap-2 p-1">
            {PERSONALITIES.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePersonality(p.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activePersonality === p.id
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {p.icon}
                {p.id}
              </button>
            ))}
          </div>
        </div>

        <div className="city-grid">
          {visibleCities.map(c => (
            <CityCard
              key={c.id}
              title={c.name}
              tagline={c.tagline}
              image={c.image}
              rating={c.rating}
              onClick={() => onCityClick(c.id)}
            />
          ))}
        </div>
        {visibleCities.length === 0 && (
          <div className="text-center py-20 text-slate-400 text-sm font-bold uppercase tracking-widest">
            No destinations match this personality yet.
          </div>
        )}
      </section>
    </motion.div>
  );
}

function CityView({ city, activePersonality, setActivePersonality }: { city: Destination, activePersonality: string, setActivePersonality: (p: string) => void }) {
  const combinedEffort = (city.matrix.money + city.matrix.fatigue) / 2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1440px] mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-4 order-1 lg:order-1 space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative group rounded-[3rem] overflow-hidden aspect-[4/5] lg:aspect-[1/1] shadow-2xl shadow-slate-300"
          >
            <img src={city.heroImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" alt={city.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="text-white/5 text-[10rem] font-black tracking-tighter absolute top-0 right-0 pointer-events-none select-none uppercase -mt-20 -mr-10">{city.name.toUpperCase()}</div>
              <div className="bg-orange-400 text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full w-fit mb-6 shadow-lg">Verified Guide</div>
              <h1 className="text-5xl lg:text-7xl text-white font-black mb-4 leading-tight tracking-tight uppercase">One Day <br/>in {city.name}</h1>
              <div className="bg-brand text-slate-950 text-xs font-bold px-6 py-3 rounded-2xl flex items-center gap-3 w-fit shadow-xl uppercase tracking-widest">
                <Check size={18} className="text-slate-950" strokeWidth={3} />
                {city.verdict}
              </div>
            </div>
          </motion.div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-b border-slate-50 pb-4">Getting There</h4>
            <div className="space-y-4">
              {city.reach.map((r, i) => (
                <div key={i} className="flex items-center gap-6 group hover:translate-x-2 transition-transform">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand group-hover:text-slate-950 transition-all shadow-sm">
                    {r.type === 'Train' ? <Train size={20} /> : r.type === 'Road' ? <Car size={20} /> : r.type === 'Flight' ? <Plane size={20} /> : <Bus size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h5 className="text-[13px] font-black text-slate-800">{r.detail}</h5>
                      <span className="text-[10px] font-black text-brand">{r.cost}</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{r.time} • {r.hub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50/20 rounded-[2.5rem] p-8 border border-emerald-100">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-6 flex items-center gap-3">
              <AlertCircle size={16} />
              Survival
            </h4>
            <div className="space-y-4">
              {city.tips.slice(0, 3).map((tip, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 shrink-0"></div>
                  <p className="text-[13px] font-bold text-emerald-950 leading-relaxed italic opacity-80">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-5 order-2 lg:order-2 bg-white rounded-[3.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden relative min-h-[800px]">
          <div className="p-10 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-40">
            <div>
              <h3 className="text-xl font-black tracking-[0.2em] text-slate-900 uppercase">the timeline</h3>
              <p className="text-brand text-[10px] font-black mt-1 uppercase tracking-widest">24h Blueprint</p>
            </div>
            <div className="flex gap-2">
              {['History', 'Introvert'].map(tag => (
                <button key={tag} onClick={() => setActivePersonality(tag)} className={`px-4 py-2 text-[9px] font-black border border-slate-100 rounded-xl transition-all uppercase tracking-widest ${activePersonality === tag ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 hover:text-brand'}`}>{tag}</button>
              ))}
            </div>
          </div>

          <div className="p-10 space-y-12 relative">
            <div className="absolute left-[59px] top-12 bottom-12 w-[1px] bg-slate-100"></div>
            <AnimatePresence mode="popLayout">
              {city.itinerary.map((item, i) => {
                const isMatch = activePersonality === 'All' || item.personalities.includes(activePersonality);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isMatch ? 1 : 0.1,
                      filter: isMatch ? 'blur(0px)' : 'blur(1px)'
                    }}
                    className="relative pl-16 flex flex-col"
                  >
                    <div className="absolute left-[-2px] top-0 w-12 h-12 bg-white flex items-center justify-center z-10">
                      <div className={`itinerary-dot ${isMatch ? 'bg-brand' : 'bg-slate-100 shadow-none grayscale'}`}></div>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center gap-4 text-[10px] font-black tracking-widest text-slate-400">
                        <span className={isMatch ? 'text-brand' : ''}>{item.time}</span>
                        <span className="w-6 h-[0.5px] bg-slate-100"></span>
                        <span>{item.duration}</span>
                      </div>
                    </div>
                    <h4 className={`text-xl font-black tracking-tight mb-2 ${isMatch ? 'text-slate-900' : 'text-slate-300'}`}>{item.place}</h4>
                    <p className={`text-[13px] font-medium leading-relaxed max-w-sm mb-4 ${isMatch ? 'text-slate-500' : 'text-slate-200'}`}>
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.personalities.map(p => (
                        <span key={p} className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border transition-all ${isMatch && p === activePersonality ? 'bg-brand text-slate-950 border-brand' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>{p}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 order-3 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 text-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Mint Score</h4>

            <div className="relative w-full aspect-[2/1.4] flex items-center justify-center">
              <svg className="w-48 h-48 gauge-svg" viewBox="0 0 100 60">
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#F1F5F9" strokeWidth="10" strokeLinecap="round" />
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#00B894" strokeWidth="10" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset={125.6 * (1 - city.rating / 10)} />
                <motion.line
                  initial={{ rotate: -90 }}
                  animate={{ rotate: -90 + (city.rating / 10 * 180) }}
                  transition={{ duration: 1.5, type: 'spring' }}
                  x1="50" y1="50" x2="50" y2="15"
                  stroke="#0F172A" strokeWidth="3" strokeLinecap="round"
                  style={{ originX: '50px', originY: '50px' }}
                />
                <circle cx="50" cy="50" r="5" fill="#0F172A" />
              </svg>
              <div className="absolute bottom-4 text-4xl font-black text-slate-950 tracking-tighter">
                {Math.round(city.rating * 10)}
              </div>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-4 leading-tight">Verified heritage quality</p>
          </div>

          <div className="bg-slate-950 rounded-[3rem] p-10 shadow-2xl shadow-slate-950/40 text-white overflow-hidden">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Trip ROI Analysis</h4>
            <div className="space-y-10">
              <MatrixVisual label="Total Effort Intensity" value={combinedEffort} level={combinedEffort > 70 ? 'HIGH' : 'MID'} color="bg-orange-500" />
              <MatrixVisual label="Visual / Soul Payoff" value={city.matrix.payoff} level="ELITE" color="bg-indigo-500" />
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex">
            <div className="flex-1 glass-green p-8 border-r border-slate-50">
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-500/10 mb-6 inline-block">Pros</span>
              <div className="space-y-5 mt-4">
                {city.pros.map(p => (
                  <div key={p} className="flex gap-3 text-[10px] font-bold text-slate-800 leading-tight">
                    <Check size={12} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 glass-red p-8">
              <span className="text-[8px] font-black uppercase tracking-widest text-rose-600 bg-white/80 px-2 py-0.5 rounded-md border border-rose-500/10 mb-6 inline-block">Cons</span>
              <div className="space-y-5 mt-4">
                {city.cons.map(c => (
                  <div key={c} className="flex gap-3 text-[10px] font-bold text-slate-800 leading-tight">
                    <X size={12} className="text-rose-500 shrink-0 mt-0.5" strokeWidth={3} />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/30 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-6 px-4">
          <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-brand">
            <Utensils size={20} />
          </div>
          <div>
            <h4 className="text-lg font-black tracking-tight uppercase">Blueprint Budget</h4>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Daily Spend in {city.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-50">Backpacker</span>
            <div className="bg-slate-50 border border-slate-100 px-6 py-2.5 rounded-xl text-xs font-black text-slate-900">{city.budget.backpacker}</div>
          </div>
          <div className="flex flex-col items-center -mt-2">
            <span className="text-[8px] font-black text-brand uppercase tracking-widest mb-1">Optimum Choice</span>
            <div className="bg-brand border border-brand/20 px-8 py-4 rounded-2xl text-base font-black text-slate-950 shadow-xl shadow-brand/20">{city.budget.recommended}</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-50">Luxury</span>
            <div className="bg-slate-50 border border-slate-100 px-6 py-2.5 rounded-xl text-xs font-black text-slate-900">{city.budget.luxury}</div>
          </div>
        </div>
      </div>

      {/* Must-Try Foods */}
      {city.mustTry.length > 0 && (
        <div className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-6 px-4">Must-Try Bites</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {city.mustTry.map(item => (
              <div key={item.name} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex gap-5 items-start">
                <div className="w-12 h-12 bg-brand/10 text-brand rounded-2xl flex items-center justify-center shrink-0">
                  <Utensils size={20} />
                </div>
                <div>
                  <h4 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">{item.name}</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// --- New Views ---

function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-16 pb-10 text-center">
      <div className="bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full w-fit mx-auto mb-6">
        {eyebrow}
      </div>
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-slate-950 mb-4">{title}</h1>
      {subtitle && <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function DestinationsView({ onCityClick }: { onCityClick: (id: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <PageHeader
        eyebrow="All Blueprints"
        title="Destinations"
        subtitle={`${DESTINATION_LIST.length} verified one-day blueprints, each timed and tested by a resident reviewer.`}
      />
      <section className="max-w-7xl mx-auto px-4">
        <div className="city-grid">
          {DESTINATION_LIST.map(c => (
            <CityCard
              key={c.id}
              title={c.name}
              tagline={c.tagline}
              image={c.image}
              rating={c.rating}
              onClick={() => onCityClick(c.id)}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function PersonaGuidesView({ onCityClick }: { onCityClick: (id: string) => void }) {
  const [selected, setSelected] = useState<string>('All');
  const matches = useMemo(() => destinationsForPersona(selected), [selected]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <PageHeader
        eyebrow="Travel by Personality"
        title="Persona Guides"
        subtitle="Pick how you travel. We will show you the blueprints that suit your rhythm."
      />
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/40 mb-12 flex items-center gap-2 overflow-x-auto no-scrollbar border border-slate-100/50">
          <span className="text-[10px] font-black uppercase text-slate-400 px-6 shrink-0 border-r border-slate-100 py-2 hidden md:block">Pick One</span>
          <div className="flex gap-2 p-1">
            {PERSONALITIES.map(p => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  selected === p.id
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {p.icon}
                {p.id}
              </button>
            ))}
          </div>
        </div>
        <div className="city-grid">
          {matches.map(c => (
            <CityCard
              key={c.id}
              title={c.name}
              tagline={c.tagline}
              image={c.image}
              rating={c.rating}
              onClick={() => onCityClick(c.id)}
            />
          ))}
        </div>
        {matches.length === 0 && (
          <div className="text-center py-20 text-slate-400 text-sm font-bold uppercase tracking-widest">
            No blueprints yet for "{selected}".
          </div>
        )}
      </section>
    </motion.div>
  );
}

function AboutView({ onExploreClick }: { onExploreClick: () => void }) {
  const stats = [
    { label: 'Verified Cities', value: DESTINATION_LIST.length.toString() },
    { label: 'Hours per Blueprint', value: '24' },
    { label: 'Sponsored Posts', value: '0' },
    { label: 'Editorial Reviewers', value: '12' }
  ];
  const pillars = [
    { icon: <Compass size={20} />, title: 'Locally Verified', body: 'Every blueprint is walked end-to-end by a city-resident reviewer before publication.' },
    { icon: <ShieldCheck size={20} />, title: 'No Sponsored Placements', body: 'We do not accept hotel, restaurant, or destination payments. Period.' },
    { icon: <Sparkles size={20} />, title: 'Tight 24-Hour Plans', body: 'No 7-day filler. Just the highest-payoff stops, in the right order, at the right hour.' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <PageHeader
        eyebrow="Our Story"
        title="About ReviewMint"
        subtitle="We exist because most travel blogs lie a little, every paid review lies a lot, and you only have one weekend."
      />
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm text-center">
              <div className="text-3xl font-black text-slate-950 tracking-tighter mb-2">{s.value}</div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map(p => (
            <div key={p.title} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6">
                {p.icon}
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-3">{p.title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 rounded-[3rem] p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-4">Ready for a tighter trip?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">Browse our verified blueprints and pick a city you can do justice to in 24 hours.</p>
          <button
            onClick={onExploreClick}
            className="bg-brand text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-colors"
          >
            Explore Destinations
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function SearchView({ initialQuery, onCityClick, onSubmitSearch }: { initialQuery: string; onCityClick: (id: string) => void; onSubmitSearch: (q: string) => void }) {
  const [query, setQuery] = useState(initialQuery);
  useEffect(() => { setQuery(initialQuery); }, [initialQuery]);

  const results = useMemo(() => searchDestinations(query), [query]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <PageHeader
        eyebrow="Search Results"
        title={query ? `"${query}"` : 'Browse All Cities'}
        subtitle={`${results.length} blueprint${results.length === 1 ? '' : 's'} found.`}
      />
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative max-w-2xl mx-auto mb-12 group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onSubmitSearch(query); }}
            placeholder="Refine your search…"
            className="w-full h-14 bg-white border border-slate-200 rounded-2xl pl-14 pr-6 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all shadow-sm"
            autoFocus
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>
        {results.length > 0 ? (
          <div className="city-grid">
            {results.map(c => (
              <CityCard
                key={c.id}
                title={c.name}
                tagline={c.tagline}
                image={c.image}
                rating={c.rating}
                onClick={() => onCityClick(c.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">No matches for "{query}"</p>
            <p className="text-slate-500 text-xs">Try a city name like "Agra" or a vibe like "spiritual".</p>
          </div>
        )}
      </section>
    </motion.div>
  );
}

function InfoPageView({ topic, onHome }: { topic: InfoTopic; onHome: () => void }) {
  const content = INFO_CONTENT[topic];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
      <PageHeader eyebrow="Documentation" title={content.title} subtitle={content.intro} />
      <section className="max-w-3xl mx-auto px-4">
        <div className="space-y-6">
          {content.sections.map(s => (
            <div key={s.heading} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-base font-black uppercase tracking-tight text-slate-900 mb-3">{s.heading}</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={onHome}
            className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand hover:text-slate-950 transition-colors inline-flex items-center gap-3"
          >
            Back to Home <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function MatrixVisual({ label, value, level, color }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold uppercase tracking-tighter text-white/90">{label}</span>
        <span className={`text-[10px] font-bold ${level === 'HIGH' || level === 'EXTREME' ? 'text-orange-400' : 'text-brand'}`}>{level}</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}

// --- Sub-Components ---

function CityCard({ title, tagline, image, rating, onClick }: any) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 cursor-pointer border border-transparent hover:border-brand/20 transition-all flex flex-col items-center text-center p-2"
      onClick={onClick}
    >
      <div className="w-full aspect-[4/3] relative overflow-hidden rounded-[2rem]">
        <img
          src={image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={title}
        />
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-full font-black text-[10px] text-brand flex items-center gap-1.5 shadow-lg">
          <TrendingUp size={12} />
          {rating}
        </div>
      </div>
      <div className="p-6 w-full">
        <h3 className="text-xl font-black mb-1 text-slate-950 uppercase tracking-tight">{title}</h3>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{tagline}</p>
        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>
          </div>
          <span className="text-slate-950 font-black text-[10px] flex items-center gap-2 uppercase tracking-widest group-hover:text-brand transition-colors">
            Blueprint <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
