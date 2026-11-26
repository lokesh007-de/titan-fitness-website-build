import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, Dumbbell, MoveUpRight, Play, Sparkles, Star, Timer, Users, Zap } from 'lucide-react'
import { MembershipSignup } from '@/components/membership-signup'
import { ScrollReveals } from '@/components/scroll-reveals'
import { EquipmentGallery } from '@/components/equipment-gallery'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getMembershipPlans } from '@/lib/db/queries'

const benefits = [
  { icon: Dumbbell, title: 'Train your way', copy: 'Room to lift heavy, move fast, or find your rhythm. No waiting around.' },
  { icon: Users, title: 'Find your people', copy: 'Good energy is contagious. Meet a crew that keeps you coming back.' },
  { icon: Timer, title: 'Your hours, your rules', copy: 'Early bird or after dark. The doors are open when you are.' },
]

type TitanPage = 'home' | 'club' | 'training' | 'equipment' | 'membership'
type InteriorPage = Exclude<TitanPage, 'home'>

const pageTitles: Record<InteriorPage, string> = {
  club: 'The club',
  training: 'Training',
  equipment: 'Equipment',
  membership: 'Membership',
}

const pageDescriptions: Record<InteriorPage, string> = {
  club: 'A welcoming place to move, meet your people, and build strength on your terms.',
  training: 'Find your rhythm with coaching, classes, and training built around you.',
  equipment: 'Explore the tools and spaces ready for your next personal best.',
  membership: 'Simple plans, serious value, and a good fit for every kind of strong.',
}

