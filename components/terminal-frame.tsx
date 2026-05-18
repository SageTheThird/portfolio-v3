'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CommandPalette } from './command-palette';
import { FooterStatus } from './footer-status';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/cn';
import { navLinks } from '@/lib/site-config';

interface PaletteData {
  projects: { slug: string; title: string; year?: string }[];
}

function PathCrumb({ pathname }: { pathname: string }) {
  const segments = pathname === '/' ? [] : pathname.split('/').filter(Boolean);
  return (
    <span className='mono truncate text-[12px] text-[color:var(--color-text-muted)]'>
      <span className='text-[color:var(--color-text-dim)]'>~/sajid.dev</span>
      {segments.length === 0 ? null : (
        <span>
          <span className='text-[color:var(--color-text-dim)]'>/</span>
          {segments.map((seg, i) => (
            <span key={`${seg}-${i}`}>
              <span
                className={
                  i === segments.length - 1
                    ? 'text-[color:var(--color-accent)]'
                    : 'text-[color:var(--color-text-muted)]'
                }
              >
                {decodeURIComponent(seg)}
              </span>
              {i < segments.length - 1 && (
                <span className='text-[color:var(--color-text-dim)]'>/</span>
              )}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}

export function TerminalFrame({
  children,
  paletteData,
}: {
  children: React.ReactNode;
  paletteData: PaletteData;
}) {
  const pathname = usePathname() ?? '/';

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Top bar */}
      <header className='sticky top-0 z-30 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/85 backdrop-blur'>
        <div className='mx-auto flex max-w-[var(--container-wide)] items-center gap-4 px-6 py-3'>
          {/* Window dots */}
          <div className='flex items-center gap-1.5'>
            <span className='inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--color-danger)] opacity-80' />
            <span className='inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--color-warn)] opacity-80' />
            <span className='inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--color-success)] opacity-80' />
          </div>

          {/* Path crumb */}
          <PathCrumb pathname={pathname} />

          <div className='hidden flex-1 md:block' />

          {/* Nav links (md+) */}
          <nav className='mono hidden items-center gap-5 text-[12px] text-[color:var(--color-text-dim)] md:flex'>
            {navLinks.map(link => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={active}
                  className={cn(
                    'nav-link',
                    active && 'text-[color:var(--color-text)]',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme toggle + ⌘K chip */}
          <ThemeToggle />
          <CommandKChip />
        </div>
      </header>

      {/* Main */}
      <main className='flex-1'>{children}</main>

      <FooterStatus />

      <CommandPalette data={paletteData} />
    </div>
  );
}

function CommandKChip() {
  return (
    <button
      type='button'
      onClick={() => {
        const ev = new KeyboardEvent('keydown', {
          key: 'k',
          metaKey: true,
          ctrlKey: true,
          bubbles: true,
        });
        document.dispatchEvent(ev);
      }}
      className='mono inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2 py-1 text-[11px] text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]'
      aria-label='open command palette'
    >
      <span>⌘K</span>
    </button>
  );
}
