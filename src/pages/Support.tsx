import Sidebar from '../components/Sidebar'
import type { NavProps } from '../types'

const topics = [
  { title: 'Getting Started', desc: 'New to the portal? Learn the basics.' },
  { title: 'Billing & Payments', desc: 'Questions about premiums and payments.' },
  { title: 'Claims', desc: 'Submit or check the status of a claim.' },
  { title: 'Find a Provider', desc: 'Search for in-network doctors and facilities.' },
  { title: 'ID Cards', desc: 'Request or download your member ID card.' },
  { title: 'Troubleshooting', desc: 'Having issues? We can help.' },
]

const faqs = [
  {
    q: 'How do I find an in-network provider?',
    a: 'Use our provider search tool under My Coverages → Find a Provider to search by specialty, location, or name.',
  },
  {
    q: 'What is my deductible and how does it work?',
    a: 'Your deductible is the amount you pay before your plan starts sharing costs. You can view your current progress on the My Coverages page.',
  },
  {
    q: 'How do I submit a claim?',
    a: 'Go to Claims → Submit a Claim and complete the form with your service details and receipts.',
  },
  {
    q: 'When does my coverage renew?',
    a: "Coverage typically renews on January 1 each year. You'll receive a renewal notice 60 days prior.",
  },
]

export default function Support({ navigate }: NavProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar active="support" navigate={navigate} />

      <main className="ml-52 flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support</h1>
            <p className="text-sm text-gray-500 mt-0.5">We're here to help with your benefits questions.</p>
          </div>

          {/* Contact card */}
          <div className="bg-black text-white rounded-xl p-5">
            <p className="text-sm font-semibold mb-1">Need immediate help?</p>
            <p className="text-sm text-gray-300 mb-3">Our member support team is available Mon–Fri, 8am–8pm CT.</p>
            <div className="flex gap-4">
              <a href="tel:+18005551234" className="text-sm font-medium underline hover:text-gray-300">1-800-555-1234</a>
              <a href="mailto:support@example.com" className="text-sm font-medium underline hover:text-gray-300">Email us</a>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Popular Topics</h2>
            <div className="grid grid-cols-2 gap-3">
              {topics.map(t => (
                <button
                  key={t.title}
                  className="text-left p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-medium text-gray-900">{t.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map(faq => (
                <div key={faq.q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">{faq.q}</p>
                  <p className="text-sm text-gray-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Start Live Chat
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
