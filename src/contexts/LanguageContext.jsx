import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'Chronicles',
      tech: 'Arsenal',
      projects: 'Techniques',
      writing: 'Scrolls',
      resume: 'Dossier'
    },
    hero: {
      scroll: 'TOTAL CONCENTRATION // SCROLL',
      greeting: 'Paramveer Singh',
      subtitle: 'Systems, Cloud & AI Infrastructure Engineer',
      exploreWorks: 'Unleash Techniques',
      viewDossier: 'Inspect Dossier'
    },
    about: {
      title: 'The Hashira Chronicle',
      ossTitle: 'Corps Alliances & Open Source',
      prsMerged: 'Merged PRs across Global Organizations',
      viewAllGh: 'Inspect All on GitHub',
      heatmapTitle: 'Daily Blade Forging & Streak Telemetry',
      heatmapSub: 'Continuous commits, daily streak metrics, and contribution snake across systems & AI repositories.',
      compTitle: 'Battle Honors',
      expTitle: 'Field Campaigns',
      pubTitle: 'Sacred Scrolls (Publications)'
    },
    tech: {
      title: 'Nichirin Arsenal',
      subtitle: 'Languages, bare-metal kernels, and cloud infrastructure forged in production.'
    },
    projects: {
      title: 'Blood & Steel Techniques',
      subtitle: 'High-throughput distributed systems, AWS Terraform architectures, and custom CUDA kernels.',
      viewAll: 'View All',
      ReposOnGh: 'Repositories on GitHub'
    },
    writing: {
      title: 'ML Blueprints // Scrolls',
      subtitle: 'Deep technical dissections on multi-agent orchestration, GPU kernels, and AI systems.',
      readMore: 'Unseal Scroll',
      readAllSubstack: 'Read All on Substack'
    },
    resume: {
      title: 'Official Corps Dossier',
      download: 'Download PDF',
      openTab: 'Open Fullscreen'
    }
  },
  ja: {
    nav: {
      home: '壱・序章',
      about: '弐・経歴',
      tech: '参・日輪刀',
      projects: '肆・血気術',
      writing: '伍・巻物',
      resume: '陸・履歴書'
    },
    hero: {
      scroll: '全集中・常中 // スクロール',
      greeting: 'Paramveer Singh',
      subtitle: '分散システム・クラウド・AI基盤エンジニア',
      exploreWorks: '技術・作品を見る',
      viewDossier: '履歴書を閲覧'
    },
    about: {
      title: '柱の記録 // 実績と経歴',
      ossTitle: 'オープンソース貢献 (OSS)',
      prsMerged: '件のプルリクエストが国際組織にマージ済',
      viewAllGh: 'GitHubで全て見る',
      heatmapTitle: '日々の鍛錬 // GitHubストリークと活動記録',
      heatmapSub: '毎日のコミット記録、連続ストリーク、コントリビューション・スネーク',
      compTitle: '受賞・大会実績',
      expTitle: '実務・研究経歴',
      pubTitle: '学術論文・出版'
    },
    tech: {
      title: '日輪の武器庫 // 技術スタック',
      subtitle: 'Go・Rust・C++・CUDA・AWS・Terraformによる超高速システム構築',
      },
    projects: {
      title: '肆ノ型 // 主要プロジェクト',
      subtitle: 'サブ10ミリ秒の分散ゲートウェイ、サーバーレス基盤、CUDAカーネル',
      viewAll: '全',
      ReposOnGh: '件のリポジトリをGitHubで見る'
    },
    writing: {
      title: '伍ノ型 // 技術論考 (Substack)',
      subtitle: 'マルチエージェントAI、GPU最適化、分散システムに関する技術エッセイ',
      readMore: '巻物を読む',
      readAllSubstack: 'Substackで全て読む'
    },
    resume: {
      title: '公式履歴書 (CV)',
      download: 'PDFを保存',
      openTab: '別タブで開く'
    }
  },
  de: {
    nav: {
      home: 'Start',
      about: 'Chronik',
      tech: 'Arsenal',
      projects: 'Systeme',
      writing: 'Artikel',
      resume: 'Lebenslauf'
    },
    hero: {
      scroll: 'KONZENTRATION // SCROLLEN',
      greeting: 'Paramveer Singh',
      subtitle: 'Systems, Cloud & AI Infrastructure Engineer',
      exploreWorks: 'Projekte ansehen',
      viewDossier: 'Lebenslauf'
    },
    about: {
      title: 'Ingenieur-Chronik',
      ossTitle: 'Open-Source-Beiträge',
      prsMerged: 'Zusammengeführte PRs weltweit',
      viewAllGh: 'Alle auf GitHub',
      heatmapTitle: 'GitHub Streak & Aktivität',
      heatmapSub: 'Tägliche Commits, Streak-Statistiken und Beitrags-Matrix.',
      compTitle: 'Auszeichnungen',
      expTitle: 'Erfahrung',
      pubTitle: 'Publikationen'
    },
    tech: {
      title: 'Technologie-Arsenal',
      subtitle: 'Sprachen, GPU-Kernels und Cloud-Infrastruktur.'
    },
    projects: {
      title: 'Ausgewählte Systeme',
      subtitle: 'Verteilte Systeme, Cloud-Architektur und CUDA-Kernels.',
      viewAll: 'Alle',
      ReposOnGh: 'Repositories auf GitHub'
    },
    writing: {
      title: 'Technische Schriften',
      subtitle: 'Tiefgehende Analysen zu KI-Systemen und Infrastruktur.',
      readMore: 'Artikel lesen',
      readAllSubstack: 'Auf Substack lesen'
    },
    resume: {
      title: 'Lebenslauf (CV)',
      download: 'PDF herunterladen',
      openTab: 'Im neuen Tab öffnen'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'Chronique',
      tech: 'Arsenal',
      projects: 'Projets',
      writing: 'Articles',
      resume: 'CV'
    },
    hero: {
      scroll: 'CONCENTRATION // DÉFILER',
      greeting: 'Paramveer Singh',
      subtitle: 'Ingénieur Systèmes, Cloud & IA',
      exploreWorks: 'Explorer les Projets',
      viewDossier: 'Voir le CV'
    },
    about: {
      title: 'Chronique de l’Ingénieur',
      ossTitle: 'Contributions Open Source',
      prsMerged: 'PRs fusionnées à l’international',
      viewAllGh: 'Tout voir sur GitHub',
      heatmapTitle: 'Série Quotidienne & Activité GitHub',
      heatmapSub: 'Commits quotidiens, statistiques de série et matrice de contributions.',
      compTitle: 'Distinctions',
      expTitle: 'Expérience',
      pubTitle: 'Publications'
    },
    tech: {
      title: 'Arsenal Technologique',
      subtitle: 'Langages, noyaux GPU et infrastructure Cloud.'
    },
    projects: {
      title: 'Systèmes & Projets',
      subtitle: 'Systèmes distribués haute performance, Cloud AWS et CUDA.',
      viewAll: 'Voir les',
      ReposOnGh: 'dépôts sur GitHub'
    },
    writing: {
      title: 'Écrits Techniques',
      subtitle: 'Analyses approfondies sur l’orchestration multi-agents et les GPU.',
      readMore: 'Lire l’article',
      readAllSubstack: 'Lire sur Substack'
    },
    resume: {
      title: 'Curriculum Vitae',
      download: 'Télécharger PDF',
      openTab: 'Ouvrir dans un nouvel onglet'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        let fallback = translations['en'];
        for (const fk of keys) {
          fallback = fallback ? fallback[fk] : key;
        }
        return fallback;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
