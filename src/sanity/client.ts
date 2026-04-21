import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'etmanjr2',
  dataset: 'production',
  apiVersion: '2026-04-20',
  useCdn: true,
});

export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio?: string;
  photo?: { asset: { url: string }; hotspot?: { x: number; y: number } };
  order?: number;
}

export interface JobPosting {
  _id: string;
  title: string;
  slug: { current: string };
  active: boolean;
  description?: string;
  tasks?: string[];
  requirements?: string[];
  scope?: string;
  location?: string;
  publishedAt?: string;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return sanityClient.fetch(
    `*[_type == "teamMember"] | order(order asc) { _id, name, position, bio, order, photo { asset->{ url }, hotspot } }`
  );
}

export async function getActiveJobPostings(): Promise<JobPosting[]> {
  return sanityClient.fetch(
    `*[_type == "jobPosting" && active == true] | order(publishedAt desc) { _id, title, slug, description, tasks, requirements, scope, location, publishedAt }`
  );
}

export async function getJobPosting(slug: string): Promise<JobPosting | null> {
  return sanityClient.fetch(
    `*[_type == "jobPosting" && slug.current == $slug && active == true][0] { _id, title, slug, description, tasks, requirements, scope, location, publishedAt }`,
    { slug }
  );
}

export interface GalleryImage {
  _id: string;
  title: string;
  alt: string;
  category: 'hero' | 'ueber-uns' | 'leistungen';
  order?: number;
  image: { asset: { url: string }; hotspot?: { x: number; y: number } };
}

export interface SiteSettings {
  heroImage?: { asset: { url: string }; hotspot?: { x: number; y: number } };
  heroImageAlt?: string;
}

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  const filter = category
    ? `*[_type == "galleryImage" && category == $category]`
    : `*[_type == "galleryImage"]`;
  return sanityClient.fetch(
    `${filter} | order(order asc) { _id, title, alt, category, order, image { asset->{ url }, hotspot } }`,
    category ? { category } : {}
  );
}

export interface PreisZeileCMS {
  code?: string;
  bezeichnung: string;
  preis?: string;
  einheit?: string;
  hinweis?: string;
}

export interface PreisSektionCMS {
  titel: string;
  zeilen: PreisZeileCMS[];
}

export interface PriceList {
  _id: string;
  category: 'g-untersuchungen' | 'sonderuntersuchungen' | 'labor' | 'impfungen';
  updatedAt?: string;
  sektionen?: PreisSektionCMS[];
}

export async function getPriceLists(): Promise<PriceList[]> {
  return sanityClient.fetch(
    `*[_type == "priceList"] {
      _id,
      category,
      updatedAt,
      sektionen[] {
        titel,
        zeilen[] { code, bezeichnung, preis, einheit, hinweis }
      }
    }`
  );
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] { heroImage { asset->{ url }, hotspot }, heroImageAlt }`
  );
}
