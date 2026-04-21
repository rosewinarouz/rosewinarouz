'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HomeDomaines.module.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 28, suffix: '', prefix: '+', label: 'projets', sublabel: 'Projets réalisés' },
  { num: 230, suffix: '', prefix: '+', label: 'bénévoles', sublabel: 'Bénévoles engagés' },
  { num: 30, suffix: '', prefix: '', label: 'campagnes de dons', sublabel: 'Dons et campagnes de soutien' },
  { num: 70, suffix: 'k', prefix: '+', label: 'bénéficiaires', sublabel: 'Personnes bénéficiaires' },
];

const domaines = [
  {
    id: 'd1',
    title: 'Développement territorial & intelligence des territoires',
    desc: "Rose Winarouz agit pour un développement territorial intégré, basé sur l’analyse des réalités locales, la valorisation des ressources humaines et naturelles, et la co-construction de solutions adaptées aux besoins des territoires, notamment ruraux et montagneux.",
  },
  {
    id: 'd2',
    title: 'Équité sociale & réduction des inégalités territoriales',
    desc: "L’association œuvre pour réduire les inégalités sociales et territoriales, en particulier entre les zones urbaines et rurales, à travers des actions d’accès équitable aux services sociaux, à l’information, aux opportunités économiques et aux droits fondamentaux.",
  },
  {
    id: 'd3',
    title: 'Autonomisation économique des femmes & des jeunes',
    desc: "Rose Winarouz accompagne les femmes et les jeunes vers l’autonomie économique par la formation, l’accompagnement entrepreneurial, la promotion des initiatives locales et le renforcement des capacités, en tenant compte des spécificités socioculturelles des territoires.",
  },
  {
    id: 'd4',
    title: 'Développement durable & transition écologique',
    desc: "L’association intègre les principes du développement durable dans toutes ses actions, en promouvant l’écologie, la préservation de l’environnement, les pratiques responsables et la sensibilisation communautaire face aux enjeux climatiques et environnementaux.",
  },
  {
    id: 'd5',
    title: 'Médias communautaires & communication sociale',
    desc: "Rose Winarouz utilise les médias comme levier de changement social à travers la communication de proximité, les médias communautaires, le storytelling territorial et la sensibilisation citoyenne, afin de donner la parole aux populations locales.",
  },
  {
    id: 'd6',
    title: 'Veille sociétale, participation citoyenne & innovation sociale',
    desc: "L’association développe une veille sociétale active pour anticiper les besoins émergents, encourager la participation citoyenne et expérimenter des approches innovantes en matière d’action sociale, de gouvernance locale et d’innovation sociale.",
  },
];

const formatStatNum = (n: number, stat: typeof stats[number]) => {
  const s = String(n) + stat.suffix;
  return stat.prefix ? `${stat.prefix}${s}` : s;
};

