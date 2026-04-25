/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';

// --- Types ---
interface Destination {
  id: string;
  name: string;
  tagline: string;
  verdict: string;
  rating: number;
  heroImage: string;
  reach: { type: string; detail: string; time?: string; hub: string; cost: string }[];
  budget: { backpacker: string; recommended: string; luxury: string };
  pros: string[];
  cons: string[];
  matrix: { money: number; time: number; fatigue: number; payoff: number };
  tips: string[];
  mustTry: { name: string; description: string }[];
  itinerary: {
    time: string;
    place: string;
    duration: string;
    description: string;
    personalities: string[];
  }[];
}

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

export default function App() {
  const [view, setView] = useState<'home' | 'city'>('home');
  const [selectedCity, setSelectedCity] = useState<Destination | null>(null);
  const [activePersonality, setActivePersonality] = useState('All');
  const [loading, setLoading] = useState(false);

  const fetchCityData = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/destinations/${id}`);
      const data = await res.json();
      setSelectedCity(data);
      setView('city');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Failed to fetch destination:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCityClick = () => {
    fetchCityData('agra', 'varanasi');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-bg">
      {/* Navigation - NON STICKY, DARK COLOR */}
      <nav className="w-full bg-slate-950 border-b border-slate-900 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-brand/20 group-hover:bg-white transition-all">RM</div>
            <span className="font-display text-2xl font-black text-white tracking-tighter">Review<span className="text-brand">Mint</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-brand transition-colors">Destinations</a>
            <a href="#" className="hover:text-brand transition-colors">Persona Guides</a>
            <a href="#" className="hover:text-brand transition-colors">About</a>
            <button className="bg-brand/10 text-brand px-6 py-2.5 rounded-xl border border-brand/20 hover:bg-brand hover:text-slate-950 transition-all font-black">LOGIN</button>
          </div>
          <button className="md:hidden text-white">
            <Search size={24} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {view === 'home' ? (
          <HomeView onCityClick={handleCityClick} activePersonality={activePersonality} setActivePersonality={setActivePersonality} />
        ) : (
          selectedCity && <CityView city={selectedCity} activePersonality={activePersonality} setActivePersonality={setActivePersonality} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-slate-950 font-black text-sm">RM</div>
                <span className="font-display text-xl font-bold text-white tracking-tight">ReviewMint</span>
              </div>
              <p className="text-sm leading-relaxed opacity-60">High-efficiency travel blueprints for the modern traveler. No filler, only the facts.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-xs font-bold">
                <li><a href="#" className="hover:text-brand">About Us</a></li>
                <li><a href="#" className="hover:text-brand">How it Works</a></li>
                <li><a href="#" className="hover:text-brand">Mint Scoring</a></li>
                <li><a href="#" className="hover:text-brand">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Community</h4>
              <ul className="space-y-4 text-xs font-bold">
                <li><a href="#" className="hover:text-brand">Destinations</a></li>
                <li><a href="#" className="hover:text-brand">Travel Tribes</a></li>
                <li><a href="#" className="hover:text-brand">Ambassadors</a></li>
                <li><a href="#" className="hover:text-brand">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-brand">Stay Updated</h4>
              <p className="text-xs mb-4 opacity-60">Get 1-day guides for your next trip.</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Email" className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-brand w-full" />
                <button className="bg-brand text-slate-950 px-4 py-2 rounded-lg text-xs font-bold">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2026 ReviewMint Travel. Final Proof of Experience.</p>
            <div className="flex gap-6">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Views ---

function HomeView({ onCityClick, activePersonality, setActivePersonality }: any) {
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
          {/* Subtle bottom gradient instead of heavy white fade */}
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
              type="text" 
              placeholder="Where are you heading?" 
              className="w-full h-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl pl-16 pr-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-4 focus:ring-brand/30 transition-all shadow-2xl group-hover:bg-white/20"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50" size={24} />
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
          <CityCard 
            title="Agra" 
            tagline="The Mughal Masterpiece"
            image="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop"
            rating="8.4"
            onClick={onCityClick}
          />
          <CityCard 
            title="Varanasi" 
            tagline="The Spiritual Journey"
            image="https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=2000&auto=format&fit=crop"
            rating="9.1"
            onClick={onCityClick}
          />
          <CityCard 
            title="Jaipur" 
            tagline="The Pink City"
            image="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2127&auto=format&fit=crop"
            rating="8.8"
            onClick={onCityClick}
          />
          <CityCard 
            title="Delhi" 
            tagline="The Heart of India"
            image="https://images.unsplash.com/photo-1678966432189-d58296e45ad2?q=80&w=627&auto=format&fit=crop"
            rating="7.9"
            onClick={onCityClick}
          />
        </div>
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
        {/* Left Column: Big Card + Reach + Tips (Swap Order on Mobile: Card FIRST) */}
        <div className="lg:col-span-4 order-1 lg:order-1 space-y-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative group rounded-[3rem] overflow-hidden aspect-[4/5] lg:aspect-[1/1] shadow-2xl shadow-slate-300"
          >
            <img src={city.heroImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" alt={city.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="text-white/5 text-[10rem] font-black tracking-tighter absolute top-0 right-0 pointer-events-none select-none uppercase -mt-20 -mr-10">AGRA</div>
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

        {/* Middle Column: Detailed Itinerary (Swap Order: Itinerary Order-2) */}
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

        {/* Right Column: Score, Matrix, Pros/Cons */}
        <div className="lg:col-span-3 order-3 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 text-center">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Mint Score</h4>
             
             {/* Redesigned Mint Gauge - More robust SVG */}
             <div className="relative w-full aspect-[2/1.4] flex items-center justify-center">
                <svg className="w-48 h-48 gauge-svg" viewBox="0 0 100 60">
                   <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#F1F5F9" strokeWidth="10" strokeLinecap="round" />
                   <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#00B894" strokeWidth="10" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset={125.6 * (1 - city.rating / 10)} />
                   
                   {/* Needle */}
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

          {/* Pros & Cons Columns - Glassy Table Style */}
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

      {/* Budget Snapshot - Slimmer Header */}
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
