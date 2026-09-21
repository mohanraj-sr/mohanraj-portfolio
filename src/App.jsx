import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import {
  PartyPopper,
  ShoppingBag,
  Shirt,
  BookOpen,
  ArrowDownRight,
  Terminal,
  CodeXml,
  CircleCheck,
  Headphones,
  Cpu,
  FileSpreadsheet,
  Briefcase,
  Layers,
  ExternalLink,
  Globe,
  Phone,
  Check,
  Copy,
  Linkedin,
  Instagram,
  Menu,
  X,
} from 'lucide-react';
import profileImg from './assets/profile.png';

const navItems = [
  { label: 'HOME', id: 'home' },
  { label: 'ABOUT', id: 'about' },
  { label: 'SERVICE', id: 'services' },
  { label: 'PROJECT', id: 'projects' },
  { label: 'CONTACT', id: 'contact' },
];

const clientProjects = [
  {
    title: 'KTS Events',
    category: 'Client Production',
    description:
      'A high-performance, responsive event management web platform designed to streamline corporate and celebratory event bookings with modern media presentation.',
    url: 'https://kts-events.vercel.app/',
    tags: ['React', 'Responsive Design', 'Event Tech', 'Vercel Deployment'],
    icon: PartyPopper,
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    bgImage:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Natural Modular Kitchen',
    category: 'Client Production',
    description:
      'An architectural showroom & portfolio platform for premium modular interior spaces, highlighting bespoke cabinetry, finishes, and direct consultation booking.',
    url: 'https://modular-kitchen-web-site.vercel.app/#portfolio',
    tags: ['Tailwind CSS', 'Portfolio Showcase', 'Interior Architecture', 'Mobile Optimized'],
    icon: ShoppingBag,
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    bgImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  },
];

