import Link from 'next/link';
import FeatureDesign from '@/components/FeatureDesign';

export default function FeatureDesignDemo() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl font-bold text-white mb-6">
            Feature Design Component
          </h1>
          <p className="text-2xl text-white/60 mb-8">
            Scroll down to see the Framer-inspired animation in action
          </p>
          <div className="inline-flex items-center gap-2 text-white/40 animate-bounce">
            <span>Scroll</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Main Feature Design Component */}
      <FeatureDesign
        title="Design Tools"
        description="Create stunning interfaces with our visual design tools. Collaborate in real-time with your team and bring your ideas to life."
        avatars={[
          { id: '1', name: 'Alex Chen', imageUrl: '/avatars/alex.png' },
          { id: '2', name: 'Maya Patel', imageUrl: '/avatars/maya.png' },
          { id: '3', name: 'Jordan Lee', imageUrl: '/avatars/jordan.png' },
        ]}
      />

      {/* Additional Feature Sections */}
      <FeatureDesign
        title="Prototyping"
        description="Build interactive prototypes without code. Test your designs with real users and iterate quickly."
        avatars={[
          { id: '4', name: 'Sam Wilson', imageUrl: '/avatars/sam.png' },
          { id: '5', name: 'Riley Cooper', imageUrl: '/avatars/riley.png' },
        ]}
      />

      <FeatureDesign
        title="Collaboration"
        description="Work together seamlessly. Comment, share feedback, and keep everyone aligned on your design vision."
        avatars={[
          { id: '6', name: 'Casey Morgan', imageUrl: '/avatars/casey.png' },
          { id: '7', name: 'Avery Blake', imageUrl: '/avatars/avery.png' },
          { id: '8', name: 'Drew Taylor', imageUrl: '/avatars/drew.png' },
        ]}
      />

      {/* Footer Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-4 border-t border-white/10">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/60 mb-8">
            Integrate this component into your project and customize it to match your brand.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Go Home
            </Link>
            <a
              href="https://github.com"
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
            >
              View Code
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
