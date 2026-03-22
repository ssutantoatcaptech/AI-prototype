import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for individuals and small projects getting started with automation.',
    features: [
      '5 active workflows',
      '1,000 task runs/month',
      '10 integrations',
      'Basic analytics',
      'Email support',
    ],
    excluded: ['Team collaboration', 'AI suggestions', 'Custom webhooks', 'SSO & audit logs'],
    cta: 'Get started free',
    ctaStyle: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
    highlight: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'For growing teams that need powerful automation without limits.',
    features: [
      'Unlimited workflows',
      '50,000 task runs/month',
      '200+ integrations',
      'Advanced analytics',
      'Team collaboration (up to 10)',
      'AI-powered suggestions',
      'Custom webhooks & API',
      'Priority support',
    ],
    excluded: ['SSO & audit logs', 'Custom contracts'],
    cta: 'Start 14-day free trial',
    ctaStyle: 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'For large organizations with advanced security and compliance needs.',
    features: [
      'Everything in Pro',
      'Unlimited task runs',
      'Unlimited team members',
      'SSO & SCIM provisioning',
      'Audit logs & compliance',
      'Custom SLA',
      'Dedicated success manager',
      'Custom contracts',
    ],
    excluded: [],
    cta: 'Contact sales',
    ctaStyle: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
    highlight: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-full mb-4">
            Pricing
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            Start free, scale when you're ready. No hidden fees, no surprises.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !annual ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                annual ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              Annual
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-violet-600 to-indigo-700 text-white ring-2 ring-violet-500 shadow-2xl shadow-violet-200'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? 'text-violet-200' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className={`text-5xl font-extrabold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {(annual ? plan.annualPrice : plan.monthlyPrice) > 0 && (
                    <span className={`text-sm mb-2 ${plan.highlight ? 'text-violet-200' : 'text-gray-500'}`}>
                      /mo
                    </span>
                  )}
                </div>
                {annual && plan.monthlyPrice > 0 && (
                  <div className={`text-xs mt-1 ${plan.highlight ? 'text-violet-200' : 'text-gray-400'}`}>
                    Billed annually (${plan.annualPrice * 12}/yr)
                  </div>
                )}
                {plan.monthlyPrice === 0 && (
                  <div className={`text-sm mt-1 ${plan.highlight ? 'text-violet-200' : 'text-gray-400'}`}>
                    Free forever
                  </div>
                )}
              </div>

              <a
                href="#"
                className={`block w-full py-3 rounded-xl text-sm font-semibold text-center transition-all mb-8 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>

              <div className="flex-1">
                <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${plan.highlight ? 'text-violet-300' : 'text-gray-400'}`}>
                  What's included
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-violet-200' : 'text-violet-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${plan.highlight ? 'text-violet-100' : 'text-gray-600'}`}>{f}</span>
                    </li>
                  ))}
                  {plan.excluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 opacity-40">
                      <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-violet-300' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className={`text-sm ${plan.highlight ? 'text-violet-200' : 'text-gray-400'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Need a custom plan?{' '}
            <a href="#" className="text-violet-600 font-medium hover:underline">
              Talk to our sales team
            </a>{' '}
            — we'll build the right package for your organization.
          </p>
        </div>
      </div>
    </section>
  );
}
