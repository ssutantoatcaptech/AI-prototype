const steps = [
  {
    number: '01',
    title: 'Connect your tools',
    description: 'Link your existing apps in seconds. FlowSync supports 200+ integrations including Slack, GitHub, Salesforce, Google Workspace, and more.',
    visual: (
      <div className="grid grid-cols-3 gap-3">
        {['Slack', 'GitHub', 'Notion', 'Jira', 'Gmail', 'Drive'].map((app) => (
          <div key={app} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg" />
            <span className="text-xs text-gray-600 font-medium">{app}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '02',
    title: 'Build your workflow',
    description: 'Use our visual drag-and-drop editor to define your automation logic. No code required — but full scripting available for power users.',
    visual: (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="text-xs text-gray-500 font-medium mb-3">Workflow: New Lead → Onboarding</div>
        <div className="space-y-2">
          {[
            { label: 'Trigger: New CRM contact', color: 'bg-violet-500' },
            { label: 'Action: Send welcome email', color: 'bg-indigo-500' },
            { label: 'Wait: 2 days', color: 'bg-gray-300' },
            { label: 'Action: Assign to sales rep', color: 'bg-emerald-500' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 ${step.color} rounded-full flex-shrink-0`} />
              <div className="flex-1 h-7 bg-gray-50 border border-gray-100 rounded-lg flex items-center px-2">
                <span className="text-xs text-gray-600">{step.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Go live & track results',
    description: 'Publish your workflow with a single click. Monitor runs in real time and see exactly how much time and money you\'re saving.',
    visual: (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="text-xs text-gray-500 font-medium mb-3">Live metrics</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-violet-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-violet-700">1,248</div>
            <div className="text-xs text-violet-500">Runs this month</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-emerald-700">98.2%</div>
            <div className="text-xs text-emerald-500">Success rate</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-amber-700">47h</div>
            <div className="text-xs text-amber-500">Hours saved</div>
          </div>
          <div className="bg-sky-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-sky-700">$3.8k</div>
            <div className="text-xs text-sky-500">Value created</div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-full mb-4">
            How It Works
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Up and running in under 10 minutes
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            No engineering degree required. Our guided setup gets your first automation live in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text */}
              <div className="flex-1 max-w-lg">
                <div className="text-6xl font-extrabold text-gray-100 mb-2">{step.number}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full max-w-md">
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-6 border border-violet-100">
                  {step.visual}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
