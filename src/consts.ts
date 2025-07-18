import type { IconMap, Site, SocialLink } from '@/types'

export const SITE: Site = {
  title: 'XiaoChai',
  description: '个人博客，记录生活中的点滴，分享编程和技术的经验。',
  href: 'https://astro-erudite.vercel.app',
  author: 'Chai',
  locale: 'zh-CN',
  featuredPostCount: 2,
  postsPerPage: 5,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/carberrychai',
    label: 'GitHub',
  },
  {
    href: 'https://x.com/CarberryChai',
    label: 'Twitter',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
