import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  email, phone, addressLine1, addressLine2, schedulingUrl, linkedinUrl, investorLoginUrl,
  heroImage, videoUrl, videoPoster,
  stats[]{value, label}, statsAsOf, statsFootnote,
  seoTitle, seoDescription, legalName, feiNumber, legalDisclaimer,
  showPlaceholders
}`);

export const hotelsQuery = defineQuery(`*[_type == "hotel" && hidden != true] | order(order asc, name asc){
  "slug": slug.current, name, type, address, city, brand, rooms, managedSince, ownership,
  highlights, description, image, gallery
}`);

export const hotelBySlugQuery = defineQuery(`*[_type == "hotel" && slug.current == $slug][0]{
  "slug": slug.current, name, type, address, city, brand, rooms, managedSince, ownership,
  highlights, description, image, gallery
}`);

export const teamQuery = defineQuery(`*[_type == "teamMember" && hidden != true] | order(order asc, name asc){
  "slug": slug.current, name, title, group, bio, photo, email, linkedinUrl, perspective
}`);

export const testimonialsQuery = defineQuery(`*[_type == "testimonial" && approved == true] | order(order asc){
  quote, name, role, company
}`);

export const servicesQuery = defineQuery(`*[_type == "service"] | order(order asc, title asc){
  "slug": slug.current, title, description, details, icon
}`);

export const financialStrengthQuery = defineQuery(`*[_type == "financialStrength"][0]{
  heading, intro, hidden,
  metrics[]{value, label, note},
  charts[]{title, caption, format, max, bars[]{label, value, display, emphasis}}
}`);
