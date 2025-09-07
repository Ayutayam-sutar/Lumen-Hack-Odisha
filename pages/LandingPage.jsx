import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/atoms/Button';
import { ICONS } from '../constants';

// A single, improved card component for both Features and Feedback
const InfoCard = ({ icon, title, description, author, role }) => (
    <div className="info-card-3d h-full flex flex-col text-left bg-light-bg-alt dark:bg-dark-bg-alt p-6 md:p-8 rounded-2xl shadow-lg transition-transform duration-300 border border-light-border dark:border-dark-border hover:border-accent hover:shadow-accent/20 hover:-translate-y-2">
        <div className="text-accent text-4xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="flex-grow text-light-text-muted dark:text-dark-text-muted mb-4">{description}</p>
        {author && (
            <div className="mt-auto pt-4 border-t border-light-border dark:border-dark-border">
                <p className="font-semibold">{author}</p>
                <p className="text-sm text-light-text-muted dark:text-dark-text-muted">{role}</p>
            </div>
        )}
    </div>
);


const LandingPage = () => {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // --- YOUR EXISTING 3D BACKGROUND AND PARALLAX EFFECT LOGIC ---
  // --- (This part is preserved exactly as you wrote it) ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const init3DBackground = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        const numberOfParticles = 50;
        let animationFrameId;
        const setSize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        setSize();
        class Particle {
          constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            const style = getComputedStyle(document.documentElement);
            this.color = style.getPropertyValue('--accent-color') || '#6366f1';
          }
          update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
          }
          draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        const init = () => {
          particlesArray = [];
          for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
          }
        };
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
          }
          animationFrameId = requestAnimationFrame(animate);
        };
        init();
        animate();
        const handleResize = () => {
          setSize();
          init();
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(animationFrameId);
        };
      };
      const initParallax = () => {
        const container = containerRef.current;
        if (!container) return;
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const x = clientX / window.innerWidth;
          const y = clientY / window.innerHeight;
          const heroSection = document.querySelector('.hero-section');
          const infoCards = document.querySelectorAll('.info-card-3d');
          if (heroSection) {
            heroSection.style.transform = `translate(${x * 10 - 5}px, ${y * 10 - 5}px)`;
          }
          infoCards.forEach(card => {
            card.style.transform = `perspective(1000px) rotateY(${x * 5 - 2.5}deg) rotateX(${y * -5 + 2.5}deg) translateZ(10px)`;
          });
        };
        container.addEventListener('mousemove', handleMouseMove);
        return () => container.removeEventListener('mousemove', handleMouseMove);
      };
      const backgroundCleanup = init3DBackground();
      const parallaxCleanup = initParallax();
      return () => {
        if (backgroundCleanup) backgroundCleanup();
        if (parallaxCleanup) parallaxCleanup();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text overflow-x-hidden relative">
      {/* 3D Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10 pointer-events-none -z-10"
      />
      
      <header className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
             <img className="rounded-full h-11 w-11"src="pages\lumen lgo.png" alt="" />
            <h1 className="tracking-in-expand text-2xl font-bold">{t('Lumen')}</h1>
        </div>
        <nav>
          <Link to="/auth/login">
            <Button variant="primary" className="relative z-10 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl hover:bg-gradient-to-r from-primary to-accent ">{t('getStarted')}</Button>
          </Link>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 text-center relative z-10">
        <section className="hero-section py-20 md:py-32 transition-transform duration-700 ease-out">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight transform transition-transform duration-700 tracking-in-expand">
            {t('landing.title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t('landing.title2')}</span>
          </h2>
          <p className="text-lg md:text-xl text-light-text-muted dark:text-dark-text-muted max-w-3xl mx-auto mb-8 transform transition-transform duration-700">
            {t('landing.subtitle')}
          </p>
          <Link to="/auth/signup">
            <Button 
              variant="accent" 
              className="text-lg px-8 py-4 relative overflow-hidden group transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">{t('landing.signUp')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
            </Button>
          </Link>
        </section>

        {/* --- IMPROVED FEATURES SECTION --- */}
        <section className="py-18">
          <h2 className="text-3xl font-bold mb-4 tracking-in-expand">{t('landing.featuresTitle', 'Explore Our Core Features')}</h2>
          <p className="text-lg text-light-text-muted dark:text-dark-text-muted max-w-2xl mx-auto mb-12">{t('landing.featuresSubtitle', 'Everything you need to supercharge your learning and collaborate effectively.')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 slide-in-bck-center ">
            <InfoCard 
              icon={ICONS.aiTutor || '🤖'}
              title={t('landing.feature1Title')}
              description={t('landing.feature1Desc')}
            />
            <InfoCard 
              icon={ICONS.decks || '🃏'}
              title={t('landing.feature2Title')}
              description={t('landing.feature2Desc')}
            />
            <InfoCard 
              icon={ICONS.groups || '👥'}
              title={t('landing.feature3Title')}
              description={t('landing.feature3Desc')}
            />
          </div>
        </section>

        {/* --- IMPROVED FEEDBACK/TESTIMONIALS SECTION --- */}
        <section className="py-20">
          <h2 className="text-3xl font-bold mb-4">{t('landing.feedbackTitle', 'What Our Users Say')}</h2>
          <p className="text-lg text-light-text-muted dark:text-dark-text-muted max-w-2xl mx-auto mb-12">{t('landing.feedbackSubtitle', 'Discover how Lumen is transforming the way students achieve their goals.')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard 
              icon={ICONS.award || '🏆'}
              title={t('landing.testimonial1Title', 'A Game Changer!')}
              description={t('landing.testimonial1Desc', 'The AI Doubt Solver is incredible. It helped me understand complex topics at 2 AM when no one else was available. My grades have genuinely improved.')}
              author="Priya Sharma"
              role="Computer Science Student"
            />
            <InfoCard
              icon={ICONS.study || '📚'}
              title={t('landing.testimonial2Title', 'Collaboration Made Easy')}
              description={t('landing.testimonial2Desc', 'Finding a study group for my niche subject used to be impossible. With Lumen, I found a dedicated group in minutes. The shared whiteboard is fantastic.')}
              author="Rohan Verma"
              role="Physics Major"
            />
            <InfoCard
              icon={ICONS.streak || '⚡'}
              title={t('landing.testimonial3Title', 'Actually Fun to Study')}
              description={t('landing.testimonial3Desc', 'I\'m addicted to maintaining my study streak! The gamification elements make learning feel less like a chore and more like a challenge.')}
              author="Anjali Singh"
              role="Pre-Med Aspirant"
            />
          </div>
        </section>
      </main>
      
      {/* Your existing style tag is preserved */}
      <style>
        {`
          .info-card-3d, .hero-section {
            transform-style: preserve-3d;
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
