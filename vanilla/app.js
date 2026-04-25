/* ReviewMint — vanilla JS port
   Replicates the React/Vite version: nav routing, search, persona filter,
   7 destinations, login modal, newsletter, toast, info pages.
*/

/* =========================================================
   1. Icons (lucide-react replacements as inline SVG strings)
========================================================= */
const ICONS = {
  search:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
  train:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 19V5h8v14"/><path d="M4 11h16"/><path d="M12 5v14"/><circle cx="8" cy="17" r="1"/><circle cx="16" cy="17" r="1"/><path d="m6 21 1-2"/><path d="m17 19 1 2"/></svg>',
  bus:           '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2l.64-2.54c.24-.96.24-1.96 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4a2 2 0 0 0-2 2v10h2"/><path d="M14 17H9"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></svg>',
  car:           '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
  plane:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  check:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x:             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  alert:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  arrow:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  trending:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  history:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>',
  users:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  wind:          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',
  smile:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  mountain:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
  utensils:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h2v8a2 2 0 1 0 4 0V2"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/></svg>',
  shield:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  sparkles:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M3 12h18"/><path d="m5.6 5.6 12.8 12.8"/><path d="m18.4 5.6L5.6 18.4"/></svg>',
  compass:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>'
};
function svg(name, size = 20) {
  const s = ICONS[name];
  if (!s) return '';
  return s.replace('<svg ', `<svg width="${size}" height="${size}" `);
}

/* =========================================================
   2. Data
========================================================= */
const PERSONALITIES = [
  { id: 'All',             icon: 'trending' },
  { id: 'Introvert',       icon: 'wind' },
  { id: 'Extrovert',       icon: 'users' },
  { id: 'History Lover',   icon: 'history' },
  { id: 'Adventure Lover', icon: 'mountain' },
  { id: 'Spiritual',       icon: 'smile' },
  { id: 'Young',           icon: 'smile' },
  { id: 'Old',             icon: 'history' }
];

