import { useState } from 'react';

const faqs = [
  {
    question: 'How is FlowSync different from Zapier or Make?',
    answer: 'FlowSync is built for teams, not just individuals. Where Zapier focuses on simple one-step triggers and Make on complex logic for power users, FlowSync combines an intuitive visual builder with enterprise-grade collaboration, analytics, and security — all at a fraction of the cost at scale.',
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'Not at all. Our visual drag-and-drop editor lets you build powerful automations without writing a single line of code. For developers who want more control, we also support JavaScript scripting, webhooks, and a full REST API.',
  },
  {
    question: 'What happens if I exceed my monthly task runs?',
    answer: 'On the Starter plan, workflows will pause until the next billing cycle. On Pro and Enterprise plans, you can enable overage billing to ensure workflows never stop. We\'ll always notify you at 80% and 100% of your limit.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. FlowSync is SOC 2 Type II certified and uses AES-256 encryption for data at rest and TLS 1.3 for data in transit. We never sell your data, and you can request data deletion at any time. Enterprise customers get dedicated tenant isolation.',
  },
  {
    question: 'Can I migrate from another automation platform?',
    answer: 'We have dedicated migration guides for Zapier, Make, and Workato. Our support team can assist with migrations on Pro and Enterprise plans, and we offer white-glove migration services for Enterprise customers moving large workflow libraries.',
  },
  {
    question: 'What integrations does FlowSync support?',
    answer: 'FlowSync natively supports 200+ integrations including Slack, GitHub, Google Workspace, Salesforce, HubSpot, Jira, Notion, Stripe, Shopify, and many more. If we don\'t have your tool, you can connect via our universal HTTP/webhook connector or request a new integration.',
  },
  {
    question: 'Do you offer a free trial for paid plans?',
    answer: 'Yes! The Pro plan comes with a 14-day free trial, no credit card required. You\'ll get full access to all Pro features. If you need more time to evaluate, reach out to our sales team.',
  },
  {
    question: 'How does the AI suggestions feature work?',
    answer: 'Our AI analyzes your workflow patterns, app connections, and usage data to identify opportunities for new automations or improvements to existing ones. Suggestions are presented in the sidebar and can be deployed with one click. Your data is never used to train third-party models.',
  },
];

function FAQItem({ faq }: { faq: { question: string; answer: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.question}</span>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center transition-transform ${open ? 'rotate-180' : ''}`}>
          <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 bg-white">
          <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-full mb-4">
            FAQ
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-500">
            Have a different question?{' '}
            <a href="#" className="text-violet-600 hover:underline font-medium">
              Chat with our team
            </a>
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
