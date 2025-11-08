'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Sales() {
  const searchParams = useSearchParams();
  const usage = searchParams.get('usage');
  
  // Determine initial tab based on usage parameter
  const getInitialTab = (): 'personal' | 'studying' | 'corporate' | 'all' => {
    if (usage === 'Studying' || usage === 'Teaching') return 'studying';
    if (usage === 'Work') return 'corporate';
    return 'personal';
  };
  
  const [selectedPlan, setSelectedPlan] = useState<string>('full');
  const [activeTab, setActiveTab] = useState<'personal' | 'studying' | 'corporate' | 'all'>(getInitialTab());
  const [showContactForm, setShowContactForm] = useState(false);
  const [formType, setFormType] = useState<'school' | 'corporate' | null>(null);

  const tabs = [
    { id: 'personal' as const, label: 'Personal Plans' },
    { id: 'studying' as const, label: 'Education Plans' },
    { id: 'corporate' as const, label: 'Corporate Plans' },
    { id: 'all' as const, label: 'All Plans' },
  ];

  const personalPlans = [
    {
      id: 'limited',
      name: '7-DAY LIMITED ACCESS',
      price: '$0.99',
      subtitle: '7-day trial, then $49.99',
      popular: false,
    },
    {
      id: 'full',
      name: '7-DAY FULL ACCESS',
      price: '$1.99',
      subtitle: '7-day trial, then $49.99',
      popular: true,
    },
    {
      id: 'annual',
      name: 'ANNUAL PLAN',
      price: '$24.95',
      priceUnit: '/month',
      subtitle: '',
      popular: false,
    },
  ];

  const studyingPlans = [
    {
      id: 'student',
      name: 'STUDENT PLAN',
      price: '$9.95',
      priceUnit: '/month',
      subtitle: 'Verified student discount',
      popular: false,
    },
    {
      id: 'teacher',
      name: 'TEACHER PLAN',
      price: '$14.95',
      priceUnit: '/month',
      subtitle: 'For educators and instructors',
      popular: true,
    },
  ];

  const allPlans = [...personalPlans, ...studyingPlans];

  const openContactForm = (type: 'school' | 'corporate') => {
    setFormType(type);
    setShowContactForm(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
    setFormType(null);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! Our customer support team will contact you shortly.');
    closeContactForm();
  };

  const renderPlans = () => {
    if (activeTab === 'personal') {
      return personalPlans.map((plan) => (
        <div
          key={plan.id}
          className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
            plan.popular ? 'bg-[#FFF4E6] border-[#FFA500]' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedPlan(plan.id)}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFA500] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <span>⭐</span> Most popular
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="plan"
                checked={selectedPlan === plan.id}
                onChange={() => setSelectedPlan(plan.id)}
                className="w-5 h-5 accent-[#6366F1]"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                {plan.subtitle && <p className="text-sm text-gray-600">{plan.subtitle}</p>}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {plan.price}
                {plan.priceUnit && <span className="text-base font-normal text-gray-600">{plan.priceUnit}</span>}
              </div>
            </div>
          </div>
        </div>
      ));
    }

    if (activeTab === 'studying') {
      return (
        <>
          {studyingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                plan.popular ? 'bg-[#FFF4E6] border-[#FFA500]' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFA500] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <span>⭐</span> Most popular
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="plan"
                    checked={selectedPlan === plan.id}
                    onChange={() => setSelectedPlan(plan.id)}
                    className="w-5 h-5 accent-[#6366F1]"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                    {plan.subtitle && <p className="text-sm text-gray-600">{plan.subtitle}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {plan.price}
                    {plan.priceUnit && <span className="text-base font-normal text-gray-600">{plan.priceUnit}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            <h3 className="text-xl font-bold text-gray-900 mb-2">School Enterprise Plan</h3>
            <p className="text-gray-600 mb-4">Custom pricing for schools and educational institutions</p>
            <button
              onClick={() => openContactForm('school')}
              className="bg-[#6366F1] hover:bg-[#5558E3] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Request School Plan
            </button>
          </div>
        </>
      );
    }

    if (activeTab === 'corporate') {
      return (
        <div className="space-y-6">
          <div className="border-2 border-gray-300 rounded-lg p-10 text-center bg-white">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-[#6366F1] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Corporate Enterprise Plan</h3>
              <p className="text-gray-600 mb-6">Tailored solutions for businesses of all sizes with advanced features, dedicated support, and flexible licensing.</p>
            </div>
            <button
              onClick={() => openContactForm('corporate')}
              className="bg-[#6366F1] hover:bg-[#5558E3] text-white font-semibold py-4 px-10 rounded-lg transition-colors text-lg mb-4 inline-block"
            >
              Request Corporate Plan
            </button>
          </div>
          <div className="border-2 border-gray-200 rounded-lg p-6 text-center bg-gray-50">
            <p className="text-gray-700 mb-4">Looking for individual plans?</p>
            <button
              onClick={() => setActiveTab('personal')}
              className="bg-white hover:bg-gray-50 text-[#6366F1] font-semibold py-3 px-8 rounded-lg border-2 border-[#6366F1] transition-colors"
            >
              View Personal Plans
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === 'all') {
      return (
        <>
          <div className="col-span-full">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Personal Plans</h3>
          </div>
          {personalPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                plan.popular ? 'bg-[#FFF4E6] border-[#FFA500]' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFA500] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <span>⭐</span> Most popular
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="plan"
                    checked={selectedPlan === plan.id}
                    onChange={() => setSelectedPlan(plan.id)}
                    className="w-5 h-5 accent-[#6366F1]"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                    {plan.subtitle && <p className="text-sm text-gray-600">{plan.subtitle}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {plan.price}
                    {plan.priceUnit && <span className="text-base font-normal text-gray-600">{plan.priceUnit}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-span-full mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Education Plans</h3>
          </div>
          {studyingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                plan.popular ? 'bg-[#FFF4E6] border-[#FFA500]' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFA500] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <span>⭐</span> Most popular
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="plan"
                    checked={selectedPlan === plan.id}
                    onChange={() => setSelectedPlan(plan.id)}
                    className="w-5 h-5 accent-[#6366F1]"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                    {plan.subtitle && <p className="text-sm text-gray-600">{plan.subtitle}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {plan.price}
                    {plan.priceUnit && <span className="text-base font-normal text-gray-600">{plan.priceUnit}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 mt-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise Plans</h3>
            <p className="text-gray-600 mb-4">Custom pricing for schools and businesses</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => openContactForm('school')}
                className="bg-[#6366F1] hover:bg-[#5558E3] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Request School Plan
              </button>
              <button
                onClick={() => openContactForm('corporate')}
                className="bg-[#6366F1] hover:bg-[#5558E3] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Request Corporate Plan
              </button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              <path d="M14 2v6h6"/>
            </svg>
            <span className="text-2xl font-bold">
              <span className="text-red-500">PDF</span> Guru
            </span>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-medium">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-700">Document is ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-medium">
                2
              </div>
              <span className="text-sm font-medium text-gray-900">Select plan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">
                3
              </div>
              <span className="text-sm font-medium text-gray-500">Payment details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">
                4
              </div>
              <span className="text-sm font-medium text-gray-500">Download</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Plans */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Choose Plan to access your download</h1>
            
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-[#6366F1] border-b-2 border-[#6366F1]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Plans */}
            <div className="space-y-4 mb-8">
              {renderPlans()}
            </div>

            {/* Features */}
            {activeTab !== 'corporate' && (
              <>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                  {selectedPlan === 'limited' ? (
                    <>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Unlimited edits</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-400 line-through">Edit text and images in PDF</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Unlimited downloads</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-400 line-through">Organize, reorder PDF file</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Multi-format conversion</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-400 line-through">Protect PDF with passwords</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-400 line-through">No additional software</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-400 line-through">Use PDF Guru on mobile device</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Unlimited edits</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Edit text and images in PDF</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Unlimited downloads</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Organize, reorder PDF file</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Multi-format conversion</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Protect PDF with passwords</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">No additional software</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">Use PDF Guru on mobile device</span>
                      </div>
                      {/* Additional Student Plan Features */}
                      {selectedPlan === 'student' && (
                        <>
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Color-coded annotations</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Progress tracker</span>
                          </div>
                        </>
                      )}
                      {/* Additional Teacher Plan Features */}
                      {selectedPlan === 'teacher' && (
                        <>
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Batch converter</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Quiz templates</span>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="text-sm text-gray-600 mb-6 leading-relaxed">
                  By continuing, you agree that your subscription will be auto-renewed at the price of $49.99 each month at the end of the 7-day intro period unless you cancel your subscription. You can cancel it in your account. Learn more in the Subscription Policy. <span className="font-semibold">30-day money-back guarantee.</span> You can find details in our Money-back policy. Our goal is customer satisfaction
                </div>
              </>
            )}

            <button className="w-full bg-[#6366F1] hover:bg-[#5558E3] text-white font-semibold py-4 rounded-lg transition-colors text-lg flex items-center justify-center gap-2">
              Continue
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Column - Document Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-[#E7F5ED] rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-green-800">Your document is ready!</span>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center text-gray-400">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  4.5 out of 5 | based on 12,564 reviews
                </div>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id="half">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="#D1D5DB" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">What people say</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stars: 5,
                time: '4 hours ago',
                title: 'Love it!',
                text: 'Thank you for this website. I enjoyed it. It\'s handy for converting or erasing some parts of a document.',
                author: 'Patrick',
              },
              {
                stars: 5,
                time: '1 day ago',
                title: 'Quick and Easy',
                text: 'It\'s easy to use and convert PDFs to PowerPoint sheets. I needed such a platform to do my work...to edit PDFs and convert. I recommend it.',
                author: 'Tom',
              },
              {
                stars: 5,
                time: '3 days ago',
                title: 'Easy to use',
                text: 'The website was very easy to navigate and I was able to convert my PDF to Word. The experience was good. It makes a much easier flow than other services.',
                author: 'Julia',
              },
              {
                stars: 4,
                time: '5 days ago',
                title: 'A great site for converting PDF',
                text: 'I like converting PDF to JPG because it comes out with the same quality without any flaws. I hope the website developers keep working so we can keep enjoying this great site.',
                author: 'Douglas',
              },
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-500 mb-3">{review.time}</div>
                <h3 className="font-bold text-gray-900 mb-2">{review.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{review.text}</p>
                <div className="font-semibold text-gray-900">{review.author}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
            <button
              onClick={closeContactForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {formType === 'school' ? 'Request School Plan' : 'Request Corporate Plan'}
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form and our team will contact you shortly
            </p>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formType === 'school' ? 'School/Institution Name' : 'Company Name'}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder={formType === 'school' ? 'School name' : 'Company name'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Users</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder="50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder="Tell us more about your needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#6366F1] hover:bg-[#5558E3] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

