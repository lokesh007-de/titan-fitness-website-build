import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, Dumbbell, MoveUpRight, Play, Sparkles, Star, Timer, Users, Zap } from 'lucide-react'
import { MembershipSignup } from '@/components/membership-signup'

const benefits = [
  { icon: Dumbbell, title: 'Train your way', copy: 'Room to lift heavy, move fast, or find your rhythm. No waiting around.' },
  { icon: Users, title: 'Find your people', copy: 'Good energy is contagious. Meet a crew that keeps you coming back.' },
  { icon: Timer, title: 'Your hours, your rules', copy: 'Early bird or after dark. The doors are open when you are.' },
]

const plans = [
  { id: 'day-pass', name: 'Day pass', price: '19', term: 'one day', note: 'A proper first date', features: ['Full club access', 'Classes included', 'No commitment'] },
  { id: 'strength', name: 'Strength', price: '49', term: 'per month', note: 'Your everyday lineup', featured: true, features: ['All gym equipment', 'Unlimited group classes', 'Free intro session'] },
  { id: 'all-access', name: 'All access', price: '79', term: 'per month', note: 'The whole playground', features: ['Everything in Strength', 'Recovery & sauna suite', 'Bring a friend weekly'] },
]

export function TitanFitness() {
  return (
    <main>
      <div className="announcement"><span className="live-dot" /> NOW OPEN · YOUR NEW TRAINING GROUND <a href="#membership">First class is on us <ArrowRight size={14} /></a></div>
      <header className="site-header">
        <Link href="#top" className="brand" aria-label="Titan Fitness home"><span className="brand-mark"><Zap size={18} fill="currentColor" /></span> TITAN<span className="brand-light">/</span><span className="brand-light">FITNESS</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#club">The club</a><a href="#training">Training</a><a href="#membership">Membership</a></nav>
        <a className="button button-lime nav-cta" href="#membership">Find your fit <ArrowUpRight size={16} /></a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <Image className="hero-image" src="/titan-hero.png" alt="Athlete deadlifting in a dramatic, dark training space" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> YOUR CITY. YOUR PEOPLE. YOUR STRONG.</p>
          <h1 id="hero-title">Built for<br /><span>the next</span> <span className="lime-word">set.</span></h1>
          <p className="hero-description">Not just a gym. Your new favorite part of the day. Come as you are, leave a little stronger.</p>
          <div className="hero-actions"><a className="button button-lime" href="#membership">Find your fit <ArrowRight size={17} /></a><a className="text-link light-link" href="#club"><span className="play-icon"><Play size={12} fill="currentColor" /></span> Take a look around</a></div>
          <div className="hero-rating"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><span className="rating-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={11} fill="currentColor" aria-hidden="true" />)}</span><span className="rating-note"> &nbsp;4.9/5 from 2,400+ members</span></div></div>
        </div>
        <div className="hero-side-note"><span>01 — 03</span><i /> SHOW UP DIFFERENT</div>
        <a className="scroll-cue" href="#club"><ArrowDown size={15} /> SCROLL TO FEEL IT</a>
        <div className="hero-coordinates">EST. MMXIX&nbsp; / &nbsp;40°43&apos; N, 73°59&apos; W</div>
      </section>

      <div className="ticker" aria-label="Titan Fitness values"><div className="ticker-track">{Array.from({ length: 2 }).map((_, row) => <span className="ticker-line" key={row}>SHOW UP <b>✳</b> MOVE BETTER <b>✳</b> LIFT EACH OTHER UP <b>✳</b> REPEAT TOMORROW <b>✳</b> SHOW UP <b>✳</b> MOVE BETTER <b>✳</b></span>)}</div></div>

      <section className="club-section section-pad" id="club">
        <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> THE TITAN DIFFERENCE</p><h2>Good energy.<br /><span>Great training.</span></h2><p className="section-intro">We made space for the way you actually want to move. No egos, no gatekeeping. Just a great room and even better people.</p></div>
        <div className="benefit-grid">{benefits.map(({ icon: Icon, title, copy }, index) => <article className="benefit-card" key={title}><div className="benefit-top"><span>0{index + 1}</span><Icon size={22} strokeWidth={1.6} /></div><h3>{title}</h3><p>{copy}</p><a href="#membership" aria-label={`Learn more about ${title}`}><ArrowUpRight size={17} /></a></article>)}</div>
      </section>

      <section className="training-section" id="training"><div className="training-photo"><Image src="/titan-hero.png" alt="Titan member finding her strength during a barbell workout" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="training-copy"><p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> BUILT AROUND YOU</p><h2>More than<br />a room full<br />of <span>weights.</span></h2><p>From first rep to next-level PR, we build the kind of training that meets you where you are—and brings out where you can go.</p><div className="training-tags"><span><Dumbbell size={15} /> Strength</span><span><Sparkles size={15} /> Classes</span><span><Zap size={15} /> Conditioning</span></div><a className="text-link light-link" href="#membership">Explore the club <ArrowRight size={16} /></a><div className="training-index">02 <i /> THE WORK IS YOURS</div></div></section>

      <section className="membership-section section-pad" id="membership"><div className="membership-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> A GOOD FIT, EVERY TIME</p><h2>Choose your<br /><span>kind of strong.</span></h2></div><p>Simple plans. Serious value.<br />Pick your pace, then let&apos;s go.</p></div><div className="plans-grid">{plans.map(plan => <article className={`plan-card${plan.featured ? ' featured' : ''}`} key={plan.id}>{plan.featured && <div className="plan-badge">THE PEOPLE&apos;S FAVORITE <Sparkles size={13} /></div>}<div className="plan-card-top"><span>{plan.name}</span><MoveUpRight size={18} /></div><p className="plan-note">{plan.note}</p><div className="plan-price"><span className="currency">$</span>{plan.price}<span className="plan-term">/ {plan.term}</span></div><div className="plan-divider"/><ul>{plan.features.map(feature => <li key={feature}><span className="checkmark">✓</span>{feature}</li>)}</ul><a className={`button ${plan.featured ? 'button-lime' : 'button-outline'}`} href="#join">Choose {plan.name} <ArrowRight size={16} /></a></article>)}</div></section>

      <section className="join-section" id="join"><div className="join-message"><p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> YOUR NEXT CHAPTER STARTS HERE</p><h2>One good<br />decision.<br /><span>Big energy.</span></h2><p>Drop your details. We&apos;ll save you a spot and show you around.</p><div className="join-footnote"><div className="join-footnote-icon"><Zap size={17} fill="currentColor" /></div><span>Come in curious.<br /><strong>Leave feeling unstoppable.</strong></span></div></div><div className="join-panel"><div className="join-panel-heading"><span>01 <i /> 03</span><span>TAKE THE FIRST STEP</span></div><h3>Let&apos;s get<br />you moving.</h3><p>Tell us a little about you and the team will be in touch.</p><MembershipSignup /><span className="form-index">TITAN / MEMBERSHIP</span></div></section>

      <footer className="site-footer"><div className="footer-top"><Link href="#top" className="brand footer-brand"><span className="brand-mark"><Zap size={18} fill="currentColor" /></span> TITAN<span className="brand-light">/FITNESS</span></Link><p>Show up for you.<br /><span>And each other.</span></p><a className="social-link" href="https://www.instagram.com/" aria-label="Titan Fitness on Instagram"><span className="social-monogram" aria-hidden="true">ig</span><span>FOLLOW THE MOVEMENT</span><ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© 2026 TITAN FITNESS CLUB. ALL RIGHTS RESERVED.</span><span>GOOD THINGS HAPPEN WHEN YOU SHOW UP.</span><a href="mailto:hello@titanfitness.club">SAY HELLO <ArrowRight size={13} /></a></div></footer>
    </main>
  )
}
