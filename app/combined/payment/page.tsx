'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Payment() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'full';
  
  const [upsellAdded, setUpsellAdded] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [benefitsExpanded, setBenefitsExpanded] = useState(false);
  const [subscriptionChoice, setSubscriptionChoice] = useState<'monthly' | 'yearly' | 'remind' | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'paypal' | 'googlepay' | 'card' | null>(null);

  // Plan details
  const planDetails: Record<string, { name: string; price: string; description: string; afterTrialPrice?: string; billingPeriod?: string }> = {
    limited: { name: '7-DAY LIMITED ACCESS', price: '$0.99', description: '7-day trial', afterTrialPrice: '$49.99', billingPeriod: 'monthly' },
    full: { name: '7-DAY FULL ACCESS', price: '$1.99', description: '7-day trial', afterTrialPrice: '$49.99', billingPeriod: 'monthly' },
    annual: { name: 'ANNUAL PLAN', price: '$24.95', description: 'Billed monthly' },
    student: { name: 'STUDENT PLAN - MONTHLY', price: '$1.99', description: '7-day trial', afterTrialPrice: '$49.99', billingPeriod: 'monthly' },
    'student-yearly': { name: 'STUDENT PLAN - YEARLY', price: '$1.99', description: '7-day trial', afterTrialPrice: '$24.95', billingPeriod: 'yearly' },
    teacher: { name: 'TEACHER PLAN - MONTHLY', price: '$1.99', description: '7-day trial', afterTrialPrice: '$49.99', billingPeriod: 'monthly' },
    'teacher-yearly': { name: 'TEACHER PLAN - YEARLY', price: '$1.99', description: '7-day trial', afterTrialPrice: '$24.95', billingPeriod: 'yearly' },
  };

  // Upsell options based on plan
  const upsellOptions: Record<string, { name: string; description: string; trialPrice: string; afterTrialPrice: string }> = {
    limited: { 
      name: 'AI Assistant', 
      description: 'Chat with your documents for quick answers and one-click summaries. Works with Acrobat Pro, Acrobat Standard, Acrobat Reader, or any free or paid Acrobat plans.',
      trialPrice: '$8.39',
      afterTrialPrice: '$8.39'
    },
    full: { 
      name: 'AI Assistant', 
      description: 'Chat with your documents for quick answers and one-click summaries. Works with Acrobat Pro, Acrobat Standard, Acrobat Reader, or any free or paid Acrobat plans.',
      trialPrice: '$8.39',
      afterTrialPrice: '$8.39'
    },
    annual: { 
      name: 'AI Assistant', 
      description: 'Chat with your documents for quick answers and one-click summaries. Works with Acrobat Pro, Acrobat Standard, Acrobat Reader, or any free or paid Acrobat plans.',
      trialPrice: '$8.39',
      afterTrialPrice: '$8.39'
    },
    student: { 
      name: 'AI Summarizer', 
      description: 'Explains complex text in simple words or short summaries. Perfect for studying and understanding difficult academic materials.',
      trialPrice: '$0.00',
      afterTrialPrice: '$4.99'
    },
    'student-yearly': { 
      name: 'AI Summarizer', 
      description: 'Explains complex text in simple words or short summaries. Perfect for studying and understanding difficult academic materials.',
      trialPrice: '$0.00',
      afterTrialPrice: '$4.99'
    },
    teacher: { 
      name: 'AI Agent', 
      description: 'Auto-check answers, suggest grades, and generate feedback comments. Save hours on grading and provide better feedback to students.',
      trialPrice: '$0.00',
      afterTrialPrice: '$12.99'
    },
    'teacher-yearly': { 
      name: 'AI Agent', 
      description: 'Auto-check answers, suggest grades, and generate feedback comments. Save hours on grading and provide better feedback to students.',
      trialPrice: '$0.00',
      afterTrialPrice: '$12.99'
    },
  };

  const currentPlan = planDetails[planId] || planDetails.full;
  const currentUpsell = upsellOptions[planId] || upsellOptions.full;

  const basePriceNum = parseFloat(currentPlan.price.replace('$', ''));
  const upsellTrialPriceNum = parseFloat(currentUpsell.trialPrice.replace('$', ''));
  const upsellAfterTrialPriceNum = parseFloat(currentUpsell.afterTrialPrice.replace('$', ''));
  
  const totalPriceNow = upsellAdded ? (basePriceNum + upsellTrialPriceNum).toFixed(2) : basePriceNum.toFixed(2);
  
  // Calculate price after trial ends based on subscription choice
  const monthlyPrice = '$49.99';
  const yearlyPrice = '$24.95';
  
  const getAfterTrialPrice = () => {
    if (subscriptionChoice === 'monthly') {
      const basePrice = parseFloat(monthlyPrice.replace('$', ''));
      return upsellAdded ? (basePrice + upsellAfterTrialPriceNum).toFixed(2) : basePrice.toFixed(2);
    } else if (subscriptionChoice === 'yearly') {
      const basePrice = parseFloat(yearlyPrice.replace('$', ''));
      return upsellAdded ? (basePrice + upsellAfterTrialPriceNum).toFixed(2) : basePrice.toFixed(2);
    }
    return '0.00';
  };
  
  const totalPriceAfterTrial = getAfterTrialPrice();
  
  // Calculate trial end date (7 days from now)
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 7);
  const formattedTrialEndDate = trialEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  // Calculate decision date (6 days from now - 1 day before trial ends)
  const decisionDate = new Date();
  decisionDate.setDate(decisionDate.getDate() + 6);
  const formattedDecisionDate = decisionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  // Check if plan has trial
  const hasTrial = currentPlan.afterTrialPrice !== undefined;

  const handleDownload = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method to continue.');
      return;
    }
    
    if (selectedPaymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all card details.');
        return;
      }
    }
    
    if (hasTrial && subscriptionChoice === null) {
      alert('Please select what to do after trial ends.');
      return;
    }
    
    const methodName = selectedPaymentMethod === 'paypal' ? 'PayPal' : 
                       selectedPaymentMethod === 'googlepay' ? 'Google Pay' : 'Credit Card';
    alert(`Payment processed with ${methodName}! Your document is ready to download.`);
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
          
          {/* Progress Steps with Norton Badge */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-medium">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-700">Document is ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-medium">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-700">Select plan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-medium">
                3
              </div>
              <span className="text-sm font-medium text-gray-900">Payment details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">
                4
              </div>
              <span className="text-sm font-medium text-gray-500">Download</span>
            </div>
            
            {/* Norton Badge */}
            <div className="flex items-center gap-2 ml-4">
              <svg className="w-12 h-12 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <div className="font-bold text-gray-900 leading-tight">Norton</div>
                <div className="text-xs text-gray-600">by Symantec</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment details</h1>
        <p className="text-gray-600 mb-8">Please enter your payment details to proceed and obtain your document.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            {/* Document Preview - Collapsible */}
            <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
              <button
                onClick={() => setPreviewExpanded(!previewExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-gray-900">Your document is ready!</span>
                </div>
                <svg 
                  className={`w-5 h-5 text-gray-600 transition-transform ${previewExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {previewExpanded && (
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="aspect-[8.5/11] max-h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-center mt-3 text-sm text-gray-700 font-medium">
                      4506_t_form....pdf
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Upsell Section - Similar to Adobe */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Power up your plan with {currentUpsell.name}.
              </h2>
              
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <svg className="w-12 h-12 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                      <path d="M14 2v6h6"/>
                    </svg>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{currentUpsell.name}</h3>
                        {upsellTrialPriceNum === 0 && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                            Free during trial
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {currentUpsell.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {upsellTrialPriceNum === 0 ? (
                        <>
                          {currentUpsell.afterTrialPrice}
                          <span className="text-base font-normal text-gray-600"> US$/mo</span>
                        </>
                      ) : (
                        <>
                          {currentUpsell.trialPrice}
                          <span className="text-base font-normal text-gray-600"> US$/mo</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">incl. VAT</div>
                  </div>
                </div>
                
                <button
                  onClick={() => setUpsellAdded(!upsellAdded)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    upsellAdded
                      ? 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                      : 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {upsellAdded ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Added
                    </span>
                  ) : (
                    'Select'
                  )}
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose your payment method</h3>
              <p className="text-sm text-gray-600 mb-6">Select one of the payment options below to continue</p>

              {/* Payment Method Options */}
              <div className="space-y-4 mb-6">
                {/* PayPal Option */}
                <label 
                  className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'paypal'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={selectedPaymentMethod === 'paypal'}
                      onChange={() => setSelectedPaymentMethod('paypal')}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-gray-900 font-medium">PayPal</span>
                      <div className="bg-[#FFC439] px-4 py-2 rounded flex items-center gap-1">
                        <span className="text-[#003087] font-bold text-lg">Pay</span>
                        <span className="text-[#009CDE] font-bold text-lg">Pal</span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Google Pay Option */}
                <label 
                  className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'googlepay'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="googlepay"
                      checked={selectedPaymentMethod === 'googlepay'}
                      onChange={() => setSelectedPaymentMethod('googlepay')}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-gray-900 font-medium">Google Pay</span>
                      <div className="bg-black text-white px-4 py-2 rounded flex items-center gap-1">
                        <span className="font-bold">G</span>
                        <span>Pay</span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Credit/Debit Card Option */}
                <label 
                  className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={selectedPaymentMethod === 'card'}
                      onChange={() => setSelectedPaymentMethod('card')}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-gray-900 font-medium">Credit or Debit Card</span>
                      <div className="flex items-center gap-3">
                        <div className="text-[#1A1F71] font-bold text-lg">VISA</div>
                        <div className="flex gap-[-8px]">
                          <div className="w-6 h-6 rounded-full bg-[#EB001B]"></div>
                          <div className="w-6 h-6 rounded-full bg-[#F79E1B] -ml-2"></div>
                        </div>
                        <div className="flex gap-[-8px]">
                          <div className="w-6 h-6 rounded-full bg-[#0099DF]"></div>
                          <div className="w-6 h-6 rounded-full bg-[#F4A200] -ml-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Details - Only show when card is selected */}
                  {selectedPaymentMethod === 'card' && (
                    <div className="ml-9 mt-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                      {/* Card Number */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                          />
                          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-7 text-gray-400" viewBox="0 0 40 28" fill="currentColor">
                            <rect width="40" height="28" rx="4" fill="#E5E7EB"/>
                          </svg>
                        </div>
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            CVV/CVC
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              placeholder="CVV"
                              maxLength={4}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                            />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
                              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Your payment is secured and the information is encrypted</span>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Price Summary - Adobe Style */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Your cart</h3>
                  <button
                    onClick={() => setBenefitsExpanded(!benefitsExpanded)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <span>Plan details</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${benefitsExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                          <path d="M14 2v6h6"/>
                        </svg>
                        <div>
                          <div className="font-semibold text-gray-900">{currentPlan.name}</div>
                          <div className="text-xs text-gray-500">Subscription</div>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                        7-day free trial
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {currentPlan.billingPeriod === 'monthly' ? 'Monthly' : 'Yearly'}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {currentPlan.price}<span className="text-sm font-normal text-gray-600">/{currentPlan.billingPeriod === 'yearly' ? 'yr' : 'mo'}</span>
                      <div className="text-xs text-gray-500 font-normal">incl. VAT</div>
                    </div>
                  </div>

                  {upsellAdded && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                            <path d="M14 2v6h6"/>
                          </svg>
                          <div>
                            <div className="font-semibold text-gray-900">{currentUpsell.name}</div>
                            <div className="text-xs text-gray-500">Subscription</div>
                          </div>
                        </div>
                        {upsellTrialPriceNum === 0 && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                            Free during trial
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Monthly</div>
                      <div className="text-lg font-bold text-gray-900">
                        {upsellTrialPriceNum === 0 ? currentUpsell.afterTrialPrice : currentUpsell.trialPrice}
                        <span className="text-sm font-normal text-gray-600">/mo</span>
                        <div className="text-xs text-gray-500 font-normal">incl. VAT</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Benefits List - Collapsible */}
                {benefitsExpanded && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h4 className="text-base font-bold text-gray-900 mb-3">1 WEEK UNLIMITED ACCESS</h4>
                    <div className="space-y-2">
                      {[
                        'Unlimited Downloads',
                        'Unlimited Edits',
                        'Convert to any formats',
                        'Share with 5 Family Members & Friends',
                        'Password Protect Your Documents',
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#6366F1] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subtotal and VAT */}
                {hasTrial && (
                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">${(parseFloat(totalPriceNow) / 1.20).toFixed(2)} US$/mo</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">VAT 20%</span>
                        <button type="button" className="text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-gray-900 font-medium">${(parseFloat(totalPriceNow) - parseFloat(totalPriceNow) / 1.20).toFixed(2)} US$/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Order Total</span>
                      <span className="text-sm text-gray-900 font-medium">${totalPriceNow} US$/mo</span>
                    </div>
                  </div>
                )}

                {/* DUE NOW / DUE LATER - Adobe Style */}
                {hasTrial ? (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900">DUE NOW</span>
                          <span className="text-2xl font-bold text-gray-900">${totalPriceNow} US$</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">incl. VAT</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="flex-1">
                        {subscriptionChoice === 'remind' ? (
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-base font-medium text-gray-900">Decision by {formattedDecisionDate}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              We'll remind you to choose your subscription plan
                            </div>
                          </div>
                        ) : subscriptionChoice === 'yearly' ? (
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-base font-medium text-gray-900">Due {formattedTrialEndDate}</span>
                              <span className="text-lg font-bold text-gray-900">${totalPriceAfterTrial} US$/yr</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">incl. VAT</div>
                          </div>
                        ) : subscriptionChoice === 'monthly' ? (
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-base font-medium text-gray-900">Due {formattedTrialEndDate}</span>
                              <span className="text-lg font-bold text-gray-900">${totalPriceAfterTrial} US$/mo</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">incl. VAT</div>
                          </div>
                        ) : (
    <div>
                            <div className="flex justify-between items-center">
                              <span className="text-base font-medium text-gray-900">Due {formattedTrialEndDate}</span>
                              <span className="text-lg font-bold text-gray-400">TBD</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Select an option below</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold text-gray-900">Total due today:</span>
                    <span className="text-3xl font-bold text-gray-900">${totalPriceNow}</span>
                  </div>
                )}

                {/* Subscription Choice Options - Only for trial plans */}
                {hasTrial && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">After trial ends:</h4>
                    
                    <div className="space-y-2">
                      {/* Option 1: Monthly */}
                      <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 transition-colors">
                        <input
                          type="radio"
                          name="subscription-choice"
                          value="monthly"
                          checked={subscriptionChoice === 'monthly'}
                          onChange={() => setSubscriptionChoice('monthly')}
                          className="mt-0.5 w-4 h-4 text-[#6366F1] focus:ring-[#6366F1]"
                        />
                        <span className="text-sm text-gray-700">
                          Continue with monthly subscription - <span className="font-semibold">{monthlyPrice}/mo</span>
                        </span>
                      </label>

                      {/* Option 2: Yearly */}
                      <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 transition-colors">
                        <input
                          type="radio"
                          name="subscription-choice"
                          value="yearly"
                          checked={subscriptionChoice === 'yearly'}
                          onChange={() => setSubscriptionChoice('yearly')}
                          className="mt-0.5 w-4 h-4 text-[#6366F1] focus:ring-[#6366F1]"
                        />
                        <span className="text-sm text-gray-700">
                          Continue with yearly subscription - <span className="font-semibold">{yearlyPrice}/yr</span>
                        </span>
                      </label>

                      {/* Option 3: Remind */}
                      <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 transition-colors">
                        <input
                          type="radio"
                          name="subscription-choice"
                          value="remind"
                          checked={subscriptionChoice === 'remind'}
                          onChange={() => setSubscriptionChoice('remind')}
                          className="mt-0.5 w-4 h-4 text-[#6366F1] focus:ring-[#6366F1]"
                        />
                        <span className="text-sm text-gray-700">
                          Ask me 1 day before trial ends
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Download Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={hasTrial && subscriptionChoice === null}
                  className={`w-full font-bold py-4 rounded-lg transition-colors text-lg mb-3 ${
                    hasTrial && subscriptionChoice === null
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  Pay and download my document
                </button>
                
                {hasTrial && subscriptionChoice === null && (
                  <p className="text-xs text-red-600 text-center mb-3">
                    Please select what to do after trial ends
                  </p>
                )}

                {/* Policy Link */}
                <div className="text-center">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Subscription and Cancelation Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
