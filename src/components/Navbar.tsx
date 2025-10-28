// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const NAV_LINKS = [
//   { name: 'Home', to: 'home' },
//   { name: 'About', to: 'about' },
//   { name: 'Skills', to: 'skills' },
//   { name: 'Projects', to: 'projects' },
//   { name: 'Experience', to: 'experience' },
//   { name: 'Contact', to: 'contact' }
// ] as const;

// // A standalone component for the shuttle SVG to keep the main component cleaner
// const SpaceShuttleIcon: React.FC<{ isActive: boolean; isPassed: boolean; }> = ({ isActive, isPassed }) => {
//   return (
//     <motion.svg
//       width="40"
//       height="40"
//       viewBox="0 0 200 200"
//       initial={false}
//       animate={{
//         filter: isActive 
//           ? 'drop-shadow(0 0 15px rgba(45,212,191,0.9)) drop-shadow(0 0 30px rgba(45,212,191,0.5))' 
//           : 'drop-shadow(0 0 5px rgba(0,0,0,0.5))',
//       }}
//       transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//     >
//       {/* --- ROCKET EXHAUST & FLAME --- */}
//       <motion.g 
//         style={{ transformOrigin: '100px 30px' }}
//         // Animate the flame to appear only on the active shuttle
//         animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
//         transition={{ duration: 0.3 }}
//       >
//         <motion.ellipse
//           cx="100" cy="30" rx="40" ry="25"
//           fill="#FFD93D"
//           opacity="0.5"
//           filter="url(#fire-turbulence)"
//           animate={{ ry: [20, 30, 20], opacity: [0.3, 0.6, 0.3] }}
//           transition={{ duration: 0.3, repeat: Infinity }}
//         />
//         <motion.path
//           d="M 80 30 Q 100 -20 120 30 Z" fill="#FF6B6B" filter="url(#fire-turbulence)"
//           animate={{ d: ["M 80 30 Q 100 -20 120 30 Z", "M 80 30 Q 100 -30 120 30 Z", "M 80 30 Q 100 -20 120 30 Z"]}}
//           transition={{ duration: 0.15, repeat: Infinity }}
//         />
//         <motion.path
//           d="M 85 30 Q 100 -15 115 30 Z" fill="#FFD93D" filter="url(#fire-turbulence)"
//           animate={{ d: ["M 85 30 Q 100 -15 115 30 Z", "M 85 30 Q 100 -25 115 30 Z", "M 85 30 Q 100 -15 115 30 Z"]}}
//           transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
//         />
//         <motion.path
//           d="M 90 30 Q 100 0 110 30 Z" fill="#FFFFFF" filter="url(#fire-turbulence)"
//           animate={{ d: ["M 90 30 Q 100 0 110 30 Z", "M 90 30 Q 100 -10 110 30 Z", "M 90 30 Q 100 0 110 30 Z"]}}
//           transition={{ duration: 0.08, repeat: Infinity, delay: 0.1 }}
//         />
//       </motion.g>

//       {/* --- SHUTTLE BODY --- */}
//       <motion.g animate={{ opacity: isPassed ? 0.4 : 1 }}>
//         <path d="M 120 100 L 170 130 L 130 140 L 110 120 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
//         <path d="M 80 100 L 30 130 L 70 140 L 90 120 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
//         <path d="M 100 25 C 120 25, 120 60, 120 90 L 120 150 L 80 150 L 80 90 C 80 60, 80 25, 100 25 Z" fill="url(#shuttleBody)" stroke="#6B7280" strokeWidth="2"/>
//         <path d="M 80 150 C 80 155, 120 155, 120 150 L 120 145 L 80 145 Z" fill="url(#shuttleDark)" />
//         <path d="M 100 150 C 115 150, 118 165, 118 175 L 82 175 C 82 165, 85 150, 100 150 Z" fill="url(#shuttleDark)" stroke="#1F2937" strokeWidth="1.5" />
//         <path d="M 100 152 C 113 152, 115 163, 115 172 L 85 172 C 85 163, 87 152, 100 152 Z" fill="#2DD4BF" opacity="0.6" />
//         <path d="M 90 158 L 110 158" stroke="#F3F4F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
//         <path d="M 100 175 C 100 175, 110 195, 100 200 C 90 195, 100 175, 100 175 Z" fill="#1F2937" />
//         <path d="M 100 35 L 125 70 L 100 60 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2" />
//         <path d="M 100 35 L 75 70 L 100 60 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
//       </motion.g>
//     </motion.svg>
//   );
// };

