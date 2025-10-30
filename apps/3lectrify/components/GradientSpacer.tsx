/**
 * Gradient Spacer Component
 * Creates a smooth transition from dark background to light background
 * Used between dark sections and the footer
 */

export function GradientSpacer() {
  return (
    <div
      className="w-full h-[100px] sm:h-[50px]"
      style={{
        background: 'linear-gradient(180deg, #293645 0%, #f5f5f5 100%)',
      }}
      aria-hidden="true"
    />
  );
}

