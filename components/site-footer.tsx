import Link from 'next/link'
import {
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Users,
  Zap,
} from 'lucide-react'
import { articles } from '@/lib/site-content'

const usefulLinks = [
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/blog' },
  { label: 'Classes', href: '/classes' },
  { label: 'Contact', href: '/contact' },
]

const supportLinks = [
  { label: 'Frequently asked questions', href: '/faq' },
  { label: 'Memberships', href: '/membership' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: Users },
  { label: 'Twitter', href: 'https://twitter.com/', icon: MessageCircle },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: Play },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Camera },
  { label: 'Email', href: 'mailto:Support.gymcenter@gmail.com', icon: Mail },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="contact-bar" aria-label="Contact information">
        <a
          className="contact-item"
          href="https://www.google.com/maps/search/?api=1&query=333+Middle+Winchendon+Rd%2C+Rindge%2C+NH+03461"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Find us at 333 Middle Winchendon Road, Rindge, New Hampshire 03461"
        >
          <span className="contact-icon"><MapPin size={26} fill="currentColor" aria-hidden="true" /></span>
          <span>333 Middle Winchendon Rd, Rindge,<br />NH 03461</span>
        </a>

        <div className="contact-item">
          <span className="contact-icon"><Phone size={24} fill="currentColor" aria-hidden="true" /></span>
          <div className="contact-copy contact-phone-links">
            <a href="tel:125711811">125-711-811</a>
            <a href="tel:125668886">125-668-886</a>
          </div>
        </div>

        <a className="contact-item contact-email" href="mailto:Support.gymcenter@gmail.com">
          <span className="contact-icon"><Mail size={27} fill="currentColor" aria-hidden="true" /></span>
          <span>Support.gymcenter@gmail.com</span>
        </a>
      </section>

      <div className="footer-main">
        <div className="footer-grid">
          <section className="footer-brand-column" aria-label="About Titan Fitness">
            <Link href="/" className="brand footer-brand">
              <span className="brand-mark"><Zap size={18} fill="currentColor" /></span>
              TITAN<span className="brand-light">/</span><span className="brand-light">FITNESS</span>
            </Link>
            <p className="footer-description">
              Show up for you and each other. Find your people, build your strength, and make every day count.
            </p>
            <div className="footer-socials" aria-label="Social media">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <Icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="footer-placeholder-note">Official contact details and social profiles are editable placeholders pending confirmation.</p>
          </section>

          <nav className="footer-column" aria-label="Useful links">
            <h2>Useful links</h2>
            <div className="footer-links">
              {usefulLinks.map(({ label, href }) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          </nav>

          <nav className="footer-column" aria-label="Support">
            <h2>Support</h2>
            <div className="footer-links">
              {supportLinks.map(({ label, href }) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          </nav>

          <section className="footer-guides" id="tips-guides" aria-labelledby="footer-guides-title">
            <h2 id="footer-guides-title">Tips &amp; Guides</h2>
            <div className="footer-articles">
              {articles.slice(0, 2).map((article) => (
                <article className="footer-article" key={article.slug}>
                  <Link className="footer-article-title" href={`/blog/${article.slug}`}>{article.title}</Link>
                  <p className="footer-article-meta">
                    <span>{article.meta}</span>
                    <span className="footer-meta-divider" aria-hidden="true">|</span>
                    <Link href={`/blog/${article.slug}`}>Read article</Link>
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="footer-copyright">
        <span>Copyright © 2026 Titan Fitness. All rights reserved.</span>
      </div>
    </footer>
  )
}