// const SidebarNav: React.FC = () => {
//   const [activeSection, setActiveSection] = React.useState('home');
//   const [hoveredSection, setHoveredSection] = React.useState<string | null>(null);
//   const [scrollProgress, setScrollProgress] = React.useState(0);
//   const [prevScrollProgress, setPrevScrollProgress] = React.useState(0);
//   const [isScrollingDown, setIsScrollingDown] = React.useState(true);
//   const scrollTimeout = React.useRef<NodeJS.Timeout>();

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       setActiveSection(sectionId);
//     }
//   };

//   React.useEffect(() => {
//     const handleScroll = () => {
//       const windowHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight - windowHeight;
//       const scrolled = window.scrollY;
//       const progress = (scrolled / documentHeight) * 100;
//       const newProgress = Math.min(progress, 100);

//       // Add a small threshold to prevent flickering on minor scroll adjustments
//       if (Math.abs(newProgress - prevScrollProgress) > 0.1) {
//           setIsScrollingDown(newProgress > prevScrollProgress);
//       }
//       setPrevScrollProgress(newProgress);
//       setScrollProgress(newProgress);
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [prevScrollProgress]);

//   React.useEffect(() => {
//     const setupObserver = () => {
//       const observerOptions = {
//         rootMargin: '-50% 0px -50% 0px',
//         threshold: 0
//       };
//       const observerCallback = (entries: IntersectionObserverEntry[]) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
//             scrollTimeout.current = setTimeout(() => {
//               setActiveSection(entry.target.id);
//             }, 50);
//           }
//         });
//       };
//       const observer = new IntersectionObserver(observerCallback, observerOptions);
//       NAV_LINKS.forEach(({ to }) => {
//         const element = document.getElementById(to);
//         if (element) observer.observe(element);
//       });
//       return () => {
//         observer.disconnect();
//         if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
//       };
//     };
//     const timer = setTimeout(setupObserver, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   const activeIndex = NAV_LINKS.findIndex(link => link.to === activeSection);

//   return (
//     <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
//       {/* SVG definitions. This is a common pattern to avoid duplicate IDs when mapping over SVGs. */}
//       <svg width="0" height="0" className="absolute">
//         <defs>
//           <linearGradient id="shuttleBody" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#9CA3AF" /><stop offset="50%" stopColor="#F3F4F6" /><stop offset="100%" stopColor="#9CA3AF" />
//           </linearGradient>
//           <linearGradient id="shuttleDark" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#1F2937" /><stop offset="100%" stopColor="#374151" />
//           </linearGradient>
//           <filter id="fire-turbulence">
//             <feTurbulence baseFrequency="0.05 0.2" numOctaves="2" result="turbulence" type="fractalNoise">
//               <animate attributeName="baseFrequency" values="0.05 0.2;0.06 0.25;0.05 0.2" dur="0.4s" repeatCount="indefinite"/>
//             </feTurbulence>
//             <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" /><feGaussianBlur stdDeviation="2" />
//           </filter>
//         </defs>
//       </svg>
      
//       <div className="relative flex items-center">
//         {/* Navigation Buttons */}
//         <div className="flex flex-col items-center gap-4"> {/* Adjusted gap */}
//           {NAV_LINKS.map((link, index) => {
//             const isActive = activeSection === link.to;
//             const isHovered = hoveredSection === link.to;
//             const isPassed = index < activeIndex;
            
