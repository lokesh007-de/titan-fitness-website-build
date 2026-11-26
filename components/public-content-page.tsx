import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, MapPin, Mail, Phone, Sparkles } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import type { ContentEntry, ContentSection } from '@/lib/site-content'

type ContentKind = 'classes' | 'trainers' | 'services' | 'blog'

type MembershipPlanView = {
  id: string
  name: string
  tagline: string
  description: string
  priceCents: number
  durationDays: number
  billingInterval: string
  benefits: string[]
  featured: boolean
}

function PublicShell({ currentHref, children }: { currentHref: string; children: React.ReactNode }) {
  return (
    <>
      <SiteHeader currentHref={currentHref} />
      <main className="public-page">{children}</main>
      <SiteFooter />
    </>
  )
}

function PublicHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="public-hero" aria-labelledby="public-title">
      <div className="public-hero-glow" aria-hidden="true" />
      <div className="public-hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p>
        <h1 id="public-title">{title}</h1>
        <p>{description}</p>
      </div>
      <span className="public-hero-index" aria-hidden="true">TITAN / TRAIN YOUR WAY</span>
    </section>
  )
}

export function PublicListingPage({
  kind,
  title,
  eyebrow,
  description,
  notice,
  items,
}: {
  kind: ContentKind
  title: string
  eyebrow: string
  description: string
  notice?: string
  items: ContentEntry[]
}) {
  return (
    <PublicShell currentHref={`/${kind}`}>
      <PublicHero eyebrow={eyebrow} title={title} description={description} />
      <section className="public-section" aria-label={`${title} at Titan Fitness`}>
        <div className="public-section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> MADE FOR REAL LIFE</p>
            <h2>Find your next<br /><span>good move.</span></h2>
          </div>
          <p>Explore the options, take what fits, and ask the team if you need help choosing a place to start.</p>
        </div>
        {notice && <p className="content-placeholder-note">{notice}</p>}
        <div className="public-card-grid">
          {items.map((item, index) => (
            <Link className="public-card" href={`/${kind}/${item.slug}`} key={item.slug}>
              <div className="public-card-image">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw"
                />
                <span className="public-card-number">0{index + 1}</span>
              </div>
              <div className="public-card-copy">
                <p className="public-card-eyebrow">{item.eyebrow}</p>
                <div className="public-card-title-row">
                  <h2>{item.title}</h2>
                  <span className="public-card-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
                </div>
                <p className="public-card-description">{item.description}</p>
                <span className="public-card-meta">{item.meta}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="public-inline-cta">
          <p>Not sure where to start? A real person can help.</p>
          <Link className="text-link" href="/contact">Talk to our team <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </PublicShell>
  )
}

export function PublicDetailPage({
  kind,
  item,
  backHref,
  backLabel,
}: {
  kind: ContentKind
  item: ContentEntry
  backHref: string
  backLabel: string
}) {
  const isArticle = kind === 'blog'
  const ctaHref = '/contact'
  const ctaLabel = kind === 'classes' ? 'Ask about class times' : 'Ask the team a question'

  return (
    <PublicShell currentHref={`/${kind}`}>
      <section className={`public-detail-hero${isArticle ? ' public-detail-hero-article' : ''}`}>
        <div className="public-detail-media">
          <Image src={item.image} alt={item.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
        <div className="public-detail-copy">
          <Link className="public-back-link" href={backHref}><ArrowLeft size={15} aria-hidden="true" /> {backLabel}</Link>
          <p className="eyebrow"><span className="eyebrow-line" />{item.eyebrow}</p>
          <h1>{item.title}</h1>
          <p className="public-detail-lede">{item.description}</p>
          <span className="public-card-meta">{item.meta}</span>
          {!isArticle && (
            <Link className="button button-lime public-detail-cta" href={ctaHref}>
              {ctaLabel} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>
      <article className="public-detail-body">
        {item.sections.map((section: ContentSection) => (
          <section key={section.heading}>
            <p className="eyebrow"><span className="eyebrow-line" /> {isArticle ? 'THE PRACTICAL TAKE' : 'A LITTLE MORE DETAIL'}</p>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </section>
        ))}
        <div className="public-article-note">
          <Sparkles size={18} aria-hidden="true" />
          <p>Every training choice should feel right for you. Ask a coach for options or seek qualified medical advice when you have health concerns.</p>
        </div>
        {isArticle && <Link className="button button-outline" href="/classes">Explore classes <ArrowRight size={16} aria-hidden="true" /></Link>}
      </article>
    </PublicShell>
  )
}

export function AboutPage({ sections }: { sections: ContentSection[] }) {
  return (
    <PublicShell currentHref="/club">
      <section className="public-hero public-hero-about" aria-labelledby="about-title">
        <div className="public-about-image">
          <Image src="/images/about-community.png" alt="Titan members and a coach sharing a relaxed moment after training" fill priority sizes="100vw" />
        </div>
        <div className="public-about-shade" aria-hidden="true" />
        <div className="public-hero-copy">
          <p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> THE TITAN DIFFERENCE</p>
          <h1 id="about-title">A gym that<br /><span>gets you.</span></h1>
          <p>Good training, good people, and enough room to make it your own.</p>
        </div>
      </section>
      <section className="public-section about-section">
        <div className="public-section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> OUR APPROACH</p>
            <h2>Strong looks<br /><span>like showing up.</span></h2>
          </div>
          <p>We believe a great training space makes progress feel possible, whatever your starting point.</p>
        </div>
        <div className="about-principles">
          {sections.map((section, index) => (
            <article className="about-principle" key={section.heading}>
              <span className="about-principle-index">0{index + 1}</span>
              <h3>{section.heading}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
        <div className="public-inline-cta">
          <p>Come see the space and meet the people.</p>
          <Link className="text-link" href="/contact">Plan a visit <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </PublicShell>
  )
}

export function FaqPage({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <PublicShell currentHref="/faq">
      <PublicHero eyebrow="THE QUICK ANSWERS" title="Good questions." description="A few useful details before your first visit. If you need anything else, the team is happy to help." />
      <section className="public-section faq-section">
        <div className="faq-list">
          {items.map((item, index) => (
            <details className="faq-item" key={item.question} open={index === 0}>
              <summary><span>{item.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="public-inline-cta">
          <p>Still have a question? We&apos;re here for it.</p>
          <Link className="text-link" href="/contact">Contact us <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </PublicShell>
  )
}

export function ContactPage() {
  return (
    <PublicShell currentHref="/contact">
      <PublicHero eyebrow="SAY HELLO" title="Let&apos;s talk." description="Ask about a visit, a class, or which membership might fit. The Titan team will follow up with you." />
      <section className="public-section contact-page-section">
        <div className="contact-page-heading">
          <p className="eyebrow"><span className="eyebrow-line" /> WE&apos;RE ALL EARS</p>
          <h2>Start with<br /><span>a question.</span></h2>
          <p>Send a note and we&apos;ll get back to you. For urgent questions about your health or safety, contact a qualified professional.</p>
          <div className="contact-detail-list">
            <a href="https://www.google.com/maps/search/?api=1&query=333+Middle+Winchendon+Rd%2C+Rindge%2C+NH+03461" target="_blank" rel="noopener noreferrer">
              <MapPin size={19} aria-hidden="true" /><span>333 Middle Winchendon Rd<br />Rindge, NH 03461</span>
            </a>
            <a href="tel:125711811"><Phone size={19} aria-hidden="true" /><span>125-711-811</span></a>
            <a href="mailto:Support.gymcenter@gmail.com"><Mail size={19} aria-hidden="true" /><span>Support.gymcenter@gmail.com</span></a>
          </div>
          <p className="editable-placeholder-note">Address, phone numbers, email, and social profiles are editable placeholders until the gym confirms its official contact details.</p>
        </div>
        <div className="contact-form-wrap">
          <h3>Send a message</h3>
          <p>Fields marked as required help us route your question to the right person.</p>
          <ContactForm />
        </div>
      </section>
    </PublicShell>
  )
}

export function MembershipPlanDetailPage({ plan }: { plan: MembershipPlanView }) {
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(plan.priceCents / 100)
  const term = plan.durationDays === 1 ? 'one day' : `per ${plan.billingInterval}`

  return (
    <PublicShell currentHref="/membership">
      <section className="public-hero" aria-labelledby="plan-title">
        <div className="public-hero-glow" aria-hidden="true" />
        <div className="public-hero-copy">
          <Link className="public-back-link" href="/membership"><ArrowLeft size={15} aria-hidden="true" /> All memberships</Link>
          <p className="eyebrow"><span className="eyebrow-line" /> MEMBERSHIP DETAILS</p>
          <h1 id="plan-title">{plan.name}</h1>
          <p>{plan.description}</p>
        </div>
        <span className="public-hero-index" aria-hidden="true">TITAN / MEMBERSHIP</span>
      </section>
      <section className="public-section plan-detail-section">
        <div className="plan-detail-card">
          <div className="plan-detail-top">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> {plan.tagline}</p>
              <h2>{plan.name}<br /><span>membership.</span></h2>
            </div>
            {plan.featured && <span className="plan-detail-badge">POPULAR <Sparkles size={14} aria-hidden="true" /></span>}
          </div>
          <p className="plan-detail-price">{price}<span>/ {term}</span></p>
          <ul className="plan-detail-benefits">
            {plan.benefits.map((benefit) => <li key={benefit}><Check size={16} aria-hidden="true" />{benefit}</li>)}
          </ul>
          <p className="plan-detail-disclaimer">A team member will confirm availability, current terms, and payment before your membership begins.</p>
          <Link className="button button-lime" href={`/membership?plan=${encodeURIComponent(plan.id)}#join`}>
            Request a visit <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="plan-detail-aside">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT STEP</p>
          <h2>Questions before you choose?</h2>
          <p>We&apos;ll help you understand the options and make sure the plan works for your routine.</p>
          <Link className="text-link" href="/contact">Talk to the team <ArrowRight size={16} aria-hidden="true" /></Link>
          <span className="plan-duration"><Clock3 size={16} aria-hidden="true" /> {plan.durationDays === 1 ? 'Single-day access' : `${plan.durationDays} day initial term`}</span>
        </div>
      </section>
    </PublicShell>
  )
}
