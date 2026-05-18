export const siteConfig = {
  name: 'Sajid Javed',
  handle: 'sajidjavedxyz',
  title: 'Sajid Javed — Senior Software Engineer (AI · Backend · Web3)',
  description:
    'Senior solo full-stack engineer. Six years shipping production AI, web3, and distributed backend systems end-to-end. The team is one person. The shipping is teamlike.',
  url: 'https://sajidjaved.vercel.app',
  ogImage: '/static/og-default.png',
  location: 'Dubai, United Arab Emirates',
  email: 'ksajid505@gmail.com',
  social: {
    github: 'https://github.com/SageTheThird',
    linkedin: 'https://www.linkedin.com/in/sajidjavedxyz',
    portfolio: 'https://sajidjaved.vercel.app',
  },
  resumeUrl: '/static/sajid-javed-cv.pdf',
} as const;

export const navLinks = [
  { href: '/', label: 'home' },
  { href: '/work', label: 'work' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
] as const;