export default function HomeDomaines() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statNumRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const accordionColumn1Ref = useRef<HTMLDivElement | null>(null);
  const accordionColumn2Ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const root = containerRef.current;
      if (!root) return;

      // Consolidate general reveals into GSAP ScrollTrigger
      const revealElements = root.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
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

      // Stats GSAP Timeline — direct DOM update (no React re-renders)
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll(`.${styles.statCard}`);
        const proxy = { n0: 0, n1: 0, n2: 0, n3: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            once: true
          }
        });

        tl.fromTo(statCards,
          { autoAlpha: 0, y: 30, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }
          , 0);

        tl.to(proxy, {
          n0: stats[0].num,
          n1: stats[1].num,
          n2: stats[2].num,
          n3: stats[3].num,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            // Direct DOM writes — no React state, no re-renders
            statNumRefs.current.forEach((el, i) => {
              if (!el) return;
              const key = `n${i}` as keyof typeof proxy;
              el.textContent = formatStatNum(Math.round(proxy[key]), stats[i]);
            });
          },
          onComplete: () => {
            // Final exact values
            statNumRefs.current.forEach((el, i) => {
              if (!el) return;
              el.textContent = formatStatNum(stats[i].num, stats[i]);
            });
          }
        }, 0.2);
      }

      // Accordions Stagger Timeline
      const col1Items = accordionColumn1Ref.current?.querySelectorAll(`.${styles.accordionItem}`) || [];
      const col2Items = accordionColumn2Ref.current?.querySelectorAll(`.${styles.accordionItem}`) || [];

      const actl = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector(`.${styles.domainsSection}`),
          start: "top 80%",
          once: true
        }
      });

      actl.fromTo(col1Items,
        { autoAlpha: 0, x: -30 },
        { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, 0
      )
        .fromTo(col2Items,
          { autoAlpha: 0, x: 30 },
          { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, 0
        );
    }, containerRef); // Scope context to container

    return () => ctx.revert(); // Cleanup EVERYTHING in one go
  }, []);

  const [activeDomain, setActiveDomain] = useState<string | null>('d1');

  return (
    <section ref={containerRef} className={styles.section}>
      {/* Impact & credibility */}
      <div className={styles.sectionHeader}>
        <div className={styles.headerText}>
          <span className="sectionEyebrow">Impact & crédibilité</span>
          <h2 className="sectionTitle">
            Une association <span>ancrée</span> dans ses territoires, portée par des résultats concrets.
          </h2>
          <p className={styles.sectionSubtitle}>
            Chaque projet mené par Rose Winarouz est la rencontre entre une vision
            de développement durable et l&apos;énergie des communautés locales.
          </p>
        </div>

        <div
          ref={statsRef}
          className={styles.statsGrid}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.sublabel}
              className={styles.statCard}
            >
              <span
                className={styles.statNumber}
                ref={(el) => { statNumRefs.current[i] = el; }}
                aria-hidden
              >
                {formatStatNum(0, stat)}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statSublabel}>{stat.sublabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NOS DOMAINES Section */}
      <div className={styles.domainsSection}>
        <div className={styles.domainsHeader}>
          <span className="sectionEyebrow">Nos Domaines</span>
          <h2 className="sectionTitle">Expertises <span>clés</span> pour l&apos;avenir</h2>
        </div>

        <div className={styles.accordionColumns}>
          <div ref={accordionColumn1Ref} className={styles.accordionColumn}>
            {[domaines[0], domaines[2], domaines[4]].map((dom, i) => {
              const visualIndex = [0, 2, 4][i];
              const isActive = activeDomain === dom?.id;
              if (!dom) return null;
              return (
                <div
                  key={dom.id}
                  className={`${styles.accordionItem} ${isActive ? styles.accordionActive : ''}`}
                  onMouseEnter={() => setActiveDomain(dom.id)}
                  onClick={() => setActiveDomain(isActive ? null : dom.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveDomain(isActive ? null : dom.id); } }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                >
                  <div className={styles.accordionHeader}>
                    <div className={styles.domainIndex}>0{visualIndex + 1}</div>
                    <h3 className={styles.domainTitle}>{dom.title}</h3>
                    <div className={styles.accordionIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.accordionContent}>
                    <div className={styles.contentInner}>
                      <p className={styles.domainDesc}>{dom.desc}</p>
                      <div className={styles.domainLine} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={accordionColumn2Ref} className={styles.accordionColumn}>
            {[domaines[1], domaines[3], domaines[5]].map((dom, i) => {
              const visualIndex = [1, 3, 5][i];
              const isActive = activeDomain === dom?.id;
              if (!dom) return null;
              return (
                <div
                  key={dom.id}
                  className={`${styles.accordionItem} ${isActive ? styles.accordionActive : ''}`}
                  onMouseEnter={() => setActiveDomain(dom.id)}
                  onClick={() => setActiveDomain(isActive ? null : dom.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveDomain(isActive ? null : dom.id); } }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                >
                  <div className={styles.accordionHeader}>
                    <div className={styles.domainIndex}>0{visualIndex + 1}</div>
                    <h3 className={styles.domainTitle}>{dom.title}</h3>
                    <div className={styles.accordionIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.accordionContent}>
                    <div className={styles.contentInner}>
                      <p className={styles.domainDesc}>{dom.desc}</p>
                      <div className={styles.domainLine} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
