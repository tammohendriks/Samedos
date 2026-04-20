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