const INFO_CONTENT = {
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

const DESTINATIONS = {
  agra: {
    id: 'agra', name: 'Agra',
    tagline: 'Is the City of Love worth the hype?',
    verdict: 'Highly Recommended for First-Timers',
    rating: 8.4,
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop',
    reach: [
      { type: 'Flight', detail: '45m from Delhi', hub: 'IGIA to AGR', cost: '₹2,500+' },
      { type: 'Train', detail: 'Gatimaan Express', time: '1h 40m from Delhi', hub: 'Agra Cantt', cost: '₹700+' },
      { type: 'Road', detail: 'Yamuna Expressway', time: '3h 30m Drive', hub: 'from Noida', cost: 'Tolls ₹415' },
      { type: 'Bus', detail: 'Volvo AC Sleeper', time: '4h 30m', hub: 'ISBT Anand Vihar', cost: '₹500-800' }
    ],
    budget: { backpacker: '$25/day', recommended: '$55/day', luxury: '$150+/day' },
    pros: ['Unique Architecture', 'Easy Connectivity', 'Rich History'],
    cons: ['Heavy Crowds', 'Persistent Sellers', 'Heat Intensity'],
    matrix: { money: 40, time: 80, fatigue: 75, payoff: 95 },
    tips: [
      'Avoid the sunrise entry queue by booking tickets online 2 days prior.',
      'Beware of fake guides outside Agra Fort; use official apps.',
      'Carry a reusable water bottle; single-use plastic is banned inside Taj.'
    ],
    mustTry: [
      { name: 'Panchi Petha', description: 'Translucent soft candy made from ash gourd.' },
      { name: 'Bedai & Jalebi', description: 'Spicy fried bread with sweet syrup loops.' }
    ],
    itinerary: [
      { time: '06:00 AM', place: 'Taj Mahal at Sunrise', duration: '3 Hours', description: 'Avoid the heat and the 10:00 AM crowds. Best light for photography.', personalities: ['Extrovert','History Lover','Adventure Lover','Young'] },
      { time: '11:00 AM', place: 'Agra Fort', duration: '2 Hours', description: 'Explore the red sandstone walls where Shah Jahan was imprisoned.', personalities: ['History Lover','Introvert','Old'] },
      { time: '01:30 PM', place: 'Lunch at Mehtab Bagh side', duration: '1.5 Hours', description: 'Views of the Taj from across the river without the crowd.', personalities: ['Introvert','Spiritual'] },
      { time: '04:00 PM', place: 'Itimad-ud-Daulah (Baby Taj)', duration: '1 Hour', description: 'A quieter, more intricate tomb often called the draft of the Taj.', personalities: ['Introvert','History Lover','Spiritual'] }
    ]
  },
  varanasi: {
    id: 'varanasi', name: 'Varanasi',
    tagline: 'The Spiritual Journey',
    verdict: 'Highly Recommended for First-Timers',
    rating: 9.1,
    heroImage: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=2000&auto=format&fit=crop',
    reach: [
      { type: 'Flight', detail: '1h 30m from Delhi', hub: 'IGIA to VNS', cost: '₹4,700+' },
      { type: 'Train', detail: 'Vande Bharat Express', time: '8h from Delhi', hub: 'Varanasi Jn', cost: '₹1,800+' },
      { type: 'Road', detail: 'NH19 + NH28', time: '13h Drive', hub: 'from Delhi', cost: 'Fuel ₹3,500+' },
      { type: 'Bus', detail: 'Volvo AC Sleeper', time: '14h', hub: 'ISBT Anand Vihar', cost: '₹1,200-1,800' }
    ],
    budget: { backpacker: '$20/day', recommended: '$45/day', luxury: '$120+/day' },
    pros: ['Spiritual Treat', 'Authentic Culture', 'Riverside Magic'],
    cons: ['Narrow Alleys', 'Sensory Overload', 'Persistent Touts'],
    matrix: { money: 35, time: 90, fatigue: 80, payoff: 98 },
    tips: [
      'Book a sunrise boat ride from Assi Ghat for the best light and fewer crowds.',
      'Wear closed shoes near the ghats; surfaces are uneven and often wet.',
      "Carry small change — most ghat-side vendors don't accept UPI."
    ],
    mustTry: [
      { name: 'Banarasi Lassi-Paan', description: 'Thick lassi crowned with a paan leaf and rose petals.' },
      { name: 'Kachori Sabzi', description: 'Fried puffed bread with spicy potato curry — a Varanasi breakfast staple.' }
    ],
    itinerary: [
      { time: '05:30 AM', place: 'Assi Ghat at Sunrise', duration: '2 Hours', description: 'Watch the Subah-e-Banaras ritual as light hits the Ganga.', personalities: ['Extrovert','Spiritual','History Lover','Young'] },
      { time: '10:00 AM', place: 'Kashi Vishwanath Corridor', duration: '2 Hours', description: 'The newly redesigned temple complex — go through the dedicated tourist line.', personalities: ['History Lover','Spiritual','Old'] },
      { time: '01:00 PM', place: 'Lunch at Kashi Chat Bhandar', duration: '1.5 Hours', description: 'A no-frills institution famous for tamatar chaat and palak chaat.', personalities: ['Extrovert','Young'] },
      { time: '06:00 PM', place: 'Dasashwamedh Ghat (Ganga Aarti)', duration: '1.5 Hours', description: 'The thunderous evening fire ritual — book a boat seat for a front view.', personalities: ['Introvert','History Lover','Spiritual','Old'] }
    ]
  },
  jaipur: {
    id: 'jaipur', name: 'Jaipur',
    tagline: 'The Pink City',
    verdict: 'A Royal Visual Feast',
    rating: 8.8,
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2127&auto=format&fit=crop',
    reach: [
      { type: 'Flight', detail: '1h from Delhi', hub: 'IGIA to JAI', cost: '₹3,000+' },
      { type: 'Train', detail: 'Shatabdi Express', time: '4h 30m from Delhi', hub: 'Jaipur Jn', cost: '₹900+' },
      { type: 'Road', detail: 'NH48 Delhi-Jaipur Hwy', time: '5h Drive', hub: 'from Gurgaon', cost: 'Tolls ₹520' },
      { type: 'Bus', detail: 'Volvo AC', time: '6h', hub: 'Sarai Kale Khan', cost: '₹700-1,100' }
    ],
    budget: { backpacker: '$30/day', recommended: '$60/day', luxury: '$180+/day' },
    pros: ['Royal Architecture', 'Vibrant Bazaars', 'Best Rajasthani Cuisine'],
    cons: ['Summer Heat', 'Tourist Pricing', 'Traffic in Old City'],
    matrix: { money: 45, time: 70, fatigue: 65, payoff: 92 },
    tips: [
      'Buy the Composite Ticket (~₹400) — covers Amber, Hawa Mahal, Jantar Mantar and more.',
      'Bargain hard in Johari Bazaar; first quote is usually 3x the fair price.',
      'Visit Amber Fort by 8 AM to beat the tour-bus rush from Delhi.'
    ],
    mustTry: [
      { name: 'Dal Baati Churma', description: 'Lentils, baked wheat balls and sweet crumbled flour — the Rajasthani thali centerpiece.' },
      { name: 'Pyaaz Kachori at Rawat', description: 'Flaky onion-stuffed pastry that defines Jaipur breakfast.' }
    ],
    itinerary: [
      { time: '07:30 AM', place: 'Amber Fort', duration: '3 Hours', description: 'Climb the cobbled ramp before the sun gets harsh; the Sheesh Mahal is a must.', personalities: ['History Lover','Adventure Lover','Extrovert','Young'] },
      { time: '11:30 AM', place: 'Hawa Mahal & Jantar Mantar', duration: '2 Hours', description: "The iconic pink facade and the world's largest stone sundial — both right next to each other.", personalities: ['History Lover','Introvert','Old'] },
      { time: '02:00 PM', place: 'Lunch at LMB, Johari Bazaar', duration: '1.5 Hours', description: 'Pure-veg Rajasthani thali in a 70-year-old institution.', personalities: ['Extrovert','Old','Young'] },
      { time: '05:00 PM', place: 'Nahargarh Fort Sunset', duration: '2 Hours', description: 'The whole pink city laid out below — best golden-hour view in Jaipur.', personalities: ['Adventure Lover','Spiritual','Young'] }
    ]
  },
  delhi: {
    id: 'delhi', name: 'Delhi',
    tagline: 'The Heart of India',
    verdict: 'A Layered Capital Experience',
    rating: 7.9,
    heroImage: 'https://images.unsplash.com/photo-1678966432189-d58296e45ad2?q=80&w=627&auto=format&fit=crop',
    reach: [
      { type: 'Flight', detail: 'Hub airport (IGIA)', hub: 'Direct from 80+ cities', cost: '₹2,000+' },
      { type: 'Train', detail: 'Rajdhani / Vande Bharat', time: 'Varies', hub: 'New Delhi / NDLS', cost: '₹500+' },
      { type: 'Road', detail: 'All major highways', time: 'Varies', hub: 'Delhi NCR', cost: 'Tolls vary' },
      { type: 'Bus', detail: 'Inter-state Volvo', time: 'Varies', hub: 'ISBT Kashmere Gate', cost: '₹400+' }
    ],
    budget: { backpacker: '$22/day', recommended: '$50/day', luxury: '$160+/day' },
    pros: ['Mughal + Colonial History', 'Street Food Capital', 'Best Metro in India'],
    cons: ['Peak Pollution Oct-Jan', 'Sprawling Distances', 'Traffic Chaos'],
    matrix: { money: 38, time: 60, fatigue: 70, payoff: 85 },
    tips: [
      'Use the Metro for everything — Delhi traffic will eat 2-3 hours of your day otherwise.',
      'Avoid Old Delhi sightseeing on Mondays; many monuments are closed.',
      'Drink only sealed bottled water; street kulfi is fine, street water is not.'
    ],
    mustTry: [
      { name: 'Paranthe Wali Gali Stuffed Paratha', description: 'Ghee-fried stuffed flatbread served with chutney — a 150-year-old Chandni Chowk tradition.' },
      { name: "Butter Chicken at Moti Mahal", description: 'The original 1947 recipe — the dish was literally invented here.' }
    ],
    itinerary: [
      { time: '08:00 AM', place: 'Jama Masjid + Chandni Chowk Walk', duration: '3 Hours', description: 'Mughal-era mosque, then a guided food walk through the spice market.', personalities: ['History Lover','Extrovert','Adventure Lover','Young'] },
      { time: '12:00 PM', place: "Humayun's Tomb", duration: '1.5 Hours', description: 'The blueprint for the Taj Mahal — quieter than Red Fort and far better preserved.', personalities: ['History Lover','Introvert','Spiritual','Old'] },
      { time: '02:30 PM', place: "Lunch at Karim's, Jama Masjid", duration: '1.5 Hours', description: 'Mughlai kebabs and biryani served the same way since 1913.', personalities: ['Extrovert','Old','Young'] },
      { time: '05:00 PM', place: 'India Gate + Kartavya Path', duration: '2 Hours', description: 'Sunset stroll along the redeveloped boulevard with ice cream from the local vendors.', personalities: ['Introvert','Extrovert','Young','Old'] }
    ]
  },
  udaipur: {
    id: 'udaipur', name: 'Udaipur',
    tagline: 'Venice of the East',
    verdict: 'Romance in Stone and Water',
    rating: 9.0,
    heroImage: 'https://images.unsplash.com/photo-1585484173186-ee21c3e9b30d?q=80&w=2070&auto=format&fit=crop',
    reach: [
      { type: 'Flight', detail: '1h 30m from Delhi', hub: 'IGIA to UDR', cost: '₹3,500+' },
      { type: 'Train', detail: 'Mewar Express', time: '12h overnight from Delhi', hub: 'Udaipur City', cost: '₹1,400+' },
      { type: 'Road', detail: 'NH48 via Jaipur', time: '10h Drive', hub: 'from Jaipur 6h', cost: 'Tolls ₹780' },
      { type: 'Bus', detail: 'Volvo AC Sleeper', time: '13h', hub: 'from Delhi', cost: '₹1,400-2,000' }
    ],
    budget: { backpacker: '$28/day', recommended: '$65/day', luxury: '$200+/day' },
    pros: ['Lakeside Palaces', 'Mild Year-Round Weather', 'Walkable Old City'],
    cons: ['Far From Major Hubs', 'Limited Nightlife', 'Premium Pricing'],
    matrix: { money: 55, time: 85, fatigue: 50, payoff: 96 },
    tips: [
      'Take the government boat ride to Jagmandir at sunset — far cheaper than the hotel-run rides.',
      'Stay in a haveli inside the old city, not a chain hotel on the bypass.',
      'Lake Pichola levels drop sharply in May-June — visit Sep-Mar for full views.'
    ],
    mustTry: [
      { name: 'Dal Baati at Ambrai', description: 'Slow-cooked Mewari thali eaten lakeside facing the City Palace.' },
      { name: 'Mewari Gatte ki Sabzi', description: 'Gram-flour dumplings in a tangy yogurt curry — distinctly Udaipur.' }
    ],
    itinerary: [
      { time: '08:00 AM', place: 'City Palace Complex', duration: '3 Hours', description: 'Largest royal palace in Rajasthan — go for the audio tour and the crystal gallery.', personalities: ['History Lover','Old','Introvert'] },
      { time: '12:00 PM', place: 'Lake Pichola Boat Ride', duration: '1.5 Hours', description: 'Stop at Jagmandir Island; the late-morning light is best for photos.', personalities: ['Spiritual','Introvert','Young','Adventure Lover'] },
      { time: '02:30 PM', place: 'Lunch at Upré by 1559 AD', duration: '1.5 Hours', description: 'Rooftop dining with a direct view of Lake Palace.', personalities: ['Extrovert','Young','Old'] },
      { time: '05:30 PM', place: 'Bagore-ki-Haveli Dance Show', duration: '1.5 Hours', description: 'Daily folk performance in a 200-year-old courtyard — book ahead in season.', personalities: ['History Lover','Extrovert','Spiritual','Old'] }
    ]
  },
  rishikesh: {
    id: 'rishikesh', name: 'Rishikesh',
    tagline: 'Yoga Capital of the World',
    verdict: 'A Reset for Body and Mind',
    rating: 8.6,
    heroImage: 'https://images.unsplash.com/photo-1591018653851-c1f97b89bc40?q=80&w=2070&auto=format&fit=crop',
    reach: [
      { type: 'Flight', detail: '55m from Delhi', hub: 'IGIA to DED (Dehradun)', cost: '₹3,200+' },
      { type: 'Train', detail: 'Nanda Devi Express', time: '5h from Delhi', hub: 'Haridwar Jn', cost: '₹600+' },
      { type: 'Road', detail: 'NH334 via Haridwar', time: '5h 30m Drive', hub: 'from Delhi', cost: 'Tolls ₹350' },
      { type: 'Bus', detail: 'Volvo AC', time: '6h 30m', hub: 'ISBT Kashmere Gate', cost: '₹600-900' }
    ],
    budget: { backpacker: '$18/day', recommended: '$40/day', luxury: '$110+/day' },
    pros: ['Adventure + Spirituality Mix', 'Riverside Yoga', 'Affordable'],
    cons: ['Monsoon Closures Jul-Aug', 'Strict Vegetarian-Only', 'Loud Aarti Crowds'],
    matrix: { money: 30, time: 70, fatigue: 60, payoff: 90 },
    tips: [
      'Rafting season is mid-Sep to mid-Jun — outside this window operators shut down.',
      'Do not bring alcohol or non-veg food; the entire town is strictly vegetarian and dry.',
      'Cross Lakshman Jhula on foot at sunrise — the bridge is closed to vehicles.'
    ],
    mustTry: [
      { name: 'Aloo Puri at Chotiwala', description: 'The legendary 1958 vegetarian thali institution by the river.' },
      { name: 'German Bakery Cinnamon Roll', description: 'Warm, flaky and the favorite breakfast of the yoga-tourist crowd.' }
    ],
    itinerary: [
      { time: '06:00 AM', place: 'Sunrise Yoga at Parmarth Niketan', duration: '1.5 Hours', description: 'Open-to-public ashram class on the ghats — donation based.', personalities: ['Spiritual','Introvert','Young','Old'] },
      { time: '09:30 AM', place: 'White Water Rafting (Shivpuri to Rishikesh)', duration: '3 Hours', description: "16km Class III rapids stretch — the Indian rafting standard.", personalities: ['Adventure Lover','Extrovert','Young'] },
      { time: '01:30 PM', place: 'Lunch at Little Buddha Cafe', duration: '1.5 Hours', description: 'Treehouse-style cafe overlooking the Ganga.', personalities: ['Introvert','Young','Spiritual'] },
      { time: '06:00 PM', place: 'Triveni Ghat Aarti', duration: '1 Hour', description: "Smaller and more intimate than Haridwar's; floating diyas at dusk.", personalities: ['Spiritual','History Lover','Old'] }
    ]
  },
  goa: {
    id: 'goa', name: 'Goa',
    tagline: 'The Beach Capital',
    verdict: 'Best for Quick Decompression',
    rating: 8.2,
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2070&auto=format&fit=crop',
    reach: [
      { type: 'Flight', detail: '2h 30m from Delhi', hub: 'IGIA to GOX (Mopa) / GOI', cost: '₹4,000+' },
      { type: 'Train', detail: 'Konkan Kanya Express', time: '26h from Mumbai', hub: 'Madgaon Jn', cost: '₹1,200+' },
      { type: 'Road', detail: 'NH66 from Mumbai', time: '10h Drive', hub: 'from Mumbai', cost: 'Tolls ₹900' },
      { type: 'Bus', detail: 'Volvo AC Sleeper', time: '12h from Mumbai', hub: 'Dadar/Borivali', cost: '₹1,500-2,500' }
    ],
    budget: { backpacker: '$25/day', recommended: '$70/day', luxury: '$220+/day' },
    pros: ['Beach + Forest Mix', 'Portuguese-Era Architecture', 'Best Seafood in India'],
    cons: ['Peak Dec-Jan Pricing', 'Monsoon Beach Closures', 'Tourist Trap Restaurants'],
    matrix: { money: 60, time: 75, fatigue: 45, payoff: 88 },
    tips: [
      'Rent a scooter (~₹400/day) — Goa is too spread out for cabs and buses are rare.',
      'North Goa (Anjuna/Vagator) for parties; South Goa (Palolem/Agonda) for calm.',
      'Avoid the touts on Calangute beach — book water sports through your hotel instead.'
    ],
    mustTry: [
      { name: 'Goan Fish Curry Rice', description: 'Coconut + kokum + red chilli base — the everyday meal of coastal Goa.' },
      { name: 'Bebinca', description: 'Seven-layer Portuguese-Goan dessert made of egg yolks and coconut milk.' }
    ],
    itinerary: [
      { time: '07:30 AM', place: 'Sunrise at Palolem Beach', duration: '2 Hours', description: 'Crescent-shaped bay in South Goa — quietest at this hour.', personalities: ['Introvert','Spiritual','Adventure Lover','Young'] },
      { time: '11:00 AM', place: 'Old Goa Churches (Basilica of Bom Jesus)', duration: '2 Hours', description: 'UNESCO-listed Portuguese baroque churches with the relics of St. Francis Xavier.', personalities: ['History Lover','Spiritual','Old'] },
      { time: '02:00 PM', place: "Lunch at Martin's Corner", duration: '1.5 Hours', description: 'Iconic Goan-Portuguese seafood — try the recheado-stuffed pomfret.', personalities: ['Extrovert','Old','Young'] },
      { time: '05:30 PM', place: 'Sunset Cruise on Mandovi River', duration: '1.5 Hours', description: 'Live folk music, fado dancing, and the Panjim skyline at golden hour.', personalities: ['Extrovert','Young','Spiritual'] }
    ]
  }
};

const DESTINATION_LIST = Object.values(DESTINATIONS).map(d => ({
  id: d.id, name: d.name, tagline: d.tagline, image: d.heroImage, rating: d.rating.toFixed(1)
}));

function getDestination(id) { return DESTINATIONS[id] || null; }
function searchDestinations(q) {
  const t = (q || '').trim().toLowerCase();
  if (!t) return DESTINATION_LIST;
  return DESTINATION_LIST.filter(d =>
    d.name.toLowerCase().includes(t) ||
    d.tagline.toLowerCase().includes(t) ||
    d.id.toLowerCase().includes(t)
  );
}
function destinationsForPersona(p) {
  if (p === 'All') return DESTINATION_LIST;
  return Object.values(DESTINATIONS)
    .filter(d => d.itinerary.some(i => i.personalities.includes(p)))
    .map(d => ({ id: d.id, name: d.name, tagline: d.tagline, image: d.heroImage, rating: d.rating.toFixed(1) }));
}

/* =========================================================
   3. State + helpers
========================================================= */
const state = {
  view: { kind: 'home' },
  searchQuery: '',
  activePersonality: 'All',
  loginOpen: false,
  toastTimer: null
};

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function navigate(view) {
  state.view = view;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(msg) {
  const root = $('#toastRoot');
  root.innerHTML = `
    <div class="toast">
      <span class="toast-icon">${svg('check', 16)}</span>
      <span class="toast-text">${esc(msg)}</span>
    </div>`;
  if (state.toastTimer) clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => { root.innerHTML = ''; }, 2800);
}

function setNavActive() {
  $$('.nav-link').forEach(a => {
    const v = a.dataset.view;
    a.classList.toggle('active',
      (v === state.view.kind) ||
      (v === 'destinations' && state.view.kind === 'destinations') ||
      (v === 'personas' && state.view.kind === 'personas') ||
      (v === 'about' && state.view.kind === 'about')
    );
  });
}

/* =========================================================
   4. Renderers — view templates
========================================================= */
function render() {
  const main = $('#main');
  const v = state.view;
  if (v.kind === 'home')              main.innerHTML = renderHome();
  else if (v.kind === 'city')         main.innerHTML = renderCity(getDestination(v.cityId));
  else if (v.kind === 'destinations') main.innerHTML = renderDestinations();
  else if (v.kind === 'personas')     main.innerHTML = renderPersonas();
  else if (v.kind === 'about')        main.innerHTML = renderAbout();
  else if (v.kind === 'search')       main.innerHTML = renderSearch(v.query);
  else if (v.kind === 'info')         main.innerHTML = renderInfo(v.topic);
  setNavActive();
  // Trigger entry animations on dynamic elements
  requestAnimationFrame(() => {
    $$('.matrix-fill').forEach(el => {
      const target = el.dataset.target;
      if (target) el.style.width = target + '%';
    });
  });
}

function cityCardHTML(c) {
  return `
    <div class="city-card" data-action="open-city" data-city-id="${esc(c.id)}" role="button" tabindex="0">
      <div class="city-card-imgwrap">
        <img src="${esc(c.image)}" alt="${esc(c.name)}" loading="lazy">
        <div class="city-card-rating">${svg('trending', 12)} ${esc(c.rating)}</div>
      </div>
      <div class="city-card-body">
        <h3 class="city-card-title">${esc(c.name)}</h3>
        <p class="city-card-tag">${esc(c.tagline)}</p>
        <div class="city-card-foot">
          <div class="city-card-dots"><span></span><span></span></div>
          <span class="city-card-cta">Blueprint ${svg('arrow', 14)}</span>
        </div>
      </div>
    </div>`;
}

function personaStripHTML(active, dataAction = 'set-personality') {
  return `
    <div class="persona-strip">
      <span class="persona-strip-label">${dataAction === 'set-personality' ? 'Personality' : 'Pick One'}</span>
      <div class="persona-strip-buttons">
        ${PERSONALITIES.map(p => `
          <button class="persona-btn ${p.id === active ? 'active' : ''}"
                  data-action="${dataAction}" data-personality="${esc(p.id)}">
            ${svg(p.icon, 16)} ${esc(p.id)}
          </button>`).join('')}
      </div>
    </div>`;
}

/* ---- Home ---- */
function renderHome() {
  const visible = state.activePersonality === 'All'
    ? DESTINATION_LIST
    : destinationsForPersona(state.activePersonality);

  return `
    <section class="hero fade-in">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop" alt="">
      </div>
      <div class="hero-inner">
        <div class="hero-eyebrow">Verified One-Day Blueprints</div>
        <h1 class="hero-title">EFFORTLESS <span class="accent">TRAVEL.</span><br>MAXIMAL <span class="italic">JOY.</span></h1>
        <div class="hero-search-wrap">
          <input id="heroSearch" class="hero-search" type="text" placeholder="Where are you heading?" value="${esc(state.searchQuery)}" autocomplete="off">
          <button class="hero-search-icon" data-action="submit-hero-search" aria-label="Submit search">${svg('search', 24)}</button>
        </div>
      </div>
    </section>

    <section class="persona-strip-wrap">
      ${personaStripHTML(state.activePersonality, 'set-personality')}
      ${visible.length > 0
        ? `<div class="city-grid">${visible.map(cityCardHTML).join('')}</div>`
        : `<div class="empty-state">No destinations match this personality yet.</div>`}
    </section>
  `;
}

/* ---- City detail ---- */
function renderCity(city) {
  if (!city) {
    return `<div class="page-header"><h1 class="page-title">Not Found</h1>
            <p class="page-subtitle">No blueprint exists for this id.</p></div>`;
  }
  const combinedEffort = (city.matrix.money + city.matrix.fatigue) / 2;
  const dash = 125.6;
  const offset = dash * (1 - city.rating / 10);
  const needleAngle = -90 + (city.rating / 10) * 180;
  const reachIcon = (t) => t === 'Train' ? 'train' : t === 'Road' ? 'car' : t === 'Flight' ? 'plane' : 'bus';
  const ap = state.activePersonality;

  return `
    <div class="city-view fade-in">
      <div class="city-grid-3">
        <!-- Left col -->
        <div class="city-col-left">
          <div class="city-hero-card">
            <img src="${esc(city.heroImage)}" alt="${esc(city.name)}">
            <div class="city-hero-content">
              <div class="city-hero-watermark">${esc(city.name.toUpperCase())}</div>
              <div class="city-verified-badge">Verified Guide</div>
              <h1 class="city-hero-title">One Day<br>in ${esc(city.name)}</h1>
              <div class="city-verdict">${svg('check', 18)} ${esc(city.verdict)}</div>
            </div>
          </div>

          <div class="panel">
            <h4 class="panel-heading">Getting There</h4>
            <div class="reach-list">
              ${city.reach.map(r => `
                <div class="reach-item">
                  <div class="reach-icon">${svg(reachIcon(r.type), 20)}</div>
                  <div class="reach-body">
                    <div class="reach-row">
                      <h5 class="reach-detail">${esc(r.detail)}</h5>
                      <span class="reach-cost">${esc(r.cost)}</span>
                    </div>
                    <p class="reach-meta">${r.time ? esc(r.time) + ' • ' : ''}${esc(r.hub)}</p>
                  </div>
                </div>`).join('')}
            </div>
          </div>

          <div class="panel-emerald">
            <h4 class="panel-heading-emerald">${svg('alert', 16)} Survival</h4>
            <div class="tips-list">
              ${city.tips.slice(0,3).map(t => `
                <div class="tip-item">
                  <span class="tip-bullet"></span>
                  <p class="tip-text">${esc(t)}</p>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Middle col -->
        <div class="city-col-mid">
          <div class="timeline-card">
            <div class="timeline-head">
              <div>
                <h3 class="timeline-title">the timeline</h3>
                <p class="timeline-sub">24h Blueprint</p>
              </div>
              <div class="timeline-tags">
                ${['History','Introvert'].map(tag => `
                  <button class="timeline-tag ${ap === tag ? 'active' : ''}" data-action="set-personality" data-personality="${esc(tag)}">${esc(tag)}</button>
                `).join('')}
              </div>
            </div>
            <div class="timeline-body">
              <div class="timeline-line"></div>
              ${city.itinerary.map(item => {
                const match = ap === 'All' || item.personalities.includes(ap);
                return `
                  <div class="timeline-step ${match ? '' : 'dim'}">
                    <span class="timeline-dot"></span>
                    <div class="timeline-meta">
                      <span class="time">${esc(item.time)}</span>
                      <span class="divider"></span>
                      <span>${esc(item.duration)}</span>
                    </div>
                    <h4 class="timeline-place">${esc(item.place)}</h4>
                    <p class="timeline-desc">${esc(item.description)}</p>
                    <div class="timeline-personas">
                      ${item.personalities.map(p => `
                        <span class="persona-chip ${match && p === ap ? 'match' : ''}">${esc(p)}</span>
                      `).join('')}
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Right col -->
        <div class="city-col-right">
          <div class="score-card">
            <h4 class="score-card-title">Mint Score</h4>
            <div class="gauge-wrap">
              <svg class="gauge-svg" viewBox="0 0 100 60">
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#F1F5F9" stroke-width="10" stroke-linecap="round"/>
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#00B894" stroke-width="10" stroke-linecap="round"
                      stroke-dasharray="${dash}" stroke-dashoffset="${offset}"/>
                <line class="gauge-needle" x1="50" y1="50" x2="50" y2="15"
                      stroke="#0F172A" stroke-width="3" stroke-linecap="round"
                      transform="rotate(${needleAngle} 50 50)"/>
                <circle cx="50" cy="50" r="5" fill="#0F172A"/>
              </svg>
              <div class="gauge-value">${Math.round(city.rating * 10)}</div>
            </div>
            <p class="score-card-foot">Verified heritage quality</p>
          </div>

          <div class="matrix-card">
            <h4 class="matrix-card-title">Trip ROI Analysis</h4>
            <div class="matrix-rows">
              <div class="matrix-row">
                <div class="matrix-row-head">
                  <span class="label">Total Effort Intensity</span>
                  <span class="level ${combinedEffort > 70 ? 'high' : ''}">${combinedEffort > 70 ? 'HIGH' : 'MID'}</span>
                </div>
                <div class="matrix-bar"><div class="matrix-fill orange" data-target="${combinedEffort}"></div></div>
              </div>
              <div class="matrix-row">
                <div class="matrix-row-head">
                  <span class="label">Visual / Soul Payoff</span>
                  <span class="level">ELITE</span>
                </div>
                <div class="matrix-bar"><div class="matrix-fill indigo" data-target="${city.matrix.payoff}"></div></div>
              </div>
            </div>
          </div>

          <div class="proscons">
            <div class="proscons-col pros">
              <span class="proscons-label">Pros</span>
              <div class="proscons-list">
                ${city.pros.map(p => `<div>${svg('check', 12)} ${esc(p)}</div>`).join('')}
              </div>
            </div>
            <div class="proscons-col cons">
              <span class="proscons-label">Cons</span>
              <div class="proscons-list">
                ${city.cons.map(c => `<div>${svg('x', 12)} ${esc(c)}</div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="budget-card">
        <div class="budget-head">
          <div class="budget-icon">${svg('utensils', 20)}</div>
          <div>
            <h4 class="budget-title">Blueprint Budget</h4>
            <p class="budget-sub">Daily Spend in ${esc(city.name)}</p>
          </div>
        </div>
        <div class="budget-tiers">
          <div class="budget-tier">
            <span class="budget-tier-label">Backpacker</span>
            <div class="budget-tier-pill">${esc(city.budget.backpacker)}</div>
          </div>
          <div class="budget-tier optimum">
            <span class="budget-tier-label">Optimum Choice</span>
            <div class="budget-tier-pill">${esc(city.budget.recommended)}</div>
          </div>
          <div class="budget-tier">
            <span class="budget-tier-label">Luxury</span>
            <div class="budget-tier-pill">${esc(city.budget.luxury)}</div>
          </div>
        </div>
      </div>

      ${city.mustTry.length > 0 ? `
        <div class="musttry-section">
          <h3 class="musttry-title">Must-Try Bites</h3>
          <div class="musttry-grid">
            ${city.mustTry.map(m => `
              <div class="musttry-card">
                <div class="musttry-icon">${svg('utensils', 20)}</div>
                <div>
                  <h4 class="musttry-name">${esc(m.name)}</h4>
                  <p class="musttry-desc">${esc(m.description)}</p>
                </div>
              </div>`).join('')}
          </div>
        </div>` : ''}
    </div>
  `;
}

/* ---- Destinations ---- */
function renderDestinations() {
  return `
    <div class="fade-in">
      <div class="page-header">
        <span class="page-eyebrow">All Blueprints</span>
        <h1 class="page-title">Destinations</h1>
        <p class="page-subtitle">${DESTINATION_LIST.length} verified one-day blueprints, each timed and tested by a resident reviewer.</p>
      </div>
      <section class="container" style="padding-bottom: 5rem;">
        <div class="city-grid">
          ${DESTINATION_LIST.map(cityCardHTML).join('')}
        </div>
      </section>
    </div>`;
}

/* ---- Personas ---- */
function renderPersonas() {
  const matches = destinationsForPersona(state.activePersonality);
  return `
    <div class="fade-in">
      <div class="page-header">
        <span class="page-eyebrow">Travel by Personality</span>
        <h1 class="page-title">Persona Guides</h1>
        <p class="page-subtitle">Pick how you travel. We will show you the blueprints that suit your rhythm.</p>
      </div>
      <section class="container" style="padding-bottom: 5rem;">
        ${personaStripHTML(state.activePersonality, 'set-personality')}
        ${matches.length > 0
          ? `<div class="city-grid">${matches.map(cityCardHTML).join('')}</div>`
          : `<div class="empty-state">No blueprints yet for "${esc(state.activePersonality)}".</div>`}
      </section>
    </div>`;
}

/* ---- About ---- */
function renderAbout() {
  const stats = [
    { label: 'Verified Cities', value: String(DESTINATION_LIST.length) },
    { label: 'Hours per Blueprint', value: '24' },
    { label: 'Sponsored Posts', value: '0' },
    { label: 'Editorial Reviewers', value: '12' }
  ];
  const pillars = [
    { icon: 'compass', title: 'Locally Verified', body: 'Every blueprint is walked end-to-end by a city-resident reviewer before publication.' },
    { icon: 'shield',  title: 'No Sponsored Placements', body: 'We do not accept hotel, restaurant, or destination payments. Period.' },
    { icon: 'sparkles',title: 'Tight 24-Hour Plans', body: 'No 7-day filler. Just the highest-payoff stops, in the right order, at the right hour.' }
  ];
  return `
    <div class="fade-in">
      <div class="page-header">
        <span class="page-eyebrow">Our Story</span>
        <h1 class="page-title">About ReviewMint</h1>
        <p class="page-subtitle">We exist because most travel blogs lie a little, every paid review lies a lot, and you only have one weekend.</p>
      </div>
      <section class="container" style="max-width: 64rem; padding-bottom: 5rem;">
        <div class="about-stats">
          ${stats.map(s => `
            <div class="about-stat">
              <div class="about-stat-value">${esc(s.value)}</div>
              <div class="about-stat-label">${esc(s.label)}</div>
            </div>`).join('')}
        </div>
        <div class="about-pillars">
          ${pillars.map(p => `
            <div class="about-pillar">
              <div class="about-pillar-icon">${svg(p.icon, 20)}</div>
              <h3 class="about-pillar-title">${esc(p.title)}</h3>
              <p class="about-pillar-body">${esc(p.body)}</p>
            </div>`).join('')}
        </div>
        <div class="about-cta">
          <h2>Ready for a tighter trip?</h2>
          <p>Browse our verified blueprints and pick a city you can do justice to in 24 hours.</p>
          <button class="btn-brand" data-action="navigate" data-view="destinations">Explore Destinations</button>
        </div>
      </section>
    </div>`;
}

/* ---- Search ---- */
function renderSearch(query) {
  const results = searchDestinations(query);
  return `
    <div class="fade-in">
      <div class="page-header">
        <span class="page-eyebrow">Search Results</span>
        <h1 class="page-title">${query ? '"' + esc(query) + '"' : 'Browse All Cities'}</h1>
        <p class="page-subtitle">${results.length} blueprint${results.length === 1 ? '' : 's'} found.</p>
      </div>
      <section class="container" style="padding-bottom: 5rem;">
        <div class="search-refine-wrap">
          <span class="search-refine-icon">${svg('search', 20)}</span>
          <input id="searchRefine" class="search-refine" type="text" placeholder="Refine your search…" value="${esc(query)}" autofocus>
        </div>
        ${results.length > 0
          ? `<div class="city-grid">${results.map(cityCardHTML).join('')}</div>`
          : `<div class="empty-state">
               <p style="margin: 0 0 1rem;">No matches for "${esc(query)}"</p>
               <p style="font-size: 0.75rem; color: var(--slate-500); text-transform: none; letter-spacing: 0;">Try a city name like "Agra" or a vibe like "spiritual".</p>
             </div>`}
      </section>
    </div>`;
}

/* ---- Info ---- */
function renderInfo(topic) {
  const c = INFO_CONTENT[topic];
  if (!c) return `<div class="page-header"><h1 class="page-title">Not Found</h1></div>`;
  return `
    <div class="fade-in">
      <div class="page-header">
        <span class="page-eyebrow">Documentation</span>
        <h1 class="page-title">${esc(c.title)}</h1>
        <p class="page-subtitle">${esc(c.intro)}</p>
      </div>
      <section style="padding-bottom: 5rem;">
        <div class="info-sections">
          ${c.sections.map(s => `
            <div class="info-section">
              <h3>${esc(s.heading)}</h3>
              <p>${esc(s.body)}</p>
            </div>`).join('')}
        </div>
        <div class="info-back">
          <button class="btn-dark" data-action="navigate" data-view="home">Back to Home ${svg('arrow', 14)}</button>
        </div>
      </section>
    </div>`;
}

/* =========================================================
   5. Login modal
========================================================= */
function openLogin() {
  const root = $('#modalRoot');
  root.innerHTML = `
    <div class="modal-backdrop" data-action="close-login">
      <form class="modal" id="loginForm" autocomplete="off">
        <div class="modal-head">
          <div class="modal-head-left">
            <span class="brand-mark">RM</span>
            <span class="modal-title">Sign In</span>
          </div>
          <button type="button" class="modal-close" data-action="close-login" aria-label="Close login">${svg('x', 20)}</button>
        </div>
        <p class="modal-meta">Demo mode • no real account required</p>
        <label for="loginEmail">Email</label>
        <input type="email" id="loginEmail" name="email" placeholder="you@example.com" required autofocus>
        <label for="loginPass">Password</label>
        <input type="password" id="loginPass" name="password" placeholder="••••••••" required>
        <button type="submit" class="modal-submit">Sign In</button>
        <p class="modal-fineprint">By signing in you agree to our placeholder terms.</p>
      </form>
    </div>`;
  state.loginOpen = true;
  // submit handler
  $('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#loginEmail').value.trim();
    const pw = $('#loginPass').value.trim();
    if (!email || !pw) return;
    closeLogin();
    showToast(`Welcome back, ${email.split('@')[0]} (demo mode).`);
  });
  // stop modal-content clicks from closing
  $('.modal').addEventListener('click', (e) => e.stopPropagation());
}
function closeLogin() {
  $('#modalRoot').innerHTML = '';
  state.loginOpen = false;
}

/* =========================================================
   6. Event delegation
========================================================= */
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  switch (action) {
    case 'navigate': {
      e.preventDefault();
      const v = target.dataset.view;
      if (v === 'info') {
        navigate({ kind: 'info', topic: target.dataset.topic });
      } else {
        navigate({ kind: v });
      }
      break;
    }
    case 'open-city': {
      navigate({ kind: 'city', cityId: target.dataset.cityId });
      break;
    }
    case 'set-personality': {
      state.activePersonality = target.dataset.personality;
      render();
      break;
    }
    case 'submit-hero-search': {
      const input = $('#heroSearch');
      const q = input ? input.value : state.searchQuery;
      state.searchQuery = q;
      navigate({ kind: 'search', query: (q || '').trim() });
      break;
    }
    case 'open-login':       openLogin(); break;
    case 'close-login':      closeLogin(); break;
    case 'focus-hero-search': {
      if (state.view.kind !== 'home') {
        navigate({ kind: 'home' });
        setTimeout(() => $('#heroSearch')?.focus(), 350);
      } else {
        const i = $('#heroSearch');
        if (i) { i.focus(); i.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      }
      break;
    }
  }
});

// Hero search Enter / live binding
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.loginOpen) closeLogin();
  if (e.key !== 'Enter') return;
  if (e.target.id === 'heroSearch') {
    e.preventDefault();
    state.searchQuery = e.target.value;
    navigate({ kind: 'search', query: e.target.value.trim() });
  }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'heroSearch') {
    state.searchQuery = e.target.value;
  }
  if (e.target.id === 'searchRefine') {
    // live filter on the search page
    const q = e.target.value;
    const results = searchDestinations(q);
    const grid = $('.city-grid');
    if (grid) {
      grid.innerHTML = results.map(cityCardHTML).join('');
      // update header counts
      const subtitle = $('.page-subtitle');
      if (subtitle) subtitle.textContent = `${results.length} blueprint${results.length === 1 ? '' : 's'} found.`;
    }
  }
});

// Newsletter form (in static footer)
document.addEventListener('submit', (e) => {
  if (e.target.id === 'newsletterForm') {
    e.preventDefault();
    const input = $('#newsletterEmail');
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Invalid email — please try again.');
      return;
    }
    showToast(`Subscribed ${email} — check your inbox.`);
    input.value = '';
  }
});

// Initial paint
document.addEventListener('DOMContentLoaded', render);
// In case the script loaded after parse already, render immediately too:
if (document.readyState !== 'loading') render();
