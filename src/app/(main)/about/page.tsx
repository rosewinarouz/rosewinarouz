/* About page for Rose Winarouz
 * Dark, animated, responsive with smooth in-page navigation
 */
'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import styles from './AboutPage.module.css';

gsap.registerPlugin(ScrollTrigger);

const sectionIds = ['mission', 'approach', 'impact', 'values'];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const approachRef = useRef<HTMLDivElement | null>(null);
  const timelineProgressRef = useRef<HTMLDivElement | null>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineDotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const accordionContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const accordionIconRefs = useRef<(SVGSVGElement | null)[]>([]);

  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const blob3Ref = useRef<HTMLDivElement | null>(null);
  const highlightCardsRef = useRef<(HTMLElement | null)[]>([]);
  const stripItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeValue, setActiveValue] = useState<number | null>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!approachRef.current || !timelineProgressRef.current) return;

      ScrollTrigger.create({
        trigger: approachRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        animation: gsap.timeline()
          .to(timelineProgressRef.current, { height: '100%', ease: 'none' }, 0)
          .fromTo(timelineProgressRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: 'none' }, 0)
          .to(timelineProgressRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 0.9)
      });

      timelineItemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 30, x: index % 2 === 0 ? -30 : 30 },
          {
            opacity: 1, y: 0, x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });

      timelineDotsRef.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
            }
          }
        );
      });

      // Parallax Blobs
      if (pageRef.current) {
        gsap.to(blob1Ref.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
        gsap.to(blob2Ref.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
        gsap.to(blob3Ref.current, {
          yPercent: 40,
          ease: "none",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Highlight Cards Stagger
      if (highlightCardsRef.current.length > 0) {
        gsap.fromTo(highlightCardsRef.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: highlightCardsRef.current[0],
              start: "top 85%"
            }
          }
        );
      }

      // Impact Strip Items Stagger
      if (stripItemsRef.current.length > 0) {
        gsap.fromTo(stripItemsRef.current,
          { autoAlpha: 0, scale: 0.8, y: 20 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: stripItemsRef.current[0],
              start: "top 90%"
            }
          }
        );
      }

      // Consolidate "reveal" labels/titles into GSAP
      const revealElements = pageRef.current?.querySelectorAll<HTMLElement>(`.${styles.reveal}`) || [];
      revealElements.forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    accordionContentRefs.current.forEach((el, index) => {
      if (!el) return;
      if (activeValue === index) {
        gsap.to(el, { height: 'auto', opacity: 1, marginBottom: '1rem', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        if (accordionIconRefs.current[index]) {
          gsap.to(accordionIconRefs.current[index], { rotate: 180, duration: 0.3, overwrite: 'auto' });
        }
      } else {
        gsap.to(el, { height: 0, opacity: 0, marginBottom: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        if (accordionIconRefs.current[index]) {
          gsap.to(accordionIconRefs.current[index], { rotate: 0, duration: 0.3, overwrite: 'auto' });
        }
      }
    });
  }, [activeValue]);

  // Removed IntersectionObserver useEffect - now handled by GSAP ScrollTrigger above for consistency

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const valuesData = [
    {
      title: 'Proximité',
      text: 'Être présent sur le terrain, tisser des liens de confiance et respecter les rythmes de chaque communauté.'
    },
    {
      title: 'Exigence',
      text: 'Concevoir des projets solides, mesurables et alignés avec les meilleures pratiques du développement territorial durable.'
    },
    {
      title: 'Solidarité',
      text: 'Mettre la dignité humaine au centre, en créant des ponts entre institutions, entreprises et citoyens.'
    }
  ];

  return (
    <div ref={pageRef} className={styles.pageWrapper}>
      <div ref={blob1Ref} className={styles.blob1} />
      <div ref={blob2Ref} className={styles.blob2} />
      <div ref={blob3Ref} className={styles.blob3} />

      <header className={`${styles.hero} ${styles.reveal}`}>
        <span className="sectionEyebrow">À propos de Rose Winarouz</span>
        <h1 className={styles.title}>
          Une alliance entre{' '}
          <span>intelligence des territoires</span> et solidarité humaine
        </h1>
        <p className={styles.subtitle}>
          Nous accompagnons les territoires ruraux d&apos;Al Haouz et d&apos;ailleurs
          dans une transformation durable, inclusive et profondément ancrée dans les
          réalités locales.
        </p>

        <div className={styles.pillsRow}>
          {sectionIds.map((id) => (
            <button
              key={id}
              type="button"
              className={styles.pill}
              onClick={() => scrollToSection(id)}
            >
              {id === 'mission' && 'Notre mission'}
              {id === 'approach' && 'Notre approche'}
              {id === 'impact' && 'Impact'}
              {id === 'values' && 'Nos valeurs'}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.main}>
        {/* Mission + story */}
        <section id="mission" className={`${styles.section} ${styles.sectionSplit} ${styles.reveal}`}>
          <div className="sectionEyebrow">Mission & histoire</div>
          <div className={styles.sectionContentSplit}>
            <div className={styles.sectionTextBlock}>
              <h2 className="sectionTitle">
                Agir <span>localement</span> pour transformer durablement les territoires
              </h2>
              <p>
                Rose Winarouz est née d&apos;une conviction simple : les réponses les plus
                puissantes viennent toujours du terrain. Notre mission est de faire émerger,
                structurer et amplifier les initiatives locales qui changent durablement la
                vie des communautés.
              </p>
              <p>
                Nous travaillons main dans la main avec les habitantes et habitants,
                les acteurs publics et privés, pour concevoir des projets qui renforcent
                la résilience, l&apos;accès aux services essentiels et l&apos;autonomisation
                économique des territoires.
              </p>
            </div>

            <div className={styles.highlightGrid}>
              <article ref={el => { highlightCardsRef.current[0] = el; }} className={styles.highlightCard}>
                <span className={styles.highlightEyebrow}>Territoires</span>
                <h3>Une vision systémique</h3>
                <p>
                  Nous considérons le territoire comme un écosystème vivant où
                  l&apos;infrastructure, l&apos;économie, le social et la culture sont
                  intimement liés.
                </p>
              </article>

              <article ref={el => { highlightCardsRef.current[1] = el; }} className={styles.highlightCard}>
                <span className={styles.highlightEyebrow}>Communautés</span>
                <h3>Co-construction permanente</h3>
                <p>
                  Chaque projet est pensé « avec » et non « pour » les communautés,
                  afin de garantir son appropriation et sa pérennité.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Approach / How we work - Timeline Version */}
        <section id="approach" ref={approachRef} className={`${styles.section} ${styles.approachSection}`}>
          <div className={`${styles.reveal} ${styles.revealVisible}`} style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="sectionEyebrow">Notre approche</div>
            <h2 className="sectionTitle">
              Un chemin de <span>co-construction</span>
            </h2>
          </div>

          <div className={styles.timelineContainer}>
            {/* Background line */}
            <div className={styles.timelineLine} />

            {/* Animated progress line */}
            <div
              ref={timelineProgressRef}
              className={styles.timelineProgress}
              style={{ height: '0%', opacity: 0 }}
            />

            <div className={styles.approachTimeline}>
              {[
                {
                  id: '01',
                  title: 'Écouter et cartographier les besoins',
                  text: 'Diagnostics participatifs, immersion dans les douars, écoute active des habitantes et des acteurs locaux : nous partons toujours de la réalité du terrain.'
                },
                {
                  id: '02',
                  title: 'Co-designer des solutions frugales',
                  text: 'Nous privilégions des solutions sobres, adaptés au contexte local, mobilisant autant que possible les ressources, savoir-faire et talents du territoire.'
                },
                {
                  id: '03',
                  title: 'Accompagner dans la durée',
                  text: "Parce que la transformation est un chemin, nous misons sur l'accompagnement, la montée en compétences et la transmission."
                }
              ].map((item, index) => (
                <div
                  key={item.id}
                  ref={el => { timelineItemsRef.current[index] = el; }}
                  className={`${styles.timelineItem} ${index % 2 !== 0 ? styles.timelineItemEven : ''}`}
                  style={{ opacity: 0 }}
                >
                  <div className={styles.timelineContent}>
                    <article className={styles.approachCard}>
                      <div className={styles.badge}>{item.id}</div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  </div>

                  {/* Central Dot */}
                  <div
                    ref={el => { timelineDotsRef.current[index] = el; }}
                    className={styles.timelineDot}
                    style={{ transform: 'scale(0)', opacity: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact snapshot */}
        <section id="impact" className={`${styles.section} ${styles.sectionStrip} ${styles.reveal}`}>
          <div className="sectionEyebrow">Impact en mouvement</div>
          <div className={styles.strip}>
            <div ref={el => { stripItemsRef.current[0] = el; }} className={styles.stripItem}>
              <span className={styles.stripNumber}>+28</span>
              <span className={styles.stripLabel}>projets</span>
              <span className={styles.stripSublabel}>Projets réalisés</span>
            </div>
            <div ref={el => { stripItemsRef.current[1] = el; }} className={styles.stripItem}>
              <span className={styles.stripNumber}>+230</span>
              <span className={styles.stripLabel}>bénévoles</span>
              <span className={styles.stripSublabel}>Bénévoles engagés</span>
            </div>
            <div ref={el => { stripItemsRef.current[2] = el; }} className={styles.stripItem}>
              <span className={styles.stripNumber}>30</span>
              <span className={styles.stripLabel}>campagnes de dons</span>
              <span className={styles.stripSublabel}>Dons et campagnes de soutien</span>
            </div>
            <div ref={el => { stripItemsRef.current[3] = el; }} className={styles.stripItem}>
              <span className={styles.stripNumber}>+70k</span>
              <span className={styles.stripLabel}>bénéficiaires</span>
              <span className={styles.stripSublabel}>Personnes bénéficiaires</span>
            </div>
          </div>
        </section>

        {/* Values & governance - Accordion Version */}
        <section id="values" className={`${styles.section} ${styles.valuesSection} ${styles.reveal}`}>
          <div className="sectionEyebrow">Nos valeurs</div>

          <div className={styles.valuesLayout}>
            <div className={styles.valuesTitleCol}>
              <h2 className="sectionTitle">
                L&apos;éthique au service du <span>territoire</span>
              </h2>
            </div>

            <div className={styles.valuesContentGrid}>
              <div className={styles.valuesAccordion}>
                {valuesData.map((val, idx) => {
                  const isOpen = activeValue === idx;
                  return (
                    <div
                      key={idx}
                      className={`${styles.accordionItem} ${isOpen ? styles.accordionActive : ''}`}
                      onClick={() => setActiveValue(isOpen ? null : idx)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveValue(isOpen ? null : idx); } }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.accordionHeader}>
                        <h3>{val.title}</h3>
                        <div>
                          <ChevronDown ref={el => { accordionIconRefs.current[idx] = el; }} className={styles.accordionIcon} size={20} />
                        </div>
                      </div>

                      <div
                        ref={el => { accordionContentRefs.current[idx] = el; }}
                        style={{ height: idx === 0 ? 'auto' : 0, opacity: idx === 0 ? 1 : 0, marginBottom: idx === 0 ? '1rem' : 0, overflow: 'hidden' }}
                      >
                        <p className={styles.accordionDescription}>
                          {val.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.valuesSideCard}>
                <h3>Une gouvernance ancrée dans le territoire</h3>
                <p>
                  L&apos;association réunit des profils issus du monde associatif,
                  de l&apos;aménagement du territoire, de l&apos;entrepreneuriat
                  social et de la recherche, tous engagés pour l&apos;avenir des
                  territoires ruraux.
                </p>
                <p>
                  Ensemble, nous faisons le lien entre vision stratégique et action
                  très concrète sur le terrain, aux côtés des communautés locales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className={`${styles.section} ${styles.ctaSection} ${styles.reveal}`}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaText}>
              <h2>Envie de <span>rejoindre</span> l&apos;aventure&nbsp;?</h2>
              <p>
                Chaque engagement compte pour renforcer la résilience de nos territoires.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/projects" className={styles.primaryBtn}>
                Explorer nos projets
              </Link>
              <Link href="/contact" className={styles.secondaryBtn}>
                Discuter d&apos;un partenariat
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

