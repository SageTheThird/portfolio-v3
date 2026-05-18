'use client';

import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/cn';

function ChannelCard({
  icon: Icon,
  label,
  value,
  href,
  copyable,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = href;
    }
  }

  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className='card crosshair group flex items-start justify-between gap-4 rounded-md p-5'
    >
      <div className='flex items-start gap-3'>
        <Icon className='mt-0.5 h-5 w-5 text-[color:var(--color-text-dim)] group-hover:text-[color:var(--color-accent)]' />
        <div>
          <div className='mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]'>
            {label}
          </div>
          <div className='mono mt-1 text-sm text-[color:var(--color-text)] group-hover:text-[color:var(--color-accent-hi)]'>
            {value}
          </div>
        </div>
      </div>
      {copyable && (
        <button
          type='button'
          onClick={handleCopy}
          className={cn(
            'mono inline-flex items-center gap-1 rounded-sm border border-[color:var(--color-border)] px-2 py-1 text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]',
            copied && 'border-[color:var(--color-success)]/40 text-[color:var(--color-success)]',
          )}
          aria-label='copy to clipboard'
        >
          {copied ? <Check className='h-3 w-3' /> : <Copy className='h-3 w-3' />}
          <span>{copied ? 'copied' : 'copy'}</span>
        </button>
      )}
    </a>
  );
}

export function ContactSurface() {
  return (
    <div className='mt-12 grid gap-4 md:grid-cols-2'>
      <ChannelCard
        icon={Mail}
        label='email · best path'
        value={siteConfig.email}
        href={`mailto:${siteConfig.email}`}
        copyable
      />
      <ChannelCard
        icon={Linkedin}
        label='linkedin · in/sajidjavedxyz'
        value='message me on LinkedIn'
        href={siteConfig.social.linkedin}
      />
      <ChannelCard
        icon={Github}
        label='github · SageTheThird'
        value='see code'
        href={siteConfig.social.github}
      />
      <ChannelCard
        icon={MapPin}
        label='based in'
        value={siteConfig.location}
        href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.location)}`}
      />
    </div>
  );
}
