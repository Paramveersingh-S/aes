import React from 'react';
import GitHubCalendar from 'react-github-calendar';

const ContributionHeatmap = () => {
  // Custom orange theme based on the plan
  const explicitTheme = {
    light: ['#FAF9F7', '#FFE4D2', '#FFB385', '#FF8533', '#FF6719'],
    dark: ['#17140F', '#3A1C0A', '#8F390D', '#CC5214', '#FF6719'],
  };

  return (
    <div className="mt-20">
      <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 text-[var(--color-orange)] text-center">
        GitHub Activity
      </h3>
      <div className="flex flex-col items-center bg-white p-6 md:p-10 rounded-xl border border-[var(--color-border)] shadow-sm overflow-x-auto">
        <GitHubCalendar 
          username="Paramveersingh-S" 
          theme={explicitTheme}
          colorScheme="light" // Or match system/user preference if we had dark mode toggle
          blockSize={12}
          blockMargin={4}
          fontSize={14}
        />
        
        <div className="mt-12 w-full max-w-4xl border-t border-[var(--color-border)] pt-8">
          <p className="text-sm text-center mb-4 opacity-70">Contribution Snake Animation</p>
          <img 
            src="https://raw.githubusercontent.com/Paramveersingh-S/Paramveersingh-S/output/github-contribution-grid-snake.svg" 
            alt="GitHub Contribution Snake" 
            className="w-full h-auto max-h-64 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="hidden text-center text-sm text-[var(--text-primary)] opacity-70 bg-[var(--color-off-white)] p-4 rounded-lg">
            Snake animation is still generating in the profile repository. Check back soon!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
