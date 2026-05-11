/**
 * ============================================================
 *  src/content.tsx
 * ------------------------------------------------------------
 *  THIS IS THE ONE FILE TO EDIT.
 *
 *  Anything in this file controls what the website shows:
 *    - Page titles, hero headline, button labels, footer copy
 *    - Empty-state messages and toast pop-ups
 *    - Personality list, info-page content, About-page pillars
 *    - The 7 destinations (re-exported from data/destinations.ts)
 *
 *  Edit a value, save the file. Vite's hot-reload updates the
 *  browser within a second. No restart, no rebuild needed.
 *
 *  DO NOT edit App.tsx for content changes — only edit this
 *  file. App.tsx just reads the values from here.
 * ============================================================
 */

import React from 'react';
import {
  TrendingUp,
  History,
  Users,
  Wind,
  Smile,
  Mountain,
  ShieldCheck,
  Sparkles,
  Compass
} from 'lucide-react';

// Re-export destinations so the editor only needs to import from
// "./content". To edit the cities themselves, open
// src/data/destinations.ts.
export { DESTINATIONS, DESTINATION_LIST, ALL_CITIES_LIST, getDestination, searchDestinations, destinationsForPersona } from './data/destinations';
export type { Destination, DestinationSummary } from './data/destinations';

// ----- View kinds (don't edit unless you're adding new pages) -----
export type InfoTopic =
  | 'how-it-works'
  | 'mint-scoring'
  | 'careers'
  | 'travel-tribes'
  | 'ambassadors'
  | 'support'
  | 'privacy'
  | 'terms'
  | 'cookies';

// ============================================================
//  PERSONALITIES
//  Edit labels (the .id field) only if you want them to appear
//  differently on screen AND in the matching logic — note that
//  if you rename "Spiritual" to something else, you'll also need
//  to update each itinerary item's `personalities` array in
//  src/data/destinations.ts so cities still match.
// ============================================================
export const PERSONALITIES = [
  { id: 'All',             icon: <TrendingUp size={16} /> },
  { id: 'Introvert',       icon: <Wind size={16} /> },
  { id: 'Extrovert',       icon: <Users size={16} /> },
  { id: 'History Lover',   icon: <History size={16} /> },
  { id: 'Adventure Lover', icon: <Mountain size={16} /> },
  { id: 'Spiritual',       icon: <Smile size={16} /> },
  { id: 'Young',           icon: <Smile size={16} /> },
  { id: 'Old',             icon: <History size={16} /> },
];