const creativeProjects = [
  {
    title: 'Mohan Raj Outfitters',
    category: 'Creative / Exploratory',
    description:
      'A concept e-commerce apparel storefront focused on high-contrast brutalist aesthetics, fluid checkout animations, and interactive apparel curation.',
    url: 'https://vibe-coding-project-lake.vercel.app/',
    tags: ['Apparel Commerce', 'UI Interaction', 'Vibe Coding', 'Modern Styling'],
    icon: Shirt,
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    bgImage:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'SRM Campus Supply Depot',
    category: 'Full-Stack Utility',
    description:
      'A rapid-dispatch campus supply engine engineered to streamline stationery ordering with dynamic inventory tracking, instant bundle reservation, and zero-lag cart operations.',
    url: 'https://sample-e-commerce-website-two.vercel.app/',
    tags: ['Campus Tech', 'Inventory Sync', 'Cart Flow', 'Student Utility'],
    icon: BookOpen,
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    bgImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function App() {
  const containerRef = useRef(null);
  const curtainRef = useRef(null);
  const titleRef = useRef(null);
  const navRef = useRef(null);
  const navItemRefs = useRef({});

  const [activeSection, setActiveSection] = useState('home');
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(null);

  // GSAP Intro Section Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set(curtainRef.current, { yPercent: 0 });
      gsap.set(titleRef.current, { opacity: 0, scale: 0.85, filter: 'blur(10px)' });
      gsap.set('.hero-reveal', { opacity: 0, y: 30 });

      tl.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out',
      })
        .to(titleRef.current, {
          opacity: 0,
          scale: 1.1,
          filter: 'blur(8px)',
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.in',
        })
        .to(curtainRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
        })
        .to(
          '.hero-reveal',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.4',
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Section Observer for Active Nav
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'projects', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Update Sliding Nav Indicator
  useEffect(() => {
    const updateIndicator = () => {
      const currentBtn = navItemRefs.current[activeSection];
      const navContainer = navRef.current;
      if (currentBtn && navContainer) {
        const navRect = navContainer.getBoundingClientRect();
        const btnRect = currentBtn.getBoundingClientRect();
        setIndicator({
          left: btnRect.left - navRect.left,
          width: btnRect.width,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  const scrollTo = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(type);
    setTimeout(() => setCopiedStatus(null), 2000);
  };

  // 3D Card Tilt Hover Handlers
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#050505] text-white min-h-screen w-full overflow-x-hidden selection:bg-neutral-800 selection:text-white"
    >
      {/* 1. Full-Screen Intro Splash Curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black pointer-events-none px-4"
      >
        <h1
          ref={titleRef}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-center text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-300 to-neutral-700 select-none"
        >
          MOHAN RAJ
        </h1>
      </div>

      {/* 2. Fixed Floating Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-neutral-800/80 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 py-4 sm:py-5 flex items-center justify-between">
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 font-black text-base sm:text-lg tracking-[0.2em] text-white uppercase hover:opacity-80 transition cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            MOHAN RAJ
          </button>

          {/* Desktop Nav */}
          <nav
            ref={navRef}
            className="relative hidden md:flex items-center gap-8 lg:gap-10 text-[11px] font-bold tracking-[0.25em] uppercase py-1"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                ref={(el) => (navItemRefs.current[item.id] = el)}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors duration-200 cursor-pointer pb-1.5 ${
                  activeSection === item.id ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <span
              className="absolute bottom-0 h-[2px] bg-white transition-all duration-300 ease-out pointer-events-none rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{
                left: `${indicator.left}px`,
                width: `${indicator.width}px`,
                opacity: indicator.opacity,
              }}
            />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-950/98 border-b border-neutral-900 px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left text-xs font-bold tracking-[0.2em] uppercase py-2 transition ${
                  activeSection === item.id
                    ? 'text-white border-l-2 border-white pl-2'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section
        id="home"
        className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-between overflow-hidden pt-20"
      >
        {/* Radial Ambient Gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(70,80,95,0.32)_0%,rgba(5,5,5,1)_75%)] z-0" />

        {/* High-Res Profile Image Cutout (Rendered FIRST with z-10 so it stays in front) */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pointer-events-none leading-none">
          <img
            src={profileImg}
            alt="S. R. Mohan Raj"
            className="block h-[58vh] sm:h-[68vh] md:h-[78vh] lg:h-[84vh] w-auto max-w-none object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
          />
        </div>

        {/* Giant "PORTFOLIO" Backdrop Headline (Rendered AFTER with z-0 and shifted upward) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none px-4 sm:px-8 md:px-14 lg:px-20 xl:px-24 w-full max-w-full overflow-hidden">
          <h1
            className="hero-reveal w-full text-center font-[900] tracking-[-0.04em] sm:tracking-[-0.035em] uppercase leading-none text-transparent bg-clip-text drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] whitespace-nowrap select-none text-[13.2vw] sm:text-[14vw] md:text-[15vw] lg:text-[15.2vw] xl:text-[15.5vw] -translate-y-4 sm:-translate-y-6 md:-translate-y-8"
            style={{
              backgroundImage:
                'linear-gradient(180deg, #FFFFFF 0%, #D8DFE8 30%, #7B8794 65%, #181B20 98%)',
            }}
          >
            PORTFOLIO
          </h1>
        </div>

        <div className="flex-1" />

        {/* Hero Footer Bar */}
        <footer className="hero-reveal relative z-30 w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 pb-8 sm:pb-12 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 sm:gap-6 pointer-events-auto text-center sm:text-left">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-extrabold tracking-tight">
              Software{' '}
              <span className="font-light italic text-neutral-300 ml-1">Developer</span>
            </h2>
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-neutral-400 uppercase">
              IT Engineer & Operations Specialist • Chengalpattu, India
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('about')}
              aria-label="Scroll to about"
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-neutral-700/80 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center text-white hover:border-white hover:bg-neutral-800/80 transition-all duration-300 shadow-xl group cursor-pointer"
            >
              <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-neutral-700/80 bg-neutral-900/60 backdrop-blur-md text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-xl cursor-pointer"
            >
              Contact
            </button>
          </div>
        </footer>
      </section>

      {/* 4. About Section */}
      <section
        id="about"
        className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 max-w-[1500px] mx-auto border-t border-neutral-900 relative"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-neutral-400" />
              01 / BACKGROUND & DOSSIER
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
              Engineering Profile
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-neutral-400">
            STATUS: OPEN FOR NEW OPPORTUNITIES
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Candidate Card */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 p-8 sm:p-10 rounded-3xl border border-neutral-800/90 backdrop-blur-xl relative overflow-hidden transition-all duration-200 shadow-2xl group bg-[#080808]"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(5,5,5,0.98) 25%, rgba(5,5,5,0.90) 65%, rgba(5,5,5,0.75) 100%), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800/80">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                  Candidate ID: #SRM-2026
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </div>

              <h3 className="text-2xl font-bold mt-6 tracking-tight text-white">
                S. R. Mohan Raj
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                Information Technology Specialist
              </p>
              <p className="text-neutral-300 text-sm mt-5 leading-relaxed font-normal">
                Final-year B.Tech IT scholar at Sri Ramanujar Engineering College (Anna University).
                Combines disciplined operational execution with modern software architecture to
                build reliable, high-performance web systems.
              </p>

              <div className="mt-8 space-y-4 pt-6 border-t border-neutral-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 uppercase font-mono">Academic Track</span>
                  <span className="font-semibold text-neutral-200">B.Tech IT (2022 - 2026)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 uppercase font-mono">Cumulative CGPA</span>
                  <span className="font-mono font-bold text-white bg-neutral-900/90 px-2.5 py-0.5 rounded border border-neutral-700">
                    7.8 / 10.0
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 uppercase font-mono">Regional Base</span>
                  <span className="text-neutral-200">Chengalpattu, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sub-Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Internship Card */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="p-8 rounded-3xl border border-neutral-800/90 transition-all duration-200 flex flex-col justify-between group hover:border-neutral-500 shadow-xl relative overflow-hidden bg-[#080808]"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(5,5,5,0.96) 20%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.7) 100%), url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900/90 border border-neutral-700 flex items-center justify-center text-white mb-6 group-hover:border-white group-hover:scale-110 transition-all shadow-lg backdrop-blur-md">
                  <CodeXml className="w-6 h-6 text-neutral-200" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                    Internship
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Frontend & Architecture
                  </span>
                </div>
                <h4 className="text-lg font-bold mt-2 text-white">Full-Stack Development</h4>
                <p className="text-xs font-semibold text-neutral-300 mt-1">N.Tech Technology</p>
                <p className="text-neutral-300 text-xs sm:text-sm mt-3 leading-relaxed">
                  Engineered component-driven UI platforms, reducing client bundle overhead while
                  implementing responsive interfaces with performance-first layout strategies.
                </p>
              </div>

              <div className="relative z-10 pt-4 mt-6 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] font-mono text-neutral-300">
                <CircleCheck className="w-3.5 h-3.5 text-emerald-400" />
                Modular React Architectures
              </div>
            </div>

            {/* Support Role Card */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="p-8 rounded-3xl border border-neutral-800/90 transition-all duration-200 flex flex-col justify-between group hover:border-neutral-500 shadow-xl relative overflow-hidden bg-[#080808]"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(5,5,5,0.96) 20%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.7) 100%), url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900/90 border border-neutral-700 flex items-center justify-center text-white mb-6 group-hover:border-white group-hover:scale-110 transition-all shadow-lg backdrop-blur-md">
                  <Headphones className="w-6 h-6 text-neutral-200" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                    7 Months Tenure
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">Operations & Support</span>
                </div>
                <h4 className="text-lg font-bold mt-2 text-white">Omnichannel Voice & Support</h4>
                <p className="text-xs font-semibold text-neutral-300 mt-1">Yetram Technovation</p>
                <p className="text-neutral-300 text-xs sm:text-sm mt-3 leading-relaxed">
                  Steered multichannel voice resolutions and concurrent chat sessions. Maintained
                  rigorous ticketing SLAs and managed operational database entries.
                </p>
              </div>

              <div className="relative z-10 pt-4 mt-6 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] font-mono text-neutral-300">
                <CircleCheck className="w-3.5 h-3.5 text-emerald-400" />
                High First-Contact Resolution
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services Section */}
      <section
        id="services"
        className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 max-w-[1500px] mx-auto border-t border-neutral-900"
      >
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-neutral-400" />
            02 / CAPABILITIES & EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
            Core Solutions
          </h2>
          <p className="text-neutral-400 text-sm mt-3">
            High-value engineering, operational reliability, and custom interfaces developed for
            scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-8 sm:p-10 rounded-3xl border border-neutral-800/80 transition-all duration-200 flex flex-col justify-between hover:border-neutral-500 shadow-2xl group relative overflow-hidden bg-neutral-950"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(5,5,5,0.96) 30%, rgba(5,5,5,0.82) 70%, rgba(5,5,5,0.65) 100%), url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:border-white transition-all shadow-lg">
                <CodeXml className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Tier 01
              </span>
              <h3 className="text-xl font-bold mt-1 mb-3 text-white">Frontend Engineering</h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-8">
                Crafting robust client-side software with reactive frameworks. Zero-layout-shift
                responsive systems built for performance across all devices.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-neutral-800/80 flex flex-wrap gap-2">
              {['React.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'GSAP'].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-neutral-900/90 backdrop-blur-md text-[11px] font-mono text-neutral-200 border border-neutral-700/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Service 2 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-8 sm:p-10 rounded-3xl border border-neutral-800/80 transition-all duration-200 flex flex-col justify-between hover:border-neutral-500 shadow-2xl group relative overflow-hidden bg-neutral-950"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(5,5,5,0.96) 30%, rgba(5,5,5,0.82) 70%, rgba(5,5,5,0.65) 100%), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:border-white transition-all shadow-lg">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Tier 02
              </span>
              <h3 className="text-xl font-bold mt-1 mb-3 text-white">Operations & Analytics</h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-8">
                Advanced Excel computational modeling, structured audit validation, data extraction
                pipelines, and ticketing operations.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-neutral-800/80 flex flex-wrap gap-2">
              {['MS Excel', 'Data Auditing', 'SOP Design', 'Ticketing', 'Quality QA'].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-neutral-900/90 backdrop-blur-md text-[11px] font-mono text-neutral-200 border border-neutral-700/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Service 3 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-8 sm:p-10 rounded-3xl border border-neutral-800/80 transition-all duration-200 flex flex-col justify-between hover:border-neutral-500 shadow-2xl group relative overflow-hidden bg-neutral-950"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(5,5,5,0.96) 30%, rgba(5,5,5,0.82) 70%, rgba(5,5,5,0.65) 100%), url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:border-white transition-all shadow-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Tier 03
              </span>
              <h3 className="text-xl font-bold mt-1 mb-3 text-white">Product Development</h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-8">
                Tailored web products from prototype to live production deployment. E-commerce
                platforms, portfolio hubs, and custom portals.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-neutral-800/80 flex flex-wrap gap-2">
              {['E-Commerce', 'SaaS Portals', 'Vercel CI/CD', 'UX Design', 'API Linking'].map(
                (item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-neutral-900/90 backdrop-blur-md text-[11px] font-mono text-neutral-200 border border-neutral-700/60"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Projects Section */}
      <section
        id="projects"
        className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 max-w-[1500px] mx-auto border-t border-neutral-900"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-neutral-400" />
              03 / PORTFOLIO ARTIFACTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
              Engineered Work
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-neutral-400">
            LIVE DEPLOYMENTS & FUNCTIONAL PROTOTYPES
          </p>
        </div>

        {/* 6A. Client Engagements */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-300">
              Client Engagements & Commercial Deployments
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {clientProjects.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="p-8 sm:p-10 rounded-3xl border border-neutral-800/90 transition-all duration-200 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-neutral-500 bg-[#080808]"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(5,5,5,0.97) 20%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.65) 100%), url('${item.bgImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-white transition-all shadow-lg">
                        <Icon className="w-6 h-6 text-neutral-200" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md ${item.badgeColor}`}
                      >
                        {item.category}
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold tracking-tight text-white group-hover:text-neutral-100 transition">
                      {item.title}
                    </h4>
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mt-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-neutral-900/90 backdrop-blur-md text-[10px] font-mono text-neutral-300 border border-neutral-700/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 pt-6 mt-8 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400">
                      STATUS: ACTIVE PRODUCTION
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-200 transition cursor-pointer shadow-lg"
                    >
                      Launch Platform <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6B. Creative Solutions */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-300">
              Creative Solutions & Vibe Coding Explorations
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {creativeProjects.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="p-8 sm:p-10 rounded-3xl border border-neutral-800/90 transition-all duration-200 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-neutral-500 bg-[#080808]"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(5,5,5,0.97) 20%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.65) 100%), url('${item.bgImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-white transition-all shadow-lg">
                        <Icon className="w-6 h-6 text-neutral-200" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md ${item.badgeColor}`}
                      >
                        {item.category}
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold tracking-tight text-white group-hover:text-neutral-100 transition">
                      {item.title}
                    </h4>
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mt-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-neutral-900/90 backdrop-blur-md text-[10px] font-mono text-neutral-300 border border-neutral-700/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 pt-6 mt-8 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400">
                      STATUS: PROTOTYPE ONLINE
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white hover:text-black transition cursor-pointer shadow-lg backdrop-blur-md"
                    >
                      Visit Site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section
        id="contact"
        className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 max-w-[1500px] mx-auto border-t border-neutral-900"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              04 / DIRECT COMMERCE & CONNECT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mt-2">
              Let's build together.
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-sm leading-relaxed">
            Available for immediate full-time software roles, operations leadership, or bespoke
            freelance contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Phone / WhatsApp */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 transition-all duration-200 flex flex-col justify-between hover:border-neutral-600 shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <button
                  onClick={() => copyToClipboard('+918778052065', 'phone')}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
                  title="Copy Number"
                >
                  {copiedStatus === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                Direct Voice & WhatsApp
              </p>
              <p className="text-base font-bold text-white mt-1">+91 87780 52065</p>
            </div>
            <a
              href="https://wa.me/918778052065"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 pt-4 border-t border-neutral-900 text-xs font-mono uppercase text-neutral-400 group-hover:text-white flex items-center justify-between"
            >
              <span>Initiate Chat</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: LinkedIn */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 transition-all duration-200 flex flex-col justify-between hover:border-neutral-600 shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">Professional</span>
              </div>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                LinkedIn Network
              </p>
              <p className="text-base font-bold text-white mt-1">Mohan Raj S.R</p>
            </div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 pt-4 border-t border-neutral-900 text-xs font-mono uppercase text-neutral-400 group-hover:text-white flex items-center justify-between"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Instagram */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 transition-all duration-200 flex flex-col justify-between hover:border-neutral-600 shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">Personal</span>
              </div>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                Instagram Handle
              </p>
              <p className="text-base font-bold text-white mt-1 truncate">
                @h_e_a_r_t_h_a_c_k_e_r____20
              </p>
            </div>
            <a
              href="https://instagram.com/h_e_a_r_t_h_a_c_k_e_r____20"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 pt-4 border-t border-neutral-900 text-xs font-mono uppercase text-neutral-400 group-hover:text-white flex items-center justify-between"
            >
              <span>Follow Account</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer Sub-row */}
        <div className="mt-20 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 text-center sm:text-left gap-3">
          <p>© 2026 S. R. Mohan Raj. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Chengalpattu, Tamil Nadu, India</span>
            <span>•</span>
            <span className="text-neutral-400">LATENCY: OPTIMAL</span>
          </div>
        </div>
      </section>
    </div>
  );
}