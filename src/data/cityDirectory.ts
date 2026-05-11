// Lite city directory sourced from one_day_trip_cities_india.xlsx.
// These cities don't have full 24-hour blueprints yet; clicking them
// surfaces the existing "Blueprint coming soon" toast. They render
// on the home grid alongside the 7 full destinations.
//
// xlsx personality labels were mapped to the app's taxonomy:
//   History Chaser   -> History Lover
//   Social Explorer  -> Extrovert
//   Spiritual Seeker -> Spiritual
//   Peace Seeker     -> Introvert
//   Nature Lover     -> Adventure Lover
//   Food Explorer    -> (dropped per spec)

import type { DestinationSummary } from './destinations';

// Themed placeholder pool — reuses the 7 verified-working hero images
// from full destinations. Replace per entry with a city-specific image
// when one is sourced.
const IMG = {
  heritage:  'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop',
  spiritual: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=2000&auto=format&fit=crop',
  royal:     'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2127&auto=format&fit=crop',
  metro:     'https://images.unsplash.com/photo-1678966432189-d58296e45ad2?q=80&w=627&auto=format&fit=crop',
  lake:      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=2070&auto=format&fit=crop',
  mountain:  'https://images.unsplash.com/photo-1720819029162-8500607ae232?q=80&w=2070&auto=format&fit=crop',
  beach:     'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2070&auto=format&fit=crop',
};

export interface LiteCity {
  id: string;
  name: string;
  state: string;
  tagline: string;
  image: string;
  personalities: string[];   // mapped to app taxonomy
  bestFor: string[];         // Solo / Couples / Family / Friends
  attractions: string[];     // 3-4 main places
}