//             return (
//               <motion.button
//                 key={link.to}
//                 onClick={() => scrollToSection(link.to)}
//                 onMouseEnter={() => setHoveredSection(link.to)}
//                 onMouseLeave={() => setHoveredSection(null)}
//                 className="group relative cursor-pointer bg-transparent border-none p-0 outline-none w-10 h-10 flex items-center justify-center" // Set fixed size for the button
//                 initial={{ opacity: 0, x: 10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.08 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <AnimatePresence>
//                   {(isHovered || isActive) && (
//                     <motion.div
//                       initial={{ opacity: 0, x: 12, scale: 0.85 }}
//                       animate={{ opacity: 1, x: 0, scale: 1 }}
//                       exit={{ opacity: 0, x: 12, scale: 0.85 }}
//                       transition={{ duration: 0.25, type: "spring", stiffness: 300 }}
//                       className="absolute right-12 top-1/2 -translate-y-1/2 whitespace-nowrap"
//                     >
//                       <div 
//                         className={`px-5 py-2.5 rounded-xl backdrop-blur-2xl border-2 text-sm font-bold tracking-wide ${
//                           isActive 
//                             ? 'bg-gradient-to-r from-[#0F172A]/95 via-[#1E293B]/95 to-[#0F172A]/95 border-[#2DD4BF] text-[#2DD4BF]' 
//                             : 'bg-[#1F2937]/95 border-gray-600/60 text-gray-200'
//                         }`}
//                         style={isActive ? { boxShadow: '0 0 40px rgba(45,212,191,0.5), 0 0 80px rgba(45,212,191,0.2), inset 0 0 30px rgba(45,212,191,0.1)' } : { boxShadow: '0 6px 25px rgba(0,0,0,0.4)' }}
//                       >
//                         {link.name}
//                         {isActive && <motion.div layoutId="navUnderline" className="absolute bottom-1.5 left-5 right-5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* --- Shuttle replaces the dot --- */}
//                 <motion.div
//                   className="absolute"
//                   // Animate shuttle rotation based on scroll direction
//                   animate={{ rotate: isScrollingDown ? 180 : 0, scale: isActive ? 1.5 : 1 }}
//                   transition={{ type: 'spring', stiffness: 200, damping: 20 }}
//                 >
//                     <SpaceShuttleIcon isActive={isActive} isPassed={isPassed} />
//                 </motion.div>

//               </motion.button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Progress Display */}
//       <motion.div
//         className="absolute -bottom-16 right-0 flex items-center gap-3"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: scrollProgress > 0 ? 1 : 0, y: scrollProgress > 0 ? 0 : 10 }}
//         transition={{ delay: 0.5 }}
//       >
//         <div className="relative">
//           <svg width="36" height="36" className="transform -rotate-90">
//             <circle cx="18" cy="18" r="16" stroke="#1F2937" strokeWidth="3" fill="none" opacity="0.3" />
//             <motion.circle
//               cx="18" cy="18" r="16" stroke="url(#progressGrad)" strokeWidth="3" fill="none" strokeLinecap="round"
//               strokeDasharray={`${2 * Math.PI * 16}`} initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
//               animate={{ strokeDashoffset: 2 * Math.PI * 16 * (1 - scrollProgress / 100) }}
//               transition={{ type: 'spring', damping: 30, stiffness: 100 }}
//               style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.8))' }}
//             />
//             <defs>
//               <linearGradient id="progressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="#2DD4BF" /><stop offset="100%" stopColor="#8B5CF6" />
//               </linearGradient>
//             </defs>
//           </svg>
//           <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#2DD4BF]"
//             animate={{ scale: [1, 1.4, 1], boxShadow: ['0 0 10px rgba(45,212,191,0.8)','0 0 20px rgba(45,212,191,1)','0 0 10px rgba(45,212,191,0.8)'] }}
//             transition={{ duration: 2, repeat: Infinity }} />
//         </div>
//         <motion.div className="flex flex-col items-start">
//           <span className="text-sm font-mono font-bold text-[#2DD4BF] tracking-wider leading-none" style={{ textShadow: '0 0 12px rgba(45,212,191,0.6)' }}>
//             {Math.round(scrollProgress)}%
//           </span>
//           <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wide">
//             {isScrollingDown ? 'Descending' : 'Ascending'}
//           </span>
//         </motion.div>
//       </motion.div>
//     </nav>
//   );
// };

