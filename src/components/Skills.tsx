// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useAnimation, useInView } from 'framer-motion';
// import { FaLaptopCode, FaServer, FaTools, FaStar } from 'react-icons/fa';
// import { useSkills } from '../hooks/useSupabase';

// const Skills = () => {
//   const { skills, loading, error } = useSkills();
//   const [animate, setAnimate] = useState(false);
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   useEffect(() => {
//     if (inView) {
//       controls.start('visible');
//       const timer = setTimeout(() => setAnimate(true), 300);
//       return () => clearTimeout(timer);
//     }
//   }, [inView, controls]);

//   const frontendSkills = skills.filter(skill => skill.category === 'frontend');
//   const backendSkills = skills.filter(skill => skill.category === 'backend');
//   const otherSkills = skills.filter(skill => skill.category === 'other');

//   const categories = [
//     {
//       title: 'Frontend',
//       icon: FaLaptopCode,
//       skills: frontendSkills,
//       gradient: 'from-[#2DD4BF] to-[#14b8a6]',
//       glowColor: '#2DD4BF',
//       bgGradient: 'from-[#2DD4BF]/10 to-[#14b8a6]/5'
//     },
//     {
//       title: 'Backend',
//       icon: FaServer,
//       skills: backendSkills,
//       gradient: 'from-[#8B5CF6] to-[#6366F1]',
//       glowColor: '#8B5CF6',
//       bgGradient: 'from-[#8B5CF6]/10 to-[#6366F1]/5'
//     },
//     {
//       title: 'Other',
//       icon: FaTools,
//       skills: otherSkills,
//       gradient: 'from-[#F59E0B] to-[#EF4444]',
//       glowColor: '#F59E0B',
//       bgGradient: 'from-[#F59E0B]/10 to-[#EF4444]/5'
//     }
//   ];
  
//   const SkillBar = ({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) => {
//     return (
//       <motion.div 
//         className="mb-6 last:mb-0"
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: delay * 0.05, duration: 0.5 }}
//       >
//         <div className="flex justify-between mb-3">
//           <span className="text-[#E5E7EB] font-semibold flex items-center text-sm">
//             <motion.span 
//               className="mr-2 text-lg"
//               style={{ color }}
//               animate={{ scale: [1, 1.2, 1] }}
//               transition={{ duration: 2, repeat: Infinity, delay: delay * 0.1 }}
//             >
//               ◆
//             </motion.span>
//             {name}
//           </span>
//           <motion.span 
//             className="font-bold font-mono text-sm px-3 py-1 rounded-lg"
//             style={{ 
//               color,
//               backgroundColor: `${color}15`,
//               border: `1px solid ${color}30`
//             }}
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: delay * 0.05 + 0.3, type: "spring" }}
//           >
//             {level}%
//           </motion.span>
//         </div>
//         <div className="relative w-full bg-[#1F2937] rounded-full h-3 overflow-hidden border border-[#374151] shadow-inner">
//           <motion.div 
//             className="h-3 rounded-full relative"
//             style={{
//               background: `linear-gradient(90deg, ${color}, ${color}dd)`,
//             }}
//             initial={{ width: 0 }}
//             animate={{ width: animate ? `${level}%` : 0 }}
//             transition={{ duration: 1.2, delay: delay * 0.05, ease: "easeOut" }}
//           >
//             <motion.span 
//               className="absolute top-0 right-0 h-full w-3 rounded-r-full"
//               style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
//               animate={{ opacity: [0.3, 0.8, 0.3] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//             <motion.div
//               className="absolute inset-0 rounded-full"
//               style={{
//                 boxShadow: `0 0 20px ${color}80`,
//               }}
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//     );
//   };

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (custom: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: custom * 0.15,
//         duration: 0.7,
//         ease: "easeOut",
//       },
//     }),
//   };

//   if (loading) {
//     return (
//       <section id="skills" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
//         <div className="container mx-auto px-6 max-w-7xl">
//           <div className="flex items-center justify-center">
//             <motion.div 
//               className="w-16 h-16 border-4 border-[#2DD4BF] border-t-transparent rounded-full"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             />
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section id="skills" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
//         <div className="container mx-auto px-6 max-w-7xl">
//           <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-xl">
//             <h3 className="text-red-400 font-bold text-xl mb-2">Error Loading Skills</h3>
//             <p className="text-red-300 text-sm">{error}</p>
//           </div>
//         </div>
//       </section>
//     );
//   }
  
//   return (
//     <section id="skills" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] overflow-hidden">
//       {/* Animated background gradients */}
//       <motion.div 
//         className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
//         style={{
//           background: 'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
//         }}
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.2, 0.3, 0.2],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />
      
