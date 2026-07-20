import React from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';
import AnimeScene from '../components/hero/AnimeScene';
import HeroText from '../components/hero/HeroText';
import AboutMe from '../components/about/AboutMe';
import TechStackGrid from '../components/about/TechStackGrid';
import AchievementsGrid from '../components/about/AchievementsGrid';
import OSSContributions from '../components/about/OSSContributions';
import ContributionHeatmap from '../components/about/ContributionHeatmap';
import ResumeViewer from '../components/resume/ResumeViewer';
import ProjectGrid from '../components/projects/ProjectGrid';
import ArticleGrid from '../components/articles/ArticleGrid';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <div className="font-body text-[var(--text-primary)] bg-[var(--bg-primary)] min-h-screen">
      <Nav />
      
      {/* Hero Section */}
      <section id="home" className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <AnimeScene />
      </section>

      {/* About Section */}
      <SectionWrapper id="about" dark={false}>
        <AboutMe />
        <TechStackGrid />
        <AchievementsGrid />
        <OSSContributions />
        <ContributionHeatmap />
      </SectionWrapper>

      {/* Resume Section */}
      <SectionWrapper id="resume" dark={true} className="bg-[var(--color-black)] text-[var(--text-inverted)]">
        <ResumeViewer />
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper id="projects" dark={false} className="bg-[var(--color-off-white)]">
        <ProjectGrid />
      </SectionWrapper>

      {/* Articles Section */}
      <SectionWrapper id="articles" dark={false}>
        <ArticleGrid />
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default Home;