// export default SidebarNav;
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const NAV_LINKS = [
//   { name: 'Home', to: 'home' },
//   { name: 'About', to: 'about' },
//   { name: 'Skills', to: 'skills' },
//   { name: 'Projects', to: 'projects' },
//   { name: 'Experience', to: 'experience' },
//   { name: 'Contact', to: 'contact' }
// ] as const;

// // A standalone component for the shuttle SVG to keep the main component cleaner
// const SpaceShuttleIcon: React.FC<{ isActive: boolean; isPassed: boolean; }> = ({ isActive, isPassed }) => {
//   return (
//     <motion.svg
//       width="40"
//       height="40"
//       viewBox="0 0 200 200"
//       initial={false}
//       style={{
//         filter: 'drop-shadow(0 0 15px rgba(45,212,191,0.9)) drop-shadow(0 0 30px rgba(45,212,191,0.5))'
//       }}
//     >
//       {/* --- ROCKET EXHAUST & FLAME --- */}
//       <motion.g 
//         style={{ transformOrigin: '100px 30px' }}
//       >
//         <motion.ellipse
//           cx="100" cy="30" rx="40" ry="25"
//           fill="#FFD93D"
//           opacity="0.5"
//           filter="url(#fire-turbulence)"
//           animate={{ ry: [20, 30, 20], opacity: [0.3, 0.6, 0.3] }}
//           transition={{ duration: 0.3, repeat: Infinity }}
//         />
//         <motion.path
//           d="M 80 30 Q 100 -20 120 30 Z" fill="#FF6B6B" filter="url(#fire-turbulence)"
//           animate={{ d: ["M 80 30 Q 100 -20 120 30 Z", "M 80 30 Q 100 -30 120 30 Z", "M 80 30 Q 100 -20 120 30 Z"]}}
//           transition={{ duration: 0.15, repeat: Infinity }}
//         />
//         <motion.path
//           d="M 85 30 Q 100 -15 115 30 Z" fill="#FFD93D" filter="url(#fire-turbulence)"
//           animate={{ d: ["M 85 30 Q 100 -15 115 30 Z", "M 85 30 Q 100 -25 115 30 Z", "M 85 30 Q 100 -15 115 30 Z"]}}
//           transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
//         />
//         <motion.path
//           d="M 90 30 Q 100 0 110 30 Z" fill="#FFFFFF" filter="url(#fire-turbulence)"
//           animate={{ d: ["M 90 30 Q 100 0 110 30 Z", "M 90 30 Q 100 -10 110 30 Z", "M 90 30 Q 100 0 110 30 Z"]}}
//           transition={{ duration: 0.08, repeat: Infinity, delay: 0.1 }}
//         />
//       </motion.g>

//       {/* --- SHUTTLE BODY --- */}
//       <motion.g>
//         <path d="M 120 100 L 170 130 L 130 140 L 110 120 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
//         <path d="M 80 100 L 30 130 L 70 140 L 90 120 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
//         <path d="M 100 25 C 120 25, 120 60, 120 90 L 120 150 L 80 150 L 80 90 C 80 60, 80 25, 100 25 Z" fill="url(#shuttleBody)" stroke="#6B7280" strokeWidth="2"/>
//         <path d="M 80 150 C 80 155, 120 155, 120 150 L 120 145 L 80 145 Z" fill="url(#shuttleDark)" />
//         <path d="M 100 150 C 115 150, 118 165, 118 175 L 82 175 C 82 165, 85 150, 100 150 Z" fill="url(#shuttleDark)" stroke="#1F2937" strokeWidth="1.5" />
//         <path d="M 100 152 C 113 152, 115 163, 115 172 L 85 172 C 85 163, 87 152, 100 152 Z" fill="#2DD4BF" opacity="0.6" />
//         <path d="M 90 158 L 110 158" stroke="#F3F4F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
//         <path d="M 100 175 C 100 175, 110 195, 100 200 C 90 195, 100 175, 100 175 Z" fill="#1F2937" />
//         <path d="M 100 35 L 125 70 L 100 60 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2" />
//         <path d="M 100 35 L 75 70 L 100 60 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
//       </motion.g>
//     </motion.svg>
//   );
// };

// const SidebarNav: React.FC = () => {
//   const [activeSection, setActiveSection] = React.useState('home');
//   const [hoveredSection, setHoveredSection] = React.useState<string | null>(null);
//   const [scrollProgress, setScrollProgress] = React.useState(0);
//   const [prevScrollProgress, setPrevScrollProgress] = React.useState(0);
//   const [isScrollingDown, setIsScrollingDown] = React.useState(true);
//   const scrollTimeout = React.useRef<NodeJS.Timeout>();
//   const [shuttlePosition, setShuttlePosition] = React.useState(0);

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       setActiveSection(sectionId);
//     }
//   };

//   React.useEffect(() => {
//     const handleScroll = () => {
//       const windowHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight - windowHeight;
//       const scrolled = window.scrollY;
//       const progress = (scrolled / documentHeight) * 100;
//       const newProgress = Math.min(progress, 100);

//       // Add a small threshold to prevent flickering on minor scroll adjustments
//       if (Math.abs(newProgress - prevScrollProgress) > 0.1) {
//           setIsScrollingDown(newProgress > prevScrollProgress);
//       }
//       setPrevScrollProgress(newProgress);
//       setScrollProgress(newProgress);
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [prevScrollProgress]);

