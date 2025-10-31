'use client';

interface StatCard {
  _key: string;
  value: string;
  description: string;
  accentColor?: 'green' | 'orange' | 'blue' | 'curry';
}

interface StatsProps {
  stats: StatCard[];
  layout?: 'horizontal' | 'grid';
  variant?: 'light' | 'dark';
  embedded?: boolean; // NEW: When true, skips section wrapper (for use in TextImage)
}

const accentColorMap = {
  green: '#88c0b1',
  orange: '#d04227',
  blue: '#3c5067',
  curry: '#eab257',
};

export function Stats({
  stats,
  layout = 'horizontal',
  variant = 'dark',
  embedded = false,
}: StatsProps) {

  const bgColor = variant === 'dark' ? 'bg-[#3c5067]' : 'bg-white';
  const textColor = variant === 'dark' ? 'text-[#c2c2c2]' : 'text-[#666666]';

  // Stats container (reusable) - Mobile-first responsive
  const statsContainer = (
    <div className={`flex items-start gap-4 md:gap-5 lg:gap-[25px] w-full ${
        layout === 'grid' 
          ? 'flex-wrap justify-center' 
          : 'flex-col sm:flex-row sm:flex-nowrap overflow-x-auto'
      }`}
    >
      {stats.map((stat) => {
        const color = stat.accentColor
          ? accentColorMap[stat.accentColor]
          : accentColorMap.green;

        return (
          <div
            key={stat._key}
            className={`inline-flex flex-col items-center gap-2 md:gap-2.5 px-5 py-3 md:px-6 md:py-4 lg:px-[30px] lg:py-[15px] ${bgColor} rounded-[10px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] ${
              layout === 'grid' 
                ? 'flex-1 min-w-[160px] max-w-[220px]' 
                : 'flex-[0_0_auto] w-full sm:w-auto'
            }`}
          >
            {/* Responsive number: 28px mobile → 36px desktop */}
            <div
              className="font-normal text-[28px] leading-[36px] tracking-[0.28px] md:text-[32px] md:leading-[42px] md:tracking-[0.32px] lg:text-[36px] lg:leading-[46px] lg:tracking-[0.36px] text-center"
              style={{ color }}
            >
              {stat.value}
            </div>

            {/* Responsive description: 14px mobile → 16px desktop */}
            <div
              className={`font-normal text-[14px] leading-[22px] tracking-[0.14px] md:text-[16px] md:leading-[26px] md:tracking-[0.16px] text-center ${textColor}`}
            >
              {stat.description}
            </div>
          </div>
        );
      })}
    </div>
  );

  // If embedded (in TextImage), return without section wrapper
  if (embedded) {
    return statsContainer;
  }

  // If standalone, wrap in section with padding + content-wrapper
  return (
    <section className="w-full pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]">
      <div className="content-wrapper">
        {statsContainer}
      </div>
    </section>
  );
}



