export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-violet-50 via-white to-white overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            Now with AI-powered automation
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Automate your workflow,{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              amplify your impact
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            FlowSync connects your tools, automates your repetitive tasks, and gives your team one unified workspace to move faster without the chaos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#"
              className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-all"
            >
              Start for free — no credit card
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              See how it works
            </a>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['bg-violet-400', 'bg-indigo-400', 'bg-pink-400', 'bg-sky-400'].map((color, i) => (
                  <div key={i} className={`w-8 h-8 ${color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                    {['A', 'B', 'C', 'D'][i]}
                  </div>
                ))}
              </div>
              <span><strong className="text-gray-700">12,000+</strong> teams already using FlowSync</span>
            </div>
            <span className="hidden sm:block text-gray-300">|</span>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1"><strong className="text-gray-700">4.9/5</strong> from 2,400+ reviews</span>
            </div>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-amber-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <div className="flex-1 mx-4">
                <div className="h-5 bg-gray-200 rounded-md w-48 mx-auto" />
              </div>
            </div>
            {/* Mock dashboard content */}
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Active Workflows', value: '142', color: 'bg-violet-500' },
                  { label: 'Tasks Automated', value: '8.4k', color: 'bg-indigo-500' },
                  { label: 'Hours Saved', value: '312', color: 'bg-emerald-500' },
                  { label: 'Team Members', value: '28', color: 'bg-sky-500' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className={`w-8 h-1.5 ${stat.color} rounded-full mb-3`} />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-40">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Workflow Activity</div>
                  <div className="flex items-end gap-1.5 h-24">
                    {[30, 55, 40, 70, 45, 80, 60, 90, 65, 85, 50, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-500 to-indigo-400 opacity-80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-40">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Recent Tasks</div>
                  <div className="space-y-2">
                    {['Email sync completed', 'Slack alert sent', 'Report generated', 'Data exported'].map((task) => (
                      <div key={task} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                        <span className="text-xs text-gray-600 truncate">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -left-6 top-1/3 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 hidden lg:flex">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Automated</div>
              <div className="text-sm font-semibold text-gray-900">312 tasks today</div>
            </div>
          </div>

          <div className="absolute -right-6 bottom-1/4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 hidden lg:block">
            <div className="text-xs text-gray-500 mb-1">Time saved this week</div>
            <div className="text-lg font-bold text-violet-600">47 hours</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +18% vs last week
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
