import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Zap } from 'lucide-react'

const links = [
  { label: 'The club', href: '/club' },
  { label: 'Classes', href: '/classes' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Services', href: '/services' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader({ currentHref }: { currentHref?: string }) {
  return (
    <>
      <div className="announcement">
        <span className="live-dot" aria-hidden="true" />
        NOW OPEN · YOUR NEW TRAINING GROUND
        <Link href="/membership">Explore memberships <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Titan Fitness home">
          <span className="brand-mark"><Zap size={18} fill="currentColor" aria-hidden="true" /></span>
          TITAN<span className="brand-light">/</span><span className="brand-light">FITNESS</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(({ label, href }) => (
            <Link key={href} href={href} aria-current={currentHref === href ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <details className="mobile-menu">
          <summary>Menu <span aria-hidden="true">+</span></summary>
          <nav className="mobile-menu-panel" aria-label="Mobile navigation">
            {links.map(({ label, href }) => (
              <Link key={href} href={href} aria-current={currentHref === href ? 'page' : undefined}>
                {label}
              </Link>
            ))}
            <Link href="/membership" aria-current={currentHref === '/membership' ? 'page' : undefined}>Memberships</Link>
          </nav>
        </details>
        <Link className="button button-lime nav-cta" href="/membership">
          View plans <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </header>
    </>
  )
}
