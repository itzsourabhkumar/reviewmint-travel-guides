// Lite city directory — historical.
//
// The 43 cities that once lived here as "Quick Overview" stubs have all
// been promoted to full 24-hour blueprints in src/data/destinations.ts,
// so every tracked city now renders the complete CityView.
//
// This module is intentionally kept (with an empty list) so existing
// imports — `LITE_CITIES`, the `LiteCity` type, and `liteCitiesAsSummary`
// — keep resolving and the legacy LiteCityView stays compilable as a
// safe fallback. Add an entry here only if you ever reintroduce a
// stub-only city.

import type { DestinationSummary } from './destinations';

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

export const LITE_CITIES: LiteCity[] = [];

export function liteCitiesAsSummary(): DestinationSummary[] {
  return LITE_CITIES.map((c, i) => ({
    id: c.id,
    name: c.name,
    tagline: c.tagline,
    image: c.image,
    rating: 'NEW',
    personalities: c.personalities,
    moods: [],
    score: 0,
    budgetTier: 'Budget' as const,
    order: 10_000 + i,
  }));
}
