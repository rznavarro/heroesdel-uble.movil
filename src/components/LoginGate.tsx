import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import InstitutionalLogo from './InstitutionalLogo';
import { Loader2 } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface LoginGateProps {
  onLogin: (code: string) => void;
  onToggleFullscreen: () => void;
}

const GALLERY_COL_1 = [
  { img: "https://assets.codepen.io/204808/Het-glas-wijn_edited_Vermeer-1-1230x1066.jpg", title: "The Glass of Wine" },
  { img: "https://assets.codepen.io/204808/Vermeer_Girl_Interrupted_at_Her_Music.jpg", title: "Girl Interrupted in her Music" },
  { img: "https://assets.codepen.io/204808/Vermeer_Lady_Maidservant_Holding_Letter.jpg", title: "Mistress and Maid" },
  { img: "https://assets.codepen.io/204808/Jan_Vermeer_van_Delft_013.jpg", title: "The Guitar Player" },
  { img: "https://assets.codepen.io/204808/960px-Vermeer_-_Diana_and_Her_Companions.jpg", title: "Diana and her Companions" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_The_Geographer_-_Google_Art_Project.jpg", title: "The Geographer" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_A_Lady_and_Two_Gentlemen_-_WGA24639.jpg", title: "The Girl with a Wine Glass" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_De_Soldaat_en_het_Lachende_Meisje_-_Google_Art_Project.jpg", title: "Officer and Laughing Girl" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_The_lacemaker_%28c.1669-1671%29.jpg", title: "The Lacemaker" },
  { img: "https://assets.codepen.io/204808/960px-Vermeer-view-of-delft.jpg", title: "View of Delft" },
];

