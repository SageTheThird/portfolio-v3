import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, FileDown, Github, Linkedin, Mail } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'About',
  description: siteConfig.description,
};

const stats = [
  { value: '6+', label: 'years shipping production' },
  { value: '1', label: 'engineer on every project' },
  { value: '~330K', label: 'lines on active AI engine' },
  { value: '11 weeks', label: 'pureland zero-to-live' },
];

const skillGroups: { title: string; items: string[] }[] = [
  {
    title: 'AI & ML',
    items: [
      'RAG / hybrid retrieval (BM25 + vector + RRF)',
      'Knowledge-graph construction',
      'LLM orchestration & persona systems',
      'Embeddings · semantic search · prompt engineering',
      'OpenAI SDK (provider-agnostic)',
    ],
  },
  {
    title: 'Backend',
    items: [
      'NestJS · FastAPI · Node.js / Express',
      'TypeScript · Python',
      'Microservices · event-driven architectures',
      'BullMQ · Redis · Prisma ORM',
    ],
  },
  {
    title: 'Web3 / Blockchain',
    items: [
      'Unlock Protocol · ethers.js v6 · Polygon',
      'Thirdweb SDK · SIWE wallet auth',
      'Arweave (via Irys)',
      'Smart-contract integration & signature verification',
      'Web Crypto API',
    ],
  },
  {
    title: 'Cloud & Infra',
    items: [
      'AWS (Step Functions, Lambda, ECS Fargate, ALB, Amplify, S3, OpenSearch, Secrets Manager)',
      'Cloudflare Workers + KV',
      'Docker · GitHub Actions CI/CD',
      'Fly.io · Firebase · Nginx',
    ],
  },
  {
    title: 'Data',
    items: [
      'PostgreSQL · MongoDB · DynamoDB',
      'Elasticsearch · OpenSearch',
      'Vector databases',
      'Looker · Metabase',
    ],
  },
  {
    title: 'Frontend & Mobile',
    items: [
      'React 19 · Next.js 15 (App Router) · Tailwind',
      'React Native',
      'Android SDK · iOS SDK · Swift · Kotlin',
    ],
  },
  {
    title: 'Payments',
    items: [
      'Stripe',
      'PayPal REST v2 (OAuth2 + webhook verification)',
      'Unlock Protocol checkout',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className='mx-auto max-w-[var(--container-wide)] px-6 pt-16 pb-24 md:pt-24'>
      <SectionHeader
        label='About · whoami'
        subhead='Senior solo full-stack engineer. AI, backend, web3.'
        className='mb-12'
      />

      {/* Bio */}
      <section className='grid gap-12 md:grid-cols-[2fr_1fr]'>
        <div className='space-y-6 text-lg leading-relaxed text-[color:var(--color-text-muted)] md:text-[19px]'>
          <p className='text-[color:var(--color-text)]'>
            I&apos;m Sajid. I build production systems alone — architecture,
            code, infrastructure, ops, end-to-end. The kind of work usually
            spread across a small team, run by one person who can hold the whole
            shape in their head.
          </p>
          <p>
            For three years I was the only engineer at Darkblock, building a
            decentralized unlockables platform that served thousands of users
            and an SDK partners integrated against. Since 2024 I&apos;ve been
            independent — shipping production AI for a private client
            (Tenure&nbsp;— ~330K LOC, hybrid retrieval, voice, multi-format
            ingestion) and a Web2.5 film-distribution platform (Pureland —
            live at purelands.biz, 11 weeks blank-repo to production, three
            payment rails, Cloudflare Workers decrypting at the edge).
          </p>
          <p>
            What I do well: take a vague mandate, hold the architectural shape
            in one head, ship it correctly the first time. What I don&apos;t do:
            customer-facing engineering, sales-engineering, dev-rel as a
            primary role.
          </p>
        </div>

        <aside className='mono space-y-4 text-[12px] text-[color:var(--color-text-muted)]'>
          <div className='card rounded-md p-5'>
            <div className='text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]'>
              status
            </div>
            <div className='mt-2 flex items-center gap-2 text-[color:var(--color-success)]'>
              <span className='inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)] shadow-[0_0_8px_var(--color-success)]' />
              <span>open to work · remote</span>
            </div>
            <div className='mt-4 space-y-1 text-[color:var(--color-text-muted)]'>
              <div>
                <span className='text-[color:var(--color-text-dim)]'>loc</span>{' '}
                Dubai, UAE
              </div>
              <div>
                <span className='text-[color:var(--color-text-dim)]'>tz</span>{' '}
                any (GST flexible)
              </div>
              <div>
                <span className='text-[color:var(--color-text-dim)]'>exp</span>{' '}
                6+ years
              </div>
            </div>
          </div>

          <div className='card rounded-md p-5'>
            <div className='text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]'>
              find me
            </div>
            <div className='mt-3 space-y-2'>
              <a
                href={siteConfig.social.github}
                target='_blank'
                rel='noopener noreferrer'
                className='nav-link flex items-center gap-2 hover:text-[color:var(--color-text)]'
              >
                <Github className='h-4 w-4' /> github
              </a>
              <a
                href={siteConfig.social.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='nav-link flex items-center gap-2 hover:text-[color:var(--color-text)]'
              >
                <Linkedin className='h-4 w-4' /> linkedin
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className='nav-link flex items-center gap-2 hover:text-[color:var(--color-text)]'
              >
                <Mail className='h-4 w-4' /> email
              </a>
              <a
                href={siteConfig.resumeUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='nav-link flex items-center gap-2 hover:text-[color:var(--color-text)]'
              >
                <FileDown className='h-4 w-4' /> résumé.pdf
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Stats */}
      <section className='mt-20 border-t border-[color:var(--color-border)] pt-10'>
        <div className='grid gap-6 md:grid-cols-4'>
          {stats.map(s => (
            <div key={s.label} className='space-y-1'>
              <div className='text-3xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-4xl'>
                {s.value}
              </div>
              <div className='mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-text-dim)]'>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className='mt-20'>
        <SectionHeader
          label='Skills · $ cat ~/.toolbelt'
          subhead='What I reach for.'
          className='mb-10'
        />
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {skillGroups.map(g => (
            <div key={g.title} className='space-y-3'>
              <div className='mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]'>
                <span className='h-px w-4 bg-[color:var(--color-accent)]/60' />
                {g.title}
              </div>
              <ul className='space-y-1.5 text-sm text-[color:var(--color-text-muted)]'>
                {g.items.map(i => (
                  <li key={i} className='flex gap-2'>
                    <span className='text-[color:var(--color-text-dim)]'>›</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='mt-20 flex flex-wrap items-center gap-4 border-t border-[color:var(--color-border)] pt-10'>
        <Link
          href='/work'
          className='mono inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 px-4 py-2 text-sm font-medium text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-accent)]/20'
        >
          <span>see the work</span>
          <ArrowUpRight className='h-4 w-4' />
        </Link>
        <Link
          href='/contact'
          className='mono inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]'
        >
          <span>get in touch</span>
        </Link>
      </section>
    </div>
  );
}
