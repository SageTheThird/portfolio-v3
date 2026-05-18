import Link from 'next/link';
import { CursorBlink } from '@/components/cursor-blink';
import { TypedText } from '@/components/typed-text';

const ASCII_404 = `
  ██╗  ██╗ ██████╗ ██╗  ██╗
  ██║  ██║██╔═████╗██║  ██║
  ███████║██║██╔██║███████║
  ╚════██║████╔╝██║╚════██║
       ██║╚██████╔╝     ██║
       ╚═╝ ╚═════╝      ╚═╝
`;

const suggestions = [
  { href: '/', label: 'home', hint: 'identity + featured work' },
  { href: '/work', label: 'work', hint: 'every shipped surface' },
  { href: '/about', label: 'about', hint: 'who, what, why' },
  { href: '/contact', label: 'contact', hint: 'how to reach me' },
];

export default function NotFound() {
  return (
    <div className='mx-auto flex min-h-[72vh] max-w-[var(--container-prose)] flex-col justify-center px-6 py-16'>
      {/* Terminal-style error transcript */}
      <div className='mono space-y-1 text-[12px] text-[color:var(--color-text-dim)]'>
        <div>
          <span className='text-[color:var(--color-accent)]'>$</span>{' '}
          <TypedText
            text='cd /requested-path'
            speedMs={28}
            className='text-[color:var(--color-text)]'
          />
        </div>
        <div className='pl-3 text-[color:var(--color-danger)]'>
          <TypedText
            text='-bash: cd: /requested-path: No such file or directory'
            speedMs={14}
            startDelayMs={650}
          />
        </div>
        <div className='pl-3 text-[color:var(--color-text-dim)]'>
          <TypedText
            text='did you mean one of these?'
            speedMs={20}
            startDelayMs={1800}
          />
        </div>
      </div>

      {/* Big ASCII */}
      <pre
        aria-hidden
        className='mono mt-10 select-none whitespace-pre text-[10px] leading-[1.05] text-[color:var(--color-accent)]/80 sm:text-[12px] md:text-[14px]'
      >
        {ASCII_404}
      </pre>

      <h1 className='mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl'>
        Lost in the file tree.
      </h1>
      <p className='mt-3 max-w-xl text-base text-[color:var(--color-text-muted)]'>
        The route you asked for does not exist. Either it never did, or it
        moved. Hit{' '}
        <span className='mono text-[color:var(--color-accent)]'>⌘K</span> and
        navigate from anywhere, or pick one below.
      </p>

      {/* Suggestion grid — terminal-tab-completion style */}
      <ul className='mono mt-10 space-y-1 text-sm'>
        {suggestions.map((s, i) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className='crosshair group grid grid-cols-[3rem_8rem_1fr_auto] items-center gap-2 rounded-sm border border-transparent px-3 py-2 transition hover:border-[color:var(--color-border-hi)] hover:bg-[color:var(--color-surface)]/60'
            >
              <span className='text-[10.5px] text-[color:var(--color-text-dim)] tabular-nums'>
                [{i + 1}]
              </span>
              <span className='text-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent-hi)]'>
                cd ~/{s.label}
              </span>
              <span className='truncate text-[color:var(--color-text-dim)]'>
                {s.hint}
              </span>
              <span className='text-[color:var(--color-text-dim)] transition group-hover:text-[color:var(--color-accent)]'>
                ↵
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className='mono mt-8 flex items-center gap-2 text-[12px] text-[color:var(--color-text-dim)]'>
        <span className='text-[color:var(--color-accent)]'>$</span>
        <span className='text-[color:var(--color-text)]'>_</span>
        <CursorBlink />
      </div>
    </div>
  );
}
