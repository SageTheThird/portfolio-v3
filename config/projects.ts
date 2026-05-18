import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
  deployment: Deployment;
}

export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'Tenure — AI Knowledge Engine',
    slug: 'tenure',
    banner: '/static/projects/tenure/banner.svg',
    website: '',
    description: `A vague mandate — "make our internal corpus feel like sitting with an expert" — turned into a working AI knowledge engine in production, built end-to-end by a single engineer. Hand the system any document corpus (12+ formats, plus IMAP / Gmail / Outlook / Dropbox sync) and it serves back persona-controlled answers grounded in that material.

The architectural bet that paid off: relevance logic lives in one isolated pod, so the orchestration layer has zero knowledge of scoring. Swapping ranking strategies doesn't touch the API. The result is a ~330K-LOC codebase that has stayed shippable across nine cycles of scope expansion — with hybrid BM25 + vector + reciprocal rank fusion behind a clean external API, voice interaction (STT + TTS), pluggable personas with per-conversation locking, and audit logging on every domain event.

Engagement is private. Sole engineer. Architecture, implementation, infrastructure, ops — alone.`,
    shortDescription:
      'Hand any document corpus to a persona-controlled AI tutor. Hybrid retrieval, 12+ formats, voice — built end-to-end by one engineer.',
    repository: null,
    stack: [
      Stack.typescript,
      Stack.python,
      Stack.nestjs,
      Stack.nextjs,
      Stack.react,
      Stack.tailwind,
      Stack.prisma,
      Stack.postgres,
      Stack.opensearch,
      Stack.awslambda,
      Stack.awsstepfunctions,
      Stack.awss3,
      Stack.awsfargate,
      Stack.docker,
      Stack.turborepo,
    ],
    dimensions: [400, 680],
    screenshots: [],
    deployment: {},
    subProjects: [
      {
        title: 'API Orchestrator (NestJS)',
        repository: null,
        description: `The single brain. 12 modules (auth, ingestion, conversation, persona, course, email, cloud-storage, voice, audit, api-key, inspect, v1). Owns Step Functions invocation, S3 lifecycle, pod HTTP clients, and the public v1 API. Knows nothing about how relevance is scored — that's a pod's job.`,
        deployment: {},
      },
      {
        title: 'Retrieval Pod (Hybrid BM25 + kNN + RRF)',
        repository: null,
        description: `OpenSearch behind a thin Python service. BM25 for lexical, kNN for semantic, Reciprocal Rank Fusion to combine them, neighbor expansion for surrounding chunks. Deterministic dedup via sha256(courseId:content). All ranking strategy lives here, so the rest of the system stays stupid about scoring.`,
        deployment: {},
      },
      {
        title: 'Ingestion Pipeline (Step Functions + Lambdas)',
        repository: null,
        description: `5 esbuild-bundled task handlers chained by AWS Step Functions: parse → chunk → embed → index → finalize. Format validation at the boundary, before anything hits the database. PyMuPDF + Tesseract OCR for the formats most pipelines pretend don't exist (scanned PDFs, mixed layouts, multi-column docs).`,
        deployment: {},
      },
      {
        title: 'Email & Cloud Ingestion',
        repository: null,
        description: `IMAP, Gmail, Outlook, Dropbox. Recursive folder walking, MIME negotiation with HTML-first preference, dedup, full-sweep deletion that keeps S3 + OpenSearch + Postgres in sync. The unglamorous half of any real RAG product, built once, correctly.`,
        deployment: {},
      },
    ],
  },

  {
    title: 'Pureland — Web2.5 Token-Gated Film Distribution',
    slug: 'pureland',
    banner: '/static/projects/pureland/hero.png',
    website: 'https://purelands.biz',
    description: `Independent filmmakers can sell verifiable ownership of their work as NFTs while buyers checkout with a credit card and never see a wallet. That's the gap most crypto products fail to close — and the entire reason Pureland exists. Built solo in 11 weeks from blank repo to production.

The architectural call that defines the product: the backend never touches video bytes. Cloudflare Workers across 300+ locations fetch encrypted segments from Arweave and decrypt them on-the-fly using Web Crypto API. The backend's only job is signing short-lived JWTs and reconciling state across three payment providers — Stripe, PayPal REST v2, and Unlock Protocol NFTs on Polygon. One order interface, three rails, all atomic and idempotent.

The schema was built for the future the client hadn't asked for yet — multi-tier Patreon-style access primitives included from day one, so adding new tiers later won't require a migration. 37 services, 11 database models, 456 AES-256-encrypted video segments permanently stored on Arweave. Live now.`,
    shortDescription:
      'Web2.5 film distribution. NFTs on Polygon, encrypted video on Arweave, decryption at the edge. Credit-card checkout that mints on-chain underneath.',
    repository: null,
    stack: [
      Stack.typescript,
      Stack.nestjs,
      Stack.prisma,
      Stack.postgres,
      Stack.nextjs,
      Stack.react,
      Stack.tailwind,
      Stack.cloudflareworkers,
      Stack.cloudflarekv,
      Stack.arweave,
      Stack.polygon,
      Stack.unlockprotocol,
      Stack.ethers,
      Stack.thirdweb,
      Stack.siwe,
      Stack.stripe,
      Stack.paypal,
      Stack.redis,
      Stack.bullmq,
      Stack.docker,
      Stack.githubactions,
      Stack.ffmpeg,
    ],
    dimensions: [400, 680],
    screenshots: [
      '/static/projects/pureland/patron.png',
    ],
    deployment: {
      web: 'https://purelands.biz',
    },
    subProjects: [
      {
        title: 'Creator Pipeline (FFmpeg → AES-256 → Arweave)',
        repository: null,
        description: `Drop in a master film, walk away. FFmpeg encodes HLS in 4 qualities (1080p / 720p / 480p / 360p) at 6-second segments. Each segment gets a unique AES-256-CBC key, encrypts in parallel, uploads to Arweave via Irys with multi-gateway failover, syncs metadata to Postgres and Cloudflare KV. Resumable on failure; 6-8x faster than naive sequential.`,
        deployment: {},
      },
      {
        title: 'Cloudflare Workers — Edge Decryption',
        repository: null,
        description: `Workers at 300+ locations fetch encrypted HLS segments from Arweave, decrypt on-the-fly with Web Crypto API, validate JWT scope, serve. Multi-gateway fallback chain (Irys → node1/2 → arweave.net → ar-io → g8way). The backend never sees video bytes — only signs short-lived URLs.`,
        deployment: {
          web: 'https://purelands.biz',
        },
      },
      {
        title: 'Unified Payment Orchestration',
        repository: null,
        description: `One OrdersService routes to Stripe (payment intents + webhooks), PayPal (REST v2, OAuth2, RSA cert-chain webhook verification, CRC32 + event-ID replay protection), or Unlock Protocol (NFT minting on Polygon). All paths atomic, idempotent, and audited. The frontend doesn't care which rail.`,
        deployment: {},
      },
      {
        title: 'Dual Auth (Wallet + Managed Wallets)',
        repository: null,
        description: `Thirdweb wallet (SIWE) or email/password — both issue the same JWT. Email signups auto-provision a managed wallet on Polygon with AES-256-encrypted private keys, so non-crypto users can buy NFTs with a credit card and never see the chain.`,
        deployment: {},
      },
    ],
  },

  {
    title: 'Leaderboard — Data Intelligence MVP',
    slug: 'leaderboard',
    banner: '/static/projects/leaderboard/banner.svg',
    website: '',
    description: `Most leadership-effectiveness signals are buried in fragmented public data — filings, scraped pages, scattered APIs that don't share IDs. Leaderboard's MVP fuses them into a single queryable knowledge graph ready for LLM analysis, so stakeholders can uncover organizational risks that no individual source surfaces alone.

The work behind the demo is the unification engine: programmatic entity reconciliation across sources with no shared schema, enrichment pipelines that normalize messy filings, and an indexed graph base that makes every downstream query cheap. Engagement is private. Sole engineer.`,
    shortDescription:
      'Fuses fragmented public data into a queryable knowledge graph for LLM analysis. The unification engine no one wants to build.',
    repository: null,
    stack: [
      Stack.python,
      Stack.typescript,
      Stack.nodejs,
      Stack.postgres,
      Stack.awslambda,
      Stack.awss3,
    ],
    dimensions: [400, 680],
    screenshots: [],
    deployment: {},
    subProjects: [],
  },

  {
    title:
      'Darkblock: Revolutionizing Content with Web3 - Unlock, Engage, and Monetize with NFTs!',
    slug: 'darkblock',
    banner: '/static/projects/darkblock/banner.png',
    website: 'https://www.darkblock.io/',
    description: `Darkblock is Web3's missing encryption and access control layer. It is a decentralized chain-agnostic protocol that enables creators to control the distribution and monetization of their content.
    A darkblock is a piece of content encrypted by the Darkblock Protocol and stored on Arweave (where it will live for at least 200 years).
    A darkblock is immutably linked to an NFT. Only the creator of the NFT can add a darkblock to it and only the owner of the NFT can access it. NFT creators can add darkblock unlockable content even after the NFT has been sold.`,
    shortDescription: 'Unlock the power of Web3-native publishing',
    repository: 'https://github.com/darkblockio',
    stack: [
      Stack.javascript,
      Stack.nodejs,
      Stack.tailwind,
      Stack.typescript,
      Stack.react,
      Stack.awslambda,
      Stack.awsdynamodb,
      Stack.awscloudwatch,
      Stack.docker,
      Stack.expo,
      Stack.express,
      Stack.nextjs,
      Stack.awssynthetics,
      Stack.awsrds,
      Stack.moesif,
      Stack.metabase,
      Stack.looker,
    ],
    dimensions: [400, 680],
    screenshots: [
      'OuDBzls.png',
      'os1I98X.png',
      'NOIse8w.png',
      '6Om4Nza.png',
      'ABnRSYK.png',
      'MBIUsfB.png',
      'aXlf0Wo.png',
    ],
    deployment: {
      web: 'https://www.darkblock.io/',
    },
    subProjects: [
      {
        title: 'Darkblock Web-App',
        repository: 'https://github.com/darkblockio',
        description: `The Darkblock web app, app.darkblock.io is a place where NFT creators can add Darkblock unlockable content to NFTs and NFT collections they have created.

          It is also a place where owners can access Darkblock unlockable content that has been added to NFTs they own.`,
        deployment: {
          web: 'https://app.darkblock.io',
        },
      },
      {
        title: 'Darkblock-API',
        repository: 'https://github.com/darkblockio',
        description: `The Darkblock API is a tool for partners to integrate with the Darkblock Protocol quickly and easily with simple REST requests. The API enables you to mint Darkblocks, a piece of content that acts as an upgrade to an NFT, that only the NFT owner can access.`,
        deployment: {
          web: 'https://docs.darkblock.io',
        },
      },
      {
        title: 'Admin Dashboard',
        repository: 'https://github.com/darkblockio',
        description: `The internal Darkblock dashboard used to monitor the metrics that mattered the most in driving the business forward. Build with React, TailwindCSS and Tremor `,
        deployment: {
          web: 'https://darkblock-dashboard.vercel.app/',
        },
      },
      {
        title: 'NPM Packages For Various Chains',
        repository: 'https://github.com/darkblockio',
        description: `Variety of npms available to make integration easy into developer's/partner's React project. The shared component repo is at the center of all of our other npm projects. This contains our media viewer which helps take popular file formats and render them in browser for consumption. The platform specific npms below use the shared component as a base.`,
        deployment: {
          web: 'https://www.npmjs.com/search?q=keywords:darkblock.io',
        },
      },
    ],
  },

  {
    title: 'Shopsy.pk (Now Prislo): A User-Centric E-commerce Evolution',
    slug: 'shopsy',
    banner: '/static/projects/shopsy/banner.png',
    website: 'https://prislo.com/',
    description: `Shopsy.pk, later Prislo, revamped its Android app to set new e-commerce standards. The project focused on intuitive design, leading to a 17% rise in positive reviews. Leveraging advanced technologies and regular updates, the team, including me as a Junior Android Developer, ensured the app's continuous improvement, reflecting user needs and trends.`,
    shortDescription: 'Revitalizing the User Experience with Online Shopping',
    repository: 'https://github.com/SageTheThird',
    stack: [
      Stack.java,
      Stack.androidsdk,
      Stack.dagger2,
      Stack.androidstudio,
      Stack.cicd,
      Stack.room,
      Stack.coredata,
      Stack.firebase,
      Stack.hilt,
      Stack.xml,
      Stack.zaplin,
    ],
    dimensions: [840, 400],
    screenshots: [
      '0yqWclJ.mp4',
      'vX5yRxs.jpg',
      'zoVYEv4.jpg',
      'aIVkJmJ.jpg',
      'ONuROum.jpg',
      '7UeSkTZ.jpg',
      'fQxvFYk.jpg',
      'Cb2gvYJ.jpg',
      '9u3S1y0.jpg',
    ],
    deployment: {
      web: 'https://prislo.com/',
      android:
        'https://play.google.com/store/apps/details?id=com.prislo.prisloapp&hl=en_SG&gl=US',
    },
    subProjects: [],
  },
  {
    title: 'Dads Agree: The Ultimate Parenting Resource',
    slug: 'dadsagree',
    banner: '/static/projects/dadsagree/banner.png',
    website: 'https://dadsagree.com/',
    description: `"Dads Agree" is a unique platform uniting over 30 dedicated fathers from diverse professions, all committed to offering invaluable parenting insights. From developmental milestones to hands-on product reviews, the website serves as a comprehensive guide for parents navigating the complexities of raising children. Each piece of advice and product recommendation is rooted in real-life experiences, ensuring authentic and practical guidance for the parenting community.`,
    shortDescription:
      'A platform where dads share expert parenting advice and product reviews.',
    repository: 'https://github.com/SageTheThird',
    stack: [
      Stack.wordpress,
      Stack.ahreafs,
      Stack.jira,
      Stack.slack,
      Stack.zaplin,
    ],
    dimensions: [400, 680],
    screenshots: [
      '0ZBueyQ.png',
      'Ij278E9.png',
      'zxeolRP.png',
      'A0K1edX.png',
      'thLZCvv.png',
      '056WP8O.png',
      'L7BSmR5.png',
      'Ij278E9.png',
    ],
    deployment: {
      web: 'https://dadsagree.com/',
    },
    subProjects: [],
  },
];
