export interface Destination {
  id: string;
  name: string;
  tagline: string;
  verdict: string;
  rating: number;
  heroImage: string;
  // Optional: image used in city cards / grids. Falls back to heroImage when absent.
  cardImage?: string;
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

export interface DestinationSummary {
  id: string;
  name: string;
  tagline: string;
  image: string;
  rating: string;
}

export const DESTINATIONS: Record<string, Destination> = {
  agra: {
    id: "agra",
    name: "Agra",
    tagline: "Is the City of Love worth the hype?",
    verdict: "Highly Recommended for First-Timers",
    rating: 8.4,
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
    reach: [
      { type: "Flight", detail: "45m from Delhi", hub: "IGIA to AGR", cost: "₹2,500+" },
      { type: "Train", detail: "Gatimaan Express", time: "1h 40m from Delhi", hub: "Agra Cantt", cost: "₹700+" },
      { type: "Road", detail: "Yamuna Expressway", time: "3h 30m Drive", hub: "from Noida", cost: "Tolls ₹415" },
      { type: "Bus", detail: "Volvo AC Sleeper", time: "4h 30m", hub: "ISBT Anand Vihar", cost: "₹500-800" }
    ],
    budget: { backpacker: "$25/day", recommended: "$55/day", luxury: "$150+/day" },
    pros: ["Unique Architecture", "Easy Connectivity", "Rich History"],
    cons: ["Heavy Crowds", "Persistent Sellers", "Heat Intensity"],
    matrix: { money: 40, time: 80, fatigue: 75, payoff: 95 },
    tips: [
      "Avoid the sunrise entry queue by booking tickets online 2 days prior.",
      "Beware of fake guides outside Agra Fort; use official apps.",
      "Carry a reusable water bottle; single-use plastic is banned inside Taj."
    ],
    mustTry: [
      { name: "Panchi Petha", description: "Translucent soft candy made from ash gourd." },
      { name: "Bedai & Jalebi", description: "Spicy fried bread with sweet syrup loops." }
    ],
    itinerary: [
      { time: "06:00 AM", place: "Taj Mahal at Sunrise", duration: "3 Hours", description: "Avoid the heat and the 10:00 AM crowds. Best light for photography.", personalities: ["Extrovert", "History Lover", "Adventure Lover", "Young"] },
      { time: "11:00 AM", place: "Agra Fort", duration: "2 Hours", description: "Explore the red sandstone walls where Shah Jahan was imprisoned.", personalities: ["History Lover", "Introvert", "Old"] },
      { time: "01:30 PM", place: "Lunch at Mehtab Bagh side", duration: "1.5 Hours", description: "Views of the Taj from across the river without the crowd.", personalities: ["Introvert", "Spiritual"] },
      { time: "04:00 PM", place: "Itimad-ud-Daulah (Baby Taj)", duration: "1 Hour", description: "A quieter, more intricate tomb often called the draft of the Taj.", personalities: ["Introvert", "History Lover", "Spiritual"] }
    ]
  },

  varanasi: {
    id: "varanasi",
    name: "Varanasi",
    tagline: "The Spiritual Journey",
    verdict: "Highly Recommended for First-Timers",
    rating: 9.1,
    heroImage: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=2000&auto=format&fit=crop",
    reach: [
      { type: "Flight", detail: "1h 30m from Delhi", hub: "IGIA to VNS", cost: "₹4,700+" },
      { type: "Train", detail: "Vande Bharat Express", time: "8h from Delhi", hub: "Varanasi Jn", cost: "₹1,800+" },
      { type: "Road", detail: "NH19 + NH28", time: "13h Drive", hub: "from Delhi", cost: "Fuel ₹3,500+" },
      { type: "Bus", detail: "Volvo AC Sleeper", time: "14h", hub: "ISBT Anand Vihar", cost: "₹1,200-1,800" }
    ],
    budget: { backpacker: "$20/day", recommended: "$45/day", luxury: "$120+/day" },
    pros: ["Spiritual Treat", "Authentic Culture", "Riverside Magic"],
    cons: ["Narrow Alleys", "Sensory Overload", "Persistent Touts"],
    matrix: { money: 35, time: 90, fatigue: 80, payoff: 98 },
    tips: [
      "Book a sunrise boat ride from Assi Ghat for the best light and fewer crowds.",
      "Wear closed shoes near the ghats; surfaces are uneven and often wet.",
      "Carry small change — most ghat-side vendors don't accept UPI."
    ],
    mustTry: [
      { name: "Banarasi Lassi-Paan", description: "Thick lassi crowned with a paan leaf and rose petals." },
      { name: "Kachori Sabzi", description: "Fried puffed bread with spicy potato curry — a Varanasi breakfast staple." }
    ],
    itinerary: [
      { time: "05:30 AM", place: "Assi Ghat at Sunrise", duration: "2 Hours", description: "Watch the Subah-e-Banaras ritual as light hits the Ganga.", personalities: ["Extrovert", "Spiritual", "History Lover", "Young"] },
      { time: "10:00 AM", place: "Kashi Vishwanath Corridor", duration: "2 Hours", description: "The newly redesigned temple complex — go through the dedicated tourist line.", personalities: ["History Lover", "Spiritual", "Old"] },
      { time: "01:00 PM", place: "Lunch at Kashi Chat Bhandar", duration: "1.5 Hours", description: "A no-frills institution famous for tamatar chaat and palak chaat.", personalities: ["Extrovert", "Young"] },
      { time: "06:00 PM", place: "Dasashwamedh Ghat (Ganga Aarti)", duration: "1.5 Hours", description: "The thunderous evening fire ritual — book a boat seat for a front view.", personalities: ["Introvert", "History Lover", "Spiritual", "Old"] }
    ]
  },

  jaipur: {
    id: "jaipur",
    name: "Jaipur",
    tagline: "The Pink City",
    verdict: "A Royal Visual Feast",
    rating: 8.8,
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2127&auto=format&fit=crop",
    reach: [
      { type: "Flight", detail: "1h from Delhi", hub: "IGIA to JAI", cost: "₹3,000+" },
      { type: "Train", detail: "Shatabdi Express", time: "4h 30m from Delhi", hub: "Jaipur Jn", cost: "₹900+" },
      { type: "Road", detail: "NH48 Delhi-Jaipur Hwy", time: "5h Drive", hub: "from Gurgaon", cost: "Tolls ₹520" },
      { type: "Bus", detail: "Volvo AC", time: "6h", hub: "Sarai Kale Khan", cost: "₹700-1,100" }
    ],
    budget: { backpacker: "$30/day", recommended: "$60/day", luxury: "$180+/day" },
    pros: ["Royal Architecture", "Vibrant Bazaars", "Best Rajasthani Cuisine"],
    cons: ["Summer Heat", "Tourist Pricing", "Traffic in Old City"],
    matrix: { money: 45, time: 70, fatigue: 65, payoff: 92 },
    tips: [
      "Buy the Composite Ticket (~₹400) — covers Amber, Hawa Mahal, Jantar Mantar and more.",
      "Bargain hard in Johari Bazaar; first quote is usually 3x the fair price.",
      "Visit Amber Fort by 8 AM to beat the tour-bus rush from Delhi."
    ],
    mustTry: [
      { name: "Dal Baati Churma", description: "Lentils, baked wheat balls and sweet crumbled flour — the Rajasthani thali centerpiece." },
      { name: "Pyaaz Kachori at Rawat", description: "Flaky onion-stuffed pastry that defines Jaipur breakfast." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Amber Fort", duration: "3 Hours", description: "Climb the cobbled ramp before the sun gets harsh; the Sheesh Mahal is a must.", personalities: ["History Lover", "Adventure Lover", "Extrovert", "Young"] },
      { time: "11:30 AM", place: "Hawa Mahal & Jantar Mantar", duration: "2 Hours", description: "The iconic pink facade and the world's largest stone sundial — both right next to each other.", personalities: ["History Lover", "Introvert", "Old"] },
      { time: "02:00 PM", place: "Lunch at LMB, Johari Bazaar", duration: "1.5 Hours", description: "Pure-veg Rajasthani thali in a 70-year-old institution.", personalities: ["Extrovert", "Old", "Young"] },
      { time: "05:00 PM", place: "Nahargarh Fort Sunset", duration: "2 Hours", description: "The whole pink city laid out below — best golden-hour view in Jaipur.", personalities: ["Adventure Lover", "Spiritual", "Young"] }
    ]
  },

  delhi: {
    id: "delhi",
    name: "Delhi",
    tagline: "The Heart of India",
    verdict: "A Layered Capital Experience",
    rating: 7.9,
    heroImage: "https://images.unsplash.com/photo-1678966432189-d58296e45ad2?q=80&w=627&auto=format&fit=crop",
    reach: [
      { type: "Flight", detail: "Hub airport (IGIA)", hub: "Direct from 80+ cities", cost: "₹2,000+" },
      { type: "Train", detail: "Rajdhani / Vande Bharat", time: "Varies", hub: "New Delhi / NDLS", cost: "₹500+" },
      { type: "Road", detail: "All major highways", time: "Varies", hub: "Delhi NCR", cost: "Tolls vary" },
      { type: "Bus", detail: "Inter-state Volvo", time: "Varies", hub: "ISBT Kashmere Gate", cost: "₹400+" }
    ],
    budget: { backpacker: "$22/day", recommended: "$50/day", luxury: "$160+/day" },
    pros: ["Mughal + Colonial History", "Street Food Capital", "Best Metro in India"],
    cons: ["Peak Pollution Oct-Jan", "Sprawling Distances", "Traffic Chaos"],
    matrix: { money: 38, time: 60, fatigue: 70, payoff: 85 },
    tips: [
      "Use the Metro for everything — Delhi traffic will eat 2-3 hours of your day otherwise.",
      "Avoid Old Delhi sightseeing on Mondays; many monuments are closed.",
      "Drink only sealed bottled water; street kulfi is fine, street water is not."
    ],
    mustTry: [
      { name: "Paranthe Wali Gali Stuffed Paratha", description: "Ghee-fried stuffed flatbread served with chutney — a 150-year-old Chandni Chowk tradition." },
      { name: "Butter Chicken at Moti Mahal", description: "The original 1947 recipe — the dish was literally invented here." }
    ],
    itinerary: [
      { time: "08:00 AM", place: "Jama Masjid + Chandni Chowk Walk", duration: "3 Hours", description: "Mughal-era mosque, then a guided food walk through the spice market.", personalities: ["History Lover", "Extrovert", "Adventure Lover", "Young"] },
      { time: "12:00 PM", place: "Humayun's Tomb", duration: "1.5 Hours", description: "The blueprint for the Taj Mahal — quieter than Red Fort and far better preserved.", personalities: ["History Lover", "Introvert", "Spiritual", "Old"] },
      { time: "02:30 PM", place: "Lunch at Karim's, Jama Masjid", duration: "1.5 Hours", description: "Mughlai kebabs and biryani served the same way since 1913.", personalities: ["Extrovert", "Old", "Young"] },
      { time: "05:00 PM", place: "India Gate + Kartavya Path", duration: "2 Hours", description: "Sunset stroll along the redeveloped boulevard with ice cream from the local vendors.", personalities: ["Introvert", "Extrovert", "Young", "Old"] }
    ]
  },

  udaipur: {
    id: "udaipur",
    name: "Udaipur",
    tagline: "Venice of the East",
    verdict: "Romance in Stone and Water",
    rating: 9.0,
    heroImage: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=2070&auto=format&fit=crop",
    reach: [
      { type: "Flight", detail: "1h 30m from Delhi", hub: "IGIA to UDR", cost: "₹3,500+" },
      { type: "Train", detail: "Mewar Express", time: "12h overnight from Delhi", hub: "Udaipur City", cost: "₹1,400+" },
      { type: "Road", detail: "NH48 via Jaipur", time: "10h Drive", hub: "from Jaipur 6h", cost: "Tolls ₹780" },
      { type: "Bus", detail: "Volvo AC Sleeper", time: "13h", hub: "from Delhi", cost: "₹1,400-2,000" }
    ],
    budget: { backpacker: "$28/day", recommended: "$65/day", luxury: "$200+/day" },
    pros: ["Lakeside Palaces", "Mild Year-Round Weather", "Walkable Old City"],
    cons: ["Far From Major Hubs", "Limited Nightlife", "Premium Pricing"],
    matrix: { money: 55, time: 85, fatigue: 50, payoff: 96 },
    tips: [
      "Take the government boat ride to Jagmandir at sunset — far cheaper than the hotel-run rides.",
      "Stay in a haveli inside the old city, not a chain hotel on the bypass.",
      "Lake Pichola levels drop sharply in May-June — visit Sep-Mar for full views."
    ],
    mustTry: [
      { name: "Dal Baati at Ambrai", description: "Slow-cooked Mewari thali eaten lakeside facing the City Palace." },
      { name: "Mewari Gatte ki Sabzi", description: "Gram-flour dumplings in a tangy yogurt curry — distinctly Udaipur." }
    ],
    itinerary: [
      { time: "08:00 AM", place: "City Palace Complex", duration: "3 Hours", description: "Largest royal palace in Rajasthan — go for the audio tour and the crystal gallery.", personalities: ["History Lover", "Old", "Introvert"] },
      { time: "12:00 PM", place: "Lake Pichola Boat Ride", duration: "1.5 Hours", description: "Stop at Jagmandir Island; the late-morning light is best for photos.", personalities: ["Spiritual", "Introvert", "Young", "Adventure Lover"] },
      { time: "02:30 PM", place: "Lunch at Upré by 1559 AD", duration: "1.5 Hours", description: "Rooftop dining with a direct view of Lake Palace.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "05:30 PM", place: "Bagore-ki-Haveli Dance Show", duration: "1.5 Hours", description: "Daily folk performance in a 200-year-old courtyard — book ahead in season.", personalities: ["History Lover", "Extrovert", "Spiritual", "Old"] }
    ]
  },

  rishikesh: {
    id: "rishikesh",
    name: "Rishikesh",
    tagline: "Yoga Capital of the World",
    verdict: "A Reset for Body and Mind",
    rating: 8.6,
    heroImage: "https://images.unsplash.com/photo-1720819029162-8500607ae232?q=80&w=2070&auto=format&fit=crop",
    reach: [
      { type: "Flight", detail: "55m from Delhi", hub: "IGIA to DED (Dehradun)", cost: "₹3,200+" },
      { type: "Train", detail: "Nanda Devi Express", time: "5h from Delhi", hub: "Haridwar Jn", cost: "₹600+" },
      { type: "Road", detail: "NH334 via Haridwar", time: "5h 30m Drive", hub: "from Delhi", cost: "Tolls ₹350" },
      { type: "Bus", detail: "Volvo AC", time: "6h 30m", hub: "ISBT Kashmere Gate", cost: "₹600-900" }
    ],
    budget: { backpacker: "$18/day", recommended: "$40/day", luxury: "$110+/day" },
    pros: ["Adventure + Spirituality Mix", "Riverside Yoga", "Affordable"],
    cons: ["Monsoon Closures Jul-Aug", "Strict Vegetarian-Only", "Loud Aarti Crowds"],
    matrix: { money: 30, time: 70, fatigue: 60, payoff: 90 },
    tips: [
      "Rafting season is mid-Sep to mid-Jun — outside this window operators shut down.",
      "Do not bring alcohol or non-veg food; the entire town is strictly vegetarian and dry.",
      "Cross Lakshman Jhula on foot at sunrise — the bridge is closed to vehicles."
    ],
    mustTry: [
      { name: "Aloo Puri at Chotiwala", description: "The legendary 1958 vegetarian thali institution by the river." },
      { name: "German Bakery Cinnamon Roll", description: "Warm, flaky and the favorite breakfast of the yoga-tourist crowd." }
    ],
    itinerary: [
      { time: "06:00 AM", place: "Sunrise Yoga at Parmarth Niketan", duration: "1.5 Hours", description: "Open-to-public ashram class on the ghats — donation based.", personalities: ["Spiritual", "Introvert", "Young", "Old"] },
      { time: "09:30 AM", place: "White Water Rafting (Shivpuri to Rishikesh)", duration: "3 Hours", description: "16km Class III rapids stretch — the Indian rafting standard.", personalities: ["Adventure Lover", "Extrovert", "Young"] },
      { time: "01:30 PM", place: "Lunch at Little Buddha Cafe", duration: "1.5 Hours", description: "Treehouse-style cafe overlooking the Ganga.", personalities: ["Introvert", "Young", "Spiritual"] },
      { time: "06:00 PM", place: "Triveni Ghat Aarti", duration: "1 Hour", description: "Smaller and more intimate than Haridwar's; floating diyas at dusk.", personalities: ["Spiritual", "History Lover", "Old"] }
    ]
  },

  goa: {
    id: "goa",
    name: "Goa",
    tagline: "The Beach Capital",
    verdict: "Best for Quick Decompression",
    rating: 8.2,
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2070&auto=format&fit=crop",
    reach: [
      { type: "Flight", detail: "2h 30m from Delhi", hub: "IGIA to GOX (Mopa) / GOI", cost: "₹4,000+" },
      { type: "Train", detail: "Konkan Kanya Express", time: "26h from Mumbai", hub: "Madgaon Jn", cost: "₹1,200+" },
      { type: "Road", detail: "NH66 from Mumbai", time: "10h Drive", hub: "from Mumbai", cost: "Tolls ₹900" },
      { type: "Bus", detail: "Volvo AC Sleeper", time: "12h from Mumbai", hub: "Dadar/Borivali", cost: "₹1,500-2,500" }
    ],
    budget: { backpacker: "$25/day", recommended: "$70/day", luxury: "$220+/day" },
    pros: ["Beach + Forest Mix", "Portuguese-Era Architecture", "Best Seafood in India"],
    cons: ["Peak Dec-Jan Pricing", "Monsoon Beach Closures", "Tourist Trap Restaurants"],
    matrix: { money: 60, time: 75, fatigue: 45, payoff: 88 },
    tips: [
      "Rent a scooter (~₹400/day) — Goa is too spread out for cabs and buses are rare.",
      "North Goa (Anjuna/Vagator) for parties; South Goa (Palolem/Agonda) for calm.",
      "Avoid the touts on Calangute beach — book water sports through your hotel instead."
    ],
    mustTry: [
      { name: "Goan Fish Curry Rice", description: "Coconut + kokum + red chilli base — the everyday meal of coastal Goa." },
      { name: "Bebinca", description: "Seven-layer Portuguese-Goan dessert made of egg yolks and coconut milk." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Sunrise at Palolem Beach", duration: "2 Hours", description: "Crescent-shaped bay in South Goa — quietest at this hour.", personalities: ["Introvert", "Spiritual", "Adventure Lover", "Young"] },
      { time: "11:00 AM", place: "Old Goa Churches (Basilica of Bom Jesus)", duration: "2 Hours", description: "UNESCO-listed Portuguese baroque churches with the relics of St. Francis Xavier.", personalities: ["History Lover", "Spiritual", "Old"] },
      { time: "02:00 PM", place: "Lunch at Martin's Corner", duration: "1.5 Hours", description: "Iconic Goan-Portuguese seafood — try the recheado-stuffed pomfret.", personalities: ["Extrovert", "Old", "Young"] },
      { time: "05:30 PM", place: "Sunset Cruise on Mandovi River", duration: "1.5 Hours", description: "Live folk music, fado dancing, and the Panjim skyline at golden hour.", personalities: ["Extrovert", "Young", "Spiritual"] }
    ]
  }
};

export const DESTINATION_LIST: DestinationSummary[] = Object.values(DESTINATIONS).map(d => ({
  id: d.id,
  name: d.name,
  tagline: d.tagline,
  image: d.cardImage ?? d.heroImage,
  rating: d.rating.toFixed(1)
}));

export function getDestination(id: string): Destination | null {
  return DESTINATIONS[id] ?? null;
}

export function searchDestinations(query: string): DestinationSummary[] {
  const q = query.trim().toLowerCase();
  if (!q) return DESTINATION_LIST;
  return DESTINATION_LIST.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.tagline.toLowerCase().includes(q) ||
    d.id.toLowerCase().includes(q)
  );
}

export function destinationsForPersona(personality: string): DestinationSummary[] {
  if (personality === 'All') return DESTINATION_LIST;
  return Object.values(DESTINATIONS)
    .filter(d => d.itinerary.some(item => item.personalities.includes(personality)))
    .map(d => ({
      id: d.id,
      name: d.name,
      tagline: d.tagline,
      image: d.cardImage ?? d.heroImage,
      rating: d.rating.toFixed(1)
    }));
}
