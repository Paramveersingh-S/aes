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
    <div className="min-h-screen flex flex-col bg-[#010308] text-[#f0f6ff] relative selection:bg-[#2563eb] selection:text-white">
      {/* Interactive Night Sky Stars + Starlight Cursor Trail + Click Ripple Canvas */}
      <KatanaCanvas />

      <Nav />

      <main className="flex-grow relative z-10">
        <AnimeScene />

        <SectionWrapper id="about">
          <AboutMe />
          <AchievementsGrid />
          <OSSContributions />
          <ContributionHeatmap />
        </SectionWrapper>

        <SectionWrapper id="tech">
          <TechStackGrid />
        </SectionWrapper>

        <SectionWrapper id="projects">
          <ProjectGrid />
        </SectionWrapper>

        <SectionWrapper id="writing">
          <ArticleGrid />
        </SectionWrapper>

        <SectionWrapper id="resume">
          <ResumeViewer />
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
