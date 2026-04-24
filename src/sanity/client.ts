import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'etmanjr2',
  dataset: 'production',
  apiVersion: '2026-04-20',
  useCdn: !import.meta.env.DEV,
});

export interface Qualifikation {
  titel: string;
  institution?: string;
  ort?: string;
  jahr?: number;
  kategorie: 'facharzt' | 'zusatz' | 'ermaechtigung' | 'ausbildung' | 'promotion' | 'sonstige';
  offshoreRelevant?: boolean;
}

export interface TeamMember {
  _id: string;
  name: string;
  slug?: { current: string };
  position: string;
  jobTitle?: string;
  bio?: string;
  bioEN?: string;
  photo?: { asset: { url: string }; hotspot?: { x: number; y: number }; alt?: string };
  order?: number;
  aktiv?: boolean;
  langBio?: PortableTextBlock[];
  langBioEN?: PortableTextBlock[];
  sprachen?: string[];
  schwerpunkte?: string[];
  schwerpunkteEN?: string[];
  telefon?: string;
  email?: string;
  qualifikationen?: Qualifikation[];
}

export interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style?: string;
  children: { _type: 'span'; _key: string; text: string; marks?: string[] }[];
  markDefs?: unknown[];
}

export interface JobPosting {
  _id: string;
  title: string;
  slug: { current: string };
  active: boolean;
  teaser?: string;
  description?: PortableTextBlock[];
  whatToExpect?: PortableTextBlock[];
  tasksOutdoorTitle?: string;
  tasksOutdoor?: string[];
  tasksOfficeTitle?: string;
  tasksOffice?: string[];
  requirements?: string[];
  benefits?: string[];
  scope?: string;
  location?: string;
  publishedAt?: string;
  validThrough?: string;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return sanityClient.fetch(
    `*[_type == "teamMember" && (aktiv == true || !defined(aktiv))] | order(order asc) { _id, name, slug, position, jobTitle, bio, order, aktiv, photo { asset->{ url }, hotspot, alt } }`
  );
}

const teamMemberFull = `{
  _id, name, slug, position, jobTitle, bio, bioEN, order, aktiv,
  photo { asset->{ url }, hotspot, alt },
  langBio, langBioEN, sprachen, schwerpunkte, schwerpunkteEN, telefon, email,
  qualifikationen[] { titel, institution, ort, jahr, kategorie, offshoreRelevant }
}`;

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  return sanityClient.fetch(
    `*[_type == "teamMember" && slug.current == $slug && aktiv == true][0] ${teamMemberFull}`,
    { slug }
  );
}

export async function getTeamMembersWithProfiles(): Promise<TeamMember[]> {
  return sanityClient.fetch(
    `*[_type == "teamMember" && aktiv == true && defined(slug.current)] | order(order asc) ${teamMemberFull}`
  );
}

export async function getActiveJobPostings(): Promise<JobPosting[]> {
  return sanityClient.fetch(
    `*[_type == "jobPosting" && active == true] | order(publishedAt desc) { _id, title, slug, teaser, description, whatToExpect, tasksOutdoorTitle, tasksOutdoor, tasksOfficeTitle, tasksOffice, requirements, benefits, scope, location, publishedAt, validThrough }`
  );
}

export async function getJobPosting(slug: string): Promise<JobPosting | null> {
  return sanityClient.fetch(
    `*[_type == "jobPosting" && slug.current == $slug && active == true][0] { _id, title, slug, teaser, description, whatToExpect, tasksOutdoorTitle, tasksOutdoor, tasksOfficeTitle, tasksOffice, requirements, benefits, scope, location, publishedAt, validThrough }`,
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
  bezeichnungEN?: string;
  preis?: string;
  einheit?: string;
  hinweis?: string;
}

export interface PreisSektionCMS {
  titel: string;
  titelEN?: string;
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
        titelEN,
        zeilen[] { code, bezeichnung, bezeichnungEN, preis, einheit, hinweis }
      }
    }`
  );
}