// ============================================================
//  INFO PAGES
//  These show up at /info/<topic>. To add a new topic, add an
//  entry here AND a new value to InfoTopic above AND wire it
//  to a footer link in SITE_TEXT.footer below.
// ============================================================
export const INFO_CONTENT: Record<InfoTopic, { title: string; intro: string; sections: { heading: string; body: string }[] }> = {
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

// ============================================================
//  ABOUT PAGE PILLARS
//  (Kept out of SITE_TEXT because each entry has a real icon.)
// ============================================================
export const ABOUT_PILLARS = [
  { icon: <Compass size={20} />,    title: 'Locally Verified',         body: 'Every blueprint is walked end-to-end by a city-resident reviewer before publication.' },
  { icon: <ShieldCheck size={20} />, title: 'No Sponsored Placements', body: 'We do not accept hotel, restaurant, or destination payments. Period.' },
  { icon: <Sparkles size={20} />,    title: 'Tight 24-Hour Plans',     body: 'No 7-day filler. Just the highest-payoff stops, in the right order, at the right hour.' }
];

// ============================================================
//  SITE_TEXT
//  Every other piece of text on the site lives here. Edit any
//  value and the change shows up on save. Functions take a
//  parameter (e.g. city name) and return the final string.
// ============================================================
export const SITE_TEXT = {
  brand: {
    name: 'Review',           // First half of the wordmark
    nameAccent: 'Mint',       // Highlighted (green) second half
    mark: 'RM'                // The square logo letters
  },

  nav: {
    destinations:  'Destinations',
    personaGuides: 'Persona Guides',
    about:         'About',
    login:         'LOGIN'
  },

  hero: {
    eyebrow:           'Verified One-Day Blueprints',
    titleLine1:        'EFFORTLESS',
    titleAccent:       'TRAVEL.',
    titleLine2:        'MAXIMAL',
    titleItalic:       'JOY.',
    searchPlaceholder: 'Where are you heading?'
  },

  emptyStates: {
    homePersonaNoMatch:    'No destinations match this personality yet.',
    personaPageNoMatch:    (name: string) => `No blueprints yet for "${name}".`,
    searchNoMatchHeadline: (q: string) => `No matches for "${q}"`,
    searchHelp:            'Try a city name like "Agra" or a vibe like "spiritual".',
    cityNotFoundTitle:     'Not Found',
    cityNotFoundBody:      'No blueprint exists for this id.'
  },

  cityCard: {
    blueprintCta: 'Blueprint'
  },

  cityDetail: {
    verifiedBadge:    'Verified Guide',
    oneDayInPrefix:   'One Day',          // followed by line break + "in {City}"
    oneDayInLink:     'in',
    gettingThere:     'Getting There',
    survivalHeading:  'Survival',
    timelineTitle:    'the timeline',
    timelineSub:      '24h Blueprint',
    quickFilters:     ['History', 'Introvert'],     // small filter chips on the timeline
    mintScoreTitle:   'Mint Score',
    mintScoreFooter:  'Verified heritage quality',
    matrixTitle:      'Trip ROI Analysis',
    effortLabel:      'Total Effort Intensity',
    effortLevelHigh:  'HIGH',
    effortLevelMid:   'MID',
    payoffLabel:      'Visual / Soul Payoff',
    payoffLevel:      'ELITE',
    prosLabel:        'Pros',
    consLabel:        'Cons',
    budgetTitle:      'Blueprint Budget',
    budgetSubPrefix:  'Daily Spend in ',     // + city name
    backpacker:       'Backpacker',
    optimum:          'Optimum Choice',
    luxury:           'Luxury',
    mustTryTitle:     'Must-Try Bites'
  },

  destinationsPage: {
    eyebrow:  'All Blueprints',
    title:    'Destinations',
    subtitle: (n: number) => `${n} verified one-day blueprints, each timed and tested by a resident reviewer.`
  },

  personasPage: {
    eyebrow:       'Travel by Personality',
    title:         'Persona Guides',
    subtitle:      'Pick how you travel. We will show you the blueprints that suit your rhythm.',
    pickOneLabel:  'Pick One'        // small label on the filter strip
  },

  aboutPage: {
    eyebrow:  'Our Story',
    title:    'About ReviewMint',
    subtitle: 'We exist because most travel blogs lie a little, every paid review lies a lot, and you only have one weekend.',
    // Use 'auto-cities-count' to auto-populate from DESTINATION_LIST.length.
    stats: [
      { label: 'Verified Cities',     value: 'auto-cities-count' as const },
      { label: 'Hours per Blueprint', value: '24' },
      { label: 'Sponsored Posts',     value: '0' },
      { label: 'Editorial Reviewers', value: '12' }
    ],
    ctaTitle:  'Ready for a tighter trip?',
    ctaBody:   'Browse our verified blueprints and pick a city you can do justice to in 24 hours.',
    ctaButton: 'Explore Destinations'
  },

  searchPage: {
    eyebrow:           'Search Results',
    fallbackTitle:     'Browse All Cities',
    refinePlaceholder: 'Refine your search…',
    summary:           (n: number) => `${n} blueprint${n === 1 ? '' : 's'} found.`
  },

  infoPage: {
    eyebrow:        'Documentation',
    backHomeButton: 'Back to Home'
  },

  footer: {
    brandBlurb: 'High-efficiency travel blueprints for the modern traveler. No filler, only the facts.',

    platformHeading: 'Platform',
    platformLinks: [
      { label: 'About Us',     view: 'about' as const },
      { label: 'How it Works', view: 'info'  as const, topic: 'how-it-works'  as InfoTopic },
      { label: 'Mint Scoring', view: 'info'  as const, topic: 'mint-scoring'  as InfoTopic },
      { label: 'Careers',      view: 'info'  as const, topic: 'careers'       as InfoTopic }
    ],

    communityHeading: 'Community',
    communityLinks: [
      { label: 'Destinations',  view: 'destinations' as const },
      { label: 'Travel Tribes', view: 'info'         as const, topic: 'travel-tribes' as InfoTopic },
      { label: 'Ambassadors',   view: 'info'         as const, topic: 'ambassadors'   as InfoTopic },
      { label: 'Support',       view: 'info'         as const, topic: 'support'       as InfoTopic }
    ],

    newsletterHeading:     'Stay Updated',
    newsletterBlurb:       'Get 1-day guides for your next trip.',
    newsletterPlaceholder: 'Email',
    newsletterButton:      'Join',

    copyright: '© 2026 ReviewMint Travel. Final Proof of Experience.',

    legalLinks: [
      { label: 'Privacy', topic: 'privacy' as InfoTopic },
      { label: 'Terms',   topic: 'terms'   as InfoTopic },
      { label: 'Cookies', topic: 'cookies' as InfoTopic }
    ]
  },

  loginModal: {
    title:               'Sign In',
    meta:                'Demo mode • no real account required',
    emailLabel:          'Email',
    emailPlaceholder:    'you@example.com',
    passwordLabel:       'Password',
    passwordPlaceholder: '••••••••',
    submitButton:        'Sign In',
    fineprint:           'By signing in you agree to our placeholder terms.'
  },

  toasts: {
    invalidEmail:    'Invalid email — please try again.',
    subscribed:      (email: string) => `Subscribed ${email} — check your inbox.`,
    loginWelcome:    (name:  string) => `Welcome back, ${name} (demo mode).`,
    cityComingSoon:  (id:    string) => `No blueprint yet for "${id}" — coming soon.`
  }
};
