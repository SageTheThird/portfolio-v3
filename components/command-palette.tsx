'use client';

import { Command } from 'cmdk';
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Github,
  Home,
  Linkedin,
  Mail,
  Search,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site-config';

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  group: string;
  onSelect: () => void;
}

interface PaletteData {
  projects: { slug: string; title: string; year?: string }[];
}

export function CommandPalette({ data }: { data: PaletteData }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  function go(href: string) {
    return () => {
      router.push(href);
      setOpen(false);
    };
  }

  function copy(text: string) {
    return async () => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        /* no-op */
      }
      setOpen(false);
    };
  }

  const items: CommandItem[] = [
    { id: 'home', label: 'home', icon: Home, group: 'Navigate', onSelect: go('/') },
    { id: 'work', label: 'work', icon: Briefcase, group: 'Navigate', onSelect: go('/work') },
    { id: 'about', label: 'about', icon: User, group: 'Navigate', onSelect: go('/about') },
    { id: 'contact', label: 'contact', icon: Mail, group: 'Navigate', onSelect: go('/contact') },
    ...data.projects.map(p => ({
      id: `proj-${p.slug}`,
      label: p.title,
      hint: p.year,
      icon: Code2,
      group: 'Projects',
      onSelect: go(`/work/${p.slug}`),
    })),
    {
      id: 'copy-email',
      label: `copy email — ${siteConfig.email}`,
      icon: Mail,
      group: 'Actions',
      onSelect: copy(siteConfig.email),
    },
    {
      id: 'github',
      label: 'open GitHub',
      icon: Github,
      group: 'Actions',
      onSelect: () => {
        window.open(siteConfig.social.github, '_blank');
        setOpen(false);
      },
    },
    {
      id: 'linkedin',
      label: 'open LinkedIn',
      icon: Linkedin,
      group: 'Actions',
      onSelect: () => {
        window.open(siteConfig.social.linkedin, '_blank');
        setOpen(false);
      },
    },
  ];

  const groups = Array.from(new Set(items.map(i => i.group)));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label='command palette'
      className='fixed inset-0 z-50 flex items-start justify-center pt-[12vh]'
      overlayClassName='fixed inset-0 bg-black/65 backdrop-blur-sm'
      contentClassName='relative w-[min(620px,calc(100vw-2rem))] overflow-hidden rounded-md border border-[color:var(--color-border-hi)] bg-[color:var(--color-surface-elev)] shadow-[0_20px_60px_rgb(0_0_0_/_0.6)]'
    >
      <div className='flex items-center gap-2 border-b border-[color:var(--color-border)] px-4'>
        <Search className='h-4 w-4 text-[color:var(--color-text-dim)]' />
        <Command.Input
          placeholder='type a command, project, or page…'
          className='mono flex-1 bg-transparent py-3.5 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-dim)] focus:outline-none'
        />
        <span className='mono rounded-sm border border-[color:var(--color-border)] px-1.5 py-0.5 text-[10px] text-[color:var(--color-text-dim)]'>
          esc
        </span>
      </div>

      <Command.List className='mono max-h-[60vh] overflow-y-auto px-2 py-2 text-sm'>
        <Command.Empty className='px-3 py-6 text-center text-[color:var(--color-text-dim)]'>
          no matches — try another query.
        </Command.Empty>

        {groups.map(group => (
          <Command.Group
            key={group}
            heading={
              <span className='mono px-2 pb-1 pt-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]'>
                {group}
              </span>
            }
          >
            {items
              .filter(i => i.group === group)
              .map(item => {
                const Icon = item.icon;
                return (
                  <Command.Item
                    key={item.id}
                    value={`${item.group} ${item.label} ${item.hint ?? ''}`}
                    onSelect={item.onSelect}
                    className='group flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-[color:var(--color-text-muted)] aria-selected:bg-[color:var(--color-surface)] aria-selected:text-[color:var(--color-text)]'
                  >
                    <Icon className='h-4 w-4 text-[color:var(--color-text-dim)] group-aria-selected:text-[color:var(--color-accent)]' />
                    <span className='flex-1 truncate'>{item.label}</span>
                    {item.hint && (
                      <span className='text-[10px] text-[color:var(--color-text-dim)]'>
                        {item.hint}
                      </span>
                    )}
                    <ArrowUpRight className='h-3 w-3 text-[color:var(--color-text-dim)] opacity-0 transition-opacity group-aria-selected:opacity-100' />
                  </Command.Item>
                );
              })}
          </Command.Group>
        ))}
      </Command.List>

      <div className='mono flex items-center justify-between border-t border-[color:var(--color-border)] px-4 py-2 text-[10px] text-[color:var(--color-text-dim)]'>
        <div className='flex items-center gap-3'>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
        <span>sajid.dev / ~</span>
      </div>
    </Command.Dialog>
  );
}
