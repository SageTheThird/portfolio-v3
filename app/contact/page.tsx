import type { Metadata } from 'next';
import { ContactSurface } from '@/components/contact-surface';
import { SectionHeader } from '@/components/section-header';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to reach me. No form, no friction.',
};

export default function ContactPage() {
  return (
    <div className='mx-auto max-w-[var(--container-prose)] px-6 pt-16 pb-24 md:pt-24'>
      <SectionHeader
        label='Contact · $ mail -s …'
        subhead='How to reach me. No form, no friction.'
        className='mb-12'
      />

      <div className='space-y-6 text-lg leading-relaxed text-[color:var(--color-text-muted)]'>
        <p className='text-[color:var(--color-text)]'>
          The fastest path is email. I read everything, answer everything that
          isn&apos;t a pitch deck.
        </p>
        <p>
          If you&apos;re a recruiter: please include the role, comp range, and
          whether it&apos;s fully remote. Saves both of us a thread.
        </p>
        <p>
          If you&apos;re a founder or hiring manager:{' '}
          <a
            href={`mailto:${siteConfig.email}`}
            className='text-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hi)]'
          >
            email me directly
          </a>{' '}
          with a couple of lines on what you&apos;re building and what you need.
        </p>
      </div>

      <ContactSurface />
    </div>
  );
}
