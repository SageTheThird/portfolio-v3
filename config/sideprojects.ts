import { Maybe, Tuple } from '../types';

export const defaultDimensions: Tuple<number> = [450, 220];

export interface SideProject {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  dimensions?: Tuple<number>;
}

export const sideprojects: SideProject[] = [
  {
    title: 'SpotiTube Sync',
    slug: 'https://github.com/SageTheThird/SpotiTube-Library-Sync',
    banner:
      'https://opengraph.githubassets.com/1a2b3c4d5e6f7g8h9i0j/SageTheThird/SpotiTube-Library-Sync',
    website: 'https://github.com/SageTheThird/SpotiTube-Library-Sync',
    description: `An itch-scratch built into a tool. Migrating my own liked-songs library from YouTube Music to Spotify exposed how brittle the OAuth + rate-limit handling is across both platforms — so I shipped a Python tool that handles both, with a Chrome extension front-end for one-click control. Caches OAuth state across both providers, batches API calls under the rate ceiling, and reconciles libraries idempotently so repeated runs converge instead of duplicating.`,
    shortDescription:
      'Python + Chrome extension that idempotently mirrors a YouTube Music library to Spotify under both providers’ rate limits.',
    repository: 'https://github.com/SageTheThird/SpotiTube-Library-Sync',
  },
];