//       <motion.div 
//         className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
//         style={{
//           background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
//         }}
//         animate={{
//           scale: [1.2, 1, 1.2],
//           opacity: [0.2, 0.3, 0.2],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1
//         }}
//       />

//       {/* Grid pattern */}
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg0NSwyMTIsMTkxLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full"
//             style={{
//               width: Math.random() * 4 + 2,
//               height: Math.random() * 4 + 2,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               background: i % 3 === 0 ? '#2DD4BF' : i % 3 === 1 ? '#8B5CF6' : '#F59E0B',
//             }}
//             animate={{
//               y: [0, Math.random() * 100 - 50],
//               x: [0, Math.random() * 100 - 50],
//               scale: [1, Math.random() * 2 + 0.5, 1],
//               opacity: [0.1, 0.5, 0.1],
//             }}
//             transition={{
//               duration: Math.random() * 15 + 10,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>
      
//       <div className="container mx-auto px-6 max-w-7xl relative z-10" ref={ref}>
//         <motion.div
//           initial="hidden"
//           animate={controls}
//           variants={fadeInUp}
//           custom={0}
//           className="mb-20 text-center"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2DD4BF]/10 to-[#8B5CF6]/10 rounded-full mb-6 border border-[#2DD4BF]/30"
//           >
//             <FaStar className="text-[#2DD4BF] text-lg" />
//             <span className="text-[#2DD4BF] font-mono text-sm tracking-wider font-semibold uppercase">
//               What I Can Do
//             </span>
//           </motion.div>

//           <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
//             My <span className="bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] bg-clip-text text-transparent">Skills</span>
//           </h2>
          
//           <motion.div 
//             className="h-1.5 w-32 bg-gradient-to-r from-[#2DD4BF] via-[#8B5CF6] to-[#F59E0B] rounded-full mx-auto"
//             initial={{ width: 0 }}
//             animate={{ width: 128 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//           />
//         </motion.div>
        
//         <div className="grid md:grid-cols-3 gap-8 relative">
//           {categories.map((category, categoryIndex) => (
//             <motion.div
//               key={category.title}
//               variants={fadeInUp}
//               custom={categoryIndex + 1}
//               initial="hidden"
//               animate={controls}
//               className="group relative"
//             >
//               {/* Card */}
//               <div className="relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] rounded-3xl border border-[#374151] overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
//                 {/* Gradient overlay on hover */}
//                 <motion.div
//                   className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
//                 />
                
//                 {/* Glow effect */}
//                 <motion.div
//                   className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                   style={{
//                     boxShadow: `0 0 60px ${category.glowColor}40`,
//                   }}
//                 />

//                 {/* Header */}
//                 <div className="relative p-6 border-b border-[#374151] group-hover:border-[#374151]/50 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <motion.div 
//                       className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg relative overflow-hidden`}
//                       whileHover={{ scale: 1.1, rotate: 5 }}
//                       transition={{ type: "spring", stiffness: 300 }}
//                     >
//                       <motion.div
//                         className="absolute inset-0"
//                         animate={{ 
//                           background: [
//                             `radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
//                             `radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
//                             `radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
//                           ]
//                         }}
//                         transition={{ duration: 3, repeat: Infinity }}
//                       />
//                       <category.icon className="text-white text-2xl relative z-10" />
//                     </motion.div>
                    
