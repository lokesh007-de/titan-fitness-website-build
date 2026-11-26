'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, MoveUpRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const equipment = [
  {
    name: 'Strength rack',
    category: 'FREE WEIGHTS',
    details: 'Room to build your next personal best.',
    image: '/equipment-strength-rack.png',
    alt: 'Loaded barbell and squat rack in the Titan strength area',
  },
  {
    name: 'Leg press',
    category: 'LOWER BODY',
    details: 'Smooth, controlled power through every rep.',
    image: '/equipment-leg-press.png',
    alt: 'Plate-loaded leg press machine ready for a workout',
  },
  {
    name: 'Cable station',
    category: 'FULL BODY',
    details: 'Make every angle part of the plan.',
    image: '/equipment-cable-station.png',
    alt: 'Dual cable machine with adjustable pulleys and attachments',
  },
  {
    name: 'Conditioning zone',
    category: 'CARDIO',
    details: 'Find your pace, then push it further.',
    image: '/equipment-cardio-row.png',
    alt: 'Rowing machines and air bikes in the conditioning area',
  },
]

export function EquipmentGallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateControls = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    setCanScrollLeft(track.scrollLeft > 4)
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    updateControls()
    track.addEventListener('scroll', updateControls, { passive: true })
    window.addEventListener('resize', updateControls)

    return () => {
      track.removeEventListener('scroll', updateControls)
      window.removeEventListener('resize', updateControls)
    }
  }, [updateControls])

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current
    const card = track?.querySelector<HTMLElement>('.equipment-card')
    if (!track || !card) return

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <section className="equipment-section" id="equipment" aria-labelledby="equipment-title">
      <div className="equipment-heading" data-reveal="left">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> THE FLOOR, YOUR WAY</p>
          <h2 id="equipment-title">Meet your<br /><span>new favorites.</span></h2>
        </div>
        <p className="equipment-intro">Dial in your setup. From heavy lifts to that last round, the right tools are ready when you are.</p>
        <div className="equipment-controls">
          <span>SWIPE TO EXPLORE</span>
          <div className="equipment-arrows">
            <button
              type="button"
              className="equipment-arrow"
              aria-label="Show previous equipment"
              aria-controls="equipment-gallery-track"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="equipment-arrow"
              aria-label="Show more equipment"
              aria-controls="equipment-gallery-track"
              disabled={!canScrollRight}
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div
        className="equipment-track"
        id="equipment-gallery-track"
        ref={trackRef}
        role="region"
        aria-label="Gym equipment gallery"
        tabIndex={0}
      >
        {equipment.map((item, index) => (
          <article
            className="equipment-card"
            data-reveal="up"
            data-reveal-delay={index * 80}
            key={item.name}
          >
            <div className="equipment-image-wrap">
              <Image
                className="equipment-photo"
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 700px) 82vw, (max-width: 1100px) 40vw, 340px"
              />
              <div className="equipment-image-shade" aria-hidden="true" />
              <div className="equipment-image-meta">
                <span>{item.category}</span>
                <span>0{index + 1} / 04</span>
              </div>
            </div>
            <div className="equipment-card-info">
              <div>
                <h3>{item.name}</h3>
                <p>{item.details}</p>
              </div>
              <span className="equipment-card-arrow" aria-hidden="true"><MoveUpRight size={17} /></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
