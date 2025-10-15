import React from 'react';
import { motion } from 'framer-motion';

const SatelliteCodeDisplay = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-8">
      {/* Satellite Structure */}
      <div className="relative flex items-center justify-center scale-75 md:scale-90">
        
        {/* Left Solar Panel */}
        <motion.div
          className="relative w-20 h-52 md:w-24 md:h-56"
          animate={{ 
            rotateY: [-3, 3, -3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
        >
          {/* Panel connector arm */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-gradient-to-r from-[#475569] to-[#64748b]" />
          
          <div className="w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e40af] to-[#0f172a] rounded-sm shadow-2xl relative overflow-hidden border border-[#1e40af]/40">
            {/* Realistic solar cells grid */}
            <div className="grid grid-cols-4 gap-[1px] p-1 h-full bg-[#0a0f1a]">
              {[...Array(32)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] relative"
                  style={{
                    boxShadow: 'inset 0 1px 2px rgba(59, 130, 246, 0.3)'
                  }}
                  animate={{ 
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.05 
                  }}
                >
                  {/* Cell details */}
                  <div className="absolute inset-[1px] border-[0.5px] border-[#3b82f6]/20" />
                </motion.div>
              ))}
            </div>
            
            {/* Metallic frame */}
            <div className="absolute inset-0 border-2 border-[#1e293b] pointer-events-none" />
            
            {/* Light reflection */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Satellite Main Body */}
        <div className="relative mx-3 md:mx-4">
          {/* Top Antenna Assembly */}
          <div className="absolute -top-12 md:-top-14 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
            {/* Antenna base */}
            <div className="w-4 h-3 bg-gradient-to-b from-[#475569] to-[#334155] rounded-t-sm border border-[#64748b]/30" />
            
            {/* Antenna rod */}
            <motion.div
              className="w-1 h-10 md:h-12 bg-gradient-to-t from-[#64748b] via-[#94a3b8] to-[#2DD4BF] relative"
              animate={{ scaleY: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Antenna segments */}
              <div className="absolute top-0 w-full h-[2px] bg-[#1e293b]" />
              <div className="absolute top-1/3 w-full h-[2px] bg-[#1e293b]" />
              <div className="absolute top-2/3 w-full h-[2px] bg-[#1e293b]" />
            </motion.div>
            
            {/* Antenna dish */}
            <motion.div
              className="relative"
              animate={{ 
                boxShadow: [
                  '0 0 10px rgba(45, 212, 191, 0.6)',
                  '0 0 20px rgba(45, 212, 191, 1)',
                  '0 0 10px rgba(45, 212, 191, 0.6)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Dish base */}
              <div className="w-5 h-5 rounded-full bg-gradient-radial from-[#2DD4BF] via-[#14b8a6] to-[#0d9488] shadow-lg border-2 border-[#0d9488]" />
              
              {/* Signal waves */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-[#2DD4BF]"
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.8,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Main Body Container - Realistic satellite body */}
          <div className="relative">
            {/* Top structural element */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-b from-[#334155] to-[#1e293b] rounded-t-lg border border-[#475569]/50" />
            
            {/* Main body */}
            <div className="relative w-64 md:w-80 bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] rounded-lg shadow-2xl overflow-hidden border-2 border-[#475569]">
              
              {/* Metallic texture overlay */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
                }}
              />
              
              {/* Side panels/vents */}
              <div className="absolute left-0 top-1/4 w-2 h-1/2 bg-[#0f172a] border-r border-[#475569]/30">
                <div className="space-y-2 p-0.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-1 bg-[#1e293b] border-b border-[#475569]/20" />
                  ))}
                </div>
              </div>
              <div className="absolute right-0 top-1/4 w-2 h-1/2 bg-[#0f172a] border-l border-[#475569]/30">
                <div className="space-y-2 p-0.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-1 bg-[#1e293b] border-b border-[#475569]/20" />
                  ))}
                </div>
              </div>
              
              {/* Corner bolts */}
              {[
                { top: '8px', left: '8px' },
                { top: '8px', right: '8px' },
                { bottom: '8px', left: '8px' },
                { bottom: '8px', right: '8px' }
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#64748b] border border-[#94a3b8]/50 shadow-inner"
                  style={pos}
                />
              ))}
              
              {/* Content */}
              <div className="relative z-10 p-4 md:p-5 font-mono text-xs">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#475569]/50">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#EF4444] shadow-lg shadow-[#EF4444]/50 border border-[#DC2626]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-lg shadow-[#F59E0B]/50 border border-[#D97706]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-lg shadow-[#10B981]/50 border border-[#059669]"></div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0f172a]/50 px-2 py-1 rounded border border-[#475569]/30">
                    <motion.div
                      className="text-[#2DD4BF] text-[9px] font-bold tracking-wider"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      SAT-LINK-01
                    </motion.div>
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] shadow-lg shadow-[#2DD4BF]/50"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Status */}
                <motion.div
                  className="flex items-center gap-2 text-[#8B5CF6] mb-3 text-[9px] bg-[#1e293b]/50 px-2 py-1.5 rounded border border-[#8B5CF6]/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.span
                    className="text-sm"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ◉
                  </motion.span>
                  <span>Orbital telemetry active...</span>
                </motion.div>

                {/* Code Display */}
                <pre className="text-[#94A3B8] leading-relaxed text-[9px] md:text-[10px] mb-3 bg-[#0f172a]/30 p-2 rounded border border-[#475569]/20">
                  <code>
                    <div className="flex gap-2">
                      <span className="text-[#64748b] select-none">01</span>
                      <span>
                        <span className="text-[#8B5CF6]">const</span>{' '}
                        <span className="text-[#2DD4BF]">developer</span> = {'{'}
                      </span>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <span className="text-[#64748b] select-none">02</span>
                      <span>
                        name: <span className="text-[#F59E0B]">"Thamem Ansari"</span>,
                      </span>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <span className="text-[#64748b] select-none">03</span>
                      <span>
                        orbit: <span className="text-[#10B981]">["React", "TS", "AI"]</span>,
                      </span>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <span className="text-[#64748b] select-none">04</span>
                      <span>
                        mission: <span className="text-[#8B5CF6]">"Innovation"</span>,
                      </span>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <span className="text-[#64748b] select-none">05</span>
                      <span>
                        fuel:{' '}
                        <motion.span 
                          className="text-[#F59E0B]"
                          animate={{ 
                            textShadow: [
                              '0 0 5px rgba(245, 158, 11, 0.5)',
                              '0 0 10px rgba(245, 158, 11, 0.8)',
                              '0 0 5px rgba(245, 158, 11, 0.5)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          "☕☕☕"
                        </motion.span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#64748b] select-none">06</span>
                      <span>{'}'};</span>
                    </div>
                  </code>
                </pre>

                {/* Telemetry Panel */}
                <div className="pt-2 border-t border-[#475569]/50 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-[9px]">
                    <motion.div
                      className="flex items-center gap-1.5 bg-[#0f172a]/30 p-1.5 rounded border border-[#2DD4BF]/20"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-[#2DD4BF] text-sm">⬆</span>
                      <div>
                        <div className="text-[#2DD4BF] font-bold">TX: 128 KB/s</div>
                        <div className="text-[#64748b] text-[8px]">Uplink</div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-1.5 bg-[#0f172a]/30 p-1.5 rounded border border-[#8B5CF6]/20"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <span className="text-[#8B5CF6] text-sm">⬇</span>
                      <div>
                        <div className="text-[#8B5CF6] font-bold">RX: 256 KB/s</div>
                        <div className="text-[#64748b] text-[8px]">Downlink</div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-[8px] bg-[#0f172a]/30 p-1.5 rounded border border-[#475569]/20">
                    <div className="text-[#64748b]">
                      ALT: <span className="text-[#2DD4BF] font-bold">400km</span>
                    </div>
                    <div className="text-[#64748b]">
                      VEL: <span className="text-[#8B5CF6] font-bold">7.7 km/s</span>
                    </div>
                    <div className="text-[#64748b]">
                      LAT: <span className="text-[#10B981] font-bold">28.5°</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#0f172a]/30 p-1.5 rounded border border-[#475569]/20">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 bg-[#2DD4BF] rounded-full shadow-sm shadow-[#2DD4BF]/50"
                          style={{ height: `${(i + 1) * 2.5}px` }}
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1 
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[#64748b] text-[8px]">SIGNAL: STRONG</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom structural element */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-t from-[#334155] to-[#1e293b] rounded-b-lg border border-[#475569]/50" />

            {/* Bottom Thrusters */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative">
                  {/* Thruster nozzle */}
                  <div className="w-3 h-2 bg-gradient-to-b from-[#475569] to-[#334155] rounded-t-sm border-x border-t border-[#64748b]/30" />
                  
                  {/* Thruster flame */}
                  <motion.div
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-2 rounded-b-full"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.9), rgba(139, 92, 246, 0.4), transparent)'
                    }}
                    animate={{
                      height: [16, 20, 16],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Solar Panel */}
        <motion.div
          className="relative w-20 h-52 md:w-24 md:h-56"
          animate={{ 
            rotateY: [3, -3, 3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
        >
          {/* Panel connector arm */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-gradient-to-l from-[#475569] to-[#64748b]" />
          
          <div className="w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e40af] to-[#0f172a] rounded-sm shadow-2xl relative overflow-hidden border border-[#1e40af]/40">
            <div className="grid grid-cols-4 gap-[1px] p-1 h-full bg-[#0a0f1a]">
              {[...Array(32)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] relative"
                  style={{
                    boxShadow: 'inset 0 1px 2px rgba(59, 130, 246, 0.3)'
                  }}
                  animate={{ 
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.05 
                  }}
                >
                  <div className="absolute inset-[1px] border-[0.5px] border-[#3b82f6]/20" />
                </motion.div>
              ))}
            </div>
            <div className="absolute inset-0 border-2 border-[#1e293b] pointer-events-none" />
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SatelliteCodeDisplay;