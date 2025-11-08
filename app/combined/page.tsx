'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

type ModalStep = 'email' | 'usage' | 'frequency';

export default function Combined() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [modalStep, setModalStep] = useState<ModalStep>('email');

  const handleEmailSubmit = () => {
    if (!email.trim()) return;
    setModalStep('usage');
  };

  const handleUsageSubmit = () => {
    if (!usage) return;
    setModalStep('frequency');
  };

  const handleFinalDownload = () => {
    if (!frequency) return;
    console.log('Download with:', { email, usage, frequency });
    router.push(`/combined/sales?usage=${encodeURIComponent(usage)}&frequency=${encodeURIComponent(frequency)}`);
  };

  return (
    <div className="flex flex-col h-screen bg-[#5a5a5a] overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-[#5a5a5a] h-[70px] flex items-center justify-between px-6 border-b border-[#404040]">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white hover:opacity-80">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="white">
              <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">pdf</text>
              <text x="50" y="22" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="normal">guru</text>
            </svg>
          </Link>
          <div className="flex items-center gap-2 bg-[#404040] rounded px-3 py-2 min-w-[300px]">
            <span className="text-white text-sm">clockify_time_report_summ</span>
            <button className="text-white hover:opacity-80">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.146 2.854a.5.5 0 0 1 0 .707l-8.5 8.5a.5.5 0 0 1-.708-.707l8.5-8.5a.5.5 0 0 1 .708 0z"/>
                <path d="M11.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1 0-1h2.793L2.854 12.854a.5.5 0 1 1-.708-.708L10.086 4.207V1.5a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white hover:opacity-80 flex flex-col items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="text-xs">Search</span>
          </button>
          <button className="text-white hover:opacity-80 flex flex-col items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            <span className="text-xs">Print</span>
          </button>
          <button className="text-white hover:opacity-80 flex flex-col items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span className="text-xs">Download</span>
          </button>
          <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-2 rounded flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
            </svg>
            Done
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#5a5a5a] h-[90px] flex items-center justify-center gap-1 px-4 border-b border-[#404040]">
        {[
          { icon: '⊞', label: 'Thumbnails' },
          { icon: '↔', label: 'Move' },
          { icon: '↶', label: 'Undo' },
          { icon: '↷', label: 'Redo' },
          { icon: 'A', label: 'Add Text' },
          { icon: 'T', label: 'Edit Text' },
          { icon: '⌫', label: 'Eraser' },
          { icon: '🖍', label: 'Highlight' },
          { icon: '✏', label: 'Pencil' },
          { icon: '🖼', label: 'Image' },
          { icon: '○', label: 'Ellipse' },
          { icon: '✕', label: 'Cross' },
          { icon: '✓', label: 'Check' },
          { icon: '✎', label: 'Sign' },
          { icon: '💬', label: 'Annotations' },
          { icon: '🔗', label: 'Links' },
          { icon: '⋮', label: 'More tools' },
          { icon: '▭', label: 'Page layout' },
          { icon: '📄', label: 'Manage Pages' },
        ].map((tool, idx) => (
          <button
            key={idx}
            className="text-white hover:bg-[#404040] px-3 py-2 rounded flex flex-col items-center gap-1 text-xs min-w-[70px]"
          >
            <span className="text-2xl">{tool.icon}</span>
            <span className="text-[10px] whitespace-nowrap">{tool.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden bg-[#404040]">
        {/* Left Sidebar - Thumbnails */}
        <div className="w-[280px] bg-[#2a2a2a] p-4 overflow-y-auto flex flex-col items-center gap-4">
          <div className="relative">
            <div className="border-4 border-blue-500 rounded bg-white w-[200px] h-[280px] overflow-hidden shadow-lg">
              <div className="p-4 text-xs">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded"></div>
                  <span className="font-bold">clockify</span>
                </div>
                <div className="flex gap-1 mb-4">
                  <div className="w-[35px] h-[60px] bg-green-500"></div>
                  <div className="w-[35px] h-[60px] bg-green-500"></div>
                  <div className="w-[35px] h-[60px] bg-green-500"></div>
                  <div className="w-[35px] h-[60px] bg-green-500"></div>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-gray-300 mb-2"></div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 via-blue-500 to-green-500"></div>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded text-sm">
              1
            </div>
          </div>
        </div>

        {/* Main PDF Viewer Area */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto relative">
          <div className="bg-white rounded-lg shadow-2xl w-[800px] min-h-[1000px] p-12 relative">
            {/* Clockify Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-blue-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                    <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="2" fill="none"/>
                    <path d="M16 8 L16 16 L22 16" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <span className="text-3xl font-bold text-gray-800">clockify</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Time Report</div>
                <div className="text-xs text-gray-500">Summary</div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="mb-8 relative">
              <div className="absolute top-0 right-0 flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">clockify</span>
                </div>
              </div>
              <div className="h-[180px] relative bg-white border border-gray-200 rounded">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${i * 25}%` }}
                  ></div>
                ))}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <path
                    d="M 0,90 Q 50,60 100,70 T 200,65 Q 250,55 300,60 T 400,70 Q 450,80 500,75 T 600,85 Q 650,95 700,90 T 800,80"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-[9px] text-gray-500">
                  {['Mon-9', 'Tue-10', 'Wed-11', 'Thu-12', 'Fri-13', 'Sat-14', 'Sun-15', 'Mon-16', 'Tue-17', 'Wed-18', 'Thu-19', 'Fri-20', 'Sat-21', 'Sun-22'].map((date, idx) => (
                    <span key={idx} className="transform -rotate-45">{date}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="mb-8 mt-12">
              <div className="flex items-end justify-start gap-2 h-[140px] bg-white p-4 rounded border border-gray-200">
                {[
                  { height: 110, label: 'Mon-9' },
                  { height: 120, label: 'Tue-10' },
                  { height: 115, label: 'Wed-11' },
                  { height: 125, label: 'Thu-12' },
                  { height: 100, label: 'Fri-13' },
                ].map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                    <div 
                      className="w-full bg-green-600 rounded-t"
                      style={{ height: `${bar.height}px` }}
                    ></div>
                    <span className="text-[8px] text-gray-600 transform -rotate-45 mt-2">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Section */}
            <div className="mb-8">
              <div className="inline-block bg-[#9ca13b] text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
                Project
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">(Without Project)</span>
                  <span className="font-semibold">209:29:49</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold">100.00%</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-700 mb-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Total Time:</span>
                <span className="font-semibold">209:29:49</span>
              </div>
            </div>
          </div>

          {/* Page Navigation - Overlaid on PDF */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
            <span className="text-sm opacity-70">Page:</span>
            <button className="hover:opacity-80">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 3l-6 6h12z"/>
              </svg>
            </button>
            <span className="text-sm">1/3</span>
            <button className="hover:opacity-80">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 13l6-6H2z"/>
              </svg>
            </button>
            <div className="w-px h-6 bg-gray-600 mx-2"></div>
            <button className="hover:opacity-80">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="6"/>
                <path d="m13 13 4 4"/>
              </svg>
            </button>
            <button className="hover:opacity-80">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="6"/>
                <path d="m13 13 4 4"/>
                <line x1="8" y1="6" x2="8" y2="10"/>
                <line x1="6" y1="8" x2="10" y2="8"/>
              </svg>
            </button>
            <button className="hover:opacity-80 p-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3C7 3 5 6 5 10s2 7 5 7 5-3 5-7-2-7-5-7zm0 12c-2 0-3-2-3-5s1-5 3-5 3 2 3 5-1 5-3 5z"/>
                <path d="M8 7h4v6H8z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Step Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-[540px] p-8 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
            
            {/* Step 1: Email */}
            {modalStep === 'email' && (
              <>
                <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                  Enter your email address
                </h2>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800"
                  />
                </div>
                
                <button
                  onClick={handleEmailSubmit}
                  disabled={!email.trim()}
                  className="w-full bg-[#5b4cf5] hover:bg-[#4a3de0] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors mb-4"
                >
                  Download File
                </button>
                
                <p className="text-center text-sm text-gray-600">
                  By clicking "Download File," you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </>
            )}

            {/* Step 2: Usage */}
            {modalStep === 'usage' && (
              <>
                <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                  What are you using PDF Guru for?
                </h2>
                
                <div className="mb-6 space-y-3">
                  {['Studying', 'Teaching', 'Work', 'Personal'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setUsage(option)}
                      className={`w-full px-4 py-3 border rounded-lg text-left transition-all ${
                        usage === option
                          ? 'border-[#5b4cf5] bg-[#5b4cf5]/10 text-[#5b4cf5] font-medium'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleUsageSubmit}
                  disabled={!usage}
                  className="w-full bg-[#5b4cf5] hover:bg-[#4a3de0] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors"
                >
                  Next
                </button>
              </>
            )}

            {/* Step 3: Frequency */}
            {modalStep === 'frequency' && (
              <>
                <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                  How often do you work with PDFs?
                </h2>
                
                <div className="mb-6 space-y-3">
                  {[
                    'Many times during the day',
                    'Every Day',
                    'Few times per week',
                    'Once per week',
                    'Once per month',
                    'Time to time'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFrequency(option)}
                      className={`w-full px-4 py-3 border rounded-lg text-left transition-all ${
                        frequency === option
                          ? 'border-[#5b4cf5] bg-[#5b4cf5]/10 text-[#5b4cf5] font-medium'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleFinalDownload}
                  disabled={!frequency}
                  className="w-full bg-[#5b4cf5] hover:bg-[#4a3de0] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors"
                >
                  Download File
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

