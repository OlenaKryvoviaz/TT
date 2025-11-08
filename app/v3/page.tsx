'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function V3() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('full');

  const personalPlans = [
    {
      id: 'single-use',
      name: 'SINGLE USE PLAN',
      price: '$0.59',
      subtitle: 'One-time payment for one download',
      popular: false,
      type: 'one-time',
    },
    {
      id: 'limited',
      name: '7-DAY LIMITED ACCESS',
      price: '$0.99',
      subtitle: '7-day trial, then $49.99',
      popular: false,
      type: 'subscription',
    },
    {
      id: 'full',
      name: '7-DAY FULL ACCESS',
      price: '$1.99',
      subtitle: '7-day trial, then $49.99',
      popular: true,
      type: 'subscription',
    },
    {
      id: 'annual',
      name: 'ANNUAL PLAN',
      price: '$24.95',
      priceUnit: '/month',
      subtitle: '',
      popular: false,
      type: 'subscription',
    },
  ];

  const selectedPlanData = personalPlans.find(plan => plan.id === selectedPlan);

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

            {/* Plans */}
            <div className="space-y-4 mb-8">
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
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
              {selectedPlan === 'single-use' ? (
                <>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">One-time payment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Single download access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">No subscription</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Instant access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">High-quality conversion</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Secure processing</span>
                  </div>
                </>
              ) : selectedPlan === 'limited' ? (
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
                </>
              )}
            </div>

            <div className="text-sm text-gray-600 mb-6 leading-relaxed">
              {selectedPlan === 'single-use' ? (
                <>
                  By continuing, you agree to make a one-time payment of $0.59 for single download access to your document. <span className="font-semibold">No subscription required.</span> This is a one-time purchase with instant access.
                </>
              ) : selectedPlan === 'annual' ? (
                <>
                  By continuing, you agree to the annual subscription at $24.95 per month. You can cancel it in your account. Learn more in the Subscription Policy. <span className="font-semibold">30-day money-back guarantee.</span> You can find details in our Money-back policy. Our goal is customer satisfaction.
                </>
              ) : (
                <>
                  By continuing, you agree that your subscription will be auto-renewed at the price of $49.99 each month at the end of the 7-day intro period unless you cancel your subscription. You can cancel it in your account. Learn more in the Subscription Policy. <span className="font-semibold">30-day money-back guarantee.</span> You can find details in our Money-back policy. Our goal is customer satisfaction.
                </>
              )}
            </div>
          </div>

          {/* Right Column - Document Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-[#E7F5ED] rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-green-800 text-sm">Your document is ready!</span>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <div className="aspect-[8.5/7] bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button 
                onClick={() => router.push(`/v3/payment?plan=${selectedPlan}`)}
                className="w-full bg-[#6366F1] hover:bg-[#5558E3] text-white font-semibold py-3 rounded-lg transition-colors text-base flex items-center justify-center gap-2 mb-3"
              >
                Continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Rating */}
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900 mb-1">
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
    </div>
  );
}

