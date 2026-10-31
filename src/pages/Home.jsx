import React from 'react';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import SectionWrapper from '../components/layout/SectionWrapper';
import AnimeScene from '../components/hero/AnimeScene';
import AboutMe from '../components/about/AboutMe';
import OSSContributions from '../components/about/OSSContributions';
import ContributionHeatmap from '../components/about/ContributionHeatmap';
import AchievementsGrid from '../components/about/AchievementsGrid';
import TechStackGrid from '../components/about/TechStackGrid';
import ProjectGrid from '../components/projects/ProjectGrid';
import ArticleGrid from '../components/articles/ArticleGrid';
import ResumeViewer from '../components/resume/ResumeViewer';
import KatanaCanvas from '../components/effects/KatanaCanvas';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#030305] text-[#f4f4f8] relative selection:bg-[var(--accent)] selection:text-black">
      {/* Interactive Demon Slayer Embers + Katana Blade Trail + Click Slash Canvas */}
      <KatanaCanvas />

      <Nav />

      <main className="flex-grow relative z-10">
        <AnimeScene />

        <SectionWrapper id="about" kanjiWatermark="柱の記録">
          <AboutMe />
          <AchievementsGrid />
          <OSSContributions />
          <ContributionHeatmap />
        </SectionWrapper>

        <SectionWrapper id="tech" kanjiWatermark="日輪刀">
          <TechStackGrid />
        </SectionWrapper>

        <SectionWrapper id="projects" kanjiWatermark="血気術">
          <ProjectGrid />
        </SectionWrapper>

        <SectionWrapper id="writing" kanjiWatermark="技術巻物">
          <ArticleGrid />
        </SectionWrapper>

        <SectionWrapper id="resume" kanjiWatermark="履歴書">
          <ResumeViewer />
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