export async function TitanFitness({ page = 'home', initialPlan }: { page?: TitanPage; initialPlan?: string }) {
  const isHome = page === 'home'
  let databasePlans: Awaited<ReturnType<typeof getMembershipPlans>> = []

  if (isHome || page === 'membership') {
    try {
      databasePlans = await getMembershipPlans()
    } catch {
      databasePlans = []
    }
  }

  const plans = databasePlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    price: (plan.priceCents / 100).toLocaleString('en-US', { maximumFractionDigits: 2 }),
    term: plan.durationDays === 1 ? 'one day' : `per ${plan.billingInterval}`,
    note: plan.tagline,
    featured: plan.featured,
    features: plan.benefits,
  }))

  const headerHref = page === 'club' ? '/club' : page === 'training' ? '/classes' : page === 'equipment' ? '/services' : page === 'membership' ? '/membership' : undefined

  return (
    <main>
      <SiteHeader currentHref={headerHref} />

      {!isHome && <section className={`route-heading${page === 'training' ? ' training-route-hero' : ''}`} aria-labelledby="route-title">
        {page === 'training' && <>
          <Image
            className="training-route-image"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KXZwe1TCD7usM2a3baaHhOmzYDUuMn.png"
            alt="Athlete holding a push-up position over kettlebells in a gym"
            fill
            priority
            sizes="100vw"
          />
          <div className="training-route-shade" aria-hidden="true" />
        </>}
        <p className="eyebrow"><span className="eyebrow-line" /> {page.toUpperCase()} AT TITAN</p>
        <h1 id="route-title">{pageTitles[page]}</h1>
        <p>{pageDescriptions[page]}</p>
      </section>}

      {isHome && <section className="hero" id="top" aria-labelledby="hero-title">
        <Image className="hero-image" src="/titan-hero.png" alt="Athlete deadlifting in a dramatic, dark training space" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> YOUR CITY. YOUR PEOPLE. YOUR STRONG.</p>
          <h1 id="hero-title">Built for<br /><span>the next</span> <span className="lime-word">set.</span></h1>
          <p className="hero-description">Not just a gym. Your new favorite part of the day. Come as you are, leave a little stronger.</p>
          <div className="hero-actions"><Link className="button button-lime" href="/membership">Find your fit <ArrowRight size={17} /></Link><Link className="text-link light-link" href="/club"><span className="play-icon"><Play size={12} fill="currentColor" /></span> Take a look around</Link></div>
          <div className="hero-rating"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><span className="rating-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={11} fill="currentColor" aria-hidden="true" />)}</span><span className="rating-note"> &nbsp;4.9/5 from 2,400+ members</span></div></div>
        </div>
        <div className="hero-side-note"><span>01 — 03</span><i /> SHOW UP DIFFERENT</div>
        <Link className="scroll-cue" href="/club"><ArrowDown size={15} /> SCROLL TO FEEL IT</Link>
        <div className="hero-coordinates">EST. MMXIX&nbsp; / &nbsp;40°43&apos; N, 73°59&apos; W</div>
      </section>}

      {isHome && <div className="ticker" aria-label="Titan Fitness values"><div className="ticker-track">{Array.from({ length: 2 }).map((_, row) => <span className="ticker-line" key={row}>SHOW UP <b>✳</b> MOVE BETTER <b>✳</b> LIFT EACH OTHER UP <b>✳</b> REPEAT TOMORROW <b>✳</b> SHOW UP <b>✳</b> MOVE BETTER <b>✳</b></span>)}</div></div>}

      {(isHome || page === 'club') && <section className="club-section section-pad" id="club">
        <div className="section-heading" data-reveal="left"><p className="eyebrow"><span className="eyebrow-line" /> THE TITAN DIFFERENCE</p><h2>Good energy.<br /><span>Great training.</span></h2><p className="section-intro">We made space for the way you actually want to move. No egos, no gatekeeping. Just a great room and even better people.</p></div>
        <div className="benefit-grid">{benefits.map(({ icon: Icon, title, copy }, index) => <article className="benefit-card" data-reveal="up" data-reveal-delay={index * 90} key={title}><div className="benefit-top"><span>0{index + 1}</span><Icon size={22} strokeWidth={1.6} /></div><h3>{title}</h3><p>{copy}</p><Link href="/membership" aria-label={`Learn more about ${title}`}><ArrowUpRight size={17} /></Link></article>)}</div>
      </section>}

      {(isHome || page === 'training') && <section className="training-section" id="training"><div className="training-photo" data-reveal="left"><Image src="/titan-hero.png" alt="Titan member finding her strength during a barbell workout" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="training-copy" data-reveal="right"><p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> BUILT AROUND YOU</p><h2>More than<br />a room full<br />of <span>weights.</span></h2><p>From first rep to next-level PR, we build the kind of training that meets you where you are—and brings out where you can go.</p><div className="training-tags"><span><Dumbbell size={15} /> Strength</span><span><Sparkles size={15} /> Classes</span><span><Zap size={15} /> Conditioning</span></div><Link className="text-link light-link" href="/club">Explore the club <ArrowRight size={16} /></Link><div className="training-index">02 <i /> THE WORK IS YOURS</div></div></section>}

      {(isHome || page === 'equipment') && <EquipmentGallery />}

      {(isHome || page === 'membership') && <section className="membership-section section-pad" id="membership"><div className="membership-heading" data-reveal="left"><div><p className="eyebrow"><span className="eyebrow-line" /> A GOOD FIT, EVERY TIME</p><h2>Choose your<br /><span>kind of strong.</span></h2></div><p>Simple plans. Serious value.<br />Pick your pace, then let&apos;s go.</p></div><div className="plans-grid">{plans.length ? plans.map((plan, index) => <article className={`plan-card${plan.featured ? ' featured' : ''}`} data-reveal="up" data-reveal-delay={index * 100} key={plan.id}>{plan.featured && <div className="plan-badge">THE PEOPLE&apos;S FAVORITE <Sparkles size={13} /></div>}<div className="plan-card-top"><Link href={`/membership/${encodeURIComponent(plan.id)}`}>{plan.name}</Link><MoveUpRight size={18} aria-hidden="true" /></div><p className="plan-note">{plan.note}</p><div className="plan-price"><span className="currency">$</span>{plan.price}<span className="plan-term">/ {plan.term}</span></div><div className="plan-divider"/><ul>{plan.features.map(feature => <li key={feature}><span className="checkmark">✓</span>{feature}</li>)}</ul><Link className={`button ${plan.featured ? 'button-lime' : 'button-outline'}`} href={`/membership?plan=${encodeURIComponent(plan.id)}#join`}>Ask about {plan.name} <ArrowRight size={16} /></Link></article>) : <p className="plans-unavailable">Membership options are temporarily unavailable. <Link href="/contact">Contact the team for current details.</Link></p>}</div></section>}

      {(isHome || page === 'membership') && <section className="join-section" id="join"><div className="join-message" data-reveal="left"><p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> YOUR NEXT CHAPTER STARTS HERE</p><h2>One good<br />decision.<br /><span>Big energy.</span></h2><p>Drop your details. We&apos;ll save you a spot and show you around.</p><div className="join-footnote"><div className="join-footnote-icon"><Zap size={17} fill="currentColor" /></div><span>Come in curious.<br /><strong>Leave feeling unstoppable.</strong></span></div></div><div className="join-panel" data-reveal="right"><div className="join-panel-heading"><span>01 <i /> 03</span><span>TAKE THE FIRST STEP</span></div><h3>Let&apos;s get<br />you moving.</h3><p>Tell us a little about you and the team will be in touch.</p><MembershipSignup plans={databasePlans} initialPlan={initialPlan} /><span className="form-index">TITAN / MEMBERSHIP</span></div></section>}

      <SiteFooter />
      <ScrollReveals />
    </main>
  )
}
