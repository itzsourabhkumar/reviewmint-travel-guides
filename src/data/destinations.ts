export interface Destination {
  id: string;
  name: string;
  tagline: string;
  verdict: string;
  rating: number;
  heroImage: string;
  // Optional: image used in city cards / grids. Falls back to heroImage when absent.
  cardImage?: string;
  // Travel-type / mood discovery tags (Heritage, Nature, Beach, Mountains, Food,
  // Spiritual, Urban, Adventure, Wellness, Culture). Drives the homepage filter bar.
  moods?: string[];
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
  // Mapped personality tags used by the home/persona filters. For full
  // destinations this is computed from the itinerary; for lite cities
  // it comes from src/data/cityDirectory.ts.
  personalities: string[];
  // Travel-type / mood tags surfaced in the homepage filter bar.
  moods: string[];
  // Numeric Mint Score (0–10) for sort-by-score. Mirrors `rating` parsed.
  score: number;
  // Coarse spend bucket derived from the recommended daily budget.
  budgetTier: 'Budget' | 'Mid-range' | 'Premium';
  // Insertion order across the catalogue — proxy for "newest" sorting.
  order: number;
}

// Themed hero-image pool. The 7 verified destinations keep their own
// city-specific photographs; lite-promoted cities reuse these by category.
export const IMG = {
  heritage:  "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
  spiritual: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=2000&auto=format&fit=crop",
  royal:     "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2127&auto=format&fit=crop",
  metro:     "https://images.unsplash.com/photo-1678966432189-d58296e45ad2?q=80&w=627&auto=format&fit=crop",
  lake:      "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=2070&auto=format&fit=crop",
  mountain:  "https://images.unsplash.com/photo-1720819029162-8500607ae232?q=80&w=2070&auto=format&fit=crop",
  beach:     "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2070&auto=format&fit=crop",
};

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
    moods: ["Heritage", "Culture", "Food"],
    budget: { backpacker: "₹1,800/day", recommended: "₹4,500/day", luxury: "₹13,000+/day" },
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
    moods: ["Spiritual", "Heritage", "Culture"],
    budget: { backpacker: "₹1,500/day", recommended: "₹3,800/day", luxury: "₹10,000+/day" },
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
    moods: ["Heritage", "Culture", "Food"],
    budget: { backpacker: "₹2,200/day", recommended: "₹5,000/day", luxury: "₹15,000+/day" },
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
    moods: ["Heritage", "Urban", "Food", "Culture"],
    budget: { backpacker: "₹1,800/day", recommended: "₹4,200/day", luxury: "₹14,000+/day" },
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
    moods: ["Heritage", "Culture", "Wellness"],
    budget: { backpacker: "₹2,000/day", recommended: "₹5,500/day", luxury: "₹17,000+/day" },
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
    moods: ["Spiritual", "Adventure", "Wellness", "Nature"],
    budget: { backpacker: "₹1,400/day", recommended: "₹3,500/day", luxury: "₹9,000+/day" },
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
    moods: ["Beach", "Nature", "Food", "Culture"],
    budget: { backpacker: "₹2,000/day", recommended: "₹6,000/day", luxury: "₹18,000+/day" },
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
  },

  // ============================================================
  //  Promoted full blueprints (formerly the lite city directory).
  //  Same Destination shape as the 7 verified cities above.
  // ============================================================
  ahmedabad: {
    id: "ahmedabad", name: "Ahmedabad", tagline: "Heritage walks along the Sabarmati",
    verdict: "A Living Museum of Indian Modernity", rating: 8.1, heroImage: IMG.heritage,
    moods: ["Heritage", "Culture", "Food", "Urban"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi/Mumbai", hub: "Sardar Vallabhbhai Patel Intl (AMD)", cost: "₹2,800+" },
      { type: "Train", detail: "Shatabdi / Duronto Express", time: "5h 30m from Mumbai", hub: "Ahmedabad Junction", cost: "₹600+" },
      { type: "Road", detail: "NH48 from Mumbai", time: "8h Drive", hub: "from Mumbai via Vadodara", cost: "Tolls ₹520" },
      { type: "Bus", detail: "Volvo AC Sleeper", time: "9h from Mumbai", hub: "Geeta Mandir Bus Stand", cost: "₹700-1,200" }
    ],
    budget: { backpacker: "₹1,600/day", recommended: "₹4,000/day", luxury: "₹12,000+/day" },
    pros: ["World-Class Street Food", "UNESCO World Heritage Old City", "Efficient Metro Connectivity"],
    cons: ["Dry State (No Alcohol)", "Extreme Summer Heat", "Heavy Traffic in Old City Lanes"],
    matrix: { money: 35, time: 70, fatigue: 60, payoff: 85 },
    tips: [
      "Book the early-morning Heritage Walk (7:00 AM) through AMC to cover pol architecture before the heat peaks.",
      "Carry cash in Old City — many khau galis and stepwell vendors do not accept UPI or cards.",
      "Visit Adalaj Stepwell on a weekday; weekends bring school groups that fill the lower levels."
    ],
    mustTry: [
      { name: "Gujarati Thali", description: "Unlimited rotli, dal, sabzi, kadhi, and shrikhand served with relentless hospitality." },
      { name: "Fafda-Jalebi", description: "Crispy chickpea flour strips paired with syrupy jalebis — the classic Sunday breakfast." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Sabarmati Ashram", duration: "1.5 Hours", description: "Walk through Gandhi's personal quarters, spinning room, and the Hriday Kunj residence at quiet morning pace.", personalities: ["History Lover", "Introvert", "Spiritual", "Old"] },
      { time: "09:30 AM", place: "Sidi Saiyyed Mosque & Old City Pols", duration: "2 Hours", description: "Study the intricate stone lattice windows of the mosque then explore the narrow pol neighbourhoods with a heritage walk guide.", personalities: ["History Lover", "Extrovert", "Young"] },
      { time: "12:30 PM", place: "Manek Chowk Lunch Spread", duration: "1.5 Hours", description: "This jewellery market by day becomes a khau gali by afternoon — try thali, dabeli, and lassi from adjacent stalls.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "03:00 PM", place: "Adalaj Stepwell (Vav)", duration: "1.5 Hours", description: "Descend five stories into the ornately carved Indo-Islamic stepwell; afternoon light hits the carvings perfectly at this hour.", personalities: ["History Lover", "Introvert", "Spiritual", "Old"] }
    ]
  },

  ajmer: {
    id: "ajmer", name: "Ajmer", tagline: "Sufi shrines in the Aravalli foothills",
    verdict: "A Pilgrimage That Transcends Religion", rating: 7.8, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Heritage", "Culture"],
    reach: [
      { type: "Flight", detail: "Nearest airport Jaipur (130 km)", hub: "Jaipur Intl (JAI) + taxi", cost: "₹3,500+" },
      { type: "Train", detail: "Shatabdi from Delhi", time: "5h 30m from Delhi", hub: "Ajmer Junction", cost: "₹550+" },
      { type: "Road", detail: "NH58 from Jaipur", time: "2h Drive", hub: "from Jaipur Pink City", cost: "Tolls ₹120" },
      { type: "Bus", detail: "RSRTC Volvo AC", time: "2h 30m from Jaipur", hub: "Ajmer Central Bus Stand", cost: "₹250-400" }
    ],
    budget: { backpacker: "₹1,300/day", recommended: "₹3,200/day", luxury: "₹9,500+/day" },
    pros: ["Profound Spiritual Atmosphere", "Uncrowded Heritage Sites", "Affordable Accommodation"],
    cons: ["Limited Dining Options", "Touts Near Dargah Entry", "Extreme Heat May–June"],
    matrix: { money: 25, time: 65, fatigue: 50, payoff: 80 },
    tips: [
      "Cover your head and remove shoes before entering Ajmer Sharif; modest full-sleeve clothing is expected for all genders.",
      "Avoid peak Urs festival dates if you seek quiet exploration — crowds multiply tenfold.",
      "Hire a local guide at Taragarh Fort; the path is poorly marked and the panoramic views deserve context."
    ],
    mustTry: [
      { name: "Dargah Ki Biryani", description: "Slow-cooked mutton biryani sold in deg portions near the shrine — sold out by noon." },
      { name: "Malpua", description: "Soft pan-fried flour pancake soaked in sugar syrup, a festive sweet native to Rajasthan." }
    ],
    itinerary: [
      { time: "06:30 AM", place: "Ajmer Sharif Dargah (Fajr Prayers)", duration: "2 Hours", description: "Experience the qawwali session that begins at dawn in the dargah courtyard of Khwaja Moinuddin Chishti.", personalities: ["Spiritual", "History Lover", "Old", "Introvert"] },
      { time: "09:30 AM", place: "Adhai Din Ka Jhonpra", duration: "1 Hour", description: "A 12th-century mosque built from repurposed Jain temple columns — one of Rajasthan's most overlooked monuments.", personalities: ["History Lover", "Introvert"] },
      { time: "11:00 AM", place: "Ana Sagar Lake & Daulat Bagh", duration: "1.5 Hours", description: "Stroll along the marble pavilions built by Shah Jahan on the lake promenade; best before afternoon glare.", personalities: ["Introvert", "Spiritual", "Old", "Extrovert"] },
      { time: "03:00 PM", place: "Taragarh Fort", duration: "2 Hours", description: "Trek to the 7th-century hilltop fort for sweeping Aravalli views; visit the dargah of Miran Saheb inside the walls.", personalities: ["History Lover", "Adventure Lover", "Young", "Extrovert"] }
    ]
  },

  amritsar: {
    id: "amritsar", name: "Amritsar", tagline: "Golden Temple and Wagah border drama",
    verdict: "A Soul-Stirring Must-Visit", rating: 9.0, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Heritage", "Culture", "Food"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi/Mumbai", hub: "Sri Guru Ram Dass Jee Intl (ATQ)", cost: "₹3,200+" },
      { type: "Train", detail: "Shatabdi Express from Delhi", time: "5h 45m from Delhi", hub: "Amritsar Junction", cost: "₹700+" },
      { type: "Road", detail: "NH44 via Ludhiana", time: "6h Drive", hub: "from Delhi via Ambala", cost: "Tolls ₹380" },
      { type: "Bus", detail: "Punjab Roadways Volvo", time: "7h from Delhi", hub: "Delhi ISBT Kashmere Gate", cost: "₹600-950" }
    ],
    budget: { backpacker: "₹1,500/day", recommended: "₹3,800/day", luxury: "₹11,000+/day" },
    pros: ["Free Langar at Golden Temple 24/7", "Exceptionally Warm Locals", "Unforgettable Wagah Ceremony"],
    cons: ["Congested Old City Streets", "Limited After-Hours Attractions", "Commercialised Food Lanes Near Temple"],
    matrix: { money: 30, time: 75, fatigue: 65, payoff: 98 },
    tips: [
      "Arrive at the Golden Temple by 4:30 AM for the Palki Sahib procession — a deeply moving ritual with almost no tourists.",
      "Book the Wagah Border bleacher seats through the BSF website; arrive 90 minutes before sunset for a good spot.",
      "Deposit your shoes at the official counter near the entry — roadside shoe-keepers charge inflated rates."
    ],
    mustTry: [
      { name: "Amritsari Kulcha", description: "Tandoor-baked stuffed flatbread with spiced potato-paneer filling, served with chole and butter." },
      { name: "Lassi at Gian di Hatti", description: "Thick yoghurt lassi topped with a generous layer of malai cream; an outlet open since 1947." }
    ],
    itinerary: [
      { time: "05:00 AM", place: "Harmandir Sahib (Golden Temple)", duration: "2.5 Hours", description: "Witness the Parkash ceremony at dawn, walk the marble parikrama, and partake in langar in the vast dining hall.", personalities: ["Spiritual", "History Lover", "Old", "Introvert", "Young"] },
      { time: "09:00 AM", place: "Jallianwala Bagh", duration: "1.5 Hours", description: "Walk through the memorial garden, view the bullet-marked walls, and visit the eternal flame — a humbling reckoning.", personalities: ["History Lover", "Introvert", "Old"] },
      { time: "11:30 AM", place: "Kesar Da Dhaba — Lunch", duration: "1.5 Hours", description: "One of Amritsar's oldest dhabas (est. 1916) serving dal makhani, paneer butter masala, and the legendary kulcha.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "04:00 PM", place: "Wagah Border Beating Retreat", duration: "2 Hours", description: "Watch BSF and Pakistan Rangers perform the synchronized flag-lowering ceremony amid patriotic chanting.", personalities: ["Extrovert", "Adventure Lover", "History Lover", "Young"] }
    ]
  },

  bangalore: {
    id: "bangalore", name: "Bangalore", tagline: "Tech capital with garden-city soul",
    verdict: "India's Most Liveable Weekend Escape", rating: 8.2, heroImage: IMG.metro,
    moods: ["Urban", "Nature", "Culture", "Food"],
    reach: [
      { type: "Flight", detail: "Hub — Delhi, Mumbai, Hyderabad", hub: "Kempegowda Intl (BLR)", cost: "₹2,500+" },
      { type: "Train", detail: "Rajdhani / Shatabdi from Chennai", time: "5h from Chennai", hub: "KSR Bengaluru City Junction", cost: "₹450+" },
      { type: "Road", detail: "NH44 from Chennai", time: "6h Drive", hub: "from Chennai via Vellore", cost: "Tolls ₹480" },
      { type: "Bus", detail: "KSRTC Airavat Club Class", time: "6h 30m from Chennai", hub: "Majestic Bus Terminal (KBS)", cost: "₹700-1,100" }
    ],
    budget: { backpacker: "₹2,200/day", recommended: "₹5,500/day", luxury: "₹18,000+/day" },
    pros: ["Vibrant Craft-Beer and Cafe Culture", "Pleasant Year-Round Climate", "World-Class Art and Music Scene"],
    cons: ["Notorious Traffic Congestion", "High Cost of Living", "Metro Coverage Still Incomplete"],
    matrix: { money: 55, time: 60, fatigue: 70, payoff: 82 },
    tips: [
      "Use the Namma Metro during rush hours — cab surge pricing can triple fares between 8–10 AM.",
      "Lalbagh charges entry only on weekdays; Sunday entry is free but crowds are heavy by 9 AM.",
      "Cubbon Park is closed to vehicles on Sunday mornings — ideal for cycling rentals at the KH Road gate."
    ],
    mustTry: [
      { name: "Masala Dosa (MTR-style)", description: "Paper-thin crisp dosa with spiced potato filling, served with three chutneys and sambar." },
      { name: "Bisi Bele Bath", description: "Steaming rice-lentil-vegetable porridge spiced with a proprietary masala blend." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Lalbagh Botanical Garden", duration: "2 Hours", description: "Walk past the Kempe Gowda watchtower, the Glass House, and a 135-crore-year-old rock outcrop in one green circuit.", personalities: ["Introvert", "Young", "Old", "Extrovert"] },
      { time: "10:30 AM", place: "Bangalore Palace", duration: "1.5 Hours", description: "Tour the Tudor-style Wadiyar palace with wood-panelled halls, trophies, and ornate thrones.", personalities: ["History Lover", "Extrovert", "Young"] },
      { time: "01:00 PM", place: "Koshy's Restaurant Lunch", duration: "1.5 Hours", description: "Lunch at this 1940s institution beloved by writers and artists — try the devilled kidneys.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "03:30 PM", place: "Cubbon Park & Vidhana Soudha", duration: "2 Hours", description: "Stroll 300 acres of urban forest then photograph the neo-Dravidian Vidhana Soudha at golden hour.", personalities: ["Introvert", "Extrovert", "Young", "Adventure Lover"] }
    ]
  },

  bhopal: {
    id: "bhopal", name: "Bhopal", tagline: "Lakes, mosques and the City of Begums",
    verdict: "An Underrated Gem Hiding in Plain Sight", rating: 7.6, heroImage: IMG.heritage,
    moods: ["Heritage", "Culture", "Spiritual", "Nature"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi and Mumbai", hub: "Raja Bhoj Airport (BHO)", cost: "₹3,000+" },
      { type: "Train", detail: "Shatabdi from Delhi", time: "7h 30m from Delhi", hub: "Bhopal Junction (HBJ)", cost: "₹650+" },
      { type: "Road", detail: "NH46 from Indore", time: "3h 30m Drive", hub: "from Indore via Dewas", cost: "Tolls ₹180" },
      { type: "Bus", detail: "MP Tourism AC Coach", time: "4h from Indore", hub: "Nadra Bus Stand, Bhopal", cost: "₹350-550" }
    ],
    budget: { backpacker: "₹1,400/day", recommended: "₹3,500/day", luxury: "₹10,000+/day" },
    pros: ["Exceptionally Low Tourist Crowds", "Rich Nawabi Culinary Heritage", "Bhimbetka UNESCO Site Nearby"],
    cons: ["Poor Inter-City Signage", "Limited Luxury Hotels", "Industrial Outskirts Affect Aesthetics"],
    matrix: { money: 28, time: 65, fatigue: 45, payoff: 78 },
    tips: [
      "Bhimbetka Rock Shelters are 46 km away — hire a cab for a half-day; no direct public bus.",
      "Visit Taj-ul-Masajid on Friday morning for the most atmospheric experience.",
      "Upper Lake boat rides are cheapest from the Boat Club Jetty — avoid hotel-arranged charters."
    ],
    mustTry: [
      { name: "Bhopal Gosht Biryani", description: "Dum-cooked mutton biryani with a distinctly Nawabi spice profile — lighter on colour, heavier on aroma." },
      { name: "Mawa Bati", description: "Deep-fried dough balls stuffed with khoya, dry fruits, and saffron — a festive sweet unique to Bhopal." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Upper Lake Sunrise Boat Ride", duration: "1.5 Hours", description: "Board a rowing boat at the Boat Club Jetty for a misty dawn view of one of Asia's largest artificial lakes.", personalities: ["Introvert", "Old", "Extrovert"] },
      { time: "09:30 AM", place: "Taj-ul-Masajid", duration: "1.5 Hours", description: "Explore the grand pink-sandstone mosque — one of Asia's largest — built by Begum Shah Jahan Bhopal.", personalities: ["History Lover", "Spiritual", "Old"] },
      { time: "12:00 PM", place: "Chatori Gali Lunch", duration: "1.5 Hours", description: "Lunch in the Chatori Gali food lane near Jama Masjid — mutton seekh, rogan josh rolls, and sheer korma.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "02:30 PM", place: "Bhimbetka Rock Shelters", duration: "2.5 Hours", description: "Walk among 30,000-year-old cave paintings depicting hunts, dances, and rituals — a prehistoric window.", personalities: ["History Lover", "Introvert", "Adventure Lover", "Young", "Old"] }
    ]
  },

  chandigarh: {
    id: "chandigarh", name: "Chandigarh", tagline: "Le Corbusier's planned city",
    verdict: "Modernist Elegance Meets Punjabi Spirit", rating: 8.0, heroImage: IMG.metro,
    moods: ["Urban", "Culture", "Nature", "Heritage"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi and Mumbai", hub: "Chandigarh Intl Airport (IXC)", cost: "₹2,800+" },
      { type: "Train", detail: "Shatabdi Express from Delhi", time: "3h 30m from Delhi", hub: "Chandigarh Railway Station", cost: "₹550+" },
      { type: "Road", detail: "NH44 from Delhi", time: "4h Drive", hub: "from Delhi via Ambala", cost: "Tolls ₹280" },
      { type: "Bus", detail: "HRTC Volvo AC", time: "4h 30m from Delhi", hub: "ISBT Sector 17, Chandigarh", cost: "₹500-750" }
    ],
    budget: { backpacker: "₹1,800/day", recommended: "₹4,500/day", luxury: "₹14,000+/day" },
    pros: ["India's Cleanest and Best-Planned City", "Excellent Dining in Sector 17/26", "Quick Gateway to Himachal"],
    cons: ["Low on Traditional Sightseeing", "Expensive Unmetered Auto-Rickshaws", "Limited Central Budget Stays"],
    matrix: { money: 45, time: 70, fatigue: 40, payoff: 75 },
    tips: [
      "The Capitol Complex requires a free permit from the UT Tourism office — apply by 9 AM.",
      "Rent a cycle from the Sukhna Lake counter for ₹80/hour; lanes cover most major sectors.",
      "Rock Garden is busiest on Sunday afternoons — arrive by 9 AM or after 4 PM."
    ],
    mustTry: [
      { name: "Chole Bhature (Sindhi Sweets)", description: "Pillow-soft bhatura with a tangy, deeply spiced chickpea curry — a morning ritual." },
      { name: "Amritsari Papad Chaat", description: "Roasted lentil cracker topped with yoghurt, tamarind chutney, and chaat masala." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Sukhna Lake Morning Walk", duration: "1.5 Hours", description: "Walk or cycle the 3.5 km lakeside promenade at dawn; migratory birds roost at the water's edge in winter.", personalities: ["Introvert", "Old", "Extrovert", "Young"] },
      { time: "10:00 AM", place: "Rock Garden of Nek Chand", duration: "2 Hours", description: "Wander 40 acres of fantasy sculptures and waterfalls built entirely from urban waste and ceramics.", personalities: ["Extrovert", "Adventure Lover", "Young", "History Lover"] },
      { time: "01:00 PM", place: "Sector 17 Plaza Lunch", duration: "1.5 Hours", description: "Lunch in the pedestrianised commercial hub — Pal Dhaba for hearty dal-roti or a rooftop splurge.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "03:30 PM", place: "Capitol Complex & Open Hand", duration: "2 Hours", description: "Take the guided heritage tour of Le Corbusier's government campus and the iconic Open Hand sculpture.", personalities: ["History Lover", "Introvert", "Old", "Extrovert"] }
    ]
  },

  coorg: {
    id: "coorg", name: "Coorg", tagline: "Coffee plantations in misty Western Ghats",
    verdict: "India's Most Romantic Hill Escape", rating: 8.7, heroImage: IMG.mountain,
    moods: ["Nature", "Adventure", "Wellness", "Mountains"],
    reach: [
      { type: "Flight", detail: "Nearest airport Mangalore (120 km)", hub: "IXE / BLR + taxi", cost: "₹3,500+" },
      { type: "Train", detail: "Nearest railhead Mysuru (120 km)", hub: "Mysuru Junction + taxi", cost: "₹400+ + cab" },
      { type: "Road", detail: "NH275 from Bangalore", time: "4h 30m Drive", hub: "from Bangalore via Mysuru", cost: "Tolls ₹180" },
      { type: "Bus", detail: "KSRTC Airavat from Bangalore", time: "5h 30m", hub: "Kempegowda Bus Terminal", cost: "₹550-850" }
    ],
    budget: { backpacker: "₹1,900/day", recommended: "₹5,000/day", luxury: "₹20,000+/day" },
    pros: ["Lush Plantation Homestays", "Cool Climate Even in Summer", "Authentic Kodava Culture and Cuisine"],
    cons: ["Treacherous Monsoon Roads (Jun–Aug)", "Limited Local Public Transport", "Weekend Price Surge of 40%"],
    matrix: { money: 50, time: 55, fatigue: 55, payoff: 92 },
    tips: [
      "Book plantation homestays at least 3 weeks ahead for weekends; last-minute stays are near-impossible in peak season.",
      "Dubare Elephant Camp interaction is fixed at 9–11 AM — arrive by 8:30 AM to park and queue.",
      "Raja Seat is free at sunrise but charges ₹10 after 8 AM; mist clears by 9 AM so arrive early."
    ],
    mustTry: [
      { name: "Pandi Curry", description: "Coorg's prized pork curry slow-cooked with kachampuli (black vinegar) and Kodava spices." },
      { name: "Akki Roti", description: "Thin rice-flour flatbread seasoned with herbs and green chilli — a Kodava breakfast staple." }
    ],
    itinerary: [
      { time: "06:30 AM", place: "Raja Seat, Madikeri", duration: "1.5 Hours", description: "Watch sunrise from the Kodagu kings' favourite vantage — mist-filled valleys with virtually no crowd.", personalities: ["Introvert", "Old", "Young"] },
      { time: "09:00 AM", place: "Dubare Elephant Camp", duration: "2 Hours", description: "Join mahouts for the morning bathing session with Forest Department elephants in the Cauvery River.", personalities: ["Adventure Lover", "Young", "Introvert"] },
      { time: "12:30 PM", place: "Plantation Homestay Lunch", duration: "1.5 Hours", description: "Return for a Kodava-style pandi curry and akki roti lunch served amid coffee bushes.", personalities: ["Introvert", "Old", "Young"] },
      { time: "03:00 PM", place: "Abbey Falls & Plantation Walk", duration: "2.5 Hours", description: "Hike down the forest trail to the 70-foot waterfall framed by coffee and pepper vines.", personalities: ["Adventure Lover", "Introvert", "Young", "Old"] }
    ]
  },

  darjeeling: {
    id: "darjeeling", name: "Darjeeling", tagline: "Toy trains and Himalayan tea estates",
    verdict: "A Must-Visit Mountain Escape", rating: 8.7, heroImage: IMG.mountain,
    moods: ["Nature", "Adventure", "Culture", "Mountains"],
    reach: [
      { type: "Flight", detail: "Nearest airport Bagdogra (IXB)", time: "3h drive to hills", hub: "Kolkata to Bagdogra", cost: "₹3,500+" },
      { type: "Train", detail: "To New Jalpaiguri then taxi", time: "12–14h from Kolkata", hub: "Howrah to NJP", cost: "₹600+" },
      { type: "Road", detail: "Shared cab from Siliguri", time: "3h from Siliguri", hub: "Siliguri to Darjeeling", cost: "₹250-400" },
      { type: "Bus", detail: "SNT hill bus", time: "4h from Siliguri", hub: "Siliguri Bus Stand", cost: "₹150-300" }
    ],
    budget: { backpacker: "₹1,500/day", recommended: "₹3,800/day", luxury: "₹11,000+/day" },
    pros: ["Breathtaking Himalayan Panoramas", "UNESCO Toy Train Experience", "Pleasant Cool Climate"],
    cons: ["Frequent Landslide Disruptions", "Very Narrow Congested Roads", "Steep Slippery Terrain"],
    matrix: { money: 45, time: 65, fatigue: 60, payoff: 90 },
    tips: [
      "Book the Tiger Hill jeep safari the evening before at your hotel; spots fill up by 6 PM.",
      "Ride the joy train from Darjeeling to Ghoom station for the most scenic stretch.",
      "Carry layers even in summer — temperatures can drop to 8°C at Tiger Hill before dawn."
    ],
    mustTry: [
      { name: "Darjeeling First Flush Tea", description: "Delicate muscatel-flavoured single-estate tea best sipped black at a plantation tearoom." },
      { name: "Thukpa", description: "Tibetan noodle soup with vegetables or chicken, warming after a high-altitude morning." }
    ],
    itinerary: [
      { time: "04:00 AM", place: "Tiger Hill Sunrise", duration: "2.5 Hours", description: "Catch first light paint Kanchenjunga gold; on clear days Everest is visible on the horizon.", personalities: ["Adventure Lover", "Extrovert", "Young"] },
      { time: "08:00 AM", place: "Darjeeling Himalayan Railway Joy Ride", duration: "2 Hours", description: "Steam-hauled narrow-gauge train loops through tea estates and Batasia Loop — a living UNESCO site.", personalities: ["Adventure Lover", "Extrovert", "Young", "Old", "Introvert"] },
      { time: "11:00 AM", place: "Happy Valley Tea Estate", duration: "1.5 Hours", description: "Walk through manicured bushes, watch hand-rolling, and taste estate teas from the withering trays.", personalities: ["Introvert", "Old", "Extrovert"] },
      { time: "01:00 PM", place: "Chowrasta Mall & Local Lunch", duration: "2 Hours", description: "Stroll the pedestrian square, try thukpa at a Tibetan cafe, and browse Himalayan craft stalls.", personalities: ["Extrovert", "Young", "Old", "Adventure Lover"] }
    ]
  },

  dehradun: {
    id: "dehradun", name: "Dehradun", tagline: "Doon Valley gateway to the hills",
    verdict: "Ideal Slow-Paced Weekend Retreat", rating: 7.8, heroImage: IMG.mountain,
    moods: ["Nature", "Wellness", "Culture", "Mountains"],
    reach: [
      { type: "Flight", detail: "Jolly Grant Airport, 25 km", time: "1h 15m from Delhi", hub: "IGI to DED", cost: "₹3,000+" },
      { type: "Train", detail: "Shatabdi / Jan Shatabdi", time: "4h 45m from Delhi", hub: "New Delhi to Dehradun", cost: "₹500+" },
      { type: "Road", detail: "NH7 via Meerut", time: "5–6h from Delhi", hub: "Delhi to Dehradun", cost: "Tolls ₹320" },
      { type: "Bus", detail: "Volvo AC", time: "5h 30m", hub: "ISBT Kashmere Gate Delhi", cost: "₹400-700" }
    ],
    budget: { backpacker: "₹1,400/day", recommended: "₹3,200/day", luxury: "₹9,500+/day" },
    pros: ["Calm Crowd-Free Atmosphere", "Base for Mussoorie and Haridwar", "Clean Air and Green Canopy"],
    cons: ["Commercialisation Spreading Fast", "Uneven Infrastructure Outside Centre", "Monsoon Landslide Risk"],
    matrix: { money: 30, time: 70, fatigue: 40, payoff: 75 },
    tips: [
      "Visit Robbers Cave in the morning before day-trippers arrive from Haridwar post noon.",
      "The Mindrolling Monastery library is open only till 5 PM — plan accordingly.",
      "Sahastradhara sulphur springs feel warmest and least crowded on weekday mornings."
    ],
    mustTry: [
      { name: "Bal Mithai", description: "Dark fudge-like confection coated in white sugar balls, sold at Paltan Bazaar." },
      { name: "Kafuli", description: "Slow-cooked green-leaf curry of spinach and fenugreek, served with steamed rice." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Robbers Cave (Guchhu Pani)", duration: "1.5 Hours", description: "Wade through a cool stream inside a narrow gorge cave — best before the mid-morning rush.", personalities: ["Introvert", "Adventure Lover", "Young"] },
      { time: "10:00 AM", place: "Mindrolling Monastery", duration: "2 Hours", description: "Wander the largest Buddhist stupa in India, meditate in the prayer hall, browse Tibetan thangkas.", personalities: ["Introvert", "Spiritual", "Old"] },
      { time: "01:00 PM", place: "Paltan Bazaar Lunch Stop", duration: "1.5 Hours", description: "Try Kafuli at a local dhaba and pick up Bal Mithai from century-old sweetshops.", personalities: ["Introvert", "Extrovert", "Young", "Old"] },
      { time: "03:30 PM", place: "Sahastradhara", duration: "2 Hours", description: "Dip in sulphur-rich natural spring terraces tumbling down limestone ledges.", personalities: ["Introvert", "Old", "Adventure Lover"] }
    ]
  },

  dharamshala: {
    id: "dharamshala", name: "Dharamshala", tagline: "Tibetan culture in the Dhauladhar range",
    verdict: "Soul-Stirring Escape for Mindful Travellers", rating: 8.5, heroImage: IMG.mountain,
    moods: ["Spiritual", "Mountains", "Adventure", "Culture"],
    reach: [
      { type: "Flight", detail: "Gaggal Airport (DHM), 15 km", time: "1h 20m from Delhi", hub: "IGI to DHM", cost: "₹4,000+" },
      { type: "Train", detail: "To Pathankot then cab/bus", time: "8–9h from Delhi", hub: "Delhi to Pathankot Cantt", cost: "₹400+" },
      { type: "Road", detail: "NH44 via Jalandhar", time: "9–10h from Delhi", hub: "Delhi to Dharamshala", cost: "Tolls ₹520" },
      { type: "Bus", detail: "HRTC Volvo overnight", time: "10–11h", hub: "ISBT Kashmere Gate Delhi", cost: "₹700-1,200" }
    ],
    budget: { backpacker: "₹1,300/day", recommended: "₹3,500/day", luxury: "₹10,000+/day" },
    pros: ["Tranquil Tibetan Buddhist Atmosphere", "World-Class Trekking Trailheads", "Thriving Cafe and Art Scene"],
    cons: ["Erratic Mountain Weather", "Challenging Post-Monsoon Roads", "Limited Medical Facilities at Altitude"],
    matrix: { money: 50, time: 60, fatigue: 65, payoff: 88 },
    tips: [
      "Register for the Triund Trek at the forest check-post before 11 AM — rangers turn away unpermitted trekkers after midday.",
      "The Tsuglagkhang Complex opens 10 AM–5 PM; Dalai Lama presence dates are posted online 48h ahead.",
      "Pack a rain poncho even in October — Dhauladhar clouds roll in within minutes."
    ],
    mustTry: [
      { name: "Thenthuk", description: "Tibetan hand-pulled flat noodle soup with root vegetables, served hot at monastery canteens." },
      { name: "Siddu", description: "Steamed wheat-flour buns stuffed with poppy-seed paste, best had with ghee at roadside stalls." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Bhagsu Waterfall & Shiva Cafe", duration: "2 Hours", description: "Short uphill walk to the falls; the rocky amphitheatre above is serene at dawn before the crowds.", personalities: ["Introvert", "Adventure Lover", "Young", "Spiritual"] },
      { time: "10:00 AM", place: "Tsuglagkhang Complex", duration: "2.5 Hours", description: "Walk through the main temple, Tibet Museum, and Namgyal Monastery; monks debate in the courtyard.", personalities: ["Spiritual", "Introvert", "Old", "History Lover"] },
      { time: "01:00 PM", place: "McLeod Ganj Lunch", duration: "1.5 Hours", description: "Try thenthuk at Lung Ta restaurant; browse Tibetan handicraft shops on Temple Road.", personalities: ["Introvert", "Extrovert", "Young"] },
      { time: "03:00 PM", place: "Triund Trek Base to First Ridge", duration: "3 Hours", description: "Climb 9 km through oak and rhododendron to the first rocky ridge for sweeping Kangra valley views.", personalities: ["Adventure Lover", "Young", "Extrovert", "Introvert"] }
    ]
  },

  dwarka: {
    id: "dwarka", name: "Dwarka", tagline: "Krishna's coastal kingdom",
    verdict: "A Timeless Pilgrimage with Coastal Charm", rating: 8.1, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Heritage", "Culture", "Beach"],
    reach: [
      { type: "Flight", detail: "Nearest airport Jamnagar, 145 km", time: "4h drive post-landing", hub: "Mumbai to Jamnagar", cost: "₹4,500+" },
      { type: "Train", detail: "Direct trains from Ahmedabad", time: "8–9h from Ahmedabad", hub: "Ahmedabad to Dwarka", cost: "₹350+" },
      { type: "Road", detail: "NH947 from Jamnagar", time: "2h 30m from Jamnagar", hub: "Jamnagar to Dwarka", cost: "Tolls ₹120" },
      { type: "Bus", detail: "GSRTC Volvo", time: "9h from Ahmedabad", hub: "Ahmedabad ST Bus Stand", cost: "₹500-900" }
    ],
    budget: { backpacker: "₹1,200/day", recommended: "₹3,000/day", luxury: "₹9,000+/day" },
    pros: ["One of Hinduism's Seven Sacred Cities", "Uncrowded Pristine Coastline", "Rare Underwater Archaeology Nearby"],
    cons: ["Limited Fine Dining Options", "Bet Dwarka Ferry Suspended in Rough Seas", "Extreme Heat Apr–Jun"],
    matrix: { money: 60, time: 55, fatigue: 45, payoff: 82 },
    tips: [
      "Dwarkadhish Temple has a strict dress code — carry a dupatta or dhoti; shorts are denied entry.",
      "Book the Bet Dwarka ferry early morning at Okha jetty; afternoon winds often cancel crossings.",
      "Nageshwar Jyotirlinga sees longest queues on Mondays — visit on a weekday morning."
    ],
    mustTry: [
      { name: "Khichdi Prasad", description: "Sacred moong-dal rice slow-cooked in pure ghee at the Dwarkadhish Temple prasad counter." },
      { name: "Ghantia", description: "Crispy deep-fried chickpea-flour sticks spiced with carom seeds — a Gujarat street staple." }
    ],
    itinerary: [
      { time: "06:00 AM", place: "Dwarkadhish Temple Morning Aarti", duration: "1.5 Hours", description: "Witness the conch-and-bell dawn aarti at the 5-storey temple on the Gomti riverbank.", personalities: ["Spiritual", "Old", "Extrovert"] },
      { time: "09:00 AM", place: "Bet Dwarka Island", duration: "3 Hours", description: "Take the 30-minute ferry to the island believed to be Krishna's personal residence.", personalities: ["Spiritual", "Adventure Lover", "Young"] },
      { time: "01:00 PM", place: "Lunch at Dwarka Town", duration: "1.5 Hours", description: "Eat Khichdi Prasad at the temple or Ghantia with chai on Kutchhi Bazaar road.", personalities: ["Spiritual", "Old", "Introvert"] },
      { time: "03:30 PM", place: "Nageshwar Jyotirlinga & Rukmini Temple", duration: "2 Hours", description: "Visit one of the 12 Jyotirlinga shrines, then the exquisitely carved Rukmini Temple 2 km away.", personalities: ["Spiritual", "Old", "History Lover", "Introvert"] }
    ]
  },

  gangtok: {
    id: "gangtok", name: "Gangtok", tagline: "Sikkim capital with Kanchenjunga views",
    verdict: "Serene Mountain Capital Worth Every Rupee", rating: 8.6, heroImage: IMG.mountain,
    moods: ["Mountains", "Spiritual", "Nature", "Culture"],
    reach: [
      { type: "Flight", detail: "Pakyong Airport (PYG), 31 km", time: "1h 15m from Kolkata", hub: "Kolkata to Pakyong", cost: "₹4,000+" },
      { type: "Train", detail: "To New Jalpaiguri then cab", time: "5h cab post-train", hub: "Kolkata to NJP", cost: "₹500+" },
      { type: "Road", detail: "NH10 along Teesta River", time: "4–5h from Siliguri", hub: "Siliguri to Gangtok", cost: "₹250-400" },
      { type: "Bus", detail: "SNT government bus", time: "5h from Siliguri", hub: "Siliguri SNT Stand", cost: "₹170-250" }
    ],
    budget: { backpacker: "₹1,600/day", recommended: "₹4,000/day", luxury: "₹12,000+/day" },
    pros: ["Immaculate Clean Streets", "Stunning Kanchenjunga Sunrise Views", "Authentic Tibetan Buddhist Culture"],
    cons: ["Inner Line Permit Required for North Sikkim", "Monsoon Landslide Blockages", "Limited Card-Accepting ATMs"],
    matrix: { money: 50, time: 60, fatigue: 50, payoff: 87 },
    tips: [
      "Obtain the Inner Line Permit in Siliguri or online before reaching Gangtok — needed for Tsomgo Lake too.",
      "MG Marg is pedestrian-only; taxis drop you at the gate — schedule 2–3 hours there.",
      "Rumtek Monastery requires a government ID for entry; carry passport or Aadhaar."
    ],
    mustTry: [
      { name: "Sikkimese Thali", description: "Gundruk curry, Sikkimese pork, red rice, and chhurpi cheese at a family-run eatery." },
      { name: "Tongba", description: "Warm millet-beer sipped through a bamboo straw — the essential Himalayan social drink." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Tsomgo (Changu) Lake", duration: "3 Hours", description: "Glacial lake at 3,753 m turns emerald in October; yak rides and rhododendron walks around the rim.", personalities: ["Introvert", "Adventure Lover", "Young", "Extrovert"] },
      { time: "11:30 AM", place: "Rumtek Monastery", duration: "2 Hours", description: "Largest monastery in Sikkim, housing relics of the Karmapa lineage and stunning Tibetan murals.", personalities: ["Spiritual", "Introvert", "Old"] },
      { time: "02:00 PM", place: "MG Marg Lunch and Stroll", duration: "2 Hours", description: "Walk the spotless pedestrian promenade, eat a Sikkimese thali, browse handloom stalls.", personalities: ["Introvert", "Extrovert", "Young", "Old"] },
      { time: "05:00 PM", place: "Tashi Viewpoint Sunset", duration: "1 Hour", description: "Northern viewpoint with an unobstructed panorama of the Kanchenjunga massif in alpenglow.", personalities: ["Introvert", "Adventure Lover", "Extrovert"] }
    ]
  },

  gwalior: {
    id: "gwalior", name: "Gwalior", tagline: "Hilltop fort above a royal city",
    verdict: "An Underrated Heritage Gem", rating: 7.9, heroImage: IMG.heritage,
    moods: ["Heritage", "Culture", "Urban"],
    reach: [
      { type: "Flight", detail: "Rajmata Scindia Airport (GWL)", time: "1h from Delhi", hub: "IGI to GWL", cost: "₹3,000+" },
      { type: "Train", detail: "Shatabdi or Punjab Mail", time: "3h 30m from Delhi", hub: "Hazrat Nizamuddin to Gwalior", cost: "₹500+" },
      { type: "Road", detail: "NH44 Agra-Gwalior stretch", time: "4h from Agra", hub: "Agra to Gwalior", cost: "Tolls ₹180" },
      { type: "Bus", detail: "MP Tourism Volvo", time: "5h from Delhi", hub: "ISBT Sarai Kale Khan Delhi", cost: "₹450-750" }
    ],
    budget: { backpacker: "₹1,400/day", recommended: "₹3,200/day", luxury: "₹9,500+/day" },
    pros: ["One of India's Most Impressive Forts", "World-Class Royal Palace Museum", "Rarely Overcrowded"],
    cons: ["Extreme Heat May–July", "Limited Quality Budget Stays", "Patchy English Signage"],
    matrix: { money: 55, time: 75, fatigue: 55, payoff: 80 },
    tips: [
      "The Gwalior Fort light-and-sound show runs nightly; the English show starts 8:30 PM — book same-day at the gate.",
      "Jai Vilas Palace museum closes Mondays; plan any other day to see the crystal chandeliers.",
      "Carry a wide-angle lens for Sas Bahu Temples — the interlocked shikharas demand it and it is empty by 9 AM."
    ],
    mustTry: [
      { name: "Gwalior Kachori", description: "Flaky deep-fried lentil-stuffed pastry served with tangy tamarind chutney near Phoolbagh." },
      { name: "Mohan Bhog", description: "Dense milk-solid sweetmeat flavoured with cardamom and saffron, sold by weight at Mithai Gali." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Gwalior Fort Complex", duration: "3 Hours", description: "Explore the Man Mandir Palace, cliff-carved Jain sculptures, and panoramic battlements over the city.", personalities: ["History Lover", "Introvert", "Old", "Extrovert"] },
      { time: "11:00 AM", place: "Sas Bahu Temples", duration: "1.5 Hours", description: "11th-century twin Vaishnava temples with impossibly detailed carvings — quieter than guidebooks suggest.", personalities: ["History Lover", "Introvert", "Spiritual", "Old"] },
      { time: "01:00 PM", place: "Phoolbagh Market Lunch", duration: "1.5 Hours", description: "Eat Gwalior Kachori and sip lassi; pick up Mohan Bhog from the famous Mithai Gali shops.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "03:30 PM", place: "Jai Vilas Palace and Museum", duration: "2 Hours", description: "35 rooms of the Scindia royal collection including Bohemian crystal and India's most ornate durbar hall.", personalities: ["History Lover", "Extrovert", "Old", "Young"] }
    ]
  },

  hampi: {
    id: "hampi", name: "Hampi", tagline: "Boulder-strewn ruins of Vijayanagar",
    verdict: "A Must-Visit for Every Serious Traveller", rating: 9.1, heroImage: IMG.heritage,
    moods: ["Heritage", "Adventure", "Culture", "Nature"],
    reach: [
      { type: "Flight", detail: "Hubli Airport (HBX), 160 km", time: "3h drive post-landing", hub: "Bengaluru to Hubli", cost: "₹3,500+" },
      { type: "Train", detail: "To Hospet Junction then 13 km auto", time: "8–9h from Bengaluru", hub: "KSR Bengaluru to Hospet", cost: "₹350+" },
      { type: "Road", detail: "NH50 via Chitradurga", time: "6h from Bengaluru", hub: "Bengaluru to Hampi", cost: "Tolls ₹280" },
      { type: "Bus", detail: "KSRTC Airavat overnight", time: "8h from Bengaluru", hub: "Majestic Bus Stand Bengaluru", cost: "₹600-1,000" }
    ],
    budget: { backpacker: "₹1,200/day", recommended: "₹3,000/day", luxury: "₹9,500+/day" },
    pros: ["UNESCO Site with Minimal Crowds", "Otherworldly Boulder Landscape", "Budget Traveller Paradise"],
    cons: ["Scorching Heat Mar–Jun", "Limited Monument-Side Accommodation", "No ATM on Hippie Island"],
    matrix: { money: 65, time: 70, fatigue: 70, payoff: 96 },
    tips: [
      "Cross to Virupapur Gaddi by coracle before 6 PM — the last boat returns at dusk and stranded tourists are common.",
      "Rent a bicycle from Hampi Bazaar (₹100/day) to cover the Royal Enclosure and Vittala Temple in a morning loop.",
      "Matanga Hill needs a 30-minute boulder scramble — rubber-soled shoes are non-negotiable."
    ],
    mustTry: [
      { name: "Bisi Bele Bath", description: "Karnataka's signature one-pot spiced lentil-rice cooked with tamarind and ghee." },
      { name: "Mango Lassi at Mango Tree", description: "Riverside restaurant under a mango canopy serving the thickest Tungabhadra-cooled lassi." }
    ],
    itinerary: [
      { time: "06:30 AM", place: "Virupaksha Temple Morning Rituals", duration: "1.5 Hours", description: "Watch the living temple's morning puja — the temple elephant blesses devotees at the gopuram by 7 AM.", personalities: ["Spiritual", "History Lover", "Introvert", "Old"] },
      { time: "08:30 AM", place: "Vittala Temple and Stone Chariot", duration: "2.5 Hours", description: "Explore the musical pillars and iconic stone chariot courtyard before the 11 AM heat is unbearable.", personalities: ["History Lover", "Adventure Lover", "Extrovert", "Young"] },
      { time: "12:00 PM", place: "Mango Tree Restaurant Lunch", duration: "1.5 Hours", description: "Riverside lunch under canopy shade; order Bisi Bele Bath and mango lassi to recharge.", personalities: ["Introvert", "Extrovert", "Young", "Adventure Lover"] },
      { time: "04:30 PM", place: "Matanga Hill Sunset", duration: "2 Hours", description: "Boulder-scramble to Hampi's highest viewpoint for a 360-degree panorama at golden hour.", personalities: ["Adventure Lover", "History Lover", "Extrovert", "Young", "Introvert"] }
    ]
  },

  haridwar: {
    id: "haridwar", name: "Haridwar", tagline: "Ganga aarti at the gateway of the gods",
    verdict: "Essential for Spiritual Seekers and First-Timers", rating: 8.1, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Culture", "Wellness"],
    reach: [
      { type: "Flight", detail: "Nearest airport Dehradun (Jolly Grant)", hub: "DEL to DED then 50m drive", cost: "₹3,500+" },
      { type: "Train", detail: "Shatabdi Express from Delhi", time: "4h 45m", hub: "Haridwar Junction", cost: "₹550+" },
      { type: "Road", detail: "NH-334 via Roorkee", time: "5h Drive", hub: "from Delhi NCR", cost: "Tolls ₹320" },
      { type: "Bus", detail: "UTC AC Volvo", time: "6h", hub: "ISBT Kashmere Gate Delhi", cost: "₹450-750" }
    ],
    budget: { backpacker: "₹1,400/day", recommended: "₹3,200/day", luxury: "₹9,500+/day" },
    pros: ["Deeply Immersive Aarti Experience", "Excellent Connectivity", "Affordable Ashram Stays"],
    cons: ["Overcrowded During Festivals", "Limited Non-Veg Food Options", "Persistent Donation Solicitors"],
    matrix: { money: 25, time: 70, fatigue: 55, payoff: 88 },
    tips: [
      "Attend the Ganga Aarti at Har Ki Pauri exactly at sunset — arrive 45 minutes early for riverside seating.",
      "Hire a registered guide from the UP Tourism kiosk near the clock tower to avoid touts.",
      "Keep a separate small bag for the ghats; phones and wallets attract pickpockets during the aarti."
    ],
    mustTry: [
      { name: "Aloo Puri", description: "Fluffy deep-fried bread with spiced potato curry, the quintessential Haridwar breakfast." },
      { name: "Chhena Jalebi", description: "Crispy cottage-cheese spirals soaked in sugar syrup, a Haridwar mithai staple." }
    ],
    itinerary: [
      { time: "05:30 AM", place: "Har Ki Pauri Morning Dip", duration: "1.5 Hours", description: "Join pilgrims for the sacred morning bath at the holiest ghat; the mist and chants are otherworldly.", personalities: ["Spiritual", "Introvert"] },
      { time: "09:00 AM", place: "Mansa Devi Temple via Ropeway", duration: "2 Hours", description: "Ascend Bilwa Parvat by cable car for panoramic valley views and hilltop blessings.", personalities: ["Spiritual", "Introvert", "Adventure Lover"] },
      { time: "12:30 PM", place: "Lunch at Mohan Ji Puri Wale", duration: "1 Hour", description: "Century-old dhaba near Brahmakund serving bottomless puri-sabzi for under ₹80 — cash only.", personalities: ["Introvert", "Spiritual"] },
      { time: "06:00 PM", place: "Ganga Aarti at Har Ki Pauri", duration: "1.5 Hours", description: "Hundreds of oil lamps float on the Ganga while priests swing fire urns in synchronised ritual.", personalities: ["Spiritual", "Introvert", "Extrovert", "Young", "Old"] }
    ]
  },

  hyderabad: {
    id: "hyderabad", name: "Hyderabad", tagline: "Biryani, pearls and the Charminar",
    verdict: "Highly Recommended for History and Food Lovers", rating: 8.7, heroImage: IMG.metro,
    moods: ["Heritage", "Food", "Urban", "Culture"],
    reach: [
      { type: "Flight", detail: "Well-connected to all metros", hub: "Rajiv Gandhi Intl (HYD)", cost: "₹2,800+" },
      { type: "Train", detail: "Telangana Express from Delhi", time: "22–26h", hub: "Secunderabad / Hyderabad Deccan", cost: "₹1,100+" },
      { type: "Road", detail: "NH-44 from Bengaluru", time: "10h Drive", hub: "from Bengaluru", cost: "Tolls ₹580" },
      { type: "Bus", detail: "TSRTC Garuda AC Sleeper", time: "11h from Bengaluru", hub: "Majestic Bus Terminal", cost: "₹700-1,200" }
    ],
    budget: { backpacker: "₹1,800/day", recommended: "₹4,500/day", luxury: "₹14,000+/day" },
    pros: ["Unmatched Biryani Food Scene", "World-Class Tech Hub Infrastructure", "Rich Nizami Heritage"],
    cons: ["Severe Traffic Congestion", "Chaotic Old City Navigation", "Extremely Hot Summers"],
    matrix: { money: 45, time: 65, fatigue: 70, payoff: 92 },
    tips: [
      "Visit Golconda Fort on Sunday mornings before 9 AM to beat the crowds and midday heat.",
      "Buy pearls only from HPDA-certified shops — ask for the certificate before paying.",
      "Book Dum Biryani at Paradise or Bawarchi for dinner, not lunch; quality peaks in the evening service."
    ],
    mustTry: [
      { name: "Hyderabadi Dum Biryani", description: "Slow-cooked basmati layered with spiced meat sealed under dough — the definitive version." },
      { name: "Irani Chai with Osmania Biscuit", description: "Milky sweetened tea paired with crumbly buttery biscuits at any old-city Irani café." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Charminar and Laad Bazaar", duration: "2 Hours", description: "Climb the 56-metre minaret before the bazaar opens, then browse the pearl and bangle lanes.", personalities: ["History Lover", "Extrovert", "Young"] },
      { time: "10:30 AM", place: "Golconda Fort", duration: "2.5 Hours", description: "Explore the acoustically engineered Fateh Darwaza and the Baradari where Nizams held court.", personalities: ["History Lover", "Extrovert", "Adventure Lover", "Old"] },
      { time: "01:30 PM", place: "Lunch at Paradise Secunderabad", duration: "1.5 Hours", description: "The original 1953 outlet — order single-plate Mutton Dum Biryani with mirchi ka salan.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "04:00 PM", place: "Ramoji Film City Western Zone", duration: "3 Hours", description: "Asia's largest film studio with live stunt shows, set replicas, and sunset garden views.", personalities: ["Extrovert", "Young", "Adventure Lover"] }
    ]
  },

  indore: {
    id: "indore", name: "Indore", tagline: "Heritage and street food capital",
    verdict: "A Must-Visit for Food Obsessives", rating: 8.2, heroImage: IMG.metro,
    moods: ["Food", "Heritage", "Urban"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi, Mumbai, Bengaluru", hub: "Devi Ahilya Bai Holkar Airport (IDR)", cost: "₹3,200+" },
      { type: "Train", detail: "Malwa Express from Delhi", time: "14h", hub: "Indore Junction", cost: "₹650+" },
      { type: "Road", detail: "NH-52 from Bhopal", time: "2h 30m Drive", hub: "from Bhopal", cost: "Tolls ₹120" },
      { type: "Bus", detail: "MP Tourism AC Sleeper", time: "3h from Bhopal", hub: "Bhopal Bus Stand", cost: "₹300-550" }
    ],
    budget: { backpacker: "₹1,500/day", recommended: "₹3,500/day", luxury: "₹10,000+/day" },
    pros: ["India's Cleanest Major City", "Legendary Street Food Density", "Underrated Queue-Free Palaces"],
    cons: ["Thin Tourism Infrastructure Outside Food", "Hot and Dusty Apr–Jun", "Sarafa Opens Only After 11 PM"],
    matrix: { money: 30, time: 75, fatigue: 50, payoff: 82 },
    tips: [
      "Sarafa Bazaar is a jewellery market by day — arrive after 11 PM when food stalls take over.",
      "Hire an auto hourly (~₹100/hr) to cover Rajwada, Lal Bagh and the Chhatris in one loop.",
      "Garadu (spiced yam fries) is seasonal Oct–Feb; Vijay Chaat near Rajwada serves the most authentic."
    ],
    mustTry: [
      { name: "Poha-Jalebi", description: "Flattened rice tempered with mustard and curry leaf with hot jalebis — Indore's defining breakfast." },
      { name: "Shahi Shikanji", description: "Rich cold lemon sherbet with black salt and spices, exclusive to Joshi Dahi Bada House." }
    ],
    itinerary: [
      { time: "09:00 AM", place: "Rajwada Palace and Chhatris", duration: "2 Hours", description: "The seven-storey Holkar palace front with French clock and woodwork; riverside Chhatris nearby.", personalities: ["History Lover", "Extrovert"] },
      { time: "11:30 AM", place: "Lal Bagh Palace", duration: "1.5 Hours", description: "Italian marble interiors, Buckingham Gate replicas, and chandeliered ballrooms of the Holkars.", personalities: ["History Lover", "Extrovert", "Old"] },
      { time: "01:30 PM", place: "Lunch at Chappan Dukan", duration: "1.5 Hours", description: "Fifty-six shops on one lane — Indori namkeen, dahi bada, and bhutte ka kees.", personalities: ["Extrovert", "Young"] },
      { time: "11:00 PM", place: "Sarafa Night Bazaar", duration: "2 Hours", description: "The street becomes a 200-stall open-air food court — malpua, garadu, and dahi bada under the stars.", personalities: ["Extrovert", "Young", "Adventure Lover"] }
    ]
  },

  jhansi: {
    id: "jhansi", name: "Jhansi", tagline: "Rani Laxmi Bai's fort city",
    verdict: "Recommended for History Buffs and Bundelkhand Road Trippers", rating: 7.6, heroImage: IMG.heritage,
    moods: ["Heritage", "Culture"],
    reach: [
      { type: "Flight", detail: "Nearest airport Gwalior, 100 km", hub: "GWL to Jhansi by road 2h", cost: "₹4,000+" },
      { type: "Train", detail: "Bhopal Shatabdi halt", time: "5h from Delhi", hub: "Jhansi Junction (JHS)", cost: "₹600+" },
      { type: "Road", detail: "NH-44 from Agra", time: "2h 45m Drive", hub: "from Agra", cost: "Tolls ₹180" },
      { type: "Bus", detail: "UP Roadways AC", time: "3h 30m from Agra", hub: "Agra ISBT", cost: "₹250-400" }
    ],
    budget: { backpacker: "₹1,200/day", recommended: "₹3,000/day", luxury: "₹9,000+/day" },
    pros: ["Uncrowded Heritage Sites", "Strong Rani Laxmi Bai Narrative", "Excellent Rail Connectivity"],
    cons: ["Very Limited Luxury Stays", "Bare Tourism Infrastructure", "Extreme Summer Heat Above 45°C"],
    matrix: { money: 20, time: 65, fatigue: 45, payoff: 72 },
    tips: [
      "Buy the combined Fort+Museum ticket at the ASI counter — ₹35 for Indians and it saves a separate queue.",
      "The Jhansi Fort sound-and-light show runs Fri–Sat from 7:30 PM; book at the fort gate before 6 PM.",
      "Travel Oct–Mar; April onward temperatures regularly breach 44°C."
    ],
    mustTry: [
      { name: "Tehri", description: "A Bundelkhandi saffron-tinted rice dish cooked with ghee and whole spices." },
      { name: "Mawa Bati", description: "Deep-fried khoya-stuffed pastry balls soaked in syrup, the definitive Jhansi sweet." }
    ],
    itinerary: [
      { time: "08:00 AM", place: "Jhansi Fort (Killa)", duration: "2.5 Hours", description: "Climb the granite ramparts of 1613 for commanding views; the Ganesh temple and Panch Mahal ruins.", personalities: ["History Lover", "Adventure Lover", "Young", "Old"] },
      { time: "11:00 AM", place: "Rani Mahal", duration: "1.5 Hours", description: "The palace where Rani Laxmi Bai resided before the 1857 siege, now a sculpture collection.", personalities: ["History Lover", "Introvert", "Old"] },
      { time: "01:00 PM", place: "Lunch at Civil Lines", duration: "1 Hour", description: "Local favourite for thali meals with Bundelkhandi dal and fresh rotis, near the museum.", personalities: ["History Lover", "Introvert"] },
      { time: "03:00 PM", place: "Government Museum Jhansi", duration: "1.5 Hours", description: "Holds Rani Laxmi Bai's artefacts, rare coins, terracotta figurines, and Chandela sculptures.", personalities: ["History Lover", "Introvert", "Old"] }
    ]
  },

  jodhpur: {
    id: "jodhpur", name: "Jodhpur", tagline: "The Blue City under Mehrangarh",
    verdict: "One of India's Most Photogenic Cities", rating: 9.0, heroImage: IMG.royal,
    moods: ["Heritage", "Culture", "Adventure", "Food"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi, Mumbai", hub: "Jodhpur Airport (JDH)", cost: "₹3,500+" },
      { type: "Train", detail: "Mandore Express from Delhi", time: "11h overnight", hub: "Jodhpur Junction", cost: "₹550+" },
      { type: "Road", detail: "NH-62 from Jaipur", time: "5h Drive", hub: "from Jaipur", cost: "Tolls ₹220" },
      { type: "Bus", detail: "Rajasthan Roadways AC Sleeper", time: "5h 30m from Jaipur", hub: "Jaipur Sindhi Camp", cost: "₹400-700" }
    ],
    budget: { backpacker: "₹1,600/day", recommended: "₹4,500/day", luxury: "₹18,000+/day" },
    pros: ["Mehrangarh is India's Most Impressive Fort", "Compact Walkable Old City", "Heritage Hotels at Many Price Points"],
    cons: ["Prices Spike 40% in Peak Winter", "Pushy Clock Tower Vendors", "Very Hot and Arid May–Sep"],
    matrix: { money: 50, time: 75, fatigue: 65, payoff: 96 },
    tips: [
      "Climb to the Chamunda Mata Temple inside Mehrangarh at 5:30 AM for sunrise over the blue city.",
      "Negotiate firmly at Clock Tower Bazaar — first prices for spices and textiles are routinely 4x fair.",
      "Stay in a haveli hotel inside the old city; the blue-rooftop views at night are the trip highlight."
    ],
    mustTry: [
      { name: "Dal Baati Churma", description: "Sun-baked wheat balls dunked in ghee-laced five-lentil dal with sweet churma." },
      { name: "Mawa Kachori", description: "Deep-fried pastry shells filled with sweetened khoya and dry fruits, invented in Jodhpur." }
    ],
    itinerary: [
      { time: "06:00 AM", place: "Mehrangarh Fort Sunrise Walk", duration: "3 Hours", description: "Ramparts rising 125 m above the city; the Moti Mahal and Phool Mahal rooms are unmissable.", personalities: ["History Lover", "Extrovert", "Adventure Lover", "Young", "Old"] },
      { time: "10:30 AM", place: "Jaswant Thada", duration: "1 Hour", description: "Translucent white marble cenotaph glowing in morning light, with a royal portrait gallery.", personalities: ["History Lover", "Extrovert", "Introvert"] },
      { time: "01:00 PM", place: "Lunch at Gypsy Restaurant", duration: "1.5 Hours", description: "Rooftop dining with fort views; order the thali with ker sangri, gatte ki sabzi and bajra roti.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "04:00 PM", place: "Clock Tower and Sardar Market", duration: "2 Hours", description: "Navigate the concentric spice lanes around the 1910 clock tower at golden hour.", personalities: ["Extrovert", "Young", "History Lover"] }
    ]
  },

  kasol: {
    id: "kasol", name: "Kasol", tagline: "Parvati Valley riverside hub",
    verdict: "Best for Budget Trekkers and Riverside Retreats", rating: 8.0, heroImage: IMG.mountain,
    moods: ["Adventure", "Nature", "Mountains", "Wellness"],
    reach: [
      { type: "Flight", detail: "Nearest airport Bhuntar (Kullu), 31 km", hub: "DEL to KUU then 1h taxi", cost: "₹4,500+" },
      { type: "Train", detail: "Train to Chandigarh then bus", time: "3h train + 9h bus", hub: "Chandigarh Railway Station", cost: "₹800+" },
      { type: "Road", detail: "NH-3 via Mandi and Bhuntar", time: "9h from Chandigarh", hub: "from Chandigarh", cost: "Tolls ₹280" },
      { type: "Bus", detail: "HRTC Volvo to Bhuntar then local", time: "10h + 1.5h", hub: "ISBT Kashmere Gate Delhi", cost: "₹650-1,100" }
    ],
    budget: { backpacker: "₹1,200/day", recommended: "₹3,000/day", luxury: "₹9,500+/day" },
    pros: ["Pristine Parvati River Campsites", "Gateway to Kheerganga Trek", "Cosmopolitan Café Culture at Budget Prices"],
    cons: ["Road Closes in Heavy Snow Dec–Mar", "Poor Connectivity Beyond Kasol Village", "Trail Litter from Rowdy Groups"],
    matrix: { money: 25, time: 60, fatigue: 80, payoff: 85 },
    tips: [
      "Start the Kheerganga trek by 6 AM from Barshaini to reach the hot spring before the afternoon crowd.",
      "Register at the Kasol Forest checkpost before any valley trek — fines for unregistered trekkers are enforced.",
      "Book campsites on the far bank of the Parvati (cross the wooden bridge) for far quieter stays."
    ],
    mustTry: [
      { name: "Israeli Shakshuka", description: "Eggs poached in spiced tomato sauce at Kasol's Israeli cafés — a Himachal institution that works." },
      { name: "Sidu", description: "Steamed wheat bread stuffed with poppy-seed and walnut paste, near Manikaran Sahib." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Parvati River Trail to Chalal", duration: "2 Hours", description: "A flat forest walk along the turquoise Parvati to the quiet hamlet of Chalal.", personalities: ["Adventure Lover", "Young"] },
      { time: "10:00 AM", place: "Manikaran Sahib Gurudwara", duration: "2 Hours", description: "Sacred Sikh shrine with geothermal hot springs where langar is cooked in boiling geyser water.", personalities: ["Spiritual", "Adventure Lover", "Old"] },
      { time: "01:00 PM", place: "Lunch at Moon Dance Café", duration: "1 Hour", description: "Riverside deck dining with wraps and fresh-ground coffee — reliably open year-round.", personalities: ["Adventure Lover", "Young"] },
      { time: "03:00 PM", place: "Barshaini to Kheerganga Trek", duration: "4 Hours", description: "9 km ascent through forest and ridgelines to a 2,960 m meadow with a sulphur hot-spring pool.", personalities: ["Adventure Lover", "Young", "Introvert"] }
    ]
  },

  kolkata: {
    id: "kolkata", name: "Kolkata", tagline: "Trams, Tagore and singing rasgulla",
    verdict: "Unmissable — India's Most Culturally Layered City", rating: 8.9, heroImage: IMG.metro,
    moods: ["Culture", "Heritage", "Food", "Urban"],
    reach: [
      { type: "Flight", detail: "Well-connected to all metros", hub: "Netaji Subhas Chandra Bose Intl (CCU)", cost: "₹3,000+" },
      { type: "Train", detail: "Rajdhani Express from Delhi", time: "17h overnight", hub: "Howrah / Sealdah Station", cost: "₹1,000+" },
      { type: "Road", detail: "NH-19 via Dhanbad", time: "20h+ Drive", hub: "from Delhi NCR", cost: "Tolls ₹980" },
      { type: "Bus", detail: "AC Sleeper from Bhubaneswar", time: "7h", hub: "Baramunda Bus Terminal", cost: "₹600-950" }
    ],
    budget: { backpacker: "₹1,600/day", recommended: "₹4,000/day", luxury: "₹13,000+/day" },
    pros: ["Unparalleled Colonial and Bengali Heritage", "World-Class Museums at Nominal Fees", "Unmatched Eastern Street Food"],
    cons: ["Monsoon Waterlogging Jul–Aug", "Ageing Heritage Infrastructure", "Demanding Summer Humidity"],
    matrix: { money: 35, time: 60, fatigue: 65, payoff: 93 },
    tips: [
      "Victoria Memorial's interior galleries need a separate ₹20 ticket bought at the side counter.",
      "Take the East-West Metro from Howrah Maidan to Esplanade to cross the river in 6 minutes.",
      "Nahoum's Bakery in New Market sells out daily — arrive before 1 PM for the rum-fruit cake."
    ],
    mustTry: [
      { name: "Kosha Mangsho with Luchi", description: "Slow-cooked Bengali mutton in a dark reduced onion-spice gravy with puffed white bread." },
      { name: "Mishti Doi", description: "Earthen-pot-set sweetened yoghurt with a caramel depth — the definitive end to any Kolkata meal." }
    ],
    itinerary: [
      { time: "08:00 AM", place: "Victoria Memorial and Gardens", duration: "2.5 Hours", description: "The Carrara marble monument houses 28 galleries of Mughal manuscripts and Company paintings.", personalities: ["History Lover", "Old", "Young"] },
      { time: "11:00 AM", place: "Howrah Bridge & Mullik Ghat Flower Market", duration: "1.5 Hours", description: "Walk the 705-metre cantilever span then descend to the oldest flower market in Asia.", personalities: ["History Lover", "Extrovert", "Young"] },
      { time: "01:00 PM", place: "Lunch at Bhojohori Manna", duration: "1.5 Hours", description: "Bengali home-style thali — mustard-steamed fish, shukto starter, dal, and rice.", personalities: ["History Lover", "Old", "Introvert"] },
      { time: "04:00 PM", place: "Dakshineswar Kali Temple & Belur Math", duration: "2.5 Hours", description: "Ramakrishna's riverside temple and Vivekananda's Math across the Hooghly, joined by a ferry.", personalities: ["Spiritual", "History Lover", "Old", "Introvert"] }
    ]
  },

  lucknow: {
    id: "lucknow", name: "Lucknow", tagline: "Nawabi grace and Awadhi kebabs",
    verdict: "Highly Recommended for Culture Seekers", rating: 8.1, heroImage: IMG.heritage,
    moods: ["Heritage", "Food", "Culture", "Urban"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi/Mumbai", hub: "Chaudhary Charan Singh Intl (LKO)", cost: "₹2,800+" },
      { type: "Train", detail: "Lucknow Mail / Shatabdi", time: "6h from Delhi", hub: "Lucknow Charbagh", cost: "₹450+" },
      { type: "Road", detail: "NH27 via Agra", time: "7h Drive", hub: "from Delhi", cost: "Tolls ₹520" },
      { type: "Bus", detail: "Volvo AC Sleeper", time: "8h", hub: "ISBT Anand Vihar Delhi", cost: "₹600-900" }
    ],
    budget: { backpacker: "₹1,600/day", recommended: "₹3,800/day", luxury: "₹10,000+/day" },
    pros: ["World-Class Awadhi Cuisine", "Uncrowded Heritage Monuments", "Warm Nawabi Hospitality"],
    cons: ["Chaotic Old City Traffic", "Limited Late-Night Options", "Summer Humidity"],
    matrix: { money: 35, time: 70, fatigue: 55, payoff: 82 },
    tips: [
      "Visit Bara Imambara early morning to explore the labyrinth before guided groups arrive at 9 AM.",
      "Order Tunday Kababi's galouti kebabs at the original Aminabad branch, not the newer outlets.",
      "Hire a cycle-rickshaw for old city lanes — autos cannot navigate the galis near Rumi Darwaza."
    ],
    mustTry: [
      { name: "Galouti Kebab", description: "Melt-in-the-mouth minced meat patty with 150 spices, a Nawabi legacy." },
      { name: "Sheermal", description: "Saffron-laced flatbread baked in tandoor, best paired with nihari." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Bara Imambara & Bhul-Bhulaiya", duration: "2.5 Hours", description: "Explore the self-supporting vaulted hall and the rooftop labyrinth before crowds arrive.", personalities: ["History Lover", "Introvert", "Adventure Lover"] },
      { time: "10:30 AM", place: "Rumi Darwaza & Chota Imambara", duration: "2 Hours", description: "Walk through the 18-metre Ottoman-inspired gateway and the chandelier-lit Chota Imambara.", personalities: ["History Lover", "Extrovert", "Young"] },
      { time: "01:00 PM", place: "Lunch at Idris Biryani", duration: "1.5 Hours", description: "Authentic Awadhi dum biryani and galouti kebabs in the heart of the old city.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "03:30 PM", place: "Hazratganj Market Evening", duration: "2 Hours", description: "Stroll the colonial-era promenade for local sweets, kulfi and Chikan embroidery.", personalities: ["Extrovert", "Old", "Introvert"] }
    ]
  },

  manali: {
    id: "manali", name: "Manali", tagline: "Snow-capped Pir Panjal playground",
    verdict: "Essential for Mountain and Adventure Lovers", rating: 8.9, heroImage: IMG.mountain,
    moods: ["Mountains", "Adventure", "Nature", "Spiritual"],
    reach: [
      { type: "Flight", detail: "45m from Delhi to Kullu", hub: "Bhuntar Airport (KUU)", cost: "₹3,500+" },
      { type: "Train", detail: "Train to Chandigarh then cab", time: "9h total", hub: "Chandigarh Railway Station", cost: "₹800+" },
      { type: "Road", detail: "NH3 via Chandigarh-Mandi", time: "13h Drive", hub: "from Delhi", cost: "Tolls ₹300" },
      { type: "Bus", detail: "HRTC Volvo AC Overnight", time: "14h", hub: "ISBT Kashmere Gate Delhi", cost: "₹700-1,200" }
    ],
    budget: { backpacker: "₹1,400/day", recommended: "₹3,500/day", luxury: "₹11,000+/day" },
    pros: ["Spectacular Snow-Capped Scenery", "Vibrant Adventure Sports Hub", "Cool Climate Even in Summer"],
    cons: ["Rohtang Permit Needed Weeks Ahead", "Jul–Aug Traffic Gridlock", "Altitude Sickness Risk Above 3,000 m"],
    matrix: { money: 45, time: 60, fatigue: 80, payoff: 93 },
    tips: [
      "Book Rohtang Pass permits online via the HP portal 2 days ahead; only 1,200 petrol vehicles allowed daily.",
      "Acclimatise one full day in Manali town before ascending to Solang Valley.",
      "Carry windproof layers even in June — temperatures drop to 5°C after sunset at Solang."
    ],
    mustTry: [
      { name: "Siddu", description: "Steamed wheat bread stuffed with poppy seeds and walnut paste, a Kullu-Manali staple." },
      { name: "Trout Amritsari", description: "Locally caught Beas river trout fried crisp with ajwain batter." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Solang Valley Snow Activities", duration: "3 Hours", description: "Zorbing, snow scooters and paragliding with panoramic Pir Panjal views at their photogenic best.", personalities: ["Adventure Lover", "Extrovert", "Young"] },
      { time: "11:00 AM", place: "Rohtang Pass (with permit)", duration: "2.5 Hours", description: "Drive to 3,978 m for glacial snowfields and views into the Lahaul Valley.", personalities: ["Adventure Lover", "Young", "Extrovert"] },
      { time: "02:00 PM", place: "Hidimba Devi Temple & Dhungri Forest", duration: "1.5 Hours", description: "Ancient wooden pagoda temple in a cedar forest; serene and architecturally distinctive.", personalities: ["Spiritual", "Introvert", "History Lover"] },
      { time: "04:30 PM", place: "Old Manali Café Lanes & Mall Road", duration: "2 Hours", description: "Wind down at a riverside café with apple cider, then shop for Kullu shawls and honey.", personalities: ["Introvert", "Old", "Extrovert"] }
    ]
  },

  mathura: {
    id: "mathura", name: "Mathura", tagline: "Krishna's birthplace by the Yamuna",
    verdict: "A Must-Visit on Every Spiritual Itinerary", rating: 7.8, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Heritage", "Culture"],
    reach: [
      { type: "Flight", detail: "Nearest airport Agra, 60 km", hub: "AGR then cab/bus", cost: "₹2,500+ + ₹800" },
      { type: "Train", detail: "Mathura Junction on Delhi–Mumbai trunk", time: "2h from Delhi", hub: "Mathura Junction", cost: "₹200+" },
      { type: "Road", detail: "NH19 (Yamuna Expressway)", time: "2h 30m Drive", hub: "from Delhi", cost: "Tolls ₹285" },
      { type: "Bus", detail: "UPSRTC AC Express", time: "3h", hub: "ISBT Anand Vihar Delhi", cost: "₹300-500" }
    ],
    budget: { backpacker: "₹1,200/day", recommended: "₹3,000/day", luxury: "₹9,000+/day" },
    pros: ["Profoundly Authentic Spiritual Atmosphere", "Affordable and Compact", "Easy Day-Trip from Delhi"],
    cons: ["Extreme Crowds on Holi and Janmashtami", "Limited Luxury Stays", "Tight Lanes Hard to Drive"],
    matrix: { money: 25, time: 85, fatigue: 60, payoff: 78 },
    tips: [
      "Attend the evening aarti at Vishram Ghat by 6:30 PM — arrive 30 minutes early for a front-row step.",
      "Book hotels 3–4 months ahead if visiting during Holi or Janmashtami.",
      "Remove leather items before entering Krishna Janmabhoomi; security checks are thorough."
    ],
    mustTry: [
      { name: "Mathura Peda", description: "Dense milk-solid sweet with a caramelised crust — the city's iconic offering to Krishna." },
      { name: "Dubki Wale Aloo", description: "Spiced potato curry in thin tangy gravy, served with puri at old-city stalls." }
    ],
    itinerary: [
      { time: "06:00 AM", place: "Vishram Ghat Morning Aarti", duration: "1.5 Hours", description: "Watch priests perform the sunrise ritual on the Yamuna bank as lamps float on the river.", personalities: ["Spiritual", "Introvert", "Old"] },
      { time: "08:30 AM", place: "Krishna Janmabhoomi Temple Complex", duration: "2 Hours", description: "Visit the sacred prison cell believed to be Krishna's birthplace and the adjoining mosque.", personalities: ["Spiritual", "History Lover", "Old"] },
      { time: "11:00 AM", place: "Dwarkadhish Temple", duration: "1.5 Hours", description: "Intricate 19th-century haveli-style temple with vibrant festivals and melodious kirtans.", personalities: ["Spiritual", "Extrovert", "History Lover"] },
      { time: "01:00 PM", place: "Lunch & Peda Shopping near Holi Gate", duration: "1.5 Hours", description: "Savour dubki wale aloo with puri at century-old dhabas, then pick up hand-rolled peda.", personalities: ["Extrovert", "Old", "Introvert"] }
    ]
  },

  "mcleod-ganj": {
    id: "mcleod-ganj", name: "McLeod Ganj", tagline: "The Dalai Lama's mountain home",
    verdict: "Unmissable for Solo Travellers Seeking Stillness", rating: 8.6, heroImage: IMG.mountain,
    moods: ["Spiritual", "Mountains", "Nature", "Wellness"],
    reach: [
      { type: "Flight", detail: "Nearest airport Gaggal (Kangra), 18 km", hub: "DHM then cab", cost: "₹4,000+ + ₹500" },
      { type: "Train", detail: "Train to Pathankot then bus/cab", time: "10h total", hub: "Pathankot Cantt", cost: "₹600+" },
      { type: "Road", detail: "NH503 via Pathankot-Dharamshala", time: "10h Drive", hub: "from Delhi", cost: "Tolls ₹200" },
      { type: "Bus", detail: "HRTC Volvo Overnight", time: "12h", hub: "ISBT Kashmere Gate Delhi", cost: "₹650-1,000" }
    ],
    budget: { backpacker: "₹1,300/day", recommended: "₹3,200/day", luxury: "₹9,500+/day" },
    pros: ["Peaceful Tibetan Buddhist Atmosphere", "Stunning Dhauladhar Backdrop", "Rich Tibetan Art and Cuisine"],
    cons: ["Narrow Landslide-Prone Roads in Monsoon", "Limited Peak-Season Parking", "Unreliable Internet"],
    matrix: { money: 38, time: 55, fatigue: 65, payoff: 88 },
    tips: [
      "Attend the public teaching sessions at the Tsuglagkhang Complex — check the TIPA calendar before travelling.",
      "Trek to Triund (9 km, 3h) only after acclimatising a day; carry a daypack with rain gear.",
      "Exchange currency at authorised Tibetan shops near the main square; rates beat the ATMs."
    ],
    mustTry: [
      { name: "Thukpa", description: "Hearty Tibetan noodle broth with vegetables or chicken, perfect after a cold morning." },
      { name: "Butter Tea (Po Cha)", description: "Salted yak-butter tea — an acquired taste and a cultural ritual at every Tibetan guesthouse." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Tsuglagkhang Temple & Tibet Museum", duration: "2 Hours", description: "Spin prayer wheels, watch monks debate, and learn Tibet's history through powerful exhibits.", personalities: ["Spiritual", "Introvert", "History Lover"] },
      { time: "09:30 AM", place: "Namgyal Monastery Kora Walk", duration: "1.5 Hours", description: "Circle the monastery on the kora path with resident monks; Dhauladhar views open at every bend.", personalities: ["Spiritual", "Introvert", "Old"] },
      { time: "11:30 AM", place: "Bhagsunag Waterfall & Shiva Temple", duration: "2 Hours", description: "Easy 20-minute walk through pine forest to a 20-metre waterfall; swim in the plunge pool in summer.", personalities: ["Adventure Lover", "Young", "Extrovert"] },
      { time: "02:00 PM", place: "Lunch & Tibetan Market Stroll", duration: "2 Hours", description: "Eat thukpa at Snow Lion Café, then browse thangkas and singing bowls on Jogiwara Road.", personalities: ["Introvert", "Old", "Extrovert"] }
    ]
  },

  "mount-abu": {
    id: "mount-abu", name: "Mount Abu", tagline: "Rajasthan's only hill station",
    verdict: "A Refreshing Rajasthan Escape Worth the Drive", rating: 7.6, heroImage: IMG.lake,
    moods: ["Nature", "Heritage", "Adventure", "Spiritual"],
    reach: [
      { type: "Flight", detail: "Nearest airport Udaipur, 163 km", hub: "UDR then cab", cost: "₹3,000+ + ₹1,800" },
      { type: "Train", detail: "Train to Abu Road then bus/jeep", time: "6h from Ahmedabad", hub: "Abu Road Station", cost: "₹350+" },
      { type: "Road", detail: "NH27 via Palanpur", time: "5h Drive", hub: "from Ahmedabad", cost: "Tolls ₹180" },
      { type: "Bus", detail: "RSRTC Deluxe", time: "9h from Jaipur", hub: "Main Bus Stand Mount Abu", cost: "₹500-850" }
    ],
    budget: { backpacker: "₹1,500/day", recommended: "₹3,600/day", luxury: "₹10,500+/day" },
    pros: ["Only Cool Hill Retreat in Rajasthan", "Dilwara Temples are Architectural Masterpieces", "Tranquil Nakki Lake Boating"],
    cons: ["Crowded and Overpriced in Summer Holidays", "Restricted Lake-Area Wildlife", "Limited Cuisine Variety"],
    matrix: { money: 42, time: 65, fatigue: 50, payoff: 74 },
    tips: [
      "Photography is strictly prohibited inside Dilwara Temples — store your phone before the security check.",
      "Reach Sunset Point by 5:30 PM and claim a spot on the upper ridge.",
      "Horse rides around Nakki Lake are inflated — negotiate firmly or walk the 1.5 km circuit on foot."
    ],
    mustTry: [
      { name: "Dal Baati Churma", description: "Baked wheat balls in ghee with lentil curry and sweet crumbled churma." },
      { name: "Mawa Kachori", description: "Deep-fried pastry filled with sweetened mawa and nuts, a Mount Abu bazaar speciality." }
    ],
    itinerary: [
      { time: "08:00 AM", place: "Dilwara Jain Temples", duration: "2.5 Hours", description: "Marvel at 11th–13th century marble carvings of unmatched intricacy at Vimal Vasahi and Luna Vasahi.", personalities: ["History Lover", "Spiritual", "Introvert", "Old"] },
      { time: "11:00 AM", place: "Nakki Lake Boating", duration: "1.5 Hours", description: "Paddle-boat across the crater lake surrounded by hills; Toad Rock is a natural perch.", personalities: ["Adventure Lover", "Extrovert", "Young"] },
      { time: "01:00 PM", place: "Lunch at Arbuda Dining Hall", duration: "1.5 Hours", description: "Traditional Rajasthani thali with unlimited dal baati churma and ker sangri.", personalities: ["Extrovert", "Old", "Introvert"] },
      { time: "04:30 PM", place: "Sunset Point & Guru Shikhar", duration: "2 Hours", description: "Watch the Aravalli range blush at sunset, then visit Guru Shikhar — the highest point in Rajasthan.", personalities: ["Adventure Lover", "Young", "Extrovert"] }
    ]
  },

  mumbai: {
    id: "mumbai", name: "Mumbai", tagline: "Gateway, Bollywood and Marine Drive",
    verdict: "India's Most Electrifying Urban Experience", rating: 9.0, heroImage: IMG.metro,
    moods: ["Urban", "Food", "Culture", "Heritage"],
    reach: [
      { type: "Flight", detail: "Direct from all major cities", hub: "Chhatrapati Shivaji Maharaj Intl (BOM)", cost: "₹3,500+" },
      { type: "Train", detail: "Rajdhani / Duronto from Delhi", time: "16h from Delhi", hub: "Chhatrapati Shivaji Terminus", cost: "₹900+" },
      { type: "Road", detail: "NH48 via Pune", time: "3h 30m Drive", hub: "from Pune", cost: "Tolls ₹320" },
      { type: "Bus", detail: "Neeta Volvo", time: "4h from Pune", hub: "Mumbai Central Bus Depot", cost: "₹350-700" }
    ],
    budget: { backpacker: "₹2,500/day", recommended: "₹6,500/day", luxury: "₹22,000+/day" },
    pros: ["Unmatched Energy and Diversity", "Street-Stall to Fine-Dining Range", "Seamless Local Train Network"],
    cons: ["Expensive Even at Budget Tier", "Brutal Traffic — Plan 2–3x Time", "Monsoon Flooding Jun–Sep"],
    matrix: { money: 65, time: 55, fatigue: 85, payoff: 95 },
    tips: [
      "Buy a one-day tourist Metro + local train combo at CST — it cuts commute costs by 60% versus cabs.",
      "Book Elephanta Caves ferry online; the last boat back leaves at 5:30 PM — miss it and you are stranded.",
      "Eat vada pav at Anand Stall (Vile Parle) or Aaram (Dadar) — avoid tourist stalls near the Gateway."
    ],
    mustTry: [
      { name: "Vada Pav", description: "Spiced potato fritter in a bread bun with chutneys — Mumbai's unofficial city symbol." },
      { name: "Bombay Duck Fry", description: "Battered and fried Bombil fish, crispy and briny, exclusive to the Maharashtra coast." }
    ],
    itinerary: [
      { time: "08:00 AM", place: "Gateway of India & Elephanta Caves", duration: "4 Hours", description: "Take the 1-hour ferry to Elephanta Island and explore 6th-century rock-cut Shiva caves.", personalities: ["History Lover", "Extrovert", "Adventure Lover", "Young"] },
      { time: "01:00 PM", place: "Lunch at Café Mondegar / Bademiya", duration: "1.5 Hours", description: "Iconic Colaba institutions: retro jukebox at Mondegar or legendary seekh kebabs at Bademiya.", personalities: ["Extrovert", "Young", "Old"] },
      { time: "03:00 PM", place: "CSMVS City Museum", duration: "2 Hours", description: "The dome-topped museum houses 50,000 artefacts spanning Indus Valley to colonial Bombay.", personalities: ["History Lover", "Introvert", "Old"] },
      { time: "06:00 PM", place: "Marine Drive Evening Stroll", duration: "2 Hours", description: "Walk the Queen's Necklace promenade as the city lights up; finish with pav bhaji at Juhu.", personalities: ["Extrovert", "Young", "Introvert"] }
    ]
  },

  munnar: {
    id: "munnar", name: "Munnar", tagline: "Tea hills and shola forests",
    verdict: "India's Most Scenic Hill Station for Couples", rating: 8.7, heroImage: IMG.mountain,
    moods: ["Nature", "Mountains", "Adventure", "Wellness"],
    reach: [
      { type: "Flight", detail: "Nearest airport Cochin, 110 km", hub: "COK then cab", cost: "₹3,500+ + ₹1,500" },
      { type: "Train", detail: "Train to Ernakulam then bus/cab", time: "5h total from Kochi", hub: "Ernakulam Junction", cost: "₹500+" },
      { type: "Road", detail: "NH85 via Kothamangalam", time: "3h 30m Drive", hub: "from Kochi", cost: "Tolls ₹60" },
      { type: "Bus", detail: "KSRTC Deluxe", time: "4h from Ernakulam", hub: "Munnar KSRTC Bus Stand", cost: "₹250-500" }
    ],
    budget: { backpacker: "₹1,800/day", recommended: "₹4,500/day", luxury: "₹14,000+/day" },
    pros: ["Unmatched Rolling Tea-Garden Drama", "Cool Year-Round Climate", "Endangered Nilgiri Tahr Habitat"],
    cons: ["Steep Potholed Roads", "Monsoon Trail Leeches", "Commercialised Waterfall Spots"],
    matrix: { money: 48, time: 60, fatigue: 65, payoff: 91 },
    tips: [
      "Eravikulam closes Feb–Apr for the Nilgiri Tahr calving season — verify on the KFDC website before booking.",
      "Drive the Top Station road at dawn for mist-covered tea-garden views before tourist buses begin at 9 AM.",
      "Carry rain gear even in December; Munnar gets orographic rainfall with little warning."
    ],
    mustTry: [
      { name: "Kerala Porotta with Beef Curry", description: "Flaky layered flatbread with slow-cooked coconut-spiked beef — the signature highway meal." },
      { name: "Munnar Tea Tasting Flight", description: "A guided flight of orthodox, CTC and white teas at the KDHP Tea Museum." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Eravikulam National Park", duration: "2.5 Hours", description: "Trek the Rajamala range at dawn for near-certain sightings of habituated Nilgiri Tahr.", personalities: ["Adventure Lover", "Introvert", "Young"] },
      { time: "10:30 AM", place: "Mattupetty Dam & Echo Point", duration: "2 Hours", description: "Speed-boat on the reservoir with shola forest framing the shoreline; dramatic in morning mist.", personalities: ["Adventure Lover", "Extrovert", "Young"] },
      { time: "01:00 PM", place: "Lunch at KDHP Tea Museum Café", duration: "1.5 Hours", description: "Tour the working tea factory, then lunch on rice and fish curry with estate-fresh tea.", personalities: ["Introvert", "Old", "Extrovert"] },
      { time: "03:30 PM", place: "Top Station Tea Garden Drive & Sunset", duration: "2.5 Hours", description: "Switchback drive to 1,880 m for panoramic Western Ghats views into Tamil Nadu at dusk.", personalities: ["Adventure Lover", "Introvert", "Old"] }
    ]
  },

  mussoorie: {
    id: "mussoorie", name: "Mussoorie", tagline: "Queen of the Hills above Doon",
    verdict: "Perfect Escape for a Weekend Recharge", rating: 8.1, heroImage: IMG.mountain,
    moods: ["Nature", "Wellness", "Adventure"],
    reach: [
      { type: "Flight", detail: "Fly to Dehradun (DED)", time: "45m from city", hub: "Jolly Grant Airport", cost: "₹3,500+" },
      { type: "Train", detail: "Shatabdi / Jan Shatabdi", time: "6h from Delhi", hub: "Dehradun Railway Station", cost: "₹600+" },
      { type: "Road", detail: "NH7 via Meerut", time: "6h Drive", hub: "from Delhi", cost: "Tolls ₹380" },
      { type: "Bus", detail: "Uttarakhand Roadways", time: "7h", hub: "ISBT Kashmere Gate Delhi", cost: "₹450-750" }
    ],
    budget: { backpacker: "₹1,600/day", recommended: "₹4,000/day", luxury: "₹12,000+/day" },
    pros: ["Breathtaking Himalayan Views", "Pleasant Year-Round Climate", "Well-Connected to Dehradun"],
    cons: ["Peak Season Overcrowding", "Mall Road Traffic Gridlock", "Steep Tourist-Zone Pricing"],
    matrix: { money: 45, time: 70, fatigue: 50, payoff: 85 },
    tips: [
      "Book Mall Road hotels at least 2 weeks ahead during May and October peak seasons.",
      "Hire a shared jeep from Dehradun to Picture Palace instead of a cab to save up to 60%.",
      "Visit Kempty Falls before 8:30 AM to beat the day-trip crowd from Dehradun."
    ],
    mustTry: [
      { name: "Bal Mithai", description: "Kumaoni fudge coated in white sugar balls, a hill-station staple." },
      { name: "Aloo Ke Gutke", description: "Stir-fried Pahadi potatoes with jeera and red chilli, served with butter tea." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Gun Hill Point via Cable Car", duration: "1.5 Hours", description: "Catch panoramic views of Bandarpunch and Srikantha peaks before clouds roll in.", personalities: ["Introvert", "Adventure Lover", "Young"] },
      { time: "10:00 AM", place: "Kempty Falls", duration: "2 Hours", description: "A tiered waterfall 15 km out; arrive early for a natural pool dip before day-trippers.", personalities: ["Adventure Lover", "Young", "Extrovert"] },
      { time: "01:00 PM", place: "Lunch on Mall Road", duration: "1.5 Hours", description: "Garhwali dhabas near Kulri Bazaar for Aloo Ke Gutke and fresh Rhododendron juice.", personalities: ["Introvert", "Old"] },
      { time: "04:00 PM", place: "Camel's Back Road Walk", duration: "2 Hours", description: "A quiet 3 km promenade with a camel-shaped rock; ideal for sunsets over the Doon Valley.", personalities: ["Introvert", "Old", "Spiritual"] }
    ]
  },

  mysuru: {
    id: "mysuru", name: "Mysuru", tagline: "Palaces, silk and Chamundi Hill",
    verdict: "Unmissable South Indian Heritage Gem", rating: 8.7, heroImage: IMG.heritage,
    moods: ["Heritage", "Culture", "Spiritual", "Food"],
    reach: [
      { type: "Flight", detail: "Fly to Bengaluru (BLR)", time: "3h by road", hub: "Kempegowda Intl Airport", cost: "₹3,000+" },
      { type: "Train", detail: "Shatabdi Express", time: "2h from Bengaluru", hub: "Mysuru Junction (MYS)", cost: "₹250+" },
      { type: "Road", detail: "Bengaluru-Mysuru Expressway (NH275)", time: "2h 30m Drive", hub: "from Bengaluru", cost: "Tolls ₹165" },
      { type: "Bus", detail: "KSRTC Airavat Club Class", time: "3h", hub: "Majestic Bus Stand Bengaluru", cost: "₹300-550" }
    ],
    budget: { backpacker: "₹1,500/day", recommended: "₹3,800/day", luxury: "₹11,000+/day" },
    pros: ["Magnificent Illuminated Palace", "Rich Dasara Festival Culture", "Excellent Silk and Sandalwood Shopping"],
    cons: ["Limited Nightlife", "Crowded Palace Grounds on Weekends", "Auto Costs Add Up Across the City"],
    matrix: { money: 35, time: 75, fatigue: 40, payoff: 90 },
    tips: [
      "Palace illumination happens every Sunday and on public holidays 7–8 PM; plan your stay night accordingly.",
      "Buy Mysuru silk only from Karnataka Silk Industries Corporation (KSIC) to avoid imitations.",
      "Climb Chamundi Hill via the 1,000-step stairway rather than driving; the Nandi bull is midway."
    ],
    mustTry: [
      { name: "Mysuru Pak", description: "Dense melt-in-mouth gram-flour and ghee sweet invented in the royal kitchen of Krishnaraja Wadiyar IV." },
      { name: "Thatte Idli", description: "Plate-sized steamed rice cakes served with three chutneys and a fiery regional sambar." }
    ],
    itinerary: [
      { time: "08:00 AM", place: "Chamundi Hill Temple", duration: "2 Hours", description: "Begin at the Chamundeshwari Temple atop the hill for a serene morning aarti before crowds.", personalities: ["Spiritual", "History Lover", "Old"] },
      { time: "11:00 AM", place: "Mysuru Palace", duration: "2.5 Hours", description: "Explore twelve Durbar halls; the Amba Vilas interior with stained glass and ivory is extraordinary.", personalities: ["History Lover", "Extrovert", "Young", "Old"] },
      { time: "02:00 PM", place: "Lunch at Hotel Dasaprakash", duration: "1.5 Hours", description: "A legendary Udupi-style vegetarian thali institution on Gandhi Square — budget-friendly.", personalities: ["History Lover", "Introvert", "Old"] },
      { time: "04:30 PM", place: "Brindavan Gardens", duration: "2 Hours", description: "Terraced Mughal gardens below the KRS Dam; stay for the musical fountain show at dusk.", personalities: ["Introvert", "Young", "Extrovert"] }
    ]
  },

  nainital: {
    id: "nainital", name: "Nainital", tagline: "Lake town in the Kumaon hills",
    verdict: "Serene Hill Escape Worth Every Hour", rating: 8.2, heroImage: IMG.mountain,
    moods: ["Nature", "Wellness", "Spiritual"],
    reach: [
      { type: "Flight", detail: "Fly to Pantnagar (PGH)", time: "1h 40m by road", hub: "Pantnagar Airport", cost: "₹4,000+" },
      { type: "Train", detail: "Kathgodam Express", time: "5h 30m from Delhi", hub: "Kathgodam Railway Station", cost: "₹550+" },
      { type: "Road", detail: "NH109 via Haldwani", time: "6h Drive", hub: "from Delhi", cost: "Tolls ₹320" },
      { type: "Bus", detail: "Uttarakhand Roadways Deluxe", time: "7h", hub: "ISBT Anand Vihar Delhi", cost: "₹400-650" }
    ],
    budget: { backpacker: "₹1,400/day", recommended: "₹3,500/day", luxury: "₹10,000+/day" },
    pros: ["Naini Lake Rowing at Dawn", "Cool Temperatures Even in May", "Compact Mostly-Walkable Town"],
    cons: ["Souvenir-Saturated Mall Road", "Monsoon Landslide Risk", "Vehicle Restriction Zones"],
    matrix: { money: 42, time: 68, fatigue: 45, payoff: 83 },
    tips: [
      "Rent a rowing boat at 6 AM when the lake is mirror-still and queues are absent.",
      "Naina Devi Temple gets dangerously crowded on Saturday; visit weekday mornings.",
      "Carry a windproof layer even in summer — Snow View Point drops to 8°C after noon."
    ],
    mustTry: [
      { name: "Bhatt ki Churkani", description: "Kumaoni black-soybean curry slow-cooked with local spices, served at lakeside home-stays." },
      { name: "Singori", description: "Cone of mawa wrapped in a maalu leaf imparting a subtle herbal aroma, sold near the ghats." }
    ],
    itinerary: [
      { time: "06:30 AM", place: "Naini Lake Rowing", duration: "1.5 Hours", description: "Paddle the emerald lake at dawn; mist over the oak forest creates an almost surreal scene.", personalities: ["Introvert", "Young", "Adventure Lover"] },
      { time: "09:00 AM", place: "Naina Devi Temple", duration: "1 Hour", description: "One of the 51 Shakti Peethas at the lake's northern shore; the morning bells are meditative.", personalities: ["Spiritual", "Old", "Introvert"] },
      { time: "11:00 AM", place: "Snow View Point via Ropeway", duration: "2 Hours", description: "Cable car to 2,270 m with views of Nanda Devi and Trishul on clear winter mornings.", personalities: ["Adventure Lover", "Extrovert", "Young"] },
      { time: "02:00 PM", place: "Lunch and Mall Road Stroll", duration: "2 Hours", description: "Local Kumaoni thali at Sher-Ka-Danda dhabas before browsing hand-knitted woolens.", personalities: ["Introvert", "Old", "Extrovert"] }
    ]
  },

  ooty: {
    id: "ooty", name: "Ooty", tagline: "Nilgiri toy train and eucalyptus trails",
    verdict: "Timeless Nilgiri Retreat for All Ages", rating: 8.0, heroImage: IMG.mountain,
    moods: ["Nature", "Heritage", "Wellness"],
    reach: [
      { type: "Flight", detail: "Fly to Coimbatore (CJB)", time: "2h 30m by road", hub: "Coimbatore Intl Airport", cost: "₹3,200+" },
      { type: "Train", detail: "Nilgiri Mountain Railway (Toy Train)", time: "4h 30m to Ooty", hub: "Mettupalayam Station", cost: "₹50+" },
      { type: "Road", detail: "NH181 via Mettupalayam Ghat", time: "3h Drive", hub: "from Coimbatore", cost: "Tolls ₹90" },
      { type: "Bus", detail: "TNSTC Deluxe Ghat Service", time: "3h 30m", hub: "Coimbatore Central Bus Stand", cost: "₹120-280" }
    ],
    budget: { backpacker: "₹1,300/day", recommended: "₹3,200/day", luxury: "₹9,500+/day" },
    pros: ["UNESCO Heritage Toy Train Ride", "650+ Species Botanical Garden", "Great Base for Doddabetta Trekking"],
    cons: ["Ghat Roads Cause Motion Sickness", "Peak-May Lake Crowds", "Limited Authentic Local Food in the Core"],
    matrix: { money: 38, time: 72, fatigue: 50, payoff: 82 },
    tips: [
      "Book Nilgiri Mountain Railway tickets on IRCTC a month ahead — they sell out within hours.",
      "Visit the Botanical Garden on weekday mornings; school groups swamp it every weekend.",
      "Doddabetta views are best Nov–Feb; monsoon clouds block visibility entirely."
    ],
    mustTry: [
      { name: "Ooty Varkey", description: "Crisp layered biscuit baked with sugar and butter — the town's iconic tea-time snack since 1948." },
      { name: "Nilgiri Tea with Homemade Chocolate", description: "Single-estate Nilgiri brew paired with handcrafted dark chocolate from the co-operative shops." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Nilgiri Mountain Railway", duration: "3 Hours", description: "Ride the UNESCO-listed steam rack railway through 16 tunnels and cloud-level bridges.", personalities: ["Introvert", "History Lover", "Old", "Young"] },
      { time: "11:30 AM", place: "Government Botanical Garden", duration: "2 Hours", description: "Stroll terraced lawns with a 20-million-year-old fossil tree; the Italian garden is a favourite.", personalities: ["Introvert", "Old", "Extrovert"] },
      { time: "02:00 PM", place: "Lunch near Charing Cross", duration: "1.5 Hours", description: "Small Tamil vegetarian restaurants serve hearty rice meals with Nilgiri-sourced vegetables.", personalities: ["Introvert", "Old"] },
      { time: "04:00 PM", place: "Doddabetta Peak", duration: "2 Hours", description: "Drive 10 km to the highest Nilgiri point at 2,637 m; the 270-degree panorama is the payoff.", personalities: ["Adventure Lover", "Young", "Extrovert"] }
    ]
  },

  orchha: {
    id: "orchha", name: "Orchha", tagline: "Bundela temples by the Betwa",
    verdict: "India's Most Underrated Heritage Secret", rating: 8.5, heroImage: IMG.heritage,
    moods: ["Heritage", "Spiritual", "Culture"],
    reach: [
      { type: "Flight", detail: "Fly to Gwalior (GWL)", time: "2h 30m by road", hub: "Gwalior Airport", cost: "₹4,500+" },
      { type: "Train", detail: "Shatabdi / Intercity to Jhansi", time: "4h from Delhi", hub: "Jhansi Railway Station", cost: "₹400+" },
      { type: "Road", detail: "NH44 to Jhansi then SH16", time: "20m Drive (16 km)", hub: "from Jhansi", cost: "₹100 cab" },
      { type: "Bus", detail: "MP Roadways mini-buses", time: "30m", hub: "Jhansi Bus Stand", cost: "₹30-60" }
    ],
    budget: { backpacker: "₹1,200/day", recommended: "₹3,000/day", luxury: "₹9,000+/day" },
    pros: ["Chhatris Mirrored in the Betwa at Sunset", "Almost Zero Commercialization", "Raja Mahal Murals in Near-Perfect Condition"],
    cons: ["Tiny Town — Exhausted in Two Days", "Scarce Transport After 7 PM", "Limited Fine Dining"],
    matrix: { money: 30, time: 85, fatigue: 30, payoff: 88 },
    tips: [
      "Buy the MP Tourism composite ticket (₹250) at the entrance — it covers six monuments.",
      "The Chaturbhuj Temple rooftop offers the best panorama of all the chhatris; climb it before 9 AM.",
      "Stay in a heritage haveli on the Betwa bank; guesthouses upstream are noticeably quieter."
    ],
    mustTry: [
      { name: "Dal Bafla", description: "Bundelkhand's answer to the bati — dense wheat dumplings dunked in ghee with a rich dal." },
      { name: "Mahua Laddoo", description: "Rustic sweetmeat of fermented Mahua flower and jaggery, sold by women vendors near the ghats." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Orchha Fort Complex", duration: "2.5 Hours", description: "Explore the Jahangir Mahal's tiered courtyard and the Sheesh Mahal's mirror-inlay ceilings.", personalities: ["History Lover", "Introvert", "Old"] },
      { time: "10:30 AM", place: "Chaturbhuj Temple", duration: "1.5 Hours", description: "A colossal Vishnu temple whose soaring spire is visible from 10 km away.", personalities: ["Spiritual", "History Lover", "Introvert"] },
      { time: "01:00 PM", place: "Lunch at Betwa riverside dhaba", duration: "1.5 Hours", description: "Sit on a charpoy beside the river and eat a Dal Bafla thali while kites circle the chhatris.", personalities: ["Introvert", "History Lover"] },
      { time: "04:00 PM", place: "Betwa Ghats & Chhatris Sunset Walk", duration: "2 Hours", description: "Walk the riverside path as 14 royal cenotaphs glow amber — one of North India's most photogenic hours.", personalities: ["Introvert", "Spiritual", "Old", "Adventure Lover"] }
    ]
  },

  patna: {
    id: "patna", name: "Patna", tagline: "Mauryan capital on the Ganges",
    verdict: "Essential for the Historically Curious Traveller", rating: 7.6, heroImage: IMG.heritage,
    moods: ["Heritage", "Culture", "Food", "Spiritual"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi, Mumbai, Kolkata", time: "1h 20m from Delhi", hub: "Jay Prakash Narayan Intl (PAT)", cost: "₹3,500+" },
      { type: "Train", detail: "Rajdhani / Shramjeevi Express", time: "8h from Delhi", hub: "Patna Junction (PNBE)", cost: "₹700+" },
      { type: "Road", detail: "NH19 (Grand Trunk Road)", time: "3h 30m from Varanasi", hub: "from Varanasi", cost: "Tolls ₹180" },
      { type: "Bus", detail: "BSRTC AC Coach", time: "4h–5h", hub: "Varanasi Bus Stand", cost: "₹350-600" }
    ],
    budget: { backpacker: "₹1,300/day", recommended: "₹3,200/day", luxury: "₹9,500+/day" },
    pros: ["Rare 360-Degree Ganges Panorama from Golghar", "Didarganj Yakshi at Patna Museum", "Exceptionally Affordable Street Food"],
    cons: ["Below-Average Traffic and Air Quality", "Attractions Spread Far Apart", "Limited Premium Accommodation"],
    matrix: { money: 28, time: 65, fatigue: 60, payoff: 76 },
    tips: [
      "Climb Golghar's 145 spiral steps early morning — a 9 AM sun burnishes the Ganges floodplain.",
      "Patna Museum is closed Mondays; the Yakshi statue and Mauryan relics are the centrepiece.",
      "Book an auto for a full-day circuit (₹600–800) — app cabs surge wildly in the old city."
    ],
    mustTry: [
      { name: "Litti Chokha", description: "Wood-fire-roasted wheat balls stuffed with sattu, served with smoky charred brinjal mash — Bihar's definitive dish." },
      { name: "Khaja", description: "Flaky deep-fried layered pastry sweetened with sugar syrup, sold near Mahavir Mandir for centuries." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Golghar Granary", duration: "1.5 Hours", description: "Climb the double-staircase 1786 granary; views of the 3 km-wide Ganges are best in morning light.", personalities: ["History Lover", "Extrovert", "Young"] },
      { time: "09:30 AM", place: "Patna Museum", duration: "2 Hours", description: "Home to the 3rd-century BC Didarganj Yakshi, Mauryan terracottas and a 16-metre fossil tree.", personalities: ["History Lover", "Old", "Introvert"] },
      { time: "12:30 PM", place: "Old Patna City Street Food Lane", duration: "1.5 Hours", description: "Century-old vendors near Chowk sell Litti Chokha, sattu sherbet and Khaja within 200 metres.", personalities: ["History Lover", "Extrovert", "Old"] },
      { time: "03:00 PM", place: "Mahavir Mandir & Ganges Ghat Walk", duration: "2 Hours", description: "Visit one of North India's busiest Hanuman temples, then walk to Collectorate Ghat for the aarti.", personalities: ["Spiritual", "Old", "Introvert"] }
    ]
  },

  pondicherry: {
    id: "pondicherry", name: "Pondicherry", tagline: "French quarter and Auroville calm",
    verdict: "Rare Pocket of Calm on the Coromandel Coast", rating: 8.6, heroImage: IMG.lake,
    moods: ["Spiritual", "Culture", "Wellness", "Beach"],
    reach: [
      { type: "Flight", detail: "Fly to Chennai (MAA)", time: "2h 30m by road", hub: "Chennai Intl Airport", cost: "₹3,000+" },
      { type: "Train", detail: "Puducherry Express from Chennai", time: "3h 30m", hub: "Pondicherry Railway Station", cost: "₹150+" },
      { type: "Road", detail: "East Coast Road (NH32)", time: "2h 30m Drive", hub: "from Chennai", cost: "Tolls ₹90" },
      { type: "Bus", detail: "TNSTC AC Coach via ECR", time: "3h", hub: "CMBT Chennai Bus Stand", cost: "₹200-380" }
    ],
    budget: { backpacker: "₹1,600/day", recommended: "₹4,500/day", luxury: "₹14,000+/day" },
    pros: ["Car-Free Gorgeous French Quarter Streets", "Uniquely Meditative Auroville", "Fresh Seafood at Fair Prices"],
    cons: ["Promenade Beach Not Swimmable", "Matrimandir Needs Pre-Registration", "Spiked Heritage-Zone Hotel Prices"],
    matrix: { money: 48, time: 78, fatigue: 25, payoff: 89 },
    tips: [
      "Register for Auroville's Matrimandir inner chamber on auroville.org at least a week ahead — no walk-ins.",
      "Cycle the French Quarter before 8 AM when the bougainvillea glow is uninterrupted.",
      "Sri Aurobindo Ashram's Samadhi opens at 8 AM; observe silence and dress conservatively."
    ],
    mustTry: [
      { name: "Pondi-style Bouillabaisse", description: "A local adaptation of the Provençal fish stew with Coromandel reef fish and kokum." },
      { name: "Adai Avial", description: "Thick multi-lentil crepes with a coconut-and-vegetable stew — a Tamil breakfast classic." }
    ],
    itinerary: [
      { time: "06:30 AM", place: "Promenade Beach Sunrise Walk", duration: "1.5 Hours", description: "Walk the 1.5 km promenade from the War Memorial to the lighthouse as fishing boats return.", personalities: ["Introvert", "Spiritual", "Young"] },
      { time: "09:00 AM", place: "Sri Aurobindo Ashram", duration: "1.5 Hours", description: "A rare oasis of silence in White Town; sit by the Samadhi in the flower-filled courtyard.", personalities: ["Spiritual", "Introvert", "Old"] },
      { time: "11:30 AM", place: "French Quarter Cycling Tour", duration: "2 Hours", description: "Weave through ochre-walled colonial streets, stopping at Église de Sacré-Cœur.", personalities: ["Extrovert", "Young", "Adventure Lover"] },
      { time: "02:30 PM", place: "Auroville and Matrimandir Gardens", duration: "3 Hours", description: "The golden Matrimandir sphere amid the Banyan gardens embodies architectural and spiritual ambition.", personalities: ["Spiritual", "Introvert", "Old", "History Lover"] }
    ]
  },

  pune: {
    id: "pune", name: "Pune", tagline: "Maratha heritage and modern campus city",
    verdict: "Highly Recommended for Culture and History Seekers", rating: 8.1, heroImage: IMG.metro,
    moods: ["Heritage", "Culture", "Urban", "Food"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi/Mumbai/Bangalore", hub: "Pune Airport (PNQ)", cost: "₹2,800+" },
      { type: "Train", detail: "Deccan Queen / Shatabdi", time: "3h 30m from Mumbai", hub: "Pune Junction", cost: "₹350+" },
      { type: "Road", detail: "Mumbai–Pune Expressway", time: "3h from Mumbai", hub: "Mumbai Eastern Freeway", cost: "Tolls ₹280" },
      { type: "Bus", detail: "Volvo AC Sleeper", time: "3h 30m from Mumbai", hub: "Mumbai Central Bus Depot", cost: "₹400-700" }
    ],
    budget: { backpacker: "₹1,600/day", recommended: "₹4,000/day", luxury: "₹11,000+/day" },
    pros: ["Vibrant Cafe and Food Scene", "Pleasant Year-Round Climate", "Rich Maratha History"],
    cons: ["Heavy Traffic Congestion", "Rising Koregaon Park Costs", "Uneven Heritage Maintenance"],
    matrix: { money: 45, time: 70, fatigue: 55, payoff: 82 },
    tips: [
      "Visit Shaniwar Wada on weekday mornings to avoid school groups; the 8 PM light-and-sound show is worth staying for.",
      "Hire an auto by meter from Pune Station; app cabs are cheaper only beyond 10 km.",
      "Sinhagad Fort needs a 40-minute steep trek — carry water and wear closed shoes."
    ],
    mustTry: [
      { name: "Misal Pav", description: "Spicy sprouted moth-bean curry topped with farsan, onion and lemon, served with bread rolls." },
      { name: "Mastani", description: "Pune's signature thick milkshake crowned with a scoop of ice cream and dry-fruit garnish." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Shaniwar Wada", duration: "2 Hours", description: "Walk the bastions of the 18th-century Peshwa fort in the cool of morning before tour groups.", personalities: ["History Lover", "Extrovert"] },
      { time: "10:00 AM", place: "Aga Khan Palace", duration: "1.5 Hours", description: "The serene palace where Gandhi and Kasturba were interned; their samadhis are on the grounds.", personalities: ["History Lover", "Spiritual", "Old"] },
      { time: "12:30 PM", place: "Lunch at Vaishali, FC Road", duration: "1 Hour", description: "Iconic Pune institution; order Misal Pav and filter coffee with the university crowd.", personalities: ["Extrovert", "Young"] },
      { time: "03:00 PM", place: "Sinhagad Fort", duration: "3 Hours", description: "Trek to the fort where Tanaji Malusare fell in 1670; the plateau offers sweeping Sahyadri views.", personalities: ["Adventure Lover", "History Lover", "Old"] }
    ]
  },

  pushkar: {
    id: "pushkar", name: "Pushkar", tagline: "Sacred lake and camel fair town",
    verdict: "Unmissable Spiritual Stopover in Rajasthan", rating: 8.6, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Heritage", "Culture"],
    reach: [
      { type: "Flight", detail: "Nearest airport Jaipur, then road", hub: "Jaipur Airport (JAI)", cost: "₹3,500+" },
      { type: "Train", detail: "Ajmer Junction then 14 km road", time: "2h from Jaipur", hub: "Ajmer Junction", cost: "₹250+" },
      { type: "Road", detail: "Via Ajmer–Pushkar highway", time: "2h 30m from Jaipur", hub: "from Jaipur", cost: "Tolls ₹120" },
      { type: "Bus", detail: "RSRTC Volvo to Ajmer + local", time: "3h 30m", hub: "Jaipur Sindhi Camp", cost: "₹350-600" }
    ],
    budget: { backpacker: "₹1,400/day", recommended: "₹3,500/day", luxury: "₹10,000+/day" },
    pros: ["Unique Brahma Temple Atmosphere", "Photogenic Ghats and Lake", "Walkable Bohemian Markets"],
    cons: ["Alcohol and Meat Strictly Prohibited", "Aggressive Priest Donations at Ghats", "Extreme Camel-Fair Crowds"],
    matrix: { money: 35, time: 65, fatigue: 40, payoff: 88 },
    tips: [
      "Walk a pradakshina of Pushkar Lake at dawn before the priests set up puja stalls; the light is extraordinary.",
      "If offered a 'Pushkar Passport' flower offering, agree the amount before accepting any flowers.",
      "Book accommodation 3 months ahead for the November Camel Fair; prices triple."
    ],
    mustTry: [
      { name: "Malpua", description: "Deep-fried sweet pancakes soaked in sugar syrup, served warm at the Old Rangji Temple lane." },
      { name: "Lassi at Om Shiva Garden", description: "Thick chilled curd lassi garnished with rose petals and pistachios." }
    ],
    itinerary: [
      { time: "06:00 AM", place: "Pushkar Lake Ghats at Sunrise", duration: "1.5 Hours", description: "Witness the morning aarti on the 52 ghats; still water reflects the Aravalli ridge in orange.", personalities: ["Spiritual", "History Lover"] },
      { time: "08:30 AM", place: "Brahma Temple", duration: "1 Hour", description: "One of very few temples in the world dedicated to Lord Brahma; remove footwear at the gate.", personalities: ["Spiritual", "Old"] },
      { time: "11:00 AM", place: "Savitri Temple via Ropeway", duration: "2 Hours", description: "Cable car to the hilltop temple; panoramic view of the lake, town and sand dunes beyond.", personalities: ["Adventure Lover", "Spiritual", "Extrovert"] },
      { time: "04:30 PM", place: "Sunset & Sadar Bazaar Walk", duration: "2 Hours", description: "Browse hand-block-print textiles, silver jewellery and camel-leather bags as the bazaar lights up.", personalities: ["History Lover", "Old", "Young"] }
    ]
  },

  rameswaram: {
    id: "rameswaram", name: "Rameswaram", tagline: "Char Dham temple on Pamban Island",
    verdict: "Essential Pilgrimage with Surprising Scenic Rewards", rating: 8.2, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Heritage", "Nature"],
    reach: [
      { type: "Flight", detail: "Nearest airport Madurai, 170 km", hub: "Madurai Airport (IXM)", cost: "₹3,200+" },
      { type: "Train", detail: "Rameswaram Express from Chennai", time: "9h from Chennai", hub: "Rameswaram Station", cost: "₹300+" },
      { type: "Road", detail: "Via Pamban Bridge on NH87", time: "3h 30m from Madurai", hub: "from Madurai", cost: "Tolls ₹90" },
      { type: "Bus", detail: "TNSTC AC bus from Madurai", time: "4h", hub: "Madurai Mattuthavani Bus Stand", cost: "₹200-380" }
    ],
    budget: { backpacker: "₹1,300/day", recommended: "₹3,200/day", luxury: "₹9,500+/day" },
    pros: ["Profound Energy of Ramanathaswamy Temple", "Scenic Pamban Bridge Drive", "Cheap Fresh Seafood"],
    cons: ["Extreme Heat and Humidity Year-Round", "Limited Luxury Accommodation", "Long Ritual Bath Queue"],
    matrix: { money: 30, time: 60, fatigue: 65, payoff: 85 },
    tips: [
      "Enter Ramanathaswamy Temple before 6 AM to avoid the 22-theertham bathing queue; the corridor light is best then.",
      "Stop at the Pamban Bridge viewpoint on the town side for the full arch-over-sea photograph.",
      "Reach Dhanushkodi by jeep — the road is sandy; do not attempt in a regular car and carry water."
    ],
    mustTry: [
      { name: "Chettinad Fish Curry", description: "Bold tamarind-forward coconut-milk curry with freshly caught sea fish, served on a banana leaf." },
      { name: "Aappa with Stew", description: "Lacy rice-flour hoppers paired with a mild coconut-milk vegetable stew — the island breakfast staple." }
    ],
    itinerary: [
      { time: "05:30 AM", place: "Ramanathaswamy Temple Corridor", duration: "3 Hours", description: "Walk the longest temple corridor in India (1,200 pillars) and receive the 22 sacred abhishekams.", personalities: ["Spiritual"] },
      { time: "09:30 AM", place: "Pamban Bridge Viewpoint", duration: "1 Hour", description: "Stand at the cantilever drawbridge viewpoint; on clear days you can see Sri Lanka's coast.", personalities: ["Adventure Lover", "Spiritual"] },
      { time: "11:00 AM", place: "Dhanushkodi Beach and Ruins", duration: "2.5 Hours", description: "The ghost town wiped out in the 1964 cyclone; the two-ocean confluence is hauntingly beautiful.", personalities: ["Spiritual", "History Lover"] },
      { time: "04:00 PM", place: "Agnitheertham Beach & Evening Aarti", duration: "2 Hours", description: "Bathe in the sea opposite the eastern gateway; watch the sunset aarti with the gopuram backdrop.", personalities: ["Spiritual", "Old", "Young"] }
    ]
  },

  shillong: {
    id: "shillong", name: "Shillong", tagline: "Scotland of the East with living roots",
    verdict: "Unmissable for Northeast India Nature Enthusiasts", rating: 8.7, heroImage: IMG.mountain,
    moods: ["Nature", "Adventure", "Culture"],
    reach: [
      { type: "Flight", detail: "Direct from Kolkata/Delhi/Guwahati", hub: "Shillong Airport (SHL)", cost: "₹4,500+" },
      { type: "Train", detail: "Nearest railhead Guwahati, 100 km", time: "2h 30m road from Guwahati", hub: "Guwahati Station", cost: "₹300+" },
      { type: "Road", detail: "Via NH6 through Ri Bhoi hills", time: "2h 30m from Guwahati", hub: "from Guwahati", cost: "Tolls ₹180" },
      { type: "Bus", detail: "Meghalaya Transport Corp", time: "3h from Guwahati", hub: "Paltan Bazar, Guwahati", cost: "₹250-450" }
    ],
    budget: { backpacker: "₹1,800/day", recommended: "₹4,500/day", luxury: "₹12,000+/day" },
    pros: ["Lush Evergreen Scenery and Cool Climate", "Unique Living Root Bridge Treks", "Vibrant Khasi Music and Food Culture"],
    cons: ["Narrow Slow Roads to Cherrapunji", "Unpredictable Slippery Rain", "Permits Needed for Some Tribal Areas"],
    matrix: { money: 50, time: 75, fatigue: 70, payoff: 92 },
    tips: [
      "The double-decker root bridge at Nongriat is a 3,500-step descent and return — start by 7 AM from Tyrna.",
      "Umiam Lake rowboats run only before 5 PM; avoid weekends when the park is packed.",
      "Carry a light rain jacket every day — Meghalaya rains without warning and roads get foggy fast."
    ],
    mustTry: [
      { name: "Jadoh", description: "Khasi red rice cooked with pork and ginger — the quintessential Shillong one-pot meal." },
      { name: "Tungrymbai", description: "Fermented soybean paste stir-fried with pork; pungent and intense, sold in Iewduh market." }
    ],
    itinerary: [
      { time: "07:00 AM", place: "Umiam Lake (Barapani)", duration: "2 Hours", description: "A shimmering reservoir ringed by pine-covered hills; rowing the glassy morning water is calming.", personalities: ["Introvert", "Extrovert"] },
      { time: "10:00 AM", place: "Elephant Falls", duration: "1 Hour", description: "Three-tiered waterfall through dense subtropical jungle; the lowest tier is a slippery stair down.", personalities: ["Adventure Lover", "Extrovert"] },
      { time: "12:00 PM", place: "Police Bazar Street Food", duration: "1 Hour", description: "Sample Jadoh and turmeric pork at roadside counters run by Khasi families — cheap and authentic.", personalities: ["Introvert", "Young", "Old"] },
      { time: "02:00 PM", place: "Living Root Bridges, Mawlynnong", duration: "4 Hours", description: "Trek to the bio-engineered rubber-tree bridges trained over centuries by Khasi villagers.", personalities: ["Adventure Lover", "Extrovert", "Introvert", "Young"] }
    ]
  },

  somnath: {
    id: "somnath", name: "Somnath", tagline: "First Jyotirlinga by the Arabian Sea",
    verdict: "Deeply Moving Pilgrimage with Coastal Serenity", rating: 8.0, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Heritage", "Nature"],
    reach: [
      { type: "Flight", detail: "Nearest airport Diu (65 km)", hub: "Diu Airport (DIU)", cost: "₹4,000+" },
      { type: "Train", detail: "Somnath Express from Ahmedabad", time: "8h from Ahmedabad", hub: "Veraval Station (7 km)", cost: "₹350+" },
      { type: "Road", detail: "Via NH951 Ahmedabad–Somnath", time: "6h from Ahmedabad", hub: "from Ahmedabad", cost: "Tolls ₹310" },
      { type: "Bus", detail: "GSRTC Volvo from Ahmedabad", time: "7h", hub: "Geeta Mandir Bus Stand", cost: "₹400-650" }
    ],
    budget: { backpacker: "₹1,200/day", recommended: "₹3,000/day", luxury: "₹9,000+/day" },
    pros: ["Powerful Rebuilt Jyotirlinga Ambience", "Rare Beach-Temple Setting", "Uncrowded and Calm"],
    cons: ["Limited Sightseeing Beyond the Temple", "Industrial Veraval Town Nearby", "Few Dining or Entertainment Options"],
    matrix: { money: 25, time: 55, fatigue: 35, payoff: 80 },
    tips: [
      "The Sound and Light show runs at 8 PM covering the temple's 17 reconstructions — book the ₹100 ticket by 7 PM.",
      "Triveni Sangam is most sacred at high tide; ask locals for the tide timing the evening before.",
      "Photography is prohibited inside the sanctum; leave devices at the designated counter before entry."
    ],
    mustTry: [
      { name: "Sukhdi (Gur Papdi)", description: "Crumbly wheat-flour sweet bound with jaggery and ghee — the temple prasad sweet." },
      { name: "Srikhand with Puri", description: "Strained hung-curd sweetened with saffron and cardamom, with deep-fried puffed bread." }
    ],
    itinerary: [
      { time: "06:00 AM", place: "Somnath Temple Morning Abhishek", duration: "2 Hours", description: "Witness the dawn Mangala Aarti; the Baan Stambha marks an unbroken sea-line to Antarctica.", personalities: ["Spiritual"] },
      { time: "09:00 AM", place: "Bhalka Tirth", duration: "1 Hour", description: "The spot where Lord Krishna departed earthly form; a quiet, meditative shrine.", personalities: ["Spiritual", "History Lover"] },
      { time: "10:30 AM", place: "Triveni Sangam & Gita Mandir", duration: "1.5 Hours", description: "Walk to the three-river sea confluence then read the Gita carved in the white marble Gita Mandir.", personalities: ["Spiritual", "Old"] },
      { time: "07:45 PM", place: "Sound and Light Show", duration: "1 Hour", description: "Narration of the temple's 17 destructions and reconstructions on the illuminated Chalukyan spire.", personalities: ["History Lover", "Spiritual", "Young", "Old"] }
    ]
  },

  surat: {
    id: "surat", name: "Surat", tagline: "Diamond city and chaat capital",
    verdict: "Underrated Urban Escape for Food and Culture Lovers", rating: 7.6, heroImage: IMG.metro,
    moods: ["Food", "Urban", "Culture"],
    reach: [
      { type: "Flight", detail: "Direct from Delhi/Mumbai/Bangalore", hub: "Surat Airport (STV)", cost: "₹3,000+" },
      { type: "Train", detail: "Shatabdi / Gujarat Mail", time: "2h 45m from Mumbai", hub: "Surat Railway Station", cost: "₹400+" },
      { type: "Road", detail: "Via Mumbai–Ahmedabad NH48", time: "4h from Mumbai", hub: "from Mumbai", cost: "Tolls ₹340" },
      { type: "Bus", detail: "Volvo AC from Mumbai Dadar", time: "5h", hub: "Dadar TT Circle, Mumbai", cost: "₹450-750" }
    ],
    budget: { backpacker: "₹1,500/day", recommended: "₹3,800/day", luxury: "₹10,000+/day" },
    pros: ["Outstanding Cheap Street Food Variety", "Fast-Developing Clean Infrastructure", "Dumas Black-Sand Beach Evenings"],
    cons: ["Relentless Summer Heat Apr–Jun", "Limited Heritage Depth", "Diamond Bourse Traffic Bottlenecks"],
    matrix: { money: 40, time: 60, fatigue: 50, payoff: 74 },
    tips: [
      "The best Surat locho is served 7–10 AM at the original Mahidharpura stalls; go before the batter runs out.",
      "Dumas Beach is best at sunset on weekdays; weekend parking fills by 5 PM.",
      "The Dutch Cemetery near Surat Castle is one of India's oldest European graveyards — free entry."
    ],
    mustTry: [
      { name: "Surti Locho", description: "Steamed chickpea-batter cake with sev, pomegranate and green chutney — found nowhere else in Gujarat." },
      { name: "Ghari", description: "Flaky pastry filled with mawa, dry fruits and ghee — the city's famous Diwali mithai year-round." }
    ],
    itinerary: [
      { time: "07:30 AM", place: "Mahidharpura Locho Stalls", duration: "1 Hour", description: "Join office-goers queuing for fresh locho at the original open-air stalls; eat standing.", personalities: ["Extrovert", "Young"] },
      { time: "10:00 AM", place: "Sardar Patel Museum", duration: "1.5 Hours", description: "Old British-era cotton and textile trading history near the Tapti riverfront.", personalities: ["History Lover", "Extrovert"] },
      { time: "12:30 PM", place: "Sarthana Nature Park and Zoo", duration: "2 Hours", description: "A well-maintained zoological garden on the Tapti riverbank; relaxed midday family walk.", personalities: ["Young", "Old"] },
      { time: "05:30 PM", place: "Dumas Beach at Sunset", duration: "2 Hours", description: "Walk the black-sand beach as the sun drops into the Arabian Sea; bhel puri and sugarcane juice stalls.", personalities: ["Extrovert", "Young", "Old"] }
    ]
  },

  tirupati: {
    id: "tirupati", name: "Tirupati", tagline: "Pilgrim queues to Lord Venkateshwara",
    verdict: "Once-in-a-Lifetime Pilgrimage That Rewards Patience", rating: 8.5, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Heritage", "Culture"],
    reach: [
      { type: "Flight", detail: "Direct from Hyderabad/Chennai/Bangalore", hub: "Tirupati Airport (TIR)", cost: "₹3,500+" },
      { type: "Train", detail: "Saptagiri Express from Chennai", time: "2h 45m from Chennai", hub: "Tirupati Railway Station", cost: "₹250+" },
      { type: "Road", detail: "Via NH40 Bangalore–Tirupati", time: "4h from Bangalore", hub: "from Bangalore", cost: "Tolls ₹260" },
      { type: "Bus", detail: "APSRTC AC Sleeper from Hyderabad", time: "7h", hub: "MGBS Hyderabad", cost: "₹600-900" }
    ],
    budget: { backpacker: "₹1,300/day", recommended: "₹3,500/day", luxury: "₹9,500+/day" },
    pros: ["World's Most Visited Temple", "Efficient TTD Queue and Stay Management", "Genuinely Unique Laddu Prasadam"],
    cons: ["Darshan Queue Can Be 8–24 Hours", "Heavily Restricted Commercial Hill Town", "No Alcohol/Non-Veg/Leather on the Hill"],
    matrix: { money: 30, time: 55, fatigue: 80, payoff: 91 },
    tips: [
      "Book the Sudarshana Token (Special Entry Darshan, ₹300) on the TTD website exactly 60 days prior.",
      "Stay at TTD's Srinivasam or Bliss Hotel in Tirumala to avoid the 4 AM bus scramble up the ghat.",
      "Kapila Theertham waterfall is most scenic Aug–Oct after rains; the Shiva temple here is calm."
    ],
    mustTry: [
      { name: "Tirupati Laddu (Prasadam)", description: "GI-tagged chickpea-flour and sugar laddu with cashews and raisins, made in pure ghee by TTD." },
      { name: "Pulihora", description: "Tamarind rice tempered with mustard and curry leaves — the free TTD annadanam meal." }
    ],
    itinerary: [
      { time: "05:00 AM", place: "Tirumala Temple Special Darshan", duration: "4 Hours", description: "Queue for Special Entry Darshan; the gilded Ananda Nilayam vimana is the defining image.", personalities: ["Spiritual"] },
      { time: "10:30 AM", place: "Sri Govindaraja Temple", duration: "1.5 Hours", description: "The reclining Vishnu temple at the foot of the hill, far less crowded with Vijayanagara carvings.", personalities: ["Spiritual", "History Lover"] },
      { time: "12:30 PM", place: "TTD Annadanam Dining Hall", duration: "1 Hour", description: "Receive the free communal meal of rice, sambar, rasam and pulihora on plantain leaves.", personalities: ["Spiritual", "Old", "Young"] },
      { time: "03:00 PM", place: "Kapila Theertham Waterfall", duration: "1.5 Hours", description: "The only TTD-run Shiva shrine; a natural waterfall cascades behind the sanctum.", personalities: ["Spiritual", "Old"] }
    ]
  },

  vrindavan: {
    id: "vrindavan", name: "Vrindavan", tagline: "Krishna's playground of bhakti",
    verdict: "Profoundly Moving for Devotees; Culturally Rich for Everyone", rating: 8.3, heroImage: IMG.spiritual,
    moods: ["Spiritual", "Heritage", "Culture"],
    reach: [
      { type: "Flight", detail: "Nearest airport Agra (60 km) or Delhi (150 km)", hub: "IGIA Delhi / Agra (AGR)", cost: "₹2,800+" },
      { type: "Train", detail: "Mathura Junction then 12 km road", time: "2h from Delhi on Gatimaan", hub: "Mathura Junction", cost: "₹600+" },
      { type: "Road", detail: "Yamuna Expressway to Mathura then NH19", time: "2h 30m from Delhi", hub: "from Delhi/Noida", cost: "Tolls ₹380" },
      { type: "Bus", detail: "Volvo AC from ISBT Anand Vihar", time: "3h to Mathura", hub: "ISBT Anand Vihar, Delhi", cost: "₹400-650" }
    ],
    budget: { backpacker: "₹1,200/day", recommended: "₹3,000/day", luxury: "₹9,000+/day" },
    pros: ["Spectacular Prem Mandir Night Show", "World-Class ISKCON Organisation", "Deeply Affecting Bhakti Atmosphere"],
    cons: ["Banke Bihari Severely Overcrowded on Ekadashi", "Aggressive Monkeys on Parikrama Marg", "Narrow Congested Inner Roads"],
    matrix: { money: 25, time: 60, fatigue: 50, payoff: 84 },
    tips: [
      "The Prem Mandir light show runs 7:30–8:30 PM and is free; arrive by 7 PM for a central garden spot.",
      "Banke Bihari closes the deity curtain every few seconds — go on a non-festival weekday morning.",
      "Walk the 5 km Vrindavan Parikrama barefoot at dawn with local devotees — the lanes are quietest before 7 AM."
    ],
    mustTry: [
      { name: "Mathura Peda", description: "Dense khoya sweet with cardamom and saffron, made fresh daily — the definitive Krishna-city prasad." },
      { name: "Rabdi with Jalebi", description: "Slow-reduced sweetened milk cream with crisp saffron spirals — the Braj winter breakfast." }
    ],
    itinerary: [
      { time: "06:30 AM", place: "Banke Bihari Temple Mangala Aarti", duration: "1.5 Hours", description: "Witness the playful curtain ritual unique to Vrindavan; 'Radhe Radhe' fills the courtyard.", personalities: ["Spiritual"] },
      { time: "09:00 AM", place: "ISKCON Krishna Balaram Mandir", duration: "2 Hours", description: "The serene white marble complex; the morning Bhagavatam class is open to all visitors.", personalities: ["Spiritual", "History Lover"] },
      { time: "12:00 PM", place: "Lunch at Govinda's Restaurant", duration: "1 Hour", description: "Pure vegetarian Vaishnava thali with dal, sabzi, rice and fresh halwa prasadam.", personalities: ["Spiritual", "Young", "Old"] },
      { time: "07:30 PM", place: "Prem Mandir Illuminated Show", duration: "1 Hour", description: "The Italian-marble temple cycles through LED sequences while bhajans play; the Raas Leela tableaux shine.", personalities: ["Spiritual", "Young", "Old"] }
    ]
  }
};

import { liteCitiesAsSummary } from './cityDirectory';

// Parse the numeric rupee amount out of a budget string like "₹4,500/day".
function rupeesOf(s: string): number {
  const digits = s.replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

// Coarse spend bucket used by the homepage Budget filter.
export function budgetTierOf(recommended: string): 'Budget' | 'Mid-range' | 'Premium' {
  const v = rupeesOf(recommended);
  if (v < 3500) return 'Budget';
  if (v <= 5000) return 'Mid-range';
  return 'Premium';
}

// All 50 cities now ship full 24-hour blueprints. The summary feeds the
// home grid, search, persona/mood/budget filters, and the About-page count.
export const DESTINATION_LIST: DestinationSummary[] = Object.values(DESTINATIONS).map((d, i) => ({
  id: d.id,
  name: d.name,
  tagline: d.tagline,
  image: d.cardImage ?? d.heroImage,
  rating: d.rating.toFixed(1),
  personalities: Array.from(new Set(d.itinerary.flatMap(it => it.personalities))),
  moods: d.moods ?? [],
  score: d.rating,
  budgetTier: budgetTierOf(d.budget.recommended),
  order: i,
}));

// Kept as a stable alias: every tracked city is a full destination now.
// (The lite directory is retained but emptied; see src/data/cityDirectory.ts.)
export const ALL_CITIES_LIST: DestinationSummary[] = [
  ...DESTINATION_LIST,
  ...liteCitiesAsSummary(),
];

export function getDestination(id: string): Destination | null {
  return DESTINATIONS[id] ?? null;
}

export function searchDestinations(query: string): DestinationSummary[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_CITIES_LIST;
  return ALL_CITIES_LIST.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.tagline.toLowerCase().includes(q) ||
    d.id.toLowerCase().includes(q)
  );
}

export function destinationsForPersona(personality: string): DestinationSummary[] {
  if (personality === 'All') return ALL_CITIES_LIST;
  return ALL_CITIES_LIST.filter(d => d.personalities.includes(personality));
}