export const LITE_CITIES: LiteCity[] = [
  { id: 'ahmedabad',   name: 'Ahmedabad',   state: 'Gujarat',          tagline: 'Heritage walks along the Sabarmati',           image: IMG.heritage,  personalities: ['History Lover', 'Extrovert'],                 bestFor: ['Friends', 'Family'],          attractions: ['Sabarmati Ashram', 'Adalaj Stepwell', 'Sidi Saiyyed Mosque'] },
  { id: 'ajmer',       name: 'Ajmer',       state: 'Rajasthan',        tagline: 'Sufi shrines in the Aravalli foothills',       image: IMG.spiritual, personalities: ['History Lover', 'Spiritual'],                 bestFor: ['Couples', 'Family'],          attractions: ['Ajmer Sharif Dargah', 'Ana Sagar Lake', 'Taragarh Fort'] },
  { id: 'amritsar',    name: 'Amritsar',    state: 'Punjab',           tagline: 'Golden Temple and Wagah border drama',         image: IMG.spiritual, personalities: ['History Lover', 'Spiritual'],                 bestFor: ['Family'],                     attractions: ['Golden Temple (Harmandir Sahib)', 'Jallianwala Bagh', 'Wagah Border Ceremony'] },
  { id: 'bangalore',   name: 'Bangalore',   state: 'Karnataka',        tagline: 'Tech capital with garden-city soul',           image: IMG.metro,     personalities: ['Extrovert'],                                  bestFor: ['Friends'],                    attractions: ['Lalbagh Botanical Garden', 'Cubbon Park', 'Bangalore Palace'] },
  { id: 'bhopal',      name: 'Bhopal',      state: 'Madhya Pradesh',   tagline: 'Lakes, mosques and the City of Begums',        image: IMG.heritage,  personalities: ['History Lover', 'Introvert'],                 bestFor: ['Family'],                     attractions: ['Upper Lake', 'Taj-ul-Masajid', 'Bhimbetka Rock Shelters'] },
  { id: 'chandigarh',  name: 'Chandigarh',  state: 'Chandigarh',       tagline: "Le Corbusier's planned city",                  image: IMG.metro,     personalities: ['Extrovert', 'Introvert'],                     bestFor: ['Friends', 'Family'],          attractions: ['Rock Garden', 'Sukhna Lake', 'Capitol Complex'] },
  { id: 'coorg',       name: 'Coorg',       state: 'Karnataka',        tagline: 'Coffee plantations in misty Western Ghats',    image: IMG.mountain,  personalities: ['Introvert'],                                  bestFor: ['Couples', 'Family'],          attractions: ['Abbey Falls', 'Raja Seat', 'Dubare Elephant Camp'] },
  { id: 'darjeeling',  name: 'Darjeeling',  state: 'West Bengal',      tagline: 'Toy trains and Himalayan tea estates',         image: IMG.mountain,  personalities: ['Adventure Lover'],                            bestFor: ['Couples', 'Family'],          attractions: ['Tiger Hill Sunrise', 'Darjeeling Himalayan Railway', 'Happy Valley Tea Estate'] },
  { id: 'dehradun',    name: 'Dehradun',    state: 'Uttarakhand',      tagline: 'Doon Valley gateway to the hills',             image: IMG.mountain,  personalities: ['Introvert'],                                  bestFor: ['Solo', 'Family'],             attractions: ["Robber's Cave", 'Mindrolling Monastery', 'Sahastradhara'] },
  { id: 'dharamshala', name: 'Dharamshala', state: 'Himachal Pradesh', tagline: 'Tibetan culture in the Dhauladhar range',      image: IMG.mountain,  personalities: ['Introvert', 'Spiritual'],                     bestFor: ['Solo'],                       attractions: ['Bhagsu Waterfall', 'Tsuglagkhang Complex', 'Triund Trek'] },
  { id: 'dwarka',      name: 'Dwarka',      state: 'Gujarat',          tagline: "Krishna's coastal kingdom",                    image: IMG.spiritual, personalities: ['Spiritual'],                                  bestFor: ['Couples', 'Family'],          attractions: ['Dwarkadhish Temple', 'Bet Dwarka Island', 'Nageshwar Jyotirlinga'] },
  { id: 'gangtok',     name: 'Gangtok',     state: 'Sikkim',           tagline: 'Sikkim capital with Kanchenjunga views',       image: IMG.mountain,  personalities: ['Introvert'],                                  bestFor: ['Solo', 'Couples'],            attractions: ['Tsomgo Lake', 'Rumtek Monastery', 'MG Marg'] },
  { id: 'gwalior',     name: 'Gwalior',     state: 'Madhya Pradesh',   tagline: 'Hilltop fort above a royal city',              image: IMG.heritage,  personalities: ['History Lover'],                              bestFor: ['Solo', 'Family'],             attractions: ['Gwalior Fort', 'Jai Vilas Palace', 'Sas Bahu Temples'] },
  { id: 'hampi',       name: 'Hampi',       state: 'Karnataka',        tagline: 'Boulder-strewn ruins of Vijayanagar',          image: IMG.heritage,  personalities: ['History Lover', 'Adventure Lover'],           bestFor: ['Solo', 'Friends'],            attractions: ['Virupaksha Temple', 'Vittala Temple Stone Chariot', 'Matanga Hill Sunset'] },
  { id: 'haridwar',    name: 'Haridwar',    state: 'Uttarakhand',      tagline: 'Ganga aarti at the gateway of the gods',       image: IMG.spiritual, personalities: ['Spiritual', 'Introvert'],                     bestFor: ['Solo', 'Family'],             attractions: ['Har Ki Pauri Aarti', 'Mansa Devi Temple', 'Chandi Devi Temple'] },
  { id: 'hyderabad',   name: 'Hyderabad',   state: 'Telangana',        tagline: 'Biryani, pearls and the Charminar',            image: IMG.metro,     personalities: ['History Lover', 'Extrovert'],                 bestFor: ['Friends', 'Family'],          attractions: ['Charminar', 'Golconda Fort', 'Ramoji Film City'] },
  { id: 'indore',      name: 'Indore',      state: 'Madhya Pradesh',   tagline: 'Heritage and street food capital',             image: IMG.metro,     personalities: ['Extrovert'],                                  bestFor: ['Friends'],                    attractions: ['Sarafa Night Market', 'Rajwada Palace', 'Lal Bagh Palace'] },
  { id: 'jhansi',      name: 'Jhansi',      state: 'Uttar Pradesh',    tagline: "Rani Laxmi Bai's fort city",                   image: IMG.heritage,  personalities: ['History Lover'],                              bestFor: ['Solo', 'Family'],             attractions: ['Jhansi Fort', 'Rani Mahal', 'Government Museum'] },
  { id: 'jodhpur',     name: 'Jodhpur',     state: 'Rajasthan',        tagline: 'The Blue City under Mehrangarh',               image: IMG.royal,     personalities: ['History Lover', 'Extrovert'],                 bestFor: ['Couples', 'Friends'],         attractions: ['Mehrangarh Fort', 'Jaswant Thada', 'Clock Tower Bazaar'] },
  { id: 'kasol',       name: 'Kasol',       state: 'Himachal Pradesh', tagline: 'Parvati Valley riverside hub',                 image: IMG.mountain,  personalities: ['Adventure Lover'],                            bestFor: ['Solo', 'Friends'],            attractions: ['Parvati River Trails', 'Kheerganga Trek', 'Manikaran Sahib'] },
  { id: 'kolkata',     name: 'Kolkata',     state: 'West Bengal',      tagline: 'Trams, Tagore and singing rasgulla',           image: IMG.metro,     personalities: ['History Lover'],                              bestFor: ['Family'],                     attractions: ['Victoria Memorial', 'Howrah Bridge', 'Dakshineswar Temple'] },
  { id: 'lucknow',     name: 'Lucknow',     state: 'Uttar Pradesh',    tagline: 'Nawabi grace and Awadhi kebabs',               image: IMG.heritage,  personalities: ['History Lover'],                              bestFor: ['Solo', 'Family'],             attractions: ['Bara Imambara', 'Rumi Darwaza', 'Chota Imambara'] },
  { id: 'manali',      name: 'Manali',      state: 'Himachal Pradesh', tagline: 'Snow-capped Pir Panjal playground',            image: IMG.mountain,  personalities: ['Adventure Lover'],                            bestFor: ['Couples', 'Friends'],         attractions: ['Solang Valley', 'Rohtang Pass', 'Hidimba Devi Temple'] },
  { id: 'mathura',     name: 'Mathura',     state: 'Uttar Pradesh',    tagline: "Krishna's birthplace by the Yamuna",           image: IMG.spiritual, personalities: ['Spiritual'],                                  bestFor: ['Family'],                     attractions: ['Krishna Janmabhoomi', 'Vishram Ghat', 'Dwarkadhish Temple'] },
  { id: 'mcleod-ganj', name: 'McLeod Ganj', state: 'Himachal Pradesh', tagline: "The Dalai Lama's mountain home",               image: IMG.mountain,  personalities: ['Spiritual'],                                  bestFor: ['Solo'],                       attractions: ['Tsuglagkhang Temple', 'Bhagsunag Falls', 'Namgyal Monastery'] },
  { id: 'mount-abu',   name: 'Mount Abu',   state: 'Rajasthan',        tagline: "Rajasthan's only hill station",                image: IMG.lake,      personalities: ['Adventure Lover'],                            bestFor: ['Couples', 'Family'],          attractions: ['Dilwara Temples', 'Nakki Lake', 'Sunset Point'] },
  { id: 'mumbai',      name: 'Mumbai',      state: 'Maharashtra',      tagline: 'Gateway, Bollywood and Marine Drive',          image: IMG.metro,     personalities: ['Extrovert'],                                  bestFor: ['Friends'],                    attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves'] },
  { id: 'munnar',      name: 'Munnar',      state: 'Kerala',           tagline: 'Tea hills and shola forests',                  image: IMG.mountain,  personalities: ['Adventure Lover'],                            bestFor: ['Couples'],                    attractions: ['Tea Gardens', 'Eravikulam National Park', 'Mattupetty Dam'] },
  { id: 'mussoorie',   name: 'Mussoorie',   state: 'Uttarakhand',      tagline: 'Queen of the Hills above Doon',                image: IMG.mountain,  personalities: ['Introvert'],                                  bestFor: ['Couples', 'Friends'],         attractions: ['Kempty Falls', 'Mall Road', 'Gun Hill Point'] },
  { id: 'mysuru',      name: 'Mysuru',      state: 'Karnataka',        tagline: 'Palaces, silk and Chamundi Hill',              image: IMG.heritage,  personalities: ['History Lover'],                              bestFor: ['Couples', 'Family'],          attractions: ['Mysuru Palace', 'Chamundi Hill', 'Brindavan Gardens'] },
  { id: 'nainital',    name: 'Nainital',    state: 'Uttarakhand',      tagline: 'Lake town in the Kumaon hills',                image: IMG.mountain,  personalities: ['Introvert'],                                  bestFor: ['Couples', 'Family'],          attractions: ['Naini Lake', 'Naina Devi Temple', 'Snow View Point'] },
  { id: 'ooty',        name: 'Ooty',        state: 'Tamil Nadu',       tagline: 'Nilgiri toy train and eucalyptus trails',      image: IMG.mountain,  personalities: ['Introvert'],                                  bestFor: ['Couples', 'Family'],          attractions: ['Ooty Lake', 'Botanical Garden', 'Doddabetta Peak'] },
  { id: 'orchha',      name: 'Orchha',      state: 'Madhya Pradesh',   tagline: 'Bundela temples by the Betwa',                 image: IMG.heritage,  personalities: ['History Lover', 'Introvert'],                 bestFor: ['Solo', 'Couples'],            attractions: ['Orchha Fort', 'Chaturbhuj Temple', 'Raja Mahal'] },
  { id: 'patna',       name: 'Patna',       state: 'Bihar',            tagline: 'Mauryan capital on the Ganges',                image: IMG.heritage,  personalities: ['History Lover'],                              bestFor: ['Solo', 'Family'],             attractions: ['Golghar', 'Patna Museum', 'Mahavir Mandir'] },
  { id: 'pondicherry', name: 'Pondicherry', state: 'Puducherry',       tagline: 'French quarter and Auroville calm',            image: IMG.lake,      personalities: ['Introvert', 'Spiritual'],                     bestFor: ['Solo', 'Couples'],            attractions: ['Promenade Beach', 'Auroville', 'Sri Aurobindo Ashram'] },
  { id: 'pune',        name: 'Pune',        state: 'Maharashtra',      tagline: 'Maratha heritage and modern campus city',      image: IMG.metro,     personalities: ['History Lover', 'Extrovert'],                 bestFor: ['Solo', 'Friends'],            attractions: ['Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort'] },
  { id: 'pushkar',     name: 'Pushkar',     state: 'Rajasthan',        tagline: 'Sacred lake and camel fair town',              image: IMG.spiritual, personalities: ['History Lover', 'Spiritual'],                 bestFor: ['Solo', 'Couples'],            attractions: ['Pushkar Lake', 'Brahma Temple', 'Savitri Temple Sunset'] },
  { id: 'rameswaram',  name: 'Rameswaram',  state: 'Tamil Nadu',       tagline: 'Char Dham temple on Pamban Island',            image: IMG.spiritual, personalities: ['Spiritual'],                                  bestFor: ['Family'],                     attractions: ['Ramanathaswamy Temple', 'Dhanushkodi Beach', 'Pamban Bridge'] },
  { id: 'shillong',    name: 'Shillong',    state: 'Meghalaya',        tagline: 'Scotland of the East with living roots',       image: IMG.mountain,  personalities: ['Introvert', 'Extrovert', 'Adventure Lover'],  bestFor: ['Couples', 'Friends'],         attractions: ['Umiam Lake', 'Elephant Falls', 'Living Root Bridges'] },
  { id: 'somnath',     name: 'Somnath',     state: 'Gujarat',          tagline: 'First Jyotirlinga by the Arabian Sea',         image: IMG.spiritual, personalities: ['Spiritual'],                                  bestFor: ['Family'],                     attractions: ['Somnath Temple', 'Triveni Sangam', 'Bhalka Tirth'] },
  { id: 'surat',       name: 'Surat',       state: 'Gujarat',          tagline: 'Diamond city and chaat capital',               image: IMG.metro,     personalities: ['Extrovert'],                                  bestFor: ['Friends'],                    attractions: ['Dumas Beach', 'Sardar Patel Museum', 'Sarthana Nature Park'] },
  { id: 'tirupati',    name: 'Tirupati',    state: 'Andhra Pradesh',   tagline: 'Pilgrim queues to Lord Venkateshwara',         image: IMG.spiritual, personalities: ['Spiritual'],                                  bestFor: ['Family'],                     attractions: ['Tirumala Temple', 'Sri Govindaraja Temple', 'Kapila Theertham'] },
  { id: 'vrindavan',   name: 'Vrindavan',   state: 'Uttar Pradesh',    tagline: "Krishna's playground of bhakti",               image: IMG.spiritual, personalities: ['Spiritual'],                                  bestFor: ['Couples', 'Family'],          attractions: ['Banke Bihari Temple', 'ISKCON Vrindavan', 'Prem Mandir'] },
];

export function liteCitiesAsSummary(): DestinationSummary[] {
  return LITE_CITIES.map(c => ({
    id: c.id,
    name: c.name,
    tagline: c.tagline,
    image: c.image,
    rating: 'NEW',
    personalities: c.personalities,
  }));
}
