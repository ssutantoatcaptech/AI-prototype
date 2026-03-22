const testimonials = [
  {
    quote: "FlowSync cut our onboarding time from 3 days to 4 hours. The visual builder is incredibly intuitive — our ops team built 20 automations without touching a single line of code.",
    name: "Sarah Chen",
    role: "Head of Operations",
    company: "Veritas Labs",
    avatar: "SC",
    avatarColor: "bg-violet-500",
    stars: 5,
  },
  {
    quote: "We replaced three different automation tools with FlowSync and saved $800/month. The Slack and GitHub integrations alone made it worth switching.",
    name: "Marcus Williams",
    role: "Engineering Manager",
    company: "Stackpath",
    avatar: "MW",
    avatarColor: "bg-indigo-500",
    stars: 5,
  },
  {
    quote: "The AI suggestions feature is a game-changer. It noticed patterns in our workflows that we hadn't even thought to automate. We're saving 30+ hours a week now.",
    name: "Priya Nair",
    role: "Product Lead",
    company: "Lunara",
    avatar: "PN",
    avatarColor: "bg-pink-500",
    stars: 5,
  },
  {
    quote: "Migrated from Zapier in a weekend. Setup was painless, the UI is cleaner, and we get better analytics. Our whole sales team loves the Salesforce integration.",
    name: "Tom Richardson",
    role: "VP of Sales",
    company: "Grovetech",
    avatar: "TR",
    avatarColor: "bg-emerald-500",
    stars: 5,
  },
  {
    quote: "As a startup, speed is everything. FlowSync lets us automate customer workflows that would normally need a dedicated engineer. It's like having a free automation dev on the team.",
    name: "Aisha Okafor",
    role: "Co-founder & CEO",
    company: "Brixa",
    avatar: "AO",
    avatarColor: "bg-amber-500",
    stars: 5,
  },
  {
    quote: "The enterprise security features are rock solid. SOC 2 compliance, SSO, audit logs — everything our legal team needed to approve it. And the support team is exceptional.",
    name: "Daniel Kowalski",
    role: "CISO",
    company: "Meridian Financial",
    avatar: "DK",
    avatarColor: "bg-sky-500",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-full mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Loved by 12,000+ teams worldwide
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Don't just take our word for it. Here's what our customers say about FlowSync.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="break-inside-avoid bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <Stars count={t.stars} />
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className={`w-10 h-10 ${t.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div className="mt-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '12,000+', label: 'Active teams' },
              { value: '4.9/5', label: 'Average rating' },
              { value: '50M+', label: 'Tasks automated' },
              { value: '99.9%', label: 'Uptime SLA' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold">{stat.value}</div>
                <div className="text-violet-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