//                     <div>
//                       <h3 className="text-2xl font-black text-white group-hover:text-[#E5E7EB] transition-colors">
//                         {category.title}
//                       </h3>
//                       <p className="text-sm text-[#94A3B8] font-mono">
//                         {category.skills.length} skills
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Skills List */}
//                 <div className="relative p-6">
//                   {category.skills.length > 0 ? (
//                     category.skills.map((skill, index) => (
//                       <SkillBar 
//                         key={skill.id} 
//                         name={skill.name} 
//                         level={skill.level}
//                         delay={categoryIndex * 3 + index}
//                         color={category.glowColor}
//                       />
//                     ))
//                   ) : (
//                     <div className="text-center py-8 text-[#94A3B8]">
//                       No skills in this category yet
//                     </div>
//                   )}
//                 </div>

//                 {/* Decorative corner elements */}
//                 <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
//                   <motion.div
//                     className={`w-full h-full rounded-bl-full bg-gradient-to-br ${category.gradient}`}
//                     animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
//                     transition={{ duration: 4, repeat: Infinity }}
//                   />
//                 </div>
//               </div>

//               {/* Floating badge */}
//               <motion.div
//                 className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-xl flex items-center justify-center z-20`}
//                 animate={{ 
//                   y: [0, -8, 0],
//                   rotate: [0, 5, 0]
//                 }}
//                 transition={{ 
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: categoryIndex * 0.5
//                 }}
//               >
//                 <span className="text-white font-bold text-sm">
//                   {category.skills.length}
//                 </span>
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom CTA or Stats */}
//         <motion.div
//           variants={fadeInUp}
//           custom={4}
//           initial="hidden"
//           animate={controls}
//           className="mt-16 text-center"
//         >
//           <div className="inline-flex items-center gap-8 px-8 py-6 bg-gradient-to-r from-[#1F2937] to-[#0F172A] rounded-2xl border border-[#374151] shadow-xl">
//             <div className="text-center">
//               <div className="text-4xl font-black bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] bg-clip-text text-transparent mb-1">
//                 {skills.length}
//               </div>
//               <div className="text-sm text-[#94A3B8] font-semibold">Total Skills</div>
//             </div>
//             <div className="w-px h-12 bg-[#374151]"></div>
//             <div className="text-center">
//               <div className="text-4xl font-black bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent mb-1">
//                 3
//               </div>
//               <div className="text-sm text-[#94A3B8] font-semibold">Categories</div>
//             </div>
//             <div className="w-px h-12 bg-[#374151]"></div>
//             <div className="text-center">
//               <div className="text-4xl font-black bg-gradient-to-r from-[#F59E0B] to-[#EF4444] bg-clip-text text-transparent mb-1">
//                 {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length) || 0}%
//               </div>
//               <div className="text-sm text-[#94A3B8] font-semibold">Avg Proficiency</div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Skills;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaServer, FaTools, FaStar } from 'react-icons/fa';
import { useSkills } from '../hooks/useSupabase';

