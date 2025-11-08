"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function V2() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<"limited" | "full">("full");

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

  const features = [
    { name: "Unlimited edits", limited: true, full: true },
    { name: "Unlimited downloads", limited: true, full: true },
    { name: "Multi-format conversion", limited: true, full: true },
    { name: "No additional software", limited: true, full: true },
    { name: "Edit text and images in PDF", limited: false, full: true },
    { name: "Organize and reorder PDF pages", limited: false, full: true },
    { name: "Protect PDF with passwords", limited: false, full: true },
    { name: "Use PDF Guru on mobile device", limited: false, full: true }
  ];

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
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-sm font-bold text-gray-900">Select plan</span>
              </div>
              <div className="w-8 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-sm">3</div>
                <span className="text-sm text-gray-400">Payment details</span>
              </div>
              <div className="w-8 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-sm">4</div>
                <span className="text-sm text-gray-400">Download</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Choose Plan to access your download
          </h1>

          {/* Billing Cycle Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg w-fit mb-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-l-md font-medium text-sm transition-colors ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-r-md font-medium text-sm transition-colors ${
                billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly
            </button>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pricing Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-500 text-sm w-1/2">Features</th>
                  <th className="p-4 w-1/4">
                    <div className="flex flex-col items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlan === "limited"}
                          onChange={() => setSelectedPlan("limited")}
                          className="w-5 h-5 text-indigo-600"
                        />
                        <span className="font-bold text-gray-900 text-sm">LIMITED ACCESS</span>
                      </label>
                      {billingCycle === "monthly" ? (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{plans.limited.monthly.trial}</div>
                          <div className="text-xs text-gray-500">7-day trial, then {plans.limited.monthly.then}</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {plans.limited.yearly.price}
                            <span className="text-sm font-normal text-gray-500">{plans.limited.yearly.perMonth}</span>
                          </div>
                          <div className="text-xs text-gray-500">{plans.limited.yearly.billed}</div>
                        </div>
                      )}
                    </div>
                  </th>
                  <th className="p-4 bg-amber-50 w-1/4 relative">
                    <div className="absolute top-0 left-0 right-0 bg-amber-400 text-center py-1">
                      <span className="text-xs font-semibold text-gray-800">★ Most popular</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlan === "full"}
                          onChange={() => setSelectedPlan("full")}
                          className="w-5 h-5 text-indigo-600"
                        />
                        <span className="font-bold text-gray-900 text-sm">FULL ACCESS</span>
                      </label>
                      {billingCycle === "monthly" ? (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{plans.full.monthly.trial}</div>
                          <div className="text-xs text-gray-500">7-day trial, then {plans.full.monthly.then}</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {plans.full.yearly.price}
                            <span className="text-sm font-normal text-gray-500">{plans.full.yearly.perMonth}</span>
                          </div>
                          <div className="text-xs text-gray-500">{plans.full.yearly.billed}</div>
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="p-4 text-sm text-gray-700">{feature.name}</td>
                    <td className={`p-4 text-center ${selectedPlan === "limited" ? "bg-indigo-50" : ""}`}>
                      {feature.limited ? (
                        <svg className="w-5 h-5 text-indigo-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </td>
                    <td className={`p-4 text-center ${selectedPlan === "full" ? "bg-indigo-50" : "bg-amber-50"}`}>
                      {feature.full ? (
                        <svg className="w-5 h-5 text-indigo-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer Info */}
            <div className="p-4 bg-gray-50 text-xs text-gray-600 space-y-2">
              <p>
                By continuing, you agree that your subscription will be auto-renewed at the price of $49.99 each month at the end of the 7-day intro period unless you cancel your subscription. You can cancel it in your account.{" "}
                <a href="#" className="text-indigo-600 hover:underline">Learn more in the Subscription Policy.</a>
              </p>
              <p className="font-semibold">
                30-day money-back guarantee.{" "}
                <span className="font-normal">You can find details in our Money-back policy. Our goal is customer satisfaction</span>
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Document Preview */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-green-800">Your document is ready!</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm mb-4">
                <div className="w-full h-48 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                  <div className="text-center text-xs text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                    Document Preview
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button 
                onClick={() => router.push(`/v2/payment?plan=${selectedPlan}&billing=${billingCycle}`)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <span className="font-semibold">4.5 out of 5</span>
                <span className="text-gray-400">|</span>
                <span>based on 12,564 reviews</span>
              </div>
              <div className="flex justify-center gap-0.5 mt-2">
                {[1, 2, 3, 4].map((star) => (
                  <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <defs>
                    <clipPath id="half-star">
                      <rect x="0" y="0" width="10" height="20" />
                    </clipPath>
                  </defs>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipPath="url(#half-star)" />
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className="text-gray-300" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Trustpilot Reviews Section */}
        <div className="w-full mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">What people say</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Review 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500 mb-3">4 hours ago</p>
              <h3 className="font-bold text-gray-900 mb-2">Love it!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Thank you for this website. I enjoyed it. It's handy for converting or erasing some parts of a document.
              </p>
              <p className="text-sm font-semibold text-gray-900">Patrick</p>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500 mb-3">1 day ago</p>
              <h3 className="font-bold text-gray-900 mb-2">Quick and Easy</h3>
              <p className="text-sm text-gray-600 mb-4">
                It's easy to use and convert PDFs to PowerPoint sheets. I needed such a platform to do my work...to edit PDFs and convert. I recommend it.
              </p>
              <p className="text-sm font-semibold text-gray-900">Tom</p>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500 mb-3">3 days ago</p>
              <h3 className="font-bold text-gray-900 mb-2">Easy to use</h3>
              <p className="text-sm text-gray-600 mb-4">
                The website was very easy to navigate and I was able to convert my PDF to Word. The experience was good. It makes a much easier flow than other services.
              </p>
              <p className="text-sm font-semibold text-gray-900">Julia</p>
            </div>

            {/* Review 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4].map((star) => (
                  <svg key={star} className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mb-3">5 days ago</p>
              <h3 className="font-bold text-gray-900 mb-2">A great site for converting PDF</h3>
              <p className="text-sm text-gray-600 mb-4">
                I like converting PDF to JPG because it comes out with the same quality without any flaws. I hope the website developers keep working so we can keep enjoying this great site.
              </p>
              <p className="text-sm font-semibold text-gray-900">Douglas</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

