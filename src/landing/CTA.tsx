export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-violet-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl px-8 py-16 shadow-2xl shadow-violet-200 relative overflow-hidden">
          {/* Decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Start automating today.
              <br />
              It's free.
            </h2>
            <p className="text-violet-200 text-lg max-w-xl mx-auto mb-10">
              Join 12,000+ teams saving hours every week. No credit card required.
              Cancel anytime. Your first 1,000 task runs are on us — forever.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="w-full sm:w-auto px-8 py-4 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-colors shadow-lg"
              >
                Start for free
              </a>
              <a
                href="#"
                className="w-full sm:w-auto px-8 py-4 border border-violet-400 text-white font-semibold rounded-xl hover:bg-violet-500/30 transition-colors"
              >
                Book a demo
              </a>
            </div>

            <p className="mt-6 text-violet-300 text-sm">
              14-day free trial on Pro · No credit card needed · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