const GALLERY_COL_2 = [
  { img: "https://assets.codepen.io/204808/Meisje_met_de_parel.jpg", title: "Girl with a Pearl Earring" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.png", title: "The Milkmaid" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_The_Astronomer_-_1668.jpg", title: "The Astronomer" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_Lady_at_the_Virginal_with_a_Gentleman%2C_-The_Music_Lesson-_-_Google_Art_Project.jpg", title: "The Music Lesson" },
  { img: "https://assets.codepen.io/204808/Jan_Vermeer_-_The_Art_of_Painting_-_Google_Art_Project.jpg", title: "The Art of Painting" },
  { img: "https://assets.codepen.io/204808/Het-glas-wijn_edited_Vermeer-1-1230x1066.jpg", title: "The Glass of Wine" },
  { img: "https://assets.codepen.io/204808/Vermeer_Girl_Interrupted_at_Her_Music.jpg", title: "Girl Interrupted in her Music" },
  { img: "https://assets.codepen.io/204808/Vermeer_Lady_Maidservant_Holding_Letter.jpg", title: "Mistress and Maid" },
  { img: "https://assets.codepen.io/204808/Jan_Vermeer_van_Delft_013.jpg", title: "The Guitar Player" },
  { img: "https://assets.codepen.io/204808/960px-Vermeer_-_Diana_and_Her_Companions.jpg", title: "Diana and her Companions" },
];

const GALLERY_COL_3 = [
  { img: "https://assets.codepen.io/204808/960px-Vermeer_-_Diana_and_Her_Companions.jpg", title: "Diana and her Companions" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_The_Geographer_-_Google_Art_Project.jpg", title: "The Geographer" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_A_Lady_and_Two_Gentlemen_-_WGA24639.jpg", title: "The Girl with a Wine Glass" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_De_Soldaat_en_het_Lachende_Meisje_-_Google_Art_Project.jpg", title: "Officer and Laughing Girl" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_The_lacemaker_%28c.1669-1671%29.jpg", title: "The Lacemaker" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.png", title: "The Milkmaid" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_The_Astronomer_-_1668.jpg", title: "The Astronomer" },
  { img: "https://assets.codepen.io/204808/Johannes_Vermeer_-_Lady_at_the_Virginal_with_a_Gentleman%2C_-The_Music_Lesson-_-_Google_Art_Project.jpg", title: "The Music Lesson" },
  { img: "https://assets.codepen.io/204808/Jan_Vermeer_-_The_Art_of_Painting_-_Google_Art_Project.jpg", title: "The Art of Painting" },
  { img: "https://assets.codepen.io/204808/Het-glas-wijn_edited_Vermeer-1-1230x1066.jpg", title: "The Glass of Wine" },
];

export default function LoginGate({ onLogin, onToggleFullscreen }: LoginGateProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    const reverseTrigger = gsap.utils.toArray(".col-scroll__box:nth-child(odd) .col-scroll__list");

    const scrollAnimations: any[] = [];

    reverseTrigger.forEach((element: any) => {
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;
      const extraSpace = viewportHeight * 0.2;
      const scrollDistance = elementHeight + viewportHeight + extraSpace;

      const animation = gsap.to(element, {
        yPercent: 100,
        scrollTrigger: {
          trigger: element,
          start: 0,
          end: `+=${scrollDistance}`,
          scrub: true,
          pin: true
        }
      });
      scrollAnimations.push(animation);
    });

    return () => {
      lenis.destroy();
      scrollAnimations.forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      const validPattern = /^VX-(0[1-9]|1[0-3])$/i;
      if (validPattern.test(code.trim().toUpperCase()) || code === 'DEMO') {
        onLogin(code.trim().toUpperCase());
      } else {
        setError('Código inválido. Verifique su credencial de Alumno.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-vortex-dark" ref={containerRef}>
      
      {/* SCROLLING BACKGROUND GALLERY */}
      <main>
        <div className="col-scroll">
          <div className="col-scroll__box">
            <div className="col-scroll__list">
              {GALLERY_COL_1.map((item, i) => (
                <figure className="col-scroll__item" key={`col1-${i}`}>
                  <img className="col-scroll__img" src={item.img} alt={item.title} />
                  <figcaption className="col-scroll__title">{item.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="col-scroll__box">
            <div className="col-scroll__list">
              {GALLERY_COL_2.map((item, i) => (
                <figure className="col-scroll__item" key={`col2-${i}`}>
                  <img className="col-scroll__img" src={item.img} alt={item.title} />
                  <figcaption className="col-scroll__title">{item.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="col-scroll__box">
            <div className="col-scroll__list">
              {GALLERY_COL_3.map((item, i) => (
                <figure className="col-scroll__item" key={`col3-${i}`}>
                  <img className="col-scroll__img" src={item.img} alt={item.title} />
                  <figcaption className="col-scroll__title">{item.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FIXED LOGIN OVERLAY */}
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-6">
        
        <div className="absolute top-8 left-8 z-50 pointer-events-auto">
          <InstitutionalLogo className="w-20 h-20" onClick={onToggleFullscreen} />
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce text-slate-400">
          <span className="text-[10px] uppercase tracking-widest font-mono italic">Scroll</span>
          <div className="w-px h-8 bg-slate-400"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm relative z-10 pointer-events-auto"
        >
          <div className="text-center mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            <h1 className="text-2xl font-serif italic text-white tracking-wider mb-1">LOS HÉROES DE ÑUBLE</h1>
            <p className="text-slate-300 font-bold tracking-[0.2em] uppercase text-[9px]">Preuniversitario // Sistema de Preparación</p>
          </div>

          <div className="vortex-card p-6 bg-vortex-surface/80 backdrop-blur-2xl border-slate-700 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">
                  Identificación de Alumno
                </label>
                <input
                  id="code"
                  type="text"
                  placeholder="VX-00"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError('');
                  }}
                  className="vortex-input w-full text-center text-xl tracking-[0.4em] py-3 uppercase border-slate-700 bg-black/60 font-serif italic shadow-inner"
                  disabled={loading}
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-amber-500 text-[9px] uppercase tracking-widest text-center font-bold"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading || !code.trim()}
                className="vortex-button-primary w-full py-3 relative group overflow-hidden shadow-lg"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  <span className="relative z-10">Iniciar Secuencia</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
              <p className="text-[9px] text-slate-400 font-mono italic">
                #Disciplina #Excelencia #Admisión2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
