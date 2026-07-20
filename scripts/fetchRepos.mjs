import fs from 'fs';
import path from 'path';

const SRC_DATA_DIR = path.resolve(process.cwd(), 'src/data');

const PINNED_REPOS = [
  'bootloader-for-arduino',
  'Http-flood-detector',
  'IoT-based-Air-Quality-Safety-Monitoring-System',
  'Satellite-Vulnerability-Mapper',
  'Chua-s-circuit-simulation',
  'compressor'
];

async function fetchRepos() {
  const headers = {};
  if (process.env.GH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GH_TOKEN}`;
  }

  const res = await fetch('https://api.github.com/users/Paramveersingh-S/repos?per_page=100&sort=pushed', { headers });
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("Failed to fetch repos:", data);
    return;
  }

  const notableRepos = data.filter(repo => !repo.fork || repo.stargazers_count > 0);
  
  const reposResult = [];

  for (const repo of notableRepos) {
    let excerpt = "";
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/Paramveersingh-S/${repo.name}/readme`, { headers });
      if (readmeRes.ok) {
        const readmeData = await readmeRes.json();
        const content = Buffer.from(readmeData.content, 'base64').toString('utf8');
        const lines = content.split('\n');
        for (const line of lines) {
          // find first paragraph that isn't a badge or title
          if (line.trim().length > 10 && !line.startsWith('#') && !line.startsWith('[!')) {
            excerpt = line.substring(0, 200) + (line.length > 200 ? '...' : '');
            break;
          }
        }
      }
    } catch (e) {
      console.warn(`Could not fetch README for ${repo.name}`);
    }

    reposResult.push({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      pushed_at: repo.pushed_at,
      excerpt,
      isPinned: PINNED_REPOS.includes(repo.name)
    });
  }

  // Sort pinned first, then by pushed_at desc
  reposResult.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.pushed_at) - new Date(a.pushed_at);
  });

  fs.writeFileSync(path.join(SRC_DATA_DIR, 'repos.json'), JSON.stringify(reposResult, null, 2));
  console.log('fetchRepos complete.');
}

fetchRepos();