const Skills = () => {
  const { skills, loading, error } = useSkills();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const otherSkills = skills.filter(skill => skill.category === 'other');

  const categories = [
    {
      title: 'Frontend',
      icon: FaLaptopCode,
      skills: frontendSkills,
      gradient: 'from-[#2DD4BF] to-[#14b8a6]',
      glowColor: '#2DD4BF',
      bgGradient: 'from-[#2DD4BF]/10 to-[#14b8a6]/5'
    },
    {
      title: 'Backend',
      icon: FaServer,
      skills: backendSkills,
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
      glowColor: '#8B5CF6',
      bgGradient: 'from-[#8B5CF6]/10 to-[#6366F1]/5'
    },
    {
      title: 'Other',
      icon: FaTools,
      skills: otherSkills,
      gradient: 'from-[#F59E0B] to-[#EF4444]',
      glowColor: '#F59E0B',
      bgGradient: 'from-[#F59E0B]/10 to-[#EF4444]/5'
    }
  ];
  
  const SkillBar = ({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) => {
    return (
      <motion.div 
        className="mb-6 last:mb-0"
        initial={{ opacity: 0.5, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay * 0.03, duration: 0.4 }}
      >
        <div className="flex justify-between mb-3">
          <span className="text-[#E5E7EB] font-semibold flex items-center text-sm">
            <motion.span 
              className="mr-2 text-lg"
              style={{ color }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: delay * 0.1 }}
            >
              ◆
            </motion.span>
            {name}
          </span>
          <motion.span 
            className="font-bold font-mono text-sm px-3 py-1 rounded-lg"
            style={{ 
              color,
              backgroundColor: `${color}15`,
              border: `1px solid ${color}30`
            }}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay * 0.03 + 0.2, type: "spring" }}
          >
            {level}%
          </motion.span>
        </div>
        <div className="relative w-full bg-[#1F2937] rounded-full h-3 overflow-hidden border border-[#374151] shadow-inner">
          <motion.div 
            className="h-3 rounded-full relative"
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            }}
            initial={{ width: 0, opacity: 0.3 }}
            animate={{ width: animate ? `${level}%` : 0, opacity: 1 }}
            transition={{ duration: 1, delay: delay * 0.03, ease: "easeOut" }}
          >
            <motion.span 
              className="absolute top-0 right-0 h-full w-3 rounded-r-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: `0 0 20px ${color}80`,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <section id="skills" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-center">
            <motion.div 
              className="w-16 h-16 border-4 border-[#2DD4BF] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-xl">
            <h3 className="text-red-400 font-bold text-xl mb-2">Error Loading Skills</h3>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="skills" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] overflow-hidden">
      {/* Animated background gradients */}
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg0NSwyMTIsMTkxLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#2DD4BF' : i % 3 === 1 ? '#8B5CF6' : '#F59E0B',
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 2 + 0.5, 1],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0.5, y: 10 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2DD4BF]/10 to-[#8B5CF6]/10 rounded-full mb-6 border border-[#2DD4BF]/30"
          >
            <FaStar className="text-[#2DD4BF] text-lg" />
            <span className="text-[#2DD4BF] font-mono text-sm tracking-wider font-semibold uppercase">
              What I Can Do
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            My <span className="bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] bg-clip-text text-transparent">Skills</span>
          </h2>
          
          <motion.div 
            className="h-1.5 w-32 bg-gradient-to-r from-[#2DD4BF] via-[#8B5CF6] to-[#F59E0B] rounded-full mx-auto"
            initial={{ width: 0, opacity: 0.5 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0.5, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] rounded-3xl border border-[#374151] overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `0 0 60px ${category.glowColor}40`,
                  }}
                />

                {/* Header */}
                <div className="relative p-6 border-b border-[#374151] group-hover:border-[#374151]/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{ 
                          background: [
                            `radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                            `radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                            `radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <category.icon className="text-white text-2xl relative z-10" />
                    </motion.div>
                    
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-[#E5E7EB] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-[#94A3B8] font-mono">
                        {category.skills.length} skills
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills List */}
                <div className="relative p-6">
                  {category.skills.length > 0 ? (
                    category.skills.map((skill, index) => (
                      <SkillBar 
                        key={skill.id} 
                        name={skill.name} 
                        level={skill.level}
                        delay={categoryIndex * 3 + index}
                        color={category.glowColor}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-[#94A3B8]">
                      No skills in this category yet
                    </div>
                  )}
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <motion.div
                    className={`w-full h-full rounded-bl-full bg-gradient-to-br ${category.gradient}`}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-xl flex items-center justify-center z-20`}
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: categoryIndex * 0.5
                }}
              >
                <span className="text-white font-bold text-sm">
                  {category.skills.length}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA or Stats */}
        <motion.div
          initial={{ opacity: 0.5, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-6 bg-gradient-to-r from-[#1F2937] to-[#0F172A] rounded-2xl border border-[#374151] shadow-xl">
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] bg-clip-text text-transparent mb-1">
                {skills.length}
              </div>
              <div className="text-sm text-[#94A3B8] font-semibold">Total Skills</div>
            </div>
            <div className="w-px h-12 bg-[#374151]"></div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent mb-1">
                3
              </div>
              <div className="text-sm text-[#94A3B8] font-semibold">Categories</div>
            </div>
            <div className="w-px h-12 bg-[#374151]"></div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-[#F59E0B] to-[#EF4444] bg-clip-text text-transparent mb-1">
                {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length) || 0}%
              </div>
              <div className="text-sm text-[#94A3B8] font-semibold">Avg Proficiency</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;