import React from 'react';

export default function SatelliteCodeDisplay() {
  const profile = { name: 'Thamem' };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 overflow-auto p-8">
      {/* ISS-Style Satellite Structure */}
      <div className="relative">
        {/* Left Solar Panel Array 1 (Top) */}
        <div className="absolute left-[-220px] top-[-80px] w-52 h-32 rotate-[-5deg]">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-sm shadow-2xl">
            <div className="grid grid-cols-8 grid-rows-4 h-full gap-[2px] p-1">
              {[...Array(32)].map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-500/30"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Left Solar Panel Array 2 (Bottom) */}
        <div className="absolute left-[-220px] bottom-[-80px] w-52 h-32 rotate-[5deg]">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-sm shadow-2xl">
            <div className="grid grid-cols-8 grid-rows-4 h-full gap-[2px] p-1">
              {[...Array(32)].map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-500/30"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Solar Panel Array 1 (Top) */}
        <div className="absolute right-[-220px] top-[-80px] w-52 h-32 rotate-[5deg]">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-sm shadow-2xl">
            <div className="grid grid-cols-8 grid-rows-4 h-full gap-[2px] p-1">
              {[...Array(32)].map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-500/30"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Solar Panel Array 2 (Bottom) */}
        <div className="absolute right-[-220px] bottom-[-80px] w-52 h-32 rotate-[-5deg]">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-sm shadow-2xl">
            <div className="grid grid-cols-8 grid-rows-4 h-full gap-[2px] p-1">
              {[...Array(32)].map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-500/30"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Left Truss Connector */}
        <div className="absolute left-[-32px] top-1/2 -translate-y-1/2 w-8 h-3 bg-gradient-to-r from-gray-500 to-gray-600 border border-gray-600">
          <div className="h-full flex items-center justify-around px-1">
            <div className="w-0.5 h-2 bg-gray-700"></div>
            <div className="w-0.5 h-2 bg-gray-700"></div>
            <div className="w-0.5 h-2 bg-gray-700"></div>
          </div>
        </div>

        {/* Right Truss Connector */}
        <div className="absolute right-[-32px] top-1/2 -translate-y-1/2 w-8 h-3 bg-gradient-to-l from-gray-500 to-gray-600 border border-gray-600">
          <div className="h-full flex items-center justify-around px-1">
            <div className="w-0.5 h-2 bg-gray-700"></div>
            <div className="w-0.5 h-2 bg-gray-700"></div>
            <div className="w-0.5 h-2 bg-gray-700"></div>
          </div>
        </div>

        {/* Central Module/Body */}
        <div className="relative bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-lg p-8 shadow-2xl border-2 border-gray-500 w-[420px]">
          {/* Top Communication Antenna */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 border-2 border-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-1 h-6 bg-gradient-to-b from-gray-500 to-gray-600"></div>
          </div>

          {/* Module Details */}
          <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-500 rounded-lg shadow-lg flex items-center justify-center">
            <div className="w-10 h-10 border border-blue-500/50 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-bl from-gray-600 to-gray-700 border-2 border-gray-500 rounded-lg shadow-lg flex items-center justify-center">
            <div className="w-10 h-10 border border-green-500/50 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Code Display Panel */}
          <div className="relative z-10 font-mono text-sm bg-black/40 p-6 rounded-lg border border-gray-600/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            </div>
            <pre className="text-[#94A3B8] leading-relaxed">
              <code>
                <span className="text-[#8B5CF6]">const</span> <span className="text-[#2DD4BF]">developer</span> = {'{\n'}
                {'  '}name: <span className="text-[#F59E0B]">"{profile?.name || 'Thamem'}"</span>,{'\n'}
                {'  '}skills: <span className="text-[#10B981]">['React', 'TS']</span>,{'\n'}
                {'  '}passion: <span className="text-[#F59E0B]">"∞"</span>,{'\n'}
                {'  '}coffee: <span className="text-[#F59E0B]">"☕☕☕"</span>{'\n'}
                {'}'};
              </code>
            </pre>
          </div>

          {/* Station Identifier */}
          <div className="mt-4 text-center text-xs text-gray-300 font-mono tracking-wider border-t border-gray-600 pt-2">
            ISS-DEV-MODULE
          </div>

          {/* Bottom Modules */}
          <div className="absolute -bottom-2 left-8 w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-500 rounded shadow-lg"></div>
          <div className="absolute -bottom-2 right-8 w-12 h-12 bg-gradient-to-bl from-gray-600 to-gray-800 border-2 border-gray-500 rounded shadow-lg"></div>
        </div>

        {/* Radiator Panels */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mt-4 w-64 h-8 bg-gradient-to-b from-gray-600 to-gray-700 border border-gray-500 rounded-sm shadow-lg">
          <div className="h-full flex gap-1 p-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex-1 bg-gradient-to-b from-gray-500 to-gray-700 border-l border-gray-600"></div>
            ))}
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10 blur-2xl opacity-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full"></div>
      </div>
    </div>
  );
}