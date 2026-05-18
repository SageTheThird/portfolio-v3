import { projects, type Project, type SubProject } from '@/config/projects';
import { sideprojects, type SideProject } from '@/config/sideprojects';
import { Stack, StackInfo } from '@/config/stack';

export type { Project, SubProject, SideProject };
export { Stack, StackInfo };

export interface ProjectMeta {
  slug: string;
  title: string;
  year?: string;
  status?: 'shipped' | 'in-progress' | 'archived';
  duration?: string;
  role?: 'solo' | 'lead' | 'contributor';
}

const meta: Record<string, ProjectMeta> = {
  tenure: {
    slug: 'tenure',
    title: 'Tenure',
    year: '2026',
    status: 'in-progress',
    duration: '9+ months',
    role: 'solo',
  },
  pureland: {
    slug: 'pureland',
    title: 'Pureland',
    year: '2025',
    status: 'shipped',
    duration: '11 weeks',
    role: 'solo',
  },
  leaderboard: {
    slug: 'leaderboard',
    title: 'Leaderboard',
    year: '2025',
    status: 'archived',
    duration: 'MVP',
    role: 'solo',
  },
  darkblock: {
    slug: 'darkblock',
    title: 'Darkblock',
    year: '2021–2024',
    status: 'shipped',
    duration: '3 years',
    role: 'solo',
  },
  shopsy: {
    slug: 'shopsy',
    title: 'Shopsy.pk',
    year: '2019',
    status: 'shipped',
    duration: '7 months',
    role: 'contributor',
  },
  dadsagree: {
    slug: 'dadsagree',
    title: 'Dads Agree',
    year: '2020',
    status: 'shipped',
    duration: '11 months',
    role: 'contributor',
  },
};

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p =>
    ['tenure', 'pureland', 'darkblock'].includes(p.slug),
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getProjectMeta(slug: string): ProjectMeta {
  return meta[slug] ?? { slug, title: slug };
}

const hoverBanners: Record<string, string> = {
  pureland: '/static/projects/pureland/patron.png',
};

export function getProjectHoverBanner(slug: string): string | undefined {
  return hoverBanners[slug];
}

export function getAllSideProjects(): SideProject[] {
  return sideprojects;
}

export function getProjectSlugs(): string[] {
  return projects.map(p => p.slug);
}

export function getStackList(stack: Stack[]): { name: string; color: string }[] {
  return stack.map(s => {
    const info = StackInfo[s];
    return { name: info.value, color: info.color };
  });
}
