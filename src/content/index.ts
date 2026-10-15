/**
 * Content access layer.
 *
 * Components import from here only. Today the data comes from the local files
 * in this folder; when Sanity is connected, these functions will query Sanity
 * and return the same shapes (see ./types.ts), so no component needs to change.
 */
import * as home from "./home";
import { hotelTypes, hotels } from "./hotels";
import { footerNav, mainNav, site } from "./site";
import { careers, perspectivesIntro, team, teamGroups, teamIntro } from "./team";
import type { Hotel, TeamMember } from "./types";

export type { Hotel, TeamMember } from "./types";

export function getSiteSettings() {
  return site;
}

export function getNavigation() {
  return { main: mainNav, footer: footerNav };
}

export function getHomeContent() {
  return home;
}

export function getHotels(): Hotel[] {
  return hotels;
}

export function getHotelTypes() {
  return hotelTypes;
}

export function getTeam(): TeamMember[] {
  return team;
}

export function getTeamPageContent() {
  return { teamIntro, teamGroups, perspectivesIntro, careers };
}