//   React.useEffect(() => {
//     const setupObserver = () => {
//       const observerOptions = {
//         rootMargin: '-50% 0px -50% 0px',
//         threshold: 0
//       };
//       const observerCallback = (entries: IntersectionObserverEntry[]) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
//             scrollTimeout.current = setTimeout(() => {
//               setActiveSection(entry.target.id);
//             }, 50);
//           }
//         });
//       };
//       const observer = new IntersectionObserver(observerCallback, observerOptions);
//       NAV_LINKS.forEach(({ to }) => {
//         const element = document.getElementById(to);
//         if (element) observer.observe(element);
//       });
//       return () => {
//         observer.disconnect();
//         if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
//       };
//     };
//     const timer = setTimeout(setupObserver, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   const activeIndex = NAV_LINKS.findIndex(link => link.to === activeSection);

//   // Calculate shuttle position based on active section
//   React.useEffect(() => {
//     setShuttlePosition(activeIndex * 56); // 56 = button height + gap
//   }, [activeIndex]);

//   return (
//     <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
//       {/* SVG definitions. This is a common pattern to avoid duplicate IDs when mapping over SVGs. */}
//       <svg width="0" height="0" className="absolute">
//         <defs>
//           <linearGradient id="shuttleBody" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#9CA3AF" /><stop offset="50%" stopColor="#F3F4F6" /><stop offset="100%" stopColor="#9CA3AF" />
//           </linearGradient>
//           <linearGradient id="shuttleDark" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#1F2937" /><stop offset="100%" stopColor="#374151" />
//           </linearGradient>
//           <filter id="fire-turbulence">
//             <feTurbulence baseFrequency="0.05 0.2" numOctaves="2" result="turbulence" type="fractalNoise">
//               <animate attributeName="baseFrequency" values="0.05 0.2;0.06 0.25;0.05 0.2" dur="0.4s" repeatCount="indefinite"/>
//             </feTurbulence>
//             <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" /><feGaussianBlur stdDeviation="2" />
//           </filter>
//         </defs>
//       </svg>
      
//       <div className="relative flex items-center">
//         {/* Navigation Buttons */}
//         <div className="flex flex-col items-center gap-4">
//           {NAV_LINKS.map((link, index) => {
//             const isActive = activeSection === link.to;
//             const isHovered = hoveredSection === link.to;
            
//             return (
//               <motion.button
//                 key={link.to}
//                 onClick={() => scrollToSection(link.to)}
//                 onMouseEnter={() => setHoveredSection(link.to)}
//                 onMouseLeave={() => setHoveredSection(null)}
//                 className="group relative cursor-pointer bg-transparent border-none p-0 outline-none w-10 h-10 flex items-center justify-center"
//                 initial={{ opacity: 0, x: 10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.08 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <AnimatePresence>
//                   {(isHovered || isActive) && (
//                     <motion.div
//                       initial={{ opacity: 0, x: 12, scale: 0.85 }}
//                       animate={{ opacity: 1, x: 0, scale: 1 }}
//                       exit={{ opacity: 0, x: 12, scale: 0.85 }}
//                       transition={{ duration: 0.25, type: "spring", stiffness: 300 }}
//                       className="absolute right-12 top-1/2 -translate-y-1/2 whitespace-nowrap"
//                     >
//                       <div 
//                         className={`px-5 py-2.5 rounded-xl backdrop-blur-2xl border-2 text-sm font-bold tracking-wide ${
//                           isActive 
//                             ? 'bg-gradient-to-r from-[#0F172A]/95 via-[#1E293B]/95 to-[#0F172A]/95 border-[#2DD4BF] text-[#2DD4BF]' 
//                             : 'bg-[#1F2937]/95 border-gray-600/60 text-gray-200'
//                         }`}
//                         style={isActive ? { boxShadow: '0 0 40px rgba(45,212,191,0.5), 0 0 80px rgba(45,212,191,0.2), inset 0 0 30px rgba(45,212,191,0.1)' } : { boxShadow: '0 6px 25px rgba(0,0,0,0.4)' }}
//                       >
//                         {link.name}
//                         {isActive && <motion.div layoutId="navUnderline" className="absolute bottom-1.5 left-5 right-5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Moving Space Shuttle - positioned on each button */}
//                 {isActive && (
//                   <motion.div
//                     layoutId="spaceShuttle"
//                     className="absolute"
//                     animate={{ 
//                       rotate: isScrollingDown ? 180 : 0
//                     }}
//                     transition={{ 
//                       type: 'spring', 
//                       stiffness: 200, 
//                       damping: 25,
//                       mass: 0.8
//                     }}
//                   >
//                     <SpaceShuttleIcon isActive={true} isPassed={false} />
//                   </motion.div>
//                 )}

