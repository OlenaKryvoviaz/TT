"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function V2Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan") || "full";
  const billingCycle = searchParams.get("billing") || "monthly";
  
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Plan details matching v2 page
  const plans = {
    limited: {
      name: "7-DAY LIMITED ACCESS",
      monthly: {
        trial: "$0.99",
        then: "$49.99"
      },
      yearly: {
        price: "$9.99",
        perMonth: "/month",
        billed: "Billed annually at $119.88"
      }
    },
    full: {
      name: "7-DAY FULL ACCESS",
      monthly: {
        trial: "$1.99",
        then: "$49.99"
      },
      yearly: {
        price: "$24.95",
        perMonth: "/month",
        billed: "Billed annually at $299.40"
      }
    }
  };

  const currentPlan = plans[selectedPlan as keyof typeof plans] || plans.full;
  const isMonthly = billingCycle === "monthly";
  const trialPrice = isMonthly ? currentPlan.monthly.trial : currentPlan.yearly.price;
  const afterTrialPrice = isMonthly ? currentPlan.monthly.then : currentPlan.yearly.price;
  const billingPeriodText = isMonthly ? "month" : "year";
  const billingAnnual = !isMonthly ? currentPlan.yearly.billed : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("Please agree to the subscription terms to continue.");
      return;
    }
    alert("Payment processed! Your document is ready to download!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center py-16 px-4 md:px-8 gap-8">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-800">PDF Guru</span>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm">✓</div>
                <span className="text-sm font-medium text-gray-600">Document is ready</span>
              </div>
              <div className="w-8 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm">✓</div>
                <span className="text-sm font-medium text-gray-600">Select plan</span>
              </div>
              <div className="w-8 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-sm font-bold text-gray-900">Payment details</span>
              </div>
              <div className="w-8 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-sm">4</div>
                <span className="text-sm text-gray-400">Download</span>
              </div>
            </div>

            {/* Norton Badge */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-gray-900 leading-tight">Norton</div>
                <div className="text-xs text-gray-600">by Symantec</div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment details
          </h1>
          <p className="text-gray-600 mb-8">Please enter your payment details to proceed and obtain your document.</p>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Payment Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                {/* Subscription Agreement Checkbox - MOVED TO TOP */}
                <div className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-400 rounded-lg p-5 shadow-md">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-6 h-6 text-orange-600 border-gray-400 rounded focus:ring-orange-600 mt-0.5 flex-shrink-0 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-gray-900">
                      Your PDF Guru subscription will auto-renew {isMonthly ? 'each month' : 'annually'} at {afterTrialPrice} + taxes unless canceled via the Billing tab prior to renewal.*
                    </span>
                  </label>
                </div>

                {/* PayPal Button */}
                <button
                  type="button"
                  disabled={!agreeToTerms}
                  className={`w-full font-semibold py-4 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2 ${
                    agreeToTerms
                      ? "bg-[#FFC439] hover:bg-[#FFB700] text-gray-900 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <span className={agreeToTerms ? "text-[#003087]" : "text-gray-500"}>Pay</span>
                  <span className={agreeToTerms ? "text-[#009CDE]" : "text-gray-500"}>Pal</span>
                  <span className="ml-2">Buy Now</span>
                </button>

                <div className="text-center text-sm text-gray-600 mb-4">or pay with a card</div>

                {/* Google Pay Button */}
                <button
                  type="button"
                  disabled={!agreeToTerms}
                  className={`w-full font-semibold py-4 rounded-lg transition-colors mb-6 flex items-center justify-center gap-2 ${
                    agreeToTerms
                      ? "bg-black hover:bg-gray-900 text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Buy with <span className="font-bold">G</span> Pay
                </button>

                {/* Card Logos */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-[#1A1F71] font-bold text-2xl">VISA</div>
                  <div className="flex gap-[-8px]">
                    <div className="w-8 h-8 rounded-full bg-[#EB001B]"></div>
                    <div className="w-8 h-8 rounded-full bg-[#F79E1B] -ml-2"></div>
                  </div>
                  <div className="flex gap-[-8px]">
                    <div className="w-8 h-8 rounded-full bg-[#0099DF]"></div>
                    <div className="w-8 h-8 rounded-full bg-[#F4A200] -ml-2"></div>
                  </div>
                  <div className="bg-[#006FCF] text-white px-2 py-1 text-xs font-bold">
                    AMERICAN<br/>EXPRESS
                  </div>
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Credit or Debit Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-7 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                      required
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                        required
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Your payment is secured and the information is encrypted</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!agreeToTerms || !cardNumber || !expiryDate || !cvv}
                  className={`w-full font-bold py-4 rounded-lg transition-colors text-lg shadow-md ${
                    (agreeToTerms && cardNumber && expiryDate && cvv)
                      ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Pay and download my documents
                </button>

                {/* Terms explanation */}
                <div className="mt-4 text-xs text-gray-600 leading-relaxed">
                  <p className="mb-2">
                    <span className="font-semibold">*</span> By continuing, you agree that if you do not cancel at least 24 hours before the end of the {isMonthly ? '7-day trial' : 'trial period'} for {trialPrice}, you will be charged {afterTrialPrice} per {billingPeriodText} until you cancel your subscription. You can cancel it in your account. Learn more in the{" "}
                    <a href="#" className="text-indigo-600 hover:underline">Subscription Policy</a>.
                  </p>
                  <p className="font-semibold">
                    30-day money-back guarantee.{" "}
                    <span className="font-normal">You can find details in our Money-back policy. Our goal is customer satisfaction.</span>
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Document Preview */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-green-800">Your document is ready!</span>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-200 rounded border border-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-xs text-gray-500">4506_t_form....pdf</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Features */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{currentPlan.name}</h3>
                <div className="space-y-3">
                  {[
                    "Unlimited Downloads",
                    "Unlimited Edits",
                    "Convert to any formats",
                    ...(selectedPlan === "full" ? [
                      "Share with 5 Family Members & Friends",
                      "Password Protect Your Documents",
                    ] : [])
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-900">Total due today:</span>
                  <span className="text-3xl font-bold text-gray-900">{trialPrice}</span>
                </div>
                <p className="text-xs text-gray-600 text-center">
                  {isMonthly 
                    ? `7-day trial, then ${afterTrialPrice}/${billingPeriodText}`
                    : billingAnnual
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