//               </motion.button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Progress Display */}
//       <motion.div
//         className="absolute -bottom-16 right-0 flex items-center gap-3"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: scrollProgress > 0 ? 1 : 0, y: scrollProgress > 0 ? 0 : 10 }}
//         transition={{ delay: 0.5 }}
//       >
//         <div className="relative">
//           <svg width="36" height="36" className="transform -rotate-90">
//             <circle cx="18" cy="18" r="16" stroke="#1F2937" strokeWidth="3" fill="none" opacity="0.3" />
//             <motion.circle
//               cx="18" cy="18" r="16" stroke="url(#progressGrad)" strokeWidth="3" fill="none" strokeLinecap="round"
//               strokeDasharray={`${2 * Math.PI * 16}`} initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
//               animate={{ strokeDashoffset: 2 * Math.PI * 16 * (1 - scrollProgress / 100) }}
//               transition={{ type: 'spring', damping: 30, stiffness: 100 }}
//               style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.8))' }}
//             />
//             <defs>
//               <linearGradient id="progressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="#2DD4BF" /><stop offset="100%" stopColor="#8B5CF6" />
//               </linearGradient>
//             </defs>
//           </svg>
//           <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#2DD4BF]"
//             animate={{ scale: [1, 1.4, 1], boxShadow: ['0 0 10px rgba(45,212,191,0.8)','0 0 20px rgba(45,212,191,1)','0 0 10px rgba(45,212,191,0.8)'] }}
//             transition={{ duration: 2, repeat: Infinity }} />
//         </div>
//         <motion.div className="flex flex-col items-start">
//           <span className="text-sm font-mono font-bold text-[#2DD4BF] tracking-wider leading-none" style={{ textShadow: '0 0 12px rgba(45,212,191,0.6)' }}>
//             {Math.round(scrollProgress)}%
//           </span>
//           <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wide">
//             {isScrollingDown ? 'Descending' : 'Ascending'}
//           </span>
//         </motion.div>
//       </motion.div>
//     </nav>
//   );
// };

// export default SidebarNav;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Experience', to: 'experience' },
  {name :'Cerftifications', to: 'certifications' },
  { name: 'Contact', to: 'contact' }
] as const;

// A standalone component for the shuttle SVG to keep the main component cleaner
const SpaceShuttleIcon: React.FC<{ isActive: boolean; isPassed: boolean; }> = ({ isActive, isPassed }) => {
  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 200 200"
      initial={false}
      style={{
        filter: 'drop-shadow(0 0 15px rgba(45,212,191,0.9)) drop-shadow(0 0 30px rgba(45,212,191,0.5))'
      }}
    >
      {/* --- ROCKET SMOKE & EXHAUST --- */}
      <motion.g 
        style={{ transformOrigin: '100px 30px' }}
      >
        {/* Smoke */}
        <motion.circle cx="100" cy="20" r="10" fill="white" filter="url(#smoke)"
          animate={{ r: [10, 50], opacity: [0.6, 0], cy: [20, -30] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
        />
        <motion.circle cx="100" cy="20" r="15" fill="white" filter="url(#smoke)"
          animate={{ r: [15, 60], opacity: [0.5, 0], cy: [20, -40] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
        
        {/* Fire */}
        <motion.ellipse cx="100" cy="30" rx="40" ry="25" fill="#FFD93D" opacity="0.5" filter="url(#fire-turbulence)"
          animate={{ ry: [20, 30, 20], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.path d="M 80 30 Q 100 -20 120 30 Z" fill="#FF6B6B" filter="url(#fire-turbulence)"
          animate={{ d: ["M 80 30 Q 100 -20 120 30 Z", "M 80 30 Q 100 -30 120 30 Z", "M 80 30 Q 100 -20 120 30 Z"]}}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        <motion.path d="M 85 30 Q 100 -15 115 30 Z" fill="#FFD93D" filter="url(#fire-turbulence)"
          animate={{ d: ["M 85 30 Q 100 -15 115 30 Z", "M 85 30 Q 100 -25 115 30 Z", "M 85 30 Q 100 -15 115 30 Z"]}}
          transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
        />
        <motion.path d="M 90 30 Q 100 0 110 30 Z" fill="#FFFFFF" filter="url(#fire-turbulence)"
          animate={{ d: ["M 90 30 Q 100 0 110 30 Z", "M 90 30 Q 100 -10 110 30 Z", "M 90 30 Q 100 0 110 30 Z"]}}
          transition={{ duration: 0.08, repeat: Infinity, delay: 0.1 }}
        />
      </motion.g>

      {/* --- SHUTTLE BODY --- */}
      <motion.g>
        <path d="M 120 100 L 170 130 L 130 140 L 110 120 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
        <path d="M 80 100 L 30 130 L 70 140 L 90 120 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
        <path d="M 100 25 C 120 25, 120 60, 120 90 L 120 150 L 80 150 L 80 90 C 80 60, 80 25, 100 25 Z" fill="url(#shuttleBody)" stroke="#6B7280" strokeWidth="2"/>
        <path d="M 80 150 C 80 155, 120 155, 120 150 L 120 145 L 80 145 Z" fill="url(#shuttleDark)" />
        <path d="M 100 150 C 115 150, 118 165, 118 175 L 82 175 C 82 165, 85 150, 100 150 Z" fill="url(#shuttleDark)" stroke="#1F2937" strokeWidth="1.5" />
        <path d="M 100 152 C 113 152, 115 163, 115 172 L 85 172 C 85 163, 87 152, 100 152 Z" fill="#2DD4BF" opacity="0.6" />
        <path d="M 90 158 L 110 158" stroke="#F3F4F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
        <path d="M 100 175 C 100 175, 110 195, 100 200 C 90 195, 100 175, 100 175 Z" fill="#1F2937" />
        <path d="M 100 35 L 125 70 L 100 60 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2" />
        <path d="M 100 35 L 75 70 L 100 60 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
      </motion.g>
    </motion.svg>
  );
};

const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('home');
  const [hoveredSection, setHoveredSection] = React.useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [prevScrollProgress, setPrevScrollProgress] = React.useState(0);
  const [isScrollingDown, setIsScrollingDown] = React.useState(true);
  const scrollTimeout = React.useRef<NodeJS.Timeout>();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      const newProgress = Math.min(progress, 100);

      if (Math.abs(newProgress - prevScrollProgress) > 0.1) {
          setIsScrollingDown(newProgress > prevScrollProgress);
      }
      setPrevScrollProgress(newProgress);
      setScrollProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollProgress]);

  React.useEffect(() => {
    const setupObserver = () => {
      const observerOptions = {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      };
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      NAV_LINKS.forEach(({ to }) => {
        const element = document.getElementById(to);
        if (element) observer.observe(element);
      });
      return () => {
        observer.disconnect();
      };
    };
    const timer = setTimeout(setupObserver, 100);
    return () => clearTimeout(timer);
  }, []);

  const activeIndex = NAV_LINKS.findIndex(link => link.to === activeSection);
  const shuttleYPosition = activeIndex * 56; // 56 = 40px (button height) + 16px (gap-4)
  const pathProgress = activeIndex > 0 ? activeIndex / (NAV_LINKS.length - 1) : 0;
  
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="shuttleBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9CA3AF" /><stop offset="50%" stopColor="#F3F4F6" /><stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
          <linearGradient id="shuttleDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1F2937" /><stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <filter id="fire-turbulence">
            <feTurbulence baseFrequency="0.05 0.2" numOctaves="2" result="turbulence" type="fractalNoise">
              <animate attributeName="baseFrequency" values="0.05 0.2;0.06 0.25;0.05 0.2" dur="0.4s" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" /><feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="smoke" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="3" seed="2" result="turbulence"/>
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" />
              <feGaussianBlur stdDeviation="5" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" />
          </filter>
           {/* New Blur Filter for the trail */}
          <filter id="trail-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
      </svg>
      
      <div className="relative">
         {/* --- ROCKET TRAIL --- */}
         <svg
            width="40"
            height={(NAV_LINKS.length - 1) * 56 + 40} // Total height of the path
            className="absolute top-0 left-0 pointer-events-none"
            style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.7))' }}
          >
            <motion.path
              d={`M 20 20 V ${(NAV_LINKS.length - 1) * 56 + 20}`}
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="2 12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: pathProgress }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              filter="url(#trail-blur)"
            />
          </svg>

        {/* SINGLE Space Shuttle instance */}
        <motion.div
          className="absolute left-0 top-0"
          animate={{ 
            y: shuttleYPosition,
            rotate: isScrollingDown ? 180 : 0 
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 30
          }}
        >
          <SpaceShuttleIcon isActive={true} isPassed={false} />
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center gap-4">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeSection === link.to;
            const isHovered = hoveredSection === link.to;
            
            return (
              <motion.button
                key={link.to}
                onClick={() => scrollToSection(link.to)}
                onMouseEnter={() => setHoveredSection(link.to)}
                onMouseLeave={() => setHoveredSection(null)}
                // We leave a transparent placeholder for the shuttle
                className="group relative cursor-pointer bg-transparent border-none p-0 outline-none w-10 h-10 flex items-center justify-center text-transparent"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* This text is hidden but provides a clickable area */}
                {link.name}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.div
                      initial={{ opacity: 0, x: 12, scale: 0.85 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 12, scale: 0.85 }}
                      transition={{ duration: 0.25, type: "spring", stiffness: 300 }}
                      className="absolute right-12 top-1/2 -translate-y-1/2 whitespace-nowrap"
                    >
                      <div 
                        className={`px-5 py-2.5 rounded-xl backdrop-blur-2xl border-2 text-sm font-bold tracking-wide ${
                          isActive 
                            ? 'bg-gradient-to-r from-[#0F172A]/95 via-[#1E293B]/95 to-[#0F172A]/95 border-[#2DD4BF] text-[#2DD4BF]' 
                            : 'bg-[#1F2937]/95 border-gray-600/60 text-gray-200'
                        }`}
                        style={isActive ? { boxShadow: '0 0 40px rgba(45,212,191,0.5), 0 0 80px rgba(45,212,191,0.2), inset 0 0 30px rgba(45,212,191,0.1)' } : { boxShadow: '0 6px 25px rgba(0,0,0,0.4)' }}
                      >
                        {link.name}
                        {isActive && <motion.div layoutId="navUnderline" className="absolute bottom-1.5 left-5 right-5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress Display (Unchanged) */}
      <motion.div
        className="absolute -bottom-16 right-0 flex items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: scrollProgress > 0 ? 1 : 0, y: scrollProgress > 0 ? 0 : 10 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative">
          <svg width="36" height="36" className="transform -rotate-90">
            <circle cx="18" cy="18" r="16" stroke="#1F2937" strokeWidth="3" fill="none" opacity="0.3" />
            <motion.circle
              cx="18" cy="18" r="16" stroke="url(#progressGrad)" strokeWidth="3" fill="none" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 16}`} initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 16 * (1 - scrollProgress / 100) }}
              transition={{ type: 'spring', damping: 30, stiffness: 100 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.8))' }}
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" /><stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#2DD4BF]"
            animate={{ scale: [1, 1.4, 1], boxShadow: ['0 0 10px rgba(45,212,191,0.8)','0 0 20px rgba(45,212,191,1)','0 0 10px rgba(45,212,191,0.8)'] }}
            transition={{ duration: 2, repeat: Infinity }} />
        </div>
        <motion.div className="flex flex-col items-start">
          <span className="text-sm font-mono font-bold text-[#2DD4BF] tracking-wider leading-none" style={{ textShadow: '0 0 12px rgba(45,212,191,0.6)' }}>
            {Math.round(scrollProgress)}%
          </span>
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wide">
            {isScrollingDown ? 'Descending' : 'Ascending'}
          </span>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default SidebarNav;